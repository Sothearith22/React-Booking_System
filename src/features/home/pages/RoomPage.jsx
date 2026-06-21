import { Bath, BedDouble, CalendarDays, Ruler, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { staticRooms as rooms } from '../data/staticRooms';

export const RoomPage = () => {


  return (
    <main className="bg-white px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            The villa rental expert for your vacation
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-sm font-medium text-slate-500">
            Villagio offers diverse villas in different regions to help you spend your dream vacation.
            Book your villa online quickly and safely.
          </p>
        </div>

        <form className="mx-auto mb-14 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1.2fr_1.2fr_0.7fr_0.7fr_auto]">
          <label className="text-xs font-bold text-slate-600">
            Check-in *
            <span className="mt-2 flex h-12 items-center gap-2 border border-slate-200 px-3">
              <input
                type="text"
                placeholder="Check-in Date"
                className="w-full text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
              <CalendarDays size={16} className="text-slate-500" />
            </span>
          </label>

          <label className="text-xs font-bold text-slate-600">
            Check-out *
            <span className="mt-2 flex h-12 items-center gap-2 border border-slate-200 px-3">
              <input
                type="text"
                placeholder="Check-out Date"
                className="w-full text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
              <CalendarDays size={16} className="text-slate-500" />
            </span>
          </label>

          <label className="text-xs font-bold text-slate-600">
            Adults
            <select className="mt-2 h-12 w-full border border-slate-200 px-3 text-sm text-slate-700 outline-none">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </label>

          <label className="text-xs font-bold text-slate-600">
            Children
            <select className="mt-2 h-12 w-full border border-slate-200 px-3 text-sm text-slate-700 outline-none">
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </label>

          <button
            type="button"
            className="mt-5 h-12 bg-teal-500 px-7 text-xs font-bold uppercase text-white transition-colors hover:bg-teal-600 lg:self-end"
          >
            Search
          </button>
        </form>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <article key={room.id} className="bg-white">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <span className="absolute bottom-3 left-4 bg-slate-900/85 px-3 py-1 text-[10px] font-bold text-white">
                  {room.location}
                </span>
              </div>

              <div className="pt-5">
                <h2 className="text-xl font-bold leading-snug text-slate-900">
                  {room.title}
                </h2>
                <p className="mt-4 min-h-16 text-sm font-medium leading-6 text-slate-600">
                  {room.description}
                </p>

                <div className="mt-5 grid grid-cols-3 border-y border-slate-200 py-3 text-sm font-semibold text-slate-700">
                  <span className="flex items-center gap-2">
                    <Users size={15} />
                    {room.guests}
                  </span>
                  <span className="flex items-center gap-2">
                    <Bath size={15} />
                    {room.baths}
                  </span>
                  <span className="flex items-center gap-2">
                    <Ruler size={15} />
                    {room.area}
                  </span>
                </div>

                <p className="mt-4 min-h-14 text-xs font-medium leading-5 text-slate-500">
                  Amenities: {room.amenities}
                </p>

                <p className="mt-4 text-sm font-semibold text-slate-700">
                  Prices start at:{' '}
                  <span className="font-bold text-slate-950">{room.price}</span> for {room.nights}{' '}
                  nights (+taxes and fees)
                </p>

                <div className="mt-6 flex items-center gap-5">
                  <Link
                    to={`/room-detail/${room.id}`}
                    className="flex h-11 items-center justify-center bg-teal-500 px-7 text-xs font-bold uppercase text-white transition-colors hover:bg-teal-600 no-underline"
                  >
                    Book
                  </Link>
                  <Link
                    to={`/room-detail/${room.id}`}
                    className="inline-flex h-11 items-center gap-2 px-1 text-sm font-semibold text-slate-600 transition-colors hover:text-teal-600 no-underline"
                  >
                    <BedDouble size={16} />
                    View Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};
