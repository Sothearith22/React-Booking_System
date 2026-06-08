import { Bath, BedDouble, CalendarDays, Ruler, Users } from 'lucide-react';

export const RoomPage = () => {
  const rooms = [
    {
      id: 1,
      title: 'Le Marche Etna House',
      location: 'Le Marche',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=900',
      description:
        'Le Marche Etna House is a fully equipped villa with many bedrooms, swimming pool, terrace and lots of other facilities.',
      guests: 10,
      baths: 4,
      area: '260m²',
      amenities:
        'Air conditioning, balcony, beachfront, dining area, flat-screen TV, free parking, free WiFi, outdoor pool, view.',
      price: '$750',
      nights: 3,
    },
    {
      id: 2,
      title: 'Villa Basilicata Grande',
      location: 'Le Marche',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=900',
      description:
        'This is a perfect villa with spa center and hot tub for private, family and corporate rest in Le Marche region.',
      guests: 8,
      baths: 4,
      area: '180m²',
      amenities:
        'Air conditioning, balcony, flat-screen TV, free parking, free WiFi, outdoor pool, view and dining terrace.',
      price: '$630',
      nights: 3,
    },
    {
      id: 3,
      title: 'Summer Villa Emilia',
      location: 'Aosta Valley',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=900',
      description:
        'Summer Villa Emilia is a perfect place for luxury rest, traveling and tasting the best regional cuisine in Italy.',
      guests: 5,
      baths: 2,
      area: '160m²',
      amenities:
        'Air conditioning, balcony, beachfront, dining area, flat-screen TV, free parking, free WiFi, outdoor pool.',
      price: '$561',
      nights: 3,
    },
    {
      id: 4,
      title: 'Seaside Villa Tuscany Maremma',
      location: 'Lazio',
      image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&q=80&w=900',
      description:
        'A beautiful villa in one of the most attractive destinations of Italy, in Maremma coastline area, in northwestern Italy.',
      guests: 4,
      baths: 2,
      area: '240m²',
      amenities:
        'Air conditioning, beachfront, dining area, flat-screen TV, free parking, free WiFi, outdoor pool and terrace.',
      price: '$474',
      nights: 3,
    },
    {
      id: 5,
      title: 'Alps Mountains Winter Cottage Monte Bianco',
      location: 'Aosta Valley',
      image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=900',
      description:
        'Cottage Monte Bianco in Aosta Valley is well-decorated, warm and fully functional country cottage perfect for winter vacation.',
      guests: 6,
      baths: 4,
      area: '120m²',
      amenities:
        'Air conditioning, balcony, dining area, fireplace, flat-screen TV, free parking, free WiFi and view.',
      price: '$402',
      nights: 3,
    },
    {
      id: 6,
      title: 'Beachfront Villa Casa Aurora',
      location: 'Lazio',
      image: 'https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&q=80&w=900',
      description:
        'A wonderful fully equipped beachfront villa in Lazio, the home of Rome, where you can get your best vacation memories.',
      guests: 8,
      baths: 4,
      area: '350m²',
      amenities:
        'Air conditioning, balcony, beachfront, dining area, flat-screen TV, free parking, free WiFi, outdoor pool.',
      price: '$560',
      nights: 3,
    },
  ];


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
                  <button
                    type="button"
                    className="h-11 bg-teal-500 px-7 text-xs font-bold uppercase text-white transition-colors hover:bg-teal-600"
                  >
                    Book
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-11 items-center gap-2 px-1 text-sm font-semibold text-slate-600 transition-colors hover:text-teal-600"
                  >
                    <BedDouble size={16} />
                    View Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};
