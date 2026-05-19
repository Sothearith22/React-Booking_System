import React from 'react';

export default function StatCard({ icon: Icon, label, value, subtitle, iconClass }) {
  return (
    <div className="bg-white rounded-2xl border p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className={`p-2 rounded-lg ${iconClass}`}>
          {Icon && <Icon size={16} />}
        </div>
        <p className="text-xs font-bold uppercase text-gray-500">{label}</p>
      </div>

      <h3 className="text-2xl font-extrabold">{value}</h3>

      {subtitle && (
        <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
      )}
    </div>
  );
}