import { useState } from 'react';
import Modal from '../../../components/ui/Modal';
import Button from '../../../components/ui/Button';
import { Plus } from 'lucide-react';

const getInitials = (name) =>
  String(name || 'Guest')
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'GU';

export const BookingModal = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    guest_name: '',
    room_name: '',
    room_number: '',
    check_in: '',
    check_out: '',
    total_price: '',
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...form,
      id: Date.now(),
      user_id: 'local',
      room_id: form.room_number,
      booking_type: 'Room',
      guest_initials: getInitials(form.guest_name),
      reference: `BK-${Date.now()}`,
      status: 'pending',
      payment: 'unpaid',
      total_price: Number(form.total_price || 0),
    });

    setForm({
      guest_name: '',
      room_name: '',
      room_number: '',
      check_in: '',
      check_out: '',
      total_price: '',
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Booking">
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="guest_name"
          placeholder="Guest name"
          required
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
          value={form.guest_name}
          onChange={handleChange}
        />

        <input
          name="room_name"
          placeholder="Room name"
          required
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
          value={form.room_name}
          onChange={handleChange}
        />

        <input
          name="room_number"
          placeholder="Room number"
          required
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
          value={form.room_number}
          onChange={handleChange}
        />

        <input
          type="date"
          name="check_in"
          required
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
          value={form.check_in}
          onChange={handleChange}
        />

        <input
          type="date"
          name="check_out"
          required
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
          value={form.check_out}
          onChange={handleChange}
        />

        <input
          type="number"
          name="total_price"
          placeholder="Total price"
          required
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
          value={form.total_price}
          onChange={handleChange}
        />

        <div className="flex gap-2">
          <Button type="submit" className="flex-1 flex items-center gap-2">
            <Plus size={16} /> Create
          </Button>

          <Button type="button" variant="ghost" onClick={onClose} className="flex-1">
            Cancel
          </Button>
        </div>

      </form>
    </Modal>
  );
};
