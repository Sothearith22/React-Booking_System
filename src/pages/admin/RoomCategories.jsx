import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import {
  Plus,
  ChevronRight,
  Download,
  Filter,
  Trash2,
  Edit,
  Package,
  Layers,
  LayoutGrid,
  Hotel,
  Info,
  ChevronLeft,
} from 'lucide-react';

// ── Mock Data ────────────────────────────────────────────────────

const MOCK_CATEGORIES = [
  { id: 1, name: 'Luxury Suite',     desc: 'Spacious 2-bedroom suite with ocean view and premium amenities.', rooms: 12, status: 'active',   icon: <Hotel size={18} className="text-blue-500" /> },
  { id: 2, name: 'Executive Double', desc: 'Designed for work and rest, featuring ergonomic chairs and fast WiFi.', rooms: 28, status: 'active',   icon: <LayoutGrid size={18} className="text-indigo-500" /> },
  { id: 3, name: 'Standard Family',  desc: 'Two queen beds, mini-fridge, and kid-friendly decor. Perfect for 4.', rooms: 45, status: 'inactive', icon: <Layers size={18} className="text-gray-500" /> },
  { id: 4, name: 'Presidential Penthouse', desc: 'The crown jewel with 360-degree city views and private butler.', rooms: 2,  status: 'active',   icon: <Plus size={18} className="text-amber-500" /> },
  { id: 5, name: 'Classic Single',   desc: 'Cozy room for solo travelers looking for comfort and value.',     rooms: 35, status: 'active',   icon: <Hotel size={18} className="text-emerald-500" /> },
];

const StatCard = ({ icon, label, value, trend, trendColor }) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex-1">
    <div className="flex items-center justify-between mb-2">
      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{label}</p>
      {icon ? React.createElement(icon, { size: 18, className: 'text-gray-400' }) : null}
    </div>
    <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">{value}</h3>
    {trend && (
      <span className={`text-xs font-bold ${trendColor || 'text-emerald-600'} mt-1 flex items-center gap-0.5`}>
        ↗ {trend}
      </span>
    )}
  </div>
);

// ── Main Page ────────────────────────────────────────────────────

const RoomCategories = () => {
  const [categories] = useState(MOCK_CATEGORIES);
  const [selected, setSelected] = useState([1, 2]); // Mock selected

  const toggleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
            <span>Admin</span>
            <ChevronRight size={12} />
            <span className="text-gray-900">Room Categories</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Room Categories</h1>
          <p className="text-sm text-gray-500 mt-1">Create and manage your hotel's room types and pricing tiers.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="bg-white hover:bg-gray-50 h-10 px-4">
             <Download size={16} className="mr-2" /> Export
          </Button>
          <Button className="h-10 px-4 shadow-lg shadow-blue-500/10">
            <Plus size={16} className="mr-2" /> Add New Category
          </Button>
        </div>
      </div>

      {/* Filter / Actions Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs font-bold text-gray-700 flex items-center gap-2">
            <Filter size={14} /> Filter
          </button>
          <div className="flex items-center gap-2 text-xs text-gray-500 border-l border-gray-200 pl-4 h-6">
            <span>Status:</span>
            <select className="bg-transparent font-bold text-gray-800 focus:outline-none">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold">
          <span className="text-gray-400 italic font-medium">{selected.length} selected</span>
          <button className="text-red-500 hover:underline">Delete Selected</button>
          <button className="text-blue-600 hover:underline">Mark as Inactive</button>
        </div>
      </div>

      {/* Table Area */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-5 text-left w-12">
                   <input type="checkbox" className="rounded-sm accent-blue-600" />
                </th>
                <th className="px-6 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category Name</th>
                <th className="px-6 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Description</th>
                <th className="px-6 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Rooms</th>
                <th className="px-6 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-5 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {categories.map(cat => (
                <tr key={cat.id} className={`group transition-colors ${selected.includes(cat.id) ? 'bg-blue-50/30' : 'hover:bg-gray-50/50'}`}>
                  <td className="px-6 py-4 text-left">
                    <input 
                      type="checkbox" 
                      className="rounded-sm accent-blue-600 cursor-pointer" 
                      checked={selected.includes(cat.id)}
                      onChange={() => toggleSelect(cat.id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50/50 flex items-center justify-center border border-blue-100 shadow-sm">
                        {cat.icon}
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 block">{cat.name}</span>
                        <span className="text-[10px] text-gray-400 font-medium">Premium experience</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-gray-500 font-medium line-clamp-2 leading-relaxed max-w-sm">
                      {cat.desc}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="font-bold text-gray-900">{cat.rooms}</span>
                    <span className="text-[10px] text-gray-400 block font-bold uppercase">Rooms</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      cat.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {cat.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><Edit size={16} /></button>
                       <button className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
          <p className="text-[11px] text-gray-500 font-medium">Showing <span className="font-bold text-gray-900">1 to 4</span> of 24 categories</p>
          <div className="flex items-center gap-1">
             <button className="p-1.5 text-gray-400 hover:text-gray-900"><ChevronLeft size={16} /></button>
             <button className="w-7 h-7 bg-blue-600 text-white rounded-md text-xs font-bold shadow-sm">1</button>
             <button className="w-7 h-7 hover:bg-white text-gray-600 rounded-md text-xs font-bold">2</button>
             <button className="w-7 h-7 hover:bg-white text-gray-600 rounded-md text-xs font-bold">3</button>
             <button className="p-1.5 text-gray-400 hover:text-gray-900"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      {/* Footer Stats Grid (Matches screenshot) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-6 flex items-start gap-4">
           <div className="p-2 bg-blue-600 text-white rounded-lg shrink-0"><Info size={20} /></div>
           <div>
              <p className="text-sm font-bold text-gray-800 mb-1">Quick Tip</p>
              <p className="text-xs text-blue-800 leading-relaxed font-medium">
                Categories help you group rooms for easier booking and dynamic pricing. Rooms must be assigned to at least one category to be visible in the search results.
              </p>
           </div>
        </div>
        <StatCard label="Total Categories" value="24" trend="+2 this month" trendColor="text-emerald-600" icon={LayoutGrid} />
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex items-center justify-between">
           <div>
             <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Rooms Assigned</p>
             <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">142</h3>
             <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">out of 150 total rooms</p>
           </div>
           <Hotel size={32} className="text-gray-100" />
        </div>
      </div>
    </div>
  );
};

export default RoomCategories;
