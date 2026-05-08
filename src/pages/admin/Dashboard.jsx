import { guests, rooms, stats } from "./dashboardData";
import Header from "./Header";
import GuestTable from "./GuestTable";
import RoomCard from "./RoomCard";
import Sidebar from "./Slidebar";
import StatCard from "./StatCard";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <Header />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {stats.map((item, index) => (
            <StatCard key={index} item={item} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {rooms.map((room, index) => (
            <RoomCard key={index} room={room} />
          ))}
        </div>

        <GuestTable guests={guests} />
      </main>
    </div>
  );
}
