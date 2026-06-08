import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { BedDouble, DoorOpen, Users } from 'lucide-react';
import { categoryService } from '../services/Category.service';

const FALLBACK_ROOM_IMAGES = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=900',
];

const extractService = (payload) => {
  if (payload?.data && !Array.isArray(payload.data)) return payload.data;
  if (payload?.service) return payload.service;
  return payload;
};

const extractRooms = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.rooms)) return payload.rooms;
  if (Array.isArray(payload?.data?.rooms)) return payload.data.rooms;
  return [];
};

const getRoomImage = (room, index) => {
  const coverImage = room?.room_images?.find((item) => item?.is_cover);
  const firstImage = coverImage || room?.room_images?.[0];

  return (
    firstImage?.image_url ||
    firstImage?.url ||
    firstImage?.path ||
    room?.image ||
    room?.image_url ||
    room?.thumbnail ||
    FALLBACK_ROOM_IMAGES[index % FALLBACK_ROOM_IMAGES.length]
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

export const CategoryRoomsPage = () => {
  const { categoryId } = useParams();
  const { state } = useLocation();
  const initialCategory = state?.category;

  const [category, setCategory] = useState(initialCategory || null);
  const [loading, setLoading] = useState(!initialCategory);
  const [error, setError] = useState('');
  const [categoryRooms, setCategoryRooms] = useState(
    Array.isArray(initialCategory?.rooms) ? initialCategory.rooms : []
  );

  useEffect(() => {
    if (!categoryId) return;

    const fetchCategory = async () => {
      try {
        setLoading(!initialCategory);
        setError('');

        if (initialCategory?.id && String(initialCategory.id) === String(categoryId)) {
          setCategory(initialCategory);
        }

        const [serviceResult, roomsResponse] = await Promise.all([
          initialCategory?.id && String(initialCategory.id) === String(categoryId)
            ? Promise.resolve(null)
            : categoryService.getById(categoryId),
          categoryService.getRooms({ service_id: categoryId }),
        ]);

        const service = serviceResult ? extractService(serviceResult) : initialCategory;
        const serviceRooms = Array.isArray(service?.rooms) ? service.rooms : [];
        const rooms = extractRooms(roomsResponse);
        const filteredRooms = rooms.filter(
          (room) => String(room?.service_id ?? room?.service?.id) === String(categoryId)
        );

        if (service) {
          setCategory(service);
        }

        setCategoryRooms(filteredRooms.length ? filteredRooms : serviceRooms);
      } catch (err) {
        setError(err?.response?.data?.message || 'Unable to load rooms in this category.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId, initialCategory]);

  const rooms = useMemo(() => categoryRooms, [categoryRooms]);

  return (
    <main className="bg-white px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-semibold text-orange-600 transition-colors hover:text-orange-700"
          >
            Back to categories
          </Link>

          <div className="mt-5 flex flex-col gap-4 border-b border-slate-200 pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-500">
                Category rooms
              </p>
              <h1 className="mt-2 text-3xl font-bold text-slate-950 sm:text-4xl">
                {category?.name || 'Rooms'}
              </h1>
              <p className="mt-3 max-w-3xl text-sm font-medium leading-6 text-slate-500">
                {category?.description || 'Explore all rooms available in this category.'}
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-md bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
              <DoorOpen size={16} />
              {rooms.length} {rooms.length === 1 ? 'room' : 'rooms'}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="rounded-lg border border-slate-200 px-6 py-12 text-center text-slate-500">
            Loading rooms...
          </div>
        ) : error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-12 text-center text-red-600">
            {error}
          </div>
        ) : rooms.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room, index) => {
              const amenities = Array.isArray(room.amenities) ? room.amenities : [];

              return (
                <article key={room.id || room.slug} className="bg-white">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={getRoomImage(room, index)}
                      alt={room.name}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <span className="absolute bottom-3 left-4 bg-slate-900/85 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      {room.is_active === false ? 'Unavailable' : 'Available'}
                    </span>
                  </div>

                  <div className="pt-5">
                    <h2 className="text-xl font-bold leading-snug text-slate-900">
                      {room.name}
                    </h2>
                    <p className="mt-4 min-h-16 text-sm font-medium leading-6 text-slate-600">
                      {room.description || 'A comfortable room ready for your next stay.'}
                    </p>

                    <div className="mt-5 grid grid-cols-2 border-y border-slate-200 py-3 text-sm font-semibold text-slate-700">
                      <span className="flex items-center gap-2">
                        <Users size={15} />
                        {room.capacity || 1} {Number(room.capacity || 1) === 1 ? 'guest' : 'guests'}
                      </span>
                      <span className="flex items-center gap-2">
                        <BedDouble size={15} />
                        Room
                      </span>
                    </div>

                    {amenities.length > 0 && (
                      <p className="mt-4 min-h-14 text-xs font-medium leading-5 text-slate-500">
                        Amenities: {amenities.join(', ')}
                      </p>
                    )}

                    <p className="mt-4 text-sm font-semibold text-slate-700">
                      Prices start at:{' '}
                      <span className="font-bold text-slate-950">
                        {formatCurrency(room.price_per_night)}
                      </span>{' '}
                      per night
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-lg border border-slate-200 px-6 py-12 text-center text-slate-500">
            No rooms found in this category.
          </div>
        )}
      </section>
    </main>
  );
};
