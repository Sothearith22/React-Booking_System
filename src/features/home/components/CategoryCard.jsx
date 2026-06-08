import Card from '../../../components/ui/Card';
import { Clock, Users, DoorOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CategoryCard = ({ category }) => {
  const rooms = Array.isArray(category.rooms) ? category.rooms : [];
  const roomCount = rooms.length;
  const firstRoom = rooms[0];
  const amenities = firstRoom?.amenities ?? [];

  return (
    <Link
      to={`/room/${category.id}`}
      state={{ category }}
      className="block"
      aria-label={`View rooms in ${category.name}`}
    >
      <Card className="relative group h-[420px] cursor-pointer overflow-hidden rounded-xl border-0 shadow-lg">
        <img
          src={category.image}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />


        {/* Room Count Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/20 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-md flex items-center gap-1.5">
            <DoorOpen size={12} />
            {roomCount} {roomCount === 1 ? 'ROOM' : 'ROOMS'}
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-6 left-6 right-6">
          <h3 className="text-white text-2xl font-bold mb-1">
            {category.name}
          </h3>

          <p className="text-white/70 text-sm line-clamp-2 leading-relaxed mb-3">
            {category.description}
          </p>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-white/80 text-xs mb-3">
            {category.duration && (
              <span className="flex items-center gap-1">
                <Clock size={13} />
                {category.duration} min
              </span>
            )}
            {category.capacity && (
              <span className="flex items-center gap-1">
                <Users size={13} />
                {category.capacity} {category.capacity === 1 ? 'guest' : 'guests'}
              </span>
            )}
          </div>

          {/* Amenities from first room */}
          {amenities.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {amenities.slice(0, 3).map((amenity) => (
                <span
                  key={amenity}
                  className="bg-white/15 backdrop-blur-sm text-white/90 text-[10px] font-medium px-2 py-1 rounded-full"
                >
                  {amenity}
                </span>
              ))}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
};
