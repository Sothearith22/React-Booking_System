import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BedDouble, Users } from 'lucide-react';
import { useCategory } from '../../hooks/UseCategory';

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
  const roomName = room.name || room.title || `Room ${index + 1}`;

  return (
    <Link to={`/room-detail/${room.id}`} className="block group no-underline text-inherit">
      <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div className="relative h-64 overflow-hidden">
          <img
            src={getRoomImage(room, index)}
            alt={roomName}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <span className="absolute bottom-3 left-4 rounded-md bg-slate-900/85 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            {room.categoryName || room.service?.name || 'Room'}
          </span>
        </div>

        <div className="p-5">
          <h3 className="text-xl leading-snug text-slate-900 group-hover:text-orange-500 transition-colors">
            {roomName}
          </h3>
          <p className="mt-4 text-sm font-semibold text-slate-700">
            Price :{' '}
            <span className="font-bold text-slate-950">
              {formatCurrency(room.price_per_night || room.price)}
            </span>{' '}/ night
          </p>
        </div>
      </article>
    </Link>
  );
};

const TopCategories = () => {
  const { categories, loading, error } = useCategory();

  const categoryButtons = useMemo(() => {
    return categories.filter((item) => item?.id != null && item?.name);
  }, [categories]);

  const displayedRooms = useMemo(() => {
    return categories
      .flatMap((category) =>
        (Array.isArray(category.rooms) ? category.rooms : []).map((room) => ({
          ...room,
          categoryName: category.name,
        }))
      )
      .slice(0, ALL_ROOMS_LIMIT);
  }, [categories]);

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
        
        {/* Category Navigation Buttons */}
        <div className="flex flex-wrap gap-3">
          <Link
            to="/room"
            className="inline-flex items-center justify-center rounded-full border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 no-underline transition-all duration-200 hover:border-orange-500 hover:text-orange-500"
          >
            All
          </Link>

          {categoryButtons.map((category) => (
            <Link
              key={category.id}
              to={`/room/${category.id}`}
              state={{ category }}
              className="inline-flex items-center justify-center rounded-full border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 no-underline transition-all duration-200 hover:border-orange-500 hover:text-orange-500"
            >
              {category.name}
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <Link
          to="/room"
          className="inline-flex items-center justify-center rounded-md border border-orange-500 px-4 py-2 text-sm font-semibold text-orange-600 no-underline transition-colors hover:bg-orange-50"
        >
          View All Rooms
        </Link>
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
