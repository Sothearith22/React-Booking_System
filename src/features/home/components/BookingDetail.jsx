import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Wifi, 
  Tv, 
  Bath, 
  Users, 
  BedDouble, 
  Ruler, 
  CalendarDays, 
  CheckCircle2, 
  Loader2, 
  AlertCircle,
  ShieldAlert,
  Flame,
  ArrowRight
} from 'lucide-react';
import { roomService } from '../services/Room.service';
import { staticRooms } from '../data/staticRooms';
import { useAuth } from '../../auth';

// Helper to normalize data between API schema and static schema
const normalizeRoomData = (room) => {
  if (!room) return null;
  
  const name = room.name || room.title || 'Room Details';
  const description = room.description || 'A comfortable room ready for your next stay.';
  
  // Normalize price: backend uses price_per_night, static uses price (which might have $)
  let price = 0;
  if (room.price_per_night) {
    price = Number(room.price_per_night);
  } else if (room.price) {
    price = Number(String(room.price).replace(/[^0-9.]/g, ''));
  }
  
  const capacity = Number(room.capacity || room.guests || 2);
  const beds = Number(room.beds || room.bed_count || 1);
  const area = room.area || '25 m²';
  
  // Normalize amenities: backend uses array, static uses comma-separated string
  let amenitiesList = [];
  if (Array.isArray(room.amenities)) {
    amenitiesList = room.amenities;
  } else if (typeof room.amenities === 'string') {
    amenitiesList = room.amenities.split(',').map((item) => item.trim());
  } else {
    amenitiesList = ['Free WiFi', 'Air Conditioning', 'TV', 'Private Bathroom'];
  }
  
  // Normalize images
  let images = [];
  if (Array.isArray(room.room_images) && room.room_images.length > 0) {
    images = room.room_images.map((img) => img.image_url || img.url || img.path);
  } else if (room.image) {
    images = [room.image];
  }
  
  // Standard fallbacks if no images present or we need more for the gallery
  const standardFallbacks = [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=900',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=900',
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=900',
  ];
  
  images = [...images, ...standardFallbacks].slice(0, 4);

  return {
    ...room,
    name,
    description,
    price,
    capacity,
    beds,
    area,
    amenities: amenitiesList,
    images
  };
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
};

