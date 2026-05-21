import { Link } from 'react-router-dom';
import {
  CalendarCheck,
  CreditCard,
  Headphones,
  Hotel,
  ShieldCheck,
  Sparkles,
  Users,
  Wifi,
} from 'lucide-react';
import { ROUTES } from '../../../constants/routes';

const stats = [
  { label: 'Rooms Available', value: '180+', icon: Hotel },
  { label: 'Happy Guests', value: '12K+', icon: Users },
  { label: 'Bookings Completed', value: '25K+', icon: CalendarCheck },
  { label: '24/7 Support', value: '24/7', icon: Headphones },
];

const features = [
  {
    title: 'Easy Room Booking',
    description: 'Browse rooms, compare options, and reserve your perfect stay in just a few clicks.',
    icon: CalendarCheck,
  },
  {
    title: 'Secure Payments',
    description: 'Protected checkout experiences keep guest information and transactions safe.',
    icon: ShieldCheck,
  },
  {
    title: 'Real-Time Availability',
    description: 'Live room status helps customers book confidently and helps teams avoid conflicts.',
    icon: Wifi,
  },
  {
    title: 'Customer Support',
    description: 'Helpful support workflows make every booking feel personal, calm, and cared for.',
    icon: Headphones,
  },
];

const team = [
  // {
  //   name: 'Sophia Laurent',
  //   role: 'Backend Developer',
  //   image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80',
  // },
  {
    name: 'Rith DEV',
    role: 'Backend Developer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
  },
  // {
  //   name: 'Amara Chen',
  //   role: 'Booking Product Designer',
  //   image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80',
  // },
];

export const AboutPage = () => {
  return (
    <div className="overflow-hidden bg-slate-50 text-slate-900">
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-950 via-indigo-900 to-blue-700" />
        <div className="absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 -z-10 h-96 w-96 rounded-full bg-indigo-300/20 blur-3xl" />

        <div className="mx-auto grid min-h-[620px] w-full max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1fr)] lg:px-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100 shadow-lg backdrop-blur">
              <Sparkles className="h-4 w-4 text-cyan-200" />
              Premium room booking experience
            </div>
            <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              About Our Booking Platform
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-blue-100 sm:text-lg">
              A modern room booking system crafted for effortless reservations, reliable availability,
              secure payments, and elegant hotel operations from one polished platform.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to={ROUTES.CUSTOMER_ROOM}
                className="rounded-full bg-white px-7 py-3.5 text-center text-sm font-bold text-blue-950 shadow-xl shadow-blue-950/20 transition hover:-translate-y-1 hover:bg-blue-50"
              >
                Explore Rooms
              </Link>
              <Link
                to={ROUTES.CUSTOMER_CONTACT}
                className="rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-center text-sm font-bold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/20"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 -top-6 h-32 w-32 rounded-3xl bg-white/10 backdrop-blur" />
            <div className="absolute -bottom-6 -right-6 h-40 w-40 rounded-full bg-cyan-300/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-3 shadow-2xl shadow-blue-950/30 backdrop-blur">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury hotel lobby with elegant seating"
                className="h-[320px] w-full rounded-[1.5rem] object-cover sm:h-[460px]"
              />
              <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/20 bg-white/85 p-5 shadow-xl backdrop-blur">
                <p className="text-sm font-bold text-blue-950">Smart booking dashboard</p>
                <p className="mt-1 text-sm text-slate-600">
                  Manage rooms, guests, payments, and availability with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-14 grid w-full max-w-7xl gap-4 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-10">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-xl shadow-blue-950/10 backdrop-blur transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg">
                <Icon className="h-6 w-6" />
              </div>
              <p className="mt-5 text-3xl font-black text-slate-950">{stat.value}</p>
              <p className="mt-2 text-sm font-semibold text-slate-500">{stat.label}</p>
            </div>
          );
        })}
      </section>

      <section className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:px-10">
        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-blue-200 to-indigo-200 opacity-70 blur-xl" />
          <img
            src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=80"
            alt="Luxury hotel room with warm lighting"
            className="relative h-[360px] w-full rounded-[2rem] object-cover shadow-2xl shadow-slate-900/15 sm:h-[480px]"
          />
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-blue-600">About the platform</p>
          <h2 className="mt-4 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
            Smart and Reliable Room Booking Solution
          </h2>
          <p className="mt-6 text-base leading-8 text-slate-600">
            Our platform helps customers discover beautiful rooms, check availability, and complete
            bookings with a simple, secure experience. For hotel teams, it brings reservations, room
            status, guest details, and operational workflows into one dependable system.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {['Faster reservations', 'Cleaner admin control', 'Better guest journeys', 'Reliable room data'].map(
              (item) => (
                <div key={item} className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
                  <CreditCard className="h-5 w-5 text-indigo-600" />
                  <p className="mt-3 text-sm font-bold text-slate-900">{item}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-blue-600">Core features</p>
            <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">
              Everything guests and admins need
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Elegant booking tools with the reliability expected from a professional hotel platform.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-3xl border border-slate-100 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg shadow-slate-900/5 transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-950/10"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 text-lg font-black text-slate-950">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-blue-600">Our team</p>
            <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">People behind the experience</h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-slate-600">
            A focused team blending hospitality, operations, and product design to make every stay easier to book.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {team.map((member) => (
            <article
              key={member.name}
              className="group overflow-hidden rounded-3xl border border-white bg-white shadow-xl shadow-slate-900/5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-950/10"
            >
              <div className="overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black text-slate-950">{member.name}</h3>
                <p className="mt-2 text-sm font-semibold text-blue-600">{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-950 px-6 py-16 text-center shadow-2xl shadow-blue-950/20 sm:px-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-black leading-tight text-white sm:text-5xl">
              Ready to Book Your Perfect Room?
            </h2>
            <p className="mt-5 text-base leading-8 text-blue-100">
              Discover beautiful spaces, compare availability, and reserve your next stay with a platform
              designed to feel fast, secure, and premium.
            </p>
            <Link
              to={ROUTES.CUSTOMER_ROOM}
              className="mt-9 inline-flex rounded-full bg-white px-9 py-4 text-sm font-black text-blue-950 shadow-xl transition hover:-translate-y-1 hover:bg-blue-50"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
