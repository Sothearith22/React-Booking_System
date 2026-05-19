import React from 'react';
import { CategoryCard } from './CategoryCard';
const CATEGORIES = [
  {
    id: 1,
    name: 'Houses',
    listings: 8,
    description: 'Aliquam pretium consectetur magna turpis sed consectetur tempus ut sodales.',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 2,
    name: 'Apartments',
    listings: 8,
    description: 'Vestibulum faucibus massa mollis mauris est libero elementum rhoncus magna.',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 3,
    name: 'Rooms',
    listings: 8,
    description: 'Curabitur lacinia sapien tortor lorem ultrices nulla ullamcorper rhoncus sem vitae.',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800',
  },
];


const TopCategories = () => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="w-10 h-1 bg-orange-500 mb-4 rounded-full" />
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Categories</h2>
        <p className="text-gray-500 text-lg">Explore the most popular categories.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CATEGORIES.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default TopCategories;
