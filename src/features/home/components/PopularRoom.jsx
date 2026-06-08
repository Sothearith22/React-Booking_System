
import { Link } from 'react-router-dom';
const roomTypes = [
  {
    name: 'Standard Room',
    price: '$80',
    image:
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=700',
  },
  {
    name: 'Deluxe Room',
    price: '$120',
    image:
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=700',
  },
  {
    name: 'Suite Room',
    price: '$200',
    image:
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=80&w=700',
  },
  {
    name: 'Family Room',
    price: '$150',
    image:
      'https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&q=80&w=700',
  },
];

export const PopularRoom = () => {
  return (
    <section className="bg-white px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">
              Popular Room Types
            </h2>
            <p className="mt-2 text-sm font-medium text-slate-500">
              Choose from our most popular room categories
            </p>
          </div>

          <Link
            to="/room"
            className="inline-flex h-10 w-fit items-center justify-center rounded-md border border-slate-200 bg-white px-4 text-sm font-bold text-slate-900 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
          >
            View All Rooms
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {roomTypes.map((room) => (
            <article
              key={room.name}
              className="h-[270px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <img
                src={room.image}
                alt={room.name}
                className=" h-full w-full object-cover"
                loading="lazy"
              />
              <div className="px-4 py-4">
                <h3 className="text-sm font-black text-slate-950">{room.name}</h3>
                <p className="mt-2 text-xs font-semibold text-slate-500">
                  From <span className="font-black text-slate-800">{room.price}</span> / night
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRoom;
