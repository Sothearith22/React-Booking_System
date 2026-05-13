export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold text-blue-600 mb-10">HOTEL</h1>

        <nav className="space-y-4">
          <button className="w-full text-left px-4 py-3 rounded-xl bg-blue-100 text-blue-600 font-semibold">
            Dashboard
          </button>

          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100">
            Booking
          </button>

          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100">
            Rooms
          </button>

          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100">
            Guests
          </button>
        </nav>
      </div>
    </aside>
  );
}
