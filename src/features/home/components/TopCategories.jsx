import React, { useMemo, useState } from 'react';
import { BedDouble, Users } from 'lucide-react';
import { useCategory } from '../hooks/UseCategory';

const ALL_ROOMS_LIMIT = 6;

const getRoomImage = (room) => {
  const coverImage = room?.room_images?.find((item) => item?.is_cover);
  const firstImage = coverImage || room?.room_images?.[0];

  return (
    firstImage?.image_url ||
    firstImage?.url ||
    firstImage?.path ||
    room?.image ||
    room?.image_url ||
    room?.thumbnail 
    // FALLBACK_ROOM_IMAGES[index % FALLBACK_ROOM_IMAGES.length]
  );
};

const formatCurrency = (value) => {
  const amount = Number(value ?? 0);

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
};

const RoomCard = ({ room, index }) => {
  const amenities = Array.isArray(room.amenities) ? room.amenities : [];
  const roomName = room.name || room.title || `Room ${index + 1}`;
  const capacity = Number(room.capacity || room.guests || 1);

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative h-64 overflow-hidden">
        <img
          src={getRoomImage(room, index)}
          alt={roomName}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        <span className="absolute bottom-3 left-4 rounded-md bg-slate-900/85 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
          {room.categoryName || room.service?.name || 'Room'}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-xl  leading-snug text-slate-900">
          {roomName}
        </h3>
        {/* <p className="mt-3 min-h-14 text-sm font-medium leading-6 text-slate-600">
          {room.description || 'A comfortable room ready for your next stay.'}
        </p> */}

        {/* <div className="mt-5 grid grid-cols-2 border-y border-slate-200 py-3 text-sm font-semibold text-slate-700">
          <span className="flex items-center gap-2">
            <Users size={15} />
            {capacity} {capacity === 1 ? 'guest' : 'guests'}
          </span>
          <span className="flex items-center gap-2">
            <BedDouble size={15} />
            Room
          </span>
        </div> */}

        {/* {amenities.length > 0 && (
          <div className="mt-4 flex min-h-8 flex-wrap gap-1.5">
            {amenities.slice(0, 4).map((amenity) => (
              <span
                key={amenity}
                className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600"
              >
                {amenity}
              </span>
            ))}
          </div>
        )} */}

        <p className="mt-4 text-sm font-semibold text-slate-700">
          Price :{' '}
          <span className="font-bold text-slate-950">
            {formatCurrency(room.price_per_night || room.price)}
          </span>{' '}/ night
        </p>
      </div>
    </article>
  );
};

const TopCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { categories, loading, error } = useCategory();

  // Get unique category names
  const categoryButtons = useMemo(() => {
    const names = categories.map((item) => item.name).filter(Boolean);
    return ['All', ...new Set(names)];
  }, [categories]);

  const displayedRooms = useMemo(() => {
    if (selectedCategory === 'All') {
      return categories
        .flatMap((category) =>
          (Array.isArray(category.rooms) ? category.rooms : []).map((room) => ({
            ...room,
            categoryName: category.name,
          }))
        )
        .slice(0, ALL_ROOMS_LIMIT);
    }

    const category = categories.find(
      (item) => item.name === selectedCategory
    );

    return (Array.isArray(category?.rooms) ? category.rooms : []).map((room) => ({
      ...room,
      categoryName: category?.name,
    }));
  }, [categories, selectedCategory]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="w-10 h-1 bg-orange-500 rounded-full mb-4" />

        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Featured Accommodations
        </h2>

        <p className="text-lg text-gray-500 max-w-2xl">
          Discover our meticulously designed spaces, offering unparalleled
          comfort and breathtaking views.
        </p>
      </div>

      {/* Top Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        
        {/* Category Sort Buttons */}
        <div className="flex flex-wrap gap-3">
          {categoryButtons.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'border border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-500'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* View All Button */}
        <button
          type="button"
          onClick={() => setSelectedCategory('All')}
          className="rounded-md border border-orange-500 px-4 py-2 text-sm font-semibold text-orange-600 transition-colors hover:bg-orange-50"
        >
          View All Rooms
        </button>
      </div>

      {/* Room Cards */}
      {loading ? (
        <div className="rounded-lg border border-gray-200 bg-white px-6 py-10 text-center text-gray-500">
          Loading accommodations...
        </div>
      ) : error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-10 text-center text-red-600">
          Unable to load accommodations.
        </div>
      ) : displayedRooms.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayedRooms.map((room, index) => (
            <RoomCard key={room.id || `${room.categoryName}-${index}`} room={room} index={index} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white px-6 py-10 text-center text-gray-500">
          No rooms found in this category.
        </div>
      )}
    </section>
  );
};

export default TopCategories;
