import {
  Bath,
  BedDouble,
  Building2,
  Compass,
  Home,
  MapPin,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import { createElement } from 'react';

import Card from '../../../components/ui/Card';
import { useAuth } from '../../auth';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1800';

const quickActions = [
  {
    label: 'Houses',
    icon: Home,
    description: 'Private homes and villas',
  },
  {
    label: 'Apartments',
    icon: Building2,
    description: 'City living made simple',
  },
  {
    label: 'Rooms',
    icon: BedDouble,
    description: 'Flexible stays and rentals',
  },
  {
    label: 'Nearby',
    icon: Compass,
    description: 'Explore by location',
  },
];

export const Banner = () => {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')?.[0] || 'Guest';

  return (
    <section className="bg-slate-50 px-4 pb-10 pt-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div
          className="relative min-h-[430px] overflow-hidden rounded-lg bg-slate-950 px-5 py-8 shadow-sm sm:px-8 sm:py-10 lg:px-12"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(17, 24, 39, 0.92) 0%, rgba(17, 24, 39, 0.72) 46%, rgba(17, 24, 39, 0.16) 100%), linear-gradient(0deg, rgba(17, 24, 39, 0.42), rgba(17, 24, 39, 0.08)), url(${HERO_IMAGE})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <div className="relative z-10 flex min-h-[360px] max-w-3xl flex-col justify-center">
            <p className="mb-3 text-xs font-black uppercase text-orange-400">
              Welcome back, {firstName}
            </p>
            <h1 className="max-w-2xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              Find a place that feels like home.
            </h1>
            <p className="mt-4 max-w-xl text-base font-medium leading-7 text-white/90 sm:text-lg">
              Browse houses, apartments, and rooms selected for comfort, location,
              and everyday living.
            </p>

            <div className="mt-8 grid max-w-3xl gap-3 rounded-lg border border-white/15 bg-white p-3 shadow-xl shadow-slate-950/20 sm:grid-cols-[1.2fr_0.9fr_auto]">
              <label className="flex min-h-12 items-center gap-3 rounded-md bg-slate-50 px-4">
                <MapPin size={18} className="text-red-600" strokeWidth={2.3} />
                <span className="sr-only">Location</span>
                <input
                  type="text"
                  placeholder="Search city or neighborhood"
                  className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400"
                />
              </label>
              <label className="flex min-h-12 items-center gap-3 rounded-md bg-slate-50 px-4">
                <SlidersHorizontal size={18} className="text-red-600" strokeWidth={2.3} />
                <span className="sr-only">Property type</span>
                <select className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none">
                  <option>Any property</option>
                  <option>House</option>
                  <option>Apartment</option>
                  <option>Room</option>
                </select>
              </label>
              <button
                type="button"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-red-600 px-6 text-sm font-black text-white transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/20"
              >
                <Search size={18} strokeWidth={2.4} />
                Search
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-6 text-sm font-semibold text-white/85">
              <span className="inline-flex items-center gap-2">
                <Home size={17} className="text-orange-400" />
                120+ properties
              </span>
              <span className="inline-flex items-center gap-2">
                <Bath size={17} className="text-orange-400" />
                Verified listings
              </span>
            </div>
          </div>
        </div>

        <div className="-mt-10 grid grid-cols-1 gap-4 px-0 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {quickActions.map(({ label, icon, description }) => (
            <Card
              key={label}
              className="relative z-20 flex min-h-28 items-center gap-4 rounded-lg border-slate-200 bg-white px-5 py-4 shadow-md shadow-slate-200/70 transition hover:-translate-y-0.5 hover:border-red-200 hover:shadow-lg"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                {createElement(icon, { size: 19, strokeWidth: 2.4 })}
              </span>
              <span className="text-left">
                <span className="block text-sm font-black text-slate-950">{label}</span>
                <span className="mt-1 block text-xs font-semibold text-slate-500">
                  {description}
                </span>
              </span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
