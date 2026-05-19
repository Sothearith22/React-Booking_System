import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
  { id: 1, image: 'https://i.pinimg.com/736x/b5/03/09/b50309a02f54651f7262e56e66a7926f.jpg' },
  { id: 2, image: 'https://i.pinimg.com/1200x/3b/cc/58/3bcc58a79cde7a5739a74f6f879b03a1.jpg' },
  { id: 3, image: 'https://i.pinimg.com/1200x/22/bc/8e/22bc8ebef610eb881071e1a7007a7a80.jpg' },
];

export const HomePage = () => {
  const [activeTab, setActiveTab] = useState('rent');

  return (
    <div className="w-full min-h-screen bg-gray-50">

      {/* ==================== HERO SLIDER ==================== */}
      <div className="relative w-full h-[620px] overflow-hidden">

        {/* Swiper */}
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true, el: '.custom-hero-pagination' }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="h-full w-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Light white overlay — matches the bright/airy look in the screenshot */}
        <div className="absolute inset-0 z-[1] bg-white/40" />

        {/* Floating Content */}
        <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center">

          {/* Headline */}
          <div className="w-full max-w-5xl px-6 text-center mb-6">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide leading-tight mb-5">
              <span className="text-[#2B2B5C]">ENJOY </span>
              <span className="text-white drop-shadow-md">THE FINEST HOMES</span>
            </h1>
            <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
              et dolore magna aliqua. Ut eninim id minim veniam.lorem ipsum dolor sit amet.
            </p>
          </div>

          {/* Search block */}
          <div className="w-full max-w-5xl px-6">

            {/* Rent / Sale tabs */}
            <div className="flex mb-0 ml-1">
              <button
                onClick={() => setActiveTab('rent')}
                className={`px-7 py-2.5 rounded-t-md text-sm font-semibold transition-colors ${
                  activeTab === 'rent'
                    ? 'bg-[#FF4F5A] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Rent
              </button>
              <button
                onClick={() => setActiveTab('sale')}
                className={`px-7 py-2.5 rounded-t-md text-sm font-semibold ml-1 transition-colors ${
                  activeTab === 'sale'
                    ? 'bg-[#FF4F5A] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Sale
              </button>
            </div>

            {/* Search bar */}
            <div className="bg-white/95 backdrop-blur-sm rounded-b-lg rounded-tr-lg shadow-2xl flex flex-wrap md:flex-nowrap items-center border border-white/20 overflow-hidden">

              {/* Keyword */}
              <div className="flex-[2] min-w-[160px] px-5 py-4 border-r border-gray-200">
                <input
                  type="text"
                  placeholder="Enter keyword"
                  className="w-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
                />
              </div>

              {/* Property Type */}
              <div className="flex-[1.5] min-w-[140px] px-4 py-4 border-r border-gray-200 relative">
                <select className="w-full text-sm text-gray-500 bg-transparent focus:outline-none cursor-pointer pr-5"
                  style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}>
                  <option>Property Type</option>
                  <option>Apartment</option>
                  <option>House</option>
                  <option>Villa</option>
                  <option>Studio</option>
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Location */}
              <div className="flex-1 min-w-[110px] px-4 py-4 border-r border-gray-200 relative">
                <select className="w-full text-sm text-gray-500 bg-transparent focus:outline-none cursor-pointer pr-5"
                  style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}>
                  <option>Location</option>
                  <option>Phnom Penh</option>
                  <option>Siem Reap</option>
                  <option>Battambang</option>
                  <option>Kampot</option>
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Rooms */}
              <div className="flex-1 min-w-[90px] px-4 py-4 border-r border-gray-200 relative">
                <select className="w-full text-sm text-gray-500 bg-transparent focus:outline-none cursor-pointer pr-5"
                  style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}>
                  <option>Rooms</option>
                  <option>1 Room</option>
                  <option>2 Rooms</option>
                  <option>3 Rooms</option>
                  <option>4 Rooms</option>
                  <option>5+ Rooms</option>
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Advanced */}
              <button className="px-5 py-4 border-r border-gray-200 flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-gray-700 whitespace-nowrap transition-colors shrink-0">
                Advanced
                <span className="text-lg leading-none font-bold tracking-tighter">⋮</span>
              </button>

              {/* Search Button */}
              <button className="bg-[#FF4F5A] hover:bg-[#e63f4a] active:bg-[#cc3540] text-white font-semibold px-10 py-4 text-sm tracking-wide transition-colors duration-150 shrink-0 whitespace-nowrap">
                Search
              </button>
            </div>
          </div>

          {/* Pagination dots */}
          <div className="custom-hero-pagination flex justify-center gap-2 mt-8 !static" />
        </div>
      </div>

      {/* Swiper dot styles */}
      <style>{`
        .custom-hero-pagination {
          position: static !important;
          bottom: auto !important;
        }
        .custom-hero-pagination .swiper-pagination-bullet {
          background: #9CA3AF;
          opacity: 1;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
          margin: 0 3px;
          cursor: pointer;
          transition: background 0.3s;
        }
        .custom-hero-pagination .swiper-pagination-bullet-active {
          background: #2B2B5C;
        }
      `}</style>
    </div>
  );
};