export const BookingDetail = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Gallery states
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Calendar states
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [calendarDate, setCalendarDate] = useState(new Date());
  
  // Booking Summary states
  const [guestsCount, setGuestsCount] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccessData, setBookingSuccessData] = useState(null);
  const [bookingError, setBookingError] = useState('');

  // Fetch Room details
  useEffect(() => {
    if (!roomId) return;
    
    const fetchRoom = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Try fetching room details from the API
        const apiData = await roomService.getById(roomId);
        if (apiData) {
          setRoom(normalizeRoomData(apiData));
        } else {
          throw new Error('No room data returned.');
        }
      } catch (err) {
        console.warn('API room fetch failed, falling back to static room list:', err.message);
        
        // Fallback to static room lists
        const matchedStatic = staticRooms.find((r) => String(r.id) === String(roomId));
        if (matchedStatic) {
          setRoom(normalizeRoomData(matchedStatic));
        } else {
          setError('Room not found in our directory.');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchRoom();
  }, [roomId]);

  // Gallery Navigation
  const handleNextImage = () => {
    if (!room) return;
    setActiveImageIndex((prev) => (prev + 1) % room.images.length);
  };
  
  const handlePrevImage = () => {
    if (!room) return;
    setActiveImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  // Calendar Calculation
  const calendarDays = useMemo(() => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    
    const firstDayIndex = new Date(year, month, 1).getDay();
    // Normalize to Monday = 0, Sunday = 6
    const paddingCount = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    // Previous month padding
    for (let i = 0; i < paddingCount; i++) {
      days.push(null);
    }
    // Current month days
    for (let d = 1; d <= totalDays; d++) {
      days.push(new Date(year, month, d));
    }
    
    return days;
  }, [calendarDate]);

  const monthName = calendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const handlePrevMonth = () => {
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1));
  };

  const handleDayClick = (day) => {
    if (!day) return;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (day < today) return; // Cannot select past dates
    
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(day);
      setCheckOut(null);
      setBookingError('');
    } else if (checkIn && !checkOut) {
      if (day <= checkIn) {
        setCheckIn(day);
        setCheckOut(null);
      } else {
        setCheckOut(day);
        setBookingError('');
      }
    }
  };

  const isDaySelected = (day) => {
    if (!day) return false;
    return (
      (checkIn && day.toDateString() === checkIn.toDateString()) ||
      (checkOut && day.toDateString() === checkOut.toDateString())
    );
  };

  const isDayInRange = (day) => {
    if (!day || !checkIn || !checkOut) return false;
    return day > checkIn && day < checkOut;
  };

  const isDayDisabled = (day) => {
    if (!day) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return day < today;
  };

  const totalNights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const diffTime = Math.abs(checkOut - checkIn);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [checkIn, checkOut]);

  const totalPrice = useMemo(() => {
    if (!room || totalNights <= 0) return 0;
    return totalNights * room.price;
  }, [room, totalNights]);

  const formatDateString = (date) => {
    if (!date) return '-';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatPayloadDate = (date) => {
    if (!date) return '';
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  // Submit Booking
  const handleBookingSubmit = async () => {
    if (!checkIn || !checkOut) {
      setBookingError('Please select both Check-In and Check-Out dates on the calendar.');
      return;
    }
    
    try {
      setBookingLoading(true);
      setBookingError('');
      
      const payload = {
        room_id: Number(room.id),
        booking_date: formatPayloadDate(checkIn),
        check_out_date: formatPayloadDate(checkOut),
        guests: Number(guestsCount),
        note: `Customer booking for ${room.name}`
      };
      
      const response = await roomService.createBooking(payload);
      setBookingSuccessData(response);
    } catch (err) {
      console.error('Booking creation error:', err);
      setBookingError(err?.response?.data?.message || err.message || 'Unable to create booking.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] bg-slate-50">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
        <p className="text-slate-600 font-semibold text-lg animate-pulse">Loading room details...</p>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-600 mb-6">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Unable to Load Room</h2>
        <p className="text-slate-600 mb-8">{error || 'Something went wrong while retrieving details.'}</p>
        <Link 
          to="/room" 
          className="inline-flex h-12 items-center justify-center rounded-xl bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 transition"
        >
          Return to Rooms
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Back Link */}
        <Link 
          to="/room" 
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors mb-8 group"
        >
          <ChevronLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          Back to Rooms
        </Link>
        
        {/* Top Info Grid (Images & Description Details) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* LEFT: Image Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Big Main Image Container */}
            <div className="relative h-[420px] w-full overflow-hidden rounded-[24px] border border-slate-200 shadow-sm bg-slate-100">
              <img 
                src={room.images[activeImageIndex]} 
                alt={`${room.name} view`} 
                className="h-full w-full object-cover transition-all duration-500"
              />
              
              {/* Prev/Next arrows overlay */}
              <button 
                onClick={handlePrevImage}
                type="button"
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-slate-800 shadow-lg hover:bg-white transition-all hover:scale-105"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={handleNextImage}
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-slate-800 shadow-lg hover:bg-white transition-all hover:scale-105"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            
            {/* Thumbnails row */}
            <div className="grid grid-cols-4 gap-4">
              {room.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`h-24 overflow-hidden rounded-[16px] border-2 bg-slate-100 transition-all ${
                    index === activeImageIndex 
                      ? 'border-blue-600 ring-2 ring-blue-100 scale-[1.02]' 
                      : 'border-transparent hover:border-slate-300 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail view" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          
          {/* RIGHT: Text Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Title & Price row */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-black text-slate-900 leading-tight tracking-tight">
                    {room.name}
                  </h1>
                  
                  {/* Reviews mock */}
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={15} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-slate-800">4.5</span>
                    <span className="text-xs text-slate-400 font-medium">(120 reviews)</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-black text-blue-600">
                    {formatCurrency(room.price)}
                  </div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                    / night
                  </div>
                </div>
              </div>
              
              <hr className="border-slate-100 my-6" />

              {/* Specs Grid */}
              <div className="grid grid-cols-4 gap-4 text-center mb-6">
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <Users size={18} className="text-blue-500" />
                  <span className="text-xs font-bold text-slate-800">{room.capacity} Guests</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <BedDouble size={18} className="text-blue-500" />
                  <span className="text-xs font-bold text-slate-800">{room.beds} Bed{room.beds > 1 ? 's' : ''}</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <Ruler size={18} className="text-blue-500" />
                  <span className="text-xs font-bold text-slate-800">{room.area}</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <Wifi size={18} className="text-blue-500" />
                  <span className="text-xs font-bold text-slate-800">Free WiFi</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Description</h3>
                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                  {room.description}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Amenities</h3>
                <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                  {room.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <span className="text-emerald-500 flex-shrink-0">
                        <CheckCircle2 size={16} fill="currentColor" className="text-white fill-emerald-500" />
                      </span>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
        </div>
        
        {/* Bottom Booking Block (Calendar & Summary Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Calendar Card */}
          <div className="lg:col-span-7 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Select Dates</h2>
            
            {/* Calendar Controls */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-md font-bold text-slate-800">{monthName}</h3>
              <div className="flex gap-2">
                <button 
                  onClick={handlePrevMonth}
                  type="button" 
                  className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition"
                  aria-label="Previous month"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={handleNextMonth}
                  type="button" 
                  className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition"
                  aria-label="Next month"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
            
            {/* Weekday headers & days grid */}
            <div className="grid grid-cols-7 gap-y-2 text-center text-xs">
              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => (
                <div key={d} className="font-bold text-slate-400 py-1 uppercase tracking-wider">
                  {d}
                </div>
              ))}
              {calendarDays.map((day, idx) => {
                if (day === null) {
                  return <div key={`empty-${idx}`} className="py-2"></div>;
                }
                
                const disabled = isDayDisabled(day);
                const selected = isDaySelected(day);
                const inRange = isDayInRange(day);
                
                let dayBtnClass = "w-10 h-10 flex items-center justify-center mx-auto text-sm font-semibold rounded-full transition-all ";
                
                if (disabled) {
                  dayBtnClass += "text-slate-300 cursor-not-allowed";
                } else if (selected) {
                  dayBtnClass += "bg-blue-600 text-white shadow-md";
                } else if (inRange) {
                  dayBtnClass += "text-blue-600 bg-blue-50/50 hover:bg-blue-100/50";
                } else {
                  dayBtnClass += "text-slate-700 hover:bg-slate-100 hover:scale-105";
                }
                
                return (
                  <div 
                    key={day.getTime()} 
                    className={`py-1 ${inRange ? 'bg-blue-50/20' : ''} ${
                      checkIn && day.toDateString() === checkIn.toDateString() && checkOut ? 'rounded-l-full bg-blue-50/20' : ''
                    } ${
                      checkOut && day.toDateString() === checkOut.toDateString() && checkIn ? 'rounded-r-full bg-blue-50/20' : ''
                    }`}
                  >
                    <button
                      type="button"
                      disabled={disabled}
                      onClick={() => handleDayClick(day)}
                      className={dayBtnClass}
                    >
                      {day.getDate()}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* RIGHT: Booking Summary Card */}
          <div className="lg:col-span-5 rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Booking Summary</h2>
            
            <div className="space-y-4 mb-6">
              {/* Check-In */}
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <span className="text-sm font-bold text-slate-500">Check In</span>
                <span className="text-sm font-semibold text-slate-900">{formatDateString(checkIn)}</span>
              </div>
              
              {/* Check-Out */}
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <span className="text-sm font-bold text-slate-500">Check Out</span>
                <span className="text-sm font-semibold text-slate-900">{formatDateString(checkOut)}</span>
              </div>
              
              {/* Guest Count Selector */}
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <label htmlFor="guests-count" className="text-sm font-bold text-slate-500">Guests</label>
                <select 
                  id="guests-count"
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(Number(e.target.value))}
                  className="text-sm font-bold text-slate-900 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-500"
                >
                  {[...Array(room.capacity)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} Guest{i > 0 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Nights Display */}
            {totalNights > 0 && (
              <div className="flex items-center justify-between text-sm text-slate-600 mb-3 font-semibold">
                <span>{formatCurrency(room.price)} x {totalNights} night{totalNights > 1 ? 's' : ''}</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
            )}
            
            {/* Total Price */}
            <div className="flex items-center justify-between mb-8">
              <span className="text-lg font-bold text-slate-900">Total</span>
              <span className="text-2xl font-black text-slate-950">
                {totalNights > 0 ? formatCurrency(totalPrice) : '$0'}
              </span>
            </div>
            
            {/* Error messaging */}
            {bookingError && (
              <div className="flex items-center gap-2 p-4 mb-6 rounded-2xl border border-rose-100 bg-rose-50 text-sm font-semibold text-rose-700">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{bookingError}</span>
              </div>
            )}

            {/* Book Now Button */}
            <button
              onClick={handleBookingSubmit}
              disabled={bookingLoading || !checkIn || !checkOut}
              className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition hover:scale-[1.01] hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none flex items-center justify-center gap-2"
            >
              {bookingLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Creating Reservation...
                </>
              ) : (
                'Book Now'
              )}
            </button>
          </div>
          
        </div>
      </div>
      
      {/* SUCCESS CONFIRMATION MODAL */}
      {bookingSuccessData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-lg bg-white rounded-[32px] p-8 shadow-2xl border border-slate-100 transform transition-all animate-scale-up">
            
            {/* Success Icon */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 mb-6">
              <CheckCircle2 size={48} className="animate-bounce" />
            </div>
            
            <h2 className="text-2xl font-black text-slate-900 text-center mb-2">Booking Confirmed!</h2>
            <p className="text-slate-500 text-center text-sm font-semibold mb-6">
              Your reservation has been created successfully. A confirmation email has been dispatched.
            </p>
            
            {/* Booking Details Card */}
            <div className="bg-slate-50 rounded-2xl p-5 mb-8 border border-slate-100 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="font-bold text-slate-500">Booking Ref</span>
                <span className="font-bold text-blue-600 uppercase font-mono">{bookingSuccessData.reference || 'BK-SUCCESS'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="font-bold text-slate-500">Room</span>
                <span className="font-bold text-slate-800">{room.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="font-bold text-slate-500">Dates</span>
                <span className="font-bold text-slate-800">{formatDateString(checkIn)} - {formatDateString(checkOut)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="font-bold text-slate-500">Guests</span>
                <span className="font-bold text-slate-800">{guestsCount} Guest{guestsCount > 1 ? 's' : ''}</span>
              </div>
              <div className="flex justify-between py-2 mt-1">
                <span className="font-bold text-slate-900">Total Price</span>
                <span className="font-black text-slate-950 text-base">{formatCurrency(totalPrice)}</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setBookingSuccessData(null);
                  navigate('/profile');
                }}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 group"
              >
                Go to Profile
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => setBookingSuccessData(null)}
                className="w-full h-12 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition"
              >
                Close Window
              </button>
            </div>
            
          </div>
        </div>
      )}
    </main>
  );
};

export default BookingDetail;
