import { Award, CalendarCheck, Headphones, ShieldCheck } from 'lucide-react';
import { createElement } from 'react';

const benefits = [
  {
    title: 'Best Price Guarantee',
    description: 'Get the best price for your stay',
    icon: Award,
  },
  {
    title: 'Easy Booking',
    description: 'Book your room in minutes',
    icon: CalendarCheck,
  },
  {
    title: '24/7 Support',
    description: "We're here to help anytime",
    icon: Headphones,
  },
  {
    title: 'Secure Booking',
    description: 'Your booking is safe with us',
    icon: ShieldCheck,
  },
];

export const BookingBenefits = () => {
  return (
    <section className="bg-white px-4 pb-14 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 rounded-lg bg-slate-50 px-5 py-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-7">
          {benefits.map(({ title, description, icon }) => (
            <div key={title} className="flex min-h-20 items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                {createElement(icon, { size: 19, strokeWidth: 2.3 })}
              </span>
              <span>
                <span className="block text-sm font-black text-slate-950">{title}</span>
                <span className="mt-1 block text-xs font-semibold text-slate-500">
                  {description}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingBenefits;
