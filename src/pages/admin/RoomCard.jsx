import Button from '../../components/ui/Button';

export default function RoomCard({ room }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 transition hover:border-zinc-300">
      <img
        src={room.image}
        alt={room.name}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-bold text-zinc-950">{room.name}</h4>
          <span className="font-semibold text-sky-700">
            {room.price}
          </span>
        </div>

        <Button variant="outline" className="mt-4 w-full border-zinc-300 text-zinc-700 hover:bg-zinc-50">
          Book Now
        </Button>
      </div>
    </div>
  );
}
