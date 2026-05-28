export default function GuestTable({ guests }) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-zinc-200 p-6">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-zinc-200 text-zinc-500">
            <th className="py-4">Guest</th>
            <th>Room</th>
            <th>Check In</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {guests.map((guest, index) => (
            <tr key={index} className="border-b border-zinc-100">
              <td className="py-4 font-semibold text-zinc-950">{guest.name}</td>
              <td className="text-zinc-700">{guest.room}</td>
              <td className="text-zinc-700">{guest.checkIn}</td>
              <td>
                <span className="rounded-full border border-emerald-200 px-3 py-1 text-sm text-emerald-700">
                  {guest.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
