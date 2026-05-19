import React, { useState, useMemo } from 'react';
import Button from '../../components/ui/Button';
import {
  Search,
  Bell,
  Settings,
  ChevronRight,
  Activity,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Clock,
  Sparkles,
  Dumbbell,
  Coffee,
  Utensils,
  Car,
  Droplets,
  ConciergeBell,
} from 'lucide-react';

// ── Mock Data ────────────────────────────────────────────────────

const MOCK_SERVICES = [
  { id: 1, name: 'Spa & Wellness',    category: 'Wellness',      status: 'available',   hours: '08:00 - 22:00', active: true,  icon: <Sparkles size={18} /> },
  { id: 2, name: 'Fitness Center',    category: 'Wellness',      status: 'maintenance', hours: '24 / 7',        active: false, icon: <Dumbbell size={18} /> },
  { id: 3, name: 'Rooftop Bar',       category: 'Dining',        status: 'closed',      hours: '17:00 - 01:00', active: false, icon: <Coffee size={18} /> },
  { id: 4, name: 'Room Service',      category: 'Dining',        status: 'busy',        hours: '24 / 7',        active: true,  icon: <Utensils size={18} /> },
  { id: 5, name: 'Laundry Service',   category: 'Housekeeping',  status: 'available',   hours: '09:00 - 18:00', active: true,  icon: <Droplets size={18} /> },
  { id: 6, name: 'Shuttle Service',   category: 'Transport',     status: 'available',   hours: '06:00 - 23:00', active: true,  icon: <Car size={18} /> },
  { id: 7, name: 'Valet Parking',     category: 'Transport',     status: 'available',   hours: '24 / 7',        active: true,  icon: <Car size={18} /> },
  { id: 8, name: 'Concierge Desk',    category: 'Wellness',      status: 'available',   hours: '07:00 - 23:00', active: true,  icon: <ConciergeBell size={18} /> },
];

const STATUS_CONFIG = {
  available:   { label: 'Available',   dot: 'bg-emerald-500', text: 'text-emerald-600' },
  maintenance: { label: 'Maintenance', dot: 'bg-orange-500',  text: 'text-orange-600' },
  closed:      { label: 'Closed',      dot: 'bg-gray-400',    text: 'text-gray-500' },
  busy:        { label: 'Busy',        dot: 'bg-amber-500',   text: 'text-amber-600' },
};

const CATEGORIES = ['All Services', 'Wellness', 'Dining', 'Transport', 'Housekeeping'];

// ── Stat Card ────────────────────────────────────────────────────

const StatCard = ({ icon, iconBg, iconColor, label, value, trend, trendColor }) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all">
    <div className="flex items-center gap-4 mb-3">
      <div className={`p-3 rounded-xl ${iconBg} ${iconColor}`}>
        {icon ? React.createElement(icon, { size: 24 }) : null}
      </div>
      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{label}</p>
    </div>
    <div className="flex items-baseline gap-2">
      <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">{value}</h3>
      {trend && (
        <span className={`text-xs font-bold ${trendColor || 'text-emerald-600'} flex items-center gap-0.5`}>
          {trend.startsWith('+') ? '↗' : '↘'} {trend}
        </span>
      )}
    </div>
  </div>
);

// ── Toggle Switch ────────────────────────────────────────────────

const Toggle = ({ active, onChange }) => (
  <button
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
      active ? 'bg-blue-600' : 'bg-gray-200'
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        active ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

// ── Main Page ────────────────────────────────────────────────────

const ROWS_PER_PAGE = 6;

const ServiceAvailability = () => {
  const [services, setServices] = useState(MOCK_SERVICES);
  const [activeTab, setActiveTab] = useState('All Services');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredServices = useMemo(() => {
    return services.filter(s => {
      const matchesTab = activeTab === 'All Services' || s.category === activeTab;
      const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [services, activeTab, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredServices.length / ROWS_PER_PAGE));
  const pagedServices = filteredServices.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE);

  // Reset to page 1 when filters change
  const handleTabChange = (tab) => { setActiveTab(tab); setCurrentPage(1); };
  const handleSearch = (e) => { setSearchTerm(e.target.value); setCurrentPage(1); };

  const handleToggle = (id) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  const stats = useMemo(() => {
    const activeCount = services.filter(s => s.active).length;
    const maintenanceCount = services.filter(s => s.status === 'maintenance').length;
    return { activeCount, total: services.length, maintenanceCount };
  }, [services]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
            <span>Admin</span>
            <ChevronRight size={12} />
            <span className="text-gray-900">Services</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Service Availability</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and monitor real-time status of hotel amenities and guest services.</p>
        </div>
        <Button className="flex items-center gap-2 shadow-lg shadow-blue-500/20">
          <Activity size={18} /> Add New Service
        </Button>
      </div>

      {/* Top Banner Search (Global search like in screenshot) */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search services..."
          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={CheckCircle2}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          label="Active Services"
          value={`${stats.activeCount}/${stats.total}`}
          trend="+5%"
        />
        <StatCard
          icon={AlertTriangle}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
          label="Maintenance Alerts"
          value={stats.maintenanceCount}
          trend="-10%"
          trendColor="text-emerald-600"
        />
        <StatCard
          icon={BarChart3}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          label="Service Usage Today"
          value="84%"
          trend="+12%"
        />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => handleTabChange(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
              activeTab === cat
                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                : 'bg-white text-gray-600 border-gray-100 hover:border-gray-200 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Table Area */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="px-6 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Service Name</th>
                <th className="px-6 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</th>
                <th className="px-6 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Operating Hours</th>
                <th className="px-6 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Availability</th>
                <th className="px-6 py-5 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pagedServices.map(service => {
                const sc = STATUS_CONFIG[service.status] || STATUS_CONFIG.available;
                return (
                  <tr key={service.id} className="group hover:bg-blue-50/20 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-blue-600 border border-gray-100">
                          {service.icon}
                        </div>
                        <span className="font-bold text-gray-900">{service.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-lg uppercase tracking-wider">
                        {service.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${sc.dot}`} />
                        <span className={`font-semibold ${sc.text}`}>{sc.label}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 font-medium">
                      {service.hours}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Toggle active={service.active} onChange={() => handleToggle(service.id)} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="text-blue-600 font-bold hover:underline">Edit</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Footer info (matches screenshot style) */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-500">Showing <span className="font-bold text-gray-900">{Math.min((currentPage - 1) * ROWS_PER_PAGE + 1, filteredServices.length)}–{Math.min(currentPage * ROWS_PER_PAGE, filteredServices.length)}</span> of {filteredServices.length} services</p>
          <div className="flex gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed">Previous</button>
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 bg-blue-600 border border-blue-600 rounded text-xs font-bold text-white shadow-sm hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceAvailability;
