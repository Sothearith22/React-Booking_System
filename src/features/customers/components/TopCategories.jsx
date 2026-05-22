import React, { useMemo, useState } from 'react';
import { CategoryCard } from './CategoryCard';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  {
    id: 1,
    name: 'Houses',
    listings: 8,
    description:
      'Aliquam pretium consectetur magna turpis sed consectetur tempus ut sodales.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCbxGS2H99dlNIs3UeB4__WGVzrwBYODKZXsKdAk_uUoOd8m_ReEHQopoE173czSUZB4CbMFMBmQSm2qSt6Px7GpicDLHvcD9l9qTmMmaC4D5TfbGjItQKRDXLIvwKkd1dz45ZKn5TG13ejb9g9QL-Nc-6fgdMd1LLYARHv_VQVGheGFXuwWouwzUV2gXMk6rAeNVpIet2gM0hrA5YTGOHpk5fOVeCiB-00Y6SnFc0ZjL3FapawVWzP4R7TUZtq8--m0jyaYd_rMbA',
  },
  {
    id: 2,
    name: 'Apartments',
    listings: 8,
    description:
      'Vestibulum faucibus massa mollis mauris est libero elementum rhoncus magna.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuABBrXuVijKDdtoBunR6irjdvJS9bnSSxSdudwrAEGzFB7EsjYIJDUgvOQBGYPvSbHu9leyxmjTJ8vQASl0R2j43Q2kEUucZLcsTrgR_nY8kIH_8sSJQQZIKaNXDii4dbz757GUUPCGUS7nGV48FLaL_7w4duP4j7hW_yT5X2UECUoWKR189cxxYnodffOuEo6Az0HZ7s9ZLwGKzbHgtxThNnF8z1YSp1t-2OGP7yW5LqO1JNFCEQbzQhN2li0v0pRHOoPfXsQNGYs',
  },
  {
    id: 3,
    name: 'Rooms',
    listings: 8,
    description:
      'Curabitur lacinia sapien tortor lorem ultrices nulla ullamcorper rhoncus sem vitae.',
    image:
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800',
  },
];

const TopCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get unique category names
  const categoryButtons = ['All', ...CATEGORIES.map((item) => item.name)];

  // Filter categories
  const filteredCategories = useMemo(() => {
    if (selectedCategory === 'All') {
      return CATEGORIES;
    }

    return CATEGORIES.filter(
      (category) => category.name === selectedCategory
    );
  }, [selectedCategory]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="w-10 h-1 bg-orange-500 rounded-full mb-4" />

        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Featured Accommodations
        </h2>

        <p className="text-lg text-gray-500 max-w-2xl">
          Discover our meticulously designed spaces, offering unparalleled
          comfort and breathtaking views.
        </p>
      </div>

      {/* Top Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        
        {/* Category Sort Buttons */}
        <div className="flex flex-wrap gap-3">
          {categoryButtons.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'border border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-500'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* View All Button */}
        <Link
            to={'/room'}
          className="rounded-md border border-orange-500 px-4 py-2 text-sm font-semibold text-orange-600 transition-colors hover:bg-orange-50">
          View All Rooms
        </Link>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default TopCategories;