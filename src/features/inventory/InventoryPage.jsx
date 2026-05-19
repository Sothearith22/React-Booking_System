import React, { useDeferredValue, useEffect, useMemo, useState } from 'react';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import {
  Search,
  Plus,
  ChevronRight,
  ChevronLeft,
  Edit,
  ShoppingCart,
  Download,
  Package,
  AlertTriangle,
  Truck,
  Loader2,
  ArrowDownToLine,
  ArrowUpFromLine,
} from 'lucide-react';

// ── Mock Data ────────────────────────────────────────────────────

const MOCK_INVENTORY = [
  { id: 1, name: 'Organic Hand Soap (250ml)',       category: 'Toiletries',    stock: 842,  reorder: 200, status: 'in_stock',     image: '🧴' },
  { id: 2, name: 'Luxury Cotton Bath Towels',       category: 'Linens',        stock: 45,   reorder: 50,  status: 'low_stock',    image: '🛁' },
  { id: 3, name: 'Conditioner Mini (50ml)',          category: 'Toiletries',    stock: 1120, reorder: 300, status: 'in_stock',     image: '🧴' },
  { id: 4, name: 'Glass Cleaner Multi-surface',     category: 'Housekeeping',  stock: 0,    reorder: 15,  status: 'out_of_stock', image: '🧹' },
  { id: 5, name: 'Sparkling Water (330ml)',          category: 'F&B',           stock: 156,  reorder: 100, status: 'in_stock',     image: '💧' },
  { id: 6, name: 'Facial Tissue Box (200ct)',        category: 'Toiletries',    stock: 320,  reorder: 100, status: 'in_stock',     image: '🧻' },
  { id: 7, name: 'Premium Bed Sheet Set (King)',     category: 'Linens',        stock: 18,   reorder: 25,  status: 'low_stock',    image: '🛏️' },
  { id: 8, name: 'All-Purpose Disinfectant (1L)',    category: 'Housekeeping',  stock: 78,   reorder: 30,  status: 'in_stock',     image: '🧹' },
  { id: 9, name: 'Espresso Coffee Pods (Box/50)',    category: 'F&B',           stock: 0,    reorder: 20,  status: 'out_of_stock', image: '☕' },
  { id: 10, name: 'Pillow Protector (Standard)',     category: 'Linens',        stock: 200,  reorder: 50,  status: 'in_stock',     image: '🛏️' },
];

const STOCK_MOVEMENTS = [
  { id: 1, text: 'Order Placed: 200 units of Luxury Towels', by: 'Admin Alex', time: '2 hours ago', type: 'pending' },
  { id: 2, text: 'Restock Received: 500 units of Mini Shampoo', by: 'Inventory updated', time: '5 hours ago', type: 'completed' },
];

const STATUS_CONFIG = {
  in_stock:     { label: 'In Stock',     dot: 'bg-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  low_stock:    { label: 'Low Stock',    dot: 'bg-amber-500',   bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200' },
  out_of_stock: { label: 'Out of Stock', dot: 'bg-red-500',     bg: 'bg-red-50',     text: 'text-red-600',     border: 'border-red-200' },
};

const CATEGORIES = ['All Categories', 'Toiletries', 'Linens', 'Housekeeping', 'F&B'];

// ── Stat Card ────────────────────────────────────────────────────

const StatCard = ({ icon, iconBg, label, value, subtitle, subtitleColor }) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-3">
      <div className={`p-2.5 rounded-xl ${iconBg}`}>
        {icon ? React.createElement(icon, { size: 20 }) : null}
      </div>
      {subtitle && <span className={`text-xs font-bold ${subtitleColor || 'text-gray-400'}`}>{subtitle}</span>}
    </div>
    <p className="text-xs font-semibold text-gray-500 mb-1">{label}</p>
    <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">{value}</h3>
  </div>
);

// ── Main Page ────────────────────────────────────────────────────

const ROWS_PER_PAGE = 5;

const InventoryPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', category: 'Toiletries', stock: '', reorder: '' });
  const deferredSearchTerm = useDeferredValue(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => { setItems(MOCK_INVENTORY); setLoading(false); }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Stats
  const stats = useMemo(() => {
    const total = items.length;
    const lowStock = items.filter(i => i.status === 'low_stock').length;
    const outOfStock = items.filter(i => i.status === 'out_of_stock').length;
    return { total, lowStock, outOfStock, actionItems: lowStock + outOfStock };
  }, [items]);

  // Filter
  const filteredItems = useMemo(() => {
    let list = [...items];
    if (deferredSearchTerm) {
      const q = deferredSearchTerm.trim().toLowerCase();
      list = list.filter(i => i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q));
    }
    if (categoryFilter !== 'All Categories') list = list.filter(i => i.category === categoryFilter);
    if (statusFilter !== 'all') list = list.filter(i => i.status === statusFilter);
    return list;
  }, [items, deferredSearchTerm, categoryFilter, statusFilter]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ROWS_PER_PAGE));
  const activePage = Math.min(currentPage, totalPages);
  const pagedItems = filteredItems.slice((activePage - 1) * ROWS_PER_PAGE, activePage * ROWS_PER_PAGE);

  const handleAddItem = (e) => {
    e.preventDefault();
    const stock = parseInt(newItem.stock) || 0;
    const reorder = parseInt(newItem.reorder) || 0;
    setItems(prev => [...prev, {
      id: Date.now(),
      name: newItem.name,
      category: newItem.category,
      stock,
      reorder,
      status: stock === 0 ? 'out_of_stock' : stock <= reorder ? 'low_stock' : 'in_stock',
      image: '📦',
    }]);
    setNewItem({ name: '', category: 'Toiletries', stock: '', reorder: '' });
    setIsAddModalOpen(false);
  };

  const handleExport = () => {
    const header = 'Item Name,Category,Current Stock,Reorder Level,Status\n';
    const rows = filteredItems.map(i => `"${i.name}",${i.category},${i.stock},${i.reorder},${i.status}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'inventory_export.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
      <p className="text-gray-500 font-medium">Loading inventory…</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-zinc-100 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-sky-600">Inventory Controls</p>
            <h2 className="mt-2 text-xl font-black tracking-tight text-zinc-950">Keep stock organized and easy to act on</h2>
            <p className="mt-1 text-sm font-medium text-zinc-500">
              Search items, narrow the view, export reports, or add new stock from one place.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
              {stats.total.toLocaleString()} tracked
            </span>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
              {stats.lowStock} low stock
            </span>
            <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700">
              {stats.outOfStock} out of stock
            </span>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative w-full xl:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search inventory items..."
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end xl:w-auto">
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="all">Stock Status</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
            <Button variant="outline" className="flex items-center gap-2" onClick={handleExport}>
              <Download size={16} /> Export
            </Button>
            <Button className="flex items-center gap-2 shadow-lg shadow-blue-500/20" onClick={() => setIsAddModalOpen(true)}>
              <Plus size={18} /> Add New Item
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard icon={Package} iconBg="bg-blue-50 text-blue-600" label="Total Items" value={stats.total.toLocaleString()} subtitle="+4 this week" subtitleColor="text-emerald-600" />
        <StatCard icon={AlertTriangle} iconBg="bg-amber-50 text-amber-600" label="Low Stock Alerts" value={stats.actionItems} subtitle={stats.outOfStock ? `${stats.outOfStock} critical` : 'Inventory healthy'} subtitleColor={stats.outOfStock ? 'text-red-600' : 'text-emerald-600'} />
        <StatCard icon={Truck} iconBg="bg-indigo-50 text-indigo-600" label="Recent Orders" value="45" subtitle="8 Pending" subtitleColor="text-blue-600" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex flex-col gap-2 border-b border-gray-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Stock Directory</h2>
            <p className="text-sm text-gray-500">
              {filteredItems.length} item{filteredItems.length === 1 ? '' : 's'} match your current view.
            </p>
          </div>
          <span className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-600">
            Page {activePage} of {totalPages}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[760px] w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Item Name</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Current Stock</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Reorder Level</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pagedItems.length === 0 ? (
                <tr><td colSpan={6} className="py-20 text-center">
                  <Package size={48} className="mx-auto text-gray-200 mb-4" />
                  <h3 className="text-base font-bold text-gray-900">No items found</h3>
                  <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters.</p>
                </td></tr>
              ) : pagedItems.map(item => {
                const sc = STATUS_CONFIG[item.status] || STATUS_CONFIG.in_stock;
                const isUrgent = item.status === 'out_of_stock';
                const isLow = item.status === 'low_stock';
                return (
                  <tr key={item.id} className="group hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.image}</span>
                        <span className="font-bold text-gray-900">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 font-medium">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`font-bold ${isUrgent ? 'text-red-600' : isLow ? 'text-amber-600' : 'text-gray-900'}`}>
                        {item.stock.toLocaleString()} units
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.reorder} units</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${sc.bg} ${sc.text} ${sc.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                        {sc.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Edit">
                          <Edit size={16} />
                        </button>
                        {isUrgent ? (
                          <Button size="sm" variant="danger" className="flex items-center gap-1 text-[11px]">
                            Urgent Order
                          </Button>
                        ) : isLow ? (
                          <Button size="sm" className="flex items-center gap-1 text-[11px] bg-emerald-600 hover:bg-emerald-700">
                            Order Now
                          </Button>
                        ) : (
                          <button className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all" title="Quick order">
                            <ShoppingCart size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredItems.length > ROWS_PER_PAGE && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Showing <span className="font-bold text-gray-900">{(activePage - 1) * ROWS_PER_PAGE + 1}-{Math.min(activePage * ROWS_PER_PAGE, filteredItems.length)}</span> of <span className="font-bold text-gray-900">{filteredItems.length}</span> items
            </p>
            <div className="flex items-center gap-1">
              <button onClick={() => setCurrentPage((page) => Math.max(1, Math.min(page, totalPages) - 1))} disabled={activePage === 1} className="p-2 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"><ChevronLeft size={16} /></button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button key={page} onClick={() => setCurrentPage(page)} className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${page === activePage ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-gray-600 hover:bg-gray-100'}`}>{page}</button>
              ))}
              <button onClick={() => setCurrentPage((page) => Math.min(totalPages, Math.min(page, totalPages) + 1))} disabled={activePage === totalPages} className="p-2 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"><ChevronRight size={16} /></button>
            </div>
          </div>
        )}
      </div>

      {/* Recent Stock Movements */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Stock Movements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STOCK_MOVEMENTS.map(m => (
            <div key={m.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-start gap-4">
              <div className={`p-2.5 rounded-xl shrink-0 ${m.type === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                {m.type === 'pending' ? <ArrowUpFromLine size={20} /> : <ArrowDownToLine size={20} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 text-sm">{m.text}</p>
                <p className="text-xs text-gray-500 mt-0.5">{m.by} • {m.time}</p>
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg shrink-0 ${m.type === 'pending' ? 'text-amber-700 bg-amber-50' : 'text-emerald-700 bg-emerald-50'}`}>
                {m.type === 'pending' ? 'Pending' : 'Completed'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Add Item Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Item">
        <form onSubmit={handleAddItem} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Item Name</label>
            <input required value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="e.g. Organic Hand Soap" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Category</label>
            <select value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
              <option>Toiletries</option><option>Linens</option><option>Housekeeping</option><option>F&B</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Current Stock</label>
              <input required type="number" value={newItem.stock} onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="0" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Reorder Level</label>
              <input required type="number" value={newItem.reorder} onChange={(e) => setNewItem({ ...newItem, reorder: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="0" />
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="submit" className="flex-1 flex items-center justify-center gap-2"><Plus size={16} /> Add Item</Button>
            <Button type="button" variant="ghost" className="flex-1" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default InventoryPage;
