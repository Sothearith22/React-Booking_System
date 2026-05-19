import React from 'react';
import StatCard from './StatCard';

export default function StatsGrid({ cards = [] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
      {cards.map(({ key, ...card }) => (
        <StatCard key={key} {...card} />
      ))}
    </div>
  );
}
