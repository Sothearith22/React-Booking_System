import React, { useState, useMemo } from 'react';
import Button from '../../components/ui/Button';
import DeleteConfirmationModal from '../../components/ui/DeleteConfirmationModal';
import {
  Search,
  Star,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  ChevronLeft,
  Reply,
  Trash2,
  Flag,
  SmilePlus,
  Calendar,
  Home,
  Download,
  Filter,
} from 'lucide-react';

// ── Mock Reviews ─────────────────────────────────────────────────

const MOCK_REVIEWS = [
  {
    id: 1,
    guest_name: 'Eleanor Pena',
    guest_initials: 'EP',
    avatar_color: 'bg-emerald-600',
    badge: 'Verified Stay',
    badge_color: 'text-emerald-700 bg-emerald-50',
    rating: 5,
    room: 'Deluxe Ocean Suite',
    check_in: 'Oct 12',
    check_out: 'Oct 15, 2023',
    comment:
      'Absolutely phenomenal experience! The staff went above and beyond to make our anniversary special. The view from the Deluxe Ocean Suite is breathtaking. We will definitely be coming back next year.',
    responded: false,
    featured: true,
    date: '2023-10-15',
  },
  {
    id: 2,
    guest_name: 'Guy Hawkins',
    guest_initials: 'GH',
    avatar_color: 'bg-teal-600',
    badge: 'Family Trip',
    badge_color: 'text-blue-700 bg-blue-50',
    rating: 5,
    room: 'Standard Twin Room',
    check_in: 'Oct 08',
    check_out: 'Oct 10, 2023',
    comment:
      'The breakfast buffet was amazing with lots of variety. Room was clean, although slightly smaller than expected from the photos. Service at the reception was very efficient.',
    responded: true,
    featured: false,
    date: '2023-10-10',
  },
  {
    id: 3,
    guest_name: 'Bessie Cooper',
    guest_initials: 'BC',
    avatar_color: 'bg-indigo-600',
    badge: 'Critical Review',
    badge_color: 'text-red-600 bg-red-50',
    rating: 3,
    room: 'Business King',
    check_in: 'Oct 05',
    check_out: 'Oct 06, 2023',
    comment:
      "WiFi connection in the 4th floor business wing was very spotty. Had trouble attending my Zoom calls. Staff tried to help but couldn't fix it during my stay. Needs improvement for business travelers.",
    responded: false,
    featured: false,
    date: '2023-10-06',
  },
  {
    id: 4,
    guest_name: 'James Wilson',
    guest_initials: 'JW',
    avatar_color: 'bg-violet-600',
    badge: 'Verified Stay',
    badge_color: 'text-emerald-700 bg-emerald-50',
    rating: 4,
    room: 'Garden View Double',
    check_in: 'Sep 28',
    check_out: 'Oct 02, 2023',
    comment:
      'Beautiful garden view and the room was spacious. The spa services were excellent. Only minor issue was the air conditioning being a bit noisy at night, but overall a wonderful stay.',
    responded: true,
    featured: true,
    date: '2023-10-02',
  },
  {
    id: 5,
    guest_name: 'Sarah Martinez',
    guest_initials: 'SM',
    avatar_color: 'bg-rose-600',
    badge: 'Solo Traveler',
    badge_color: 'text-purple-700 bg-purple-50',
    rating: 5,
    room: 'Presidential Suite',
    check_in: 'Sep 20',
    check_out: 'Sep 25, 2023',
    comment:
      'An absolutely luxurious experience from start to finish. The concierge arranged everything perfectly. Room service was impeccable and the rooftop pool is stunning. Worth every penny!',
    responded: false,
    featured: true,
    date: '2023-09-25',
  },
  {
    id: 6,
    guest_name: 'Robert Chen',
    guest_initials: 'RC',
    avatar_color: 'bg-amber-700',
    badge: 'Returning Guest',
    badge_color: 'text-amber-700 bg-amber-50',
    rating: 4,
    room: 'Executive Suite',
    check_in: 'Sep 15',
    check_out: 'Sep 18, 2023',
    comment:
      'Always a pleasure staying here. The recent renovation really improved the lobby area. Gym equipment has been upgraded too. Only suggestion: would love to see more vegan options at breakfast.',
    responded: true,
    featured: false,
    date: '2023-09-18',
  },
];

// ── Star Rating Component ────────────────────────────────────────

const StarRating = ({ rating, size = 14 }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={size}
        className={star <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}
      />
    ))}
  </div>
);

// ── Stat Card ────────────────────────────────────────────────────

const StatCard = ({ icon, iconBg, label, value, subtitle, subtitleColor, subtitleIcon: SubIcon }) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-3">
      <p className="text-xs font-semibold text-gray-500">{label}</p>
      <div className={`p-2 rounded-xl ${iconBg}`}>
        {icon ? React.createElement(icon, { size: 18 }) : null}
      </div>
    </div>
    <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">{value}</h3>
    {subtitle && (
      <p className={`text-xs font-semibold mt-1 flex items-center gap-1 ${subtitleColor || 'text-gray-400'}`}>
        {SubIcon && <SubIcon size={12} />}
        {subtitle}
      </p>
    )}
  </div>
);

// ── Main Page ────────────────────────────────────────────────────

const ITEMS_PER_PAGE = 3;

const ReviewsPage = () => {
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  // Stats
  const stats = useMemo(() => {
    const total = reviews.length;
    const avgRating = total > 0 ? (reviews.reduce((s, r) => s + r.rating, 0) / total).toFixed(1) : '0.0';
    const unanswered = reviews.filter((r) => !r.responded).length;
    const positive = reviews.filter((r) => r.rating >= 4).length;
    const sentiment = total > 0 ? Math.round((positive / total) * 100) : 0;
    return { total, avgRating, unanswered, sentiment };
  }, [reviews]);

  // Tab filtering
  const filteredReviews = useMemo(() => {
    let list = [...reviews];

    if (activeTab === 'unanswered') {
      list = list.filter((r) => !r.responded);
    } else if (activeTab === 'featured') {
      list = list.filter((r) => r.featured);
    }

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (r) =>
          r.guest_name.toLowerCase().includes(q) ||
          r.room.toLowerCase().includes(q) ||
          r.comment.toLowerCase().includes(q)
      );
    }

    return list;
  }, [reviews, activeTab, searchTerm]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredReviews.length / ITEMS_PER_PAGE));
  const pagedReviews = filteredReviews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleRespond = (id) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, responded: true } : r))
    );
  };

  const handleDelete = (id) => {
    const review = reviews.find(r => r.id === id);
    setReviewToDelete(review);
  };

  const handleDeleteConfirm = () => {
    if (reviewToDelete) {
      setReviews((prev) => prev.filter((r) => r.id !== reviewToDelete.id));
      setReviewToDelete(null);
    }
  };

  const handleToggleFeatured = (id) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, featured: !r.featured } : r))
    );
  };

  // Export
  const handleExport = () => {
    const header = 'Guest,Rating,Room,Date,Comment,Responded,Featured\n';
    const rows = filteredReviews
      .map((r) => `"${r.guest_name}",${r.rating},"${r.room}",${r.date},"${r.comment.replace(/"/g, '""')}",${r.responded},${r.featured}`)
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reviews_export.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const TABS = [
    { key: 'all', label: 'All Reviews' },
    { key: 'unanswered', label: 'Unanswered' },
    { key: 'featured', label: 'Featured' },
  ];

  return (
    <div className="space-y-6">
      {/* ── Header ──────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
            <span>Admin</span>
            <ChevronRight size={12} />
            <span className="text-gray-900">Reviews</span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Review Management</h1>
        </div>
        <Button className="flex items-center gap-2 shadow-lg shadow-blue-500/20" onClick={handleExport}>
          <Download size={18} /> Export Report
        </Button>
      </div>

      {/* ── Stats ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={Star}
          iconBg="bg-amber-50 text-amber-500"
          label="Average Rating"
          value={stats.avgRating}
          subtitle="+0.2%"
          subtitleColor="text-emerald-600"
          subtitleIcon={TrendingUp}
        />
        <StatCard
          icon={MessageSquare}
          iconBg="bg-blue-50 text-blue-600"
          label="Total Reviews"
          value={stats.total.toLocaleString()}
          subtitle="+12%"
          subtitleColor="text-emerald-600"
          subtitleIcon={TrendingUp}
        />
        <StatCard
          icon={SmilePlus}
          iconBg="bg-emerald-50 text-emerald-600"
          label="Recent Sentiment"
          value={stats.sentiment >= 70 ? 'Positive' : stats.sentiment >= 40 ? 'Neutral' : 'Negative'}
          subtitle={stats.sentiment >= 70 ? '-1%' : '+3%'}
          subtitleColor={stats.sentiment >= 70 ? 'text-red-500' : 'text-emerald-600'}
          subtitleIcon={stats.sentiment >= 70 ? TrendingDown : TrendingUp}
        />
      </div>

      {/* ── Tabs + Search ───────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-gray-600 hover:bg-white hover:shadow-sm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search reviews…"
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Review Cards ────────────────────────────────────── */}
      <div className="space-y-4">
        {pagedReviews.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-300 py-20 text-center">
            <MessageSquare size={48} className="mx-auto text-gray-200 mb-4" />
            <h3 className="text-base font-bold text-gray-900">No reviews found</h3>
            <p className="text-sm text-gray-500 mt-1">Try adjusting your filter or search.</p>
          </div>
        ) : (
          pagedReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              {/* Top row: avatar, name, badge, actions */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div
                    className={`w-12 h-12 rounded-full ${review.avatar_color} text-white flex items-center justify-center text-sm font-bold shrink-0`}
                  >
                    {review.guest_initials}
                  </div>

                  <div>
                    {/* Name + Badge */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-gray-900">{review.guest_name}</h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${review.badge_color}`}
                      >
                        {review.badge}
                      </span>
                    </div>

                    {/* Stars */}
                    <div className="mt-1">
                      <StarRating rating={review.rating} />
                    </div>

                    {/* Room & Dates */}
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Home size={12} /> {review.room}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {review.check_in} - {review.check_out}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  {!review.responded ? (
                    review.badge === 'Critical Review' ? (
                      <Button
                        size="sm"
                        className="flex items-center gap-1.5"
                        onClick={() => handleRespond(review.id)}
                      >
                        <Reply size={14} /> Respond Now
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1.5"
                        onClick={() => handleRespond(review.id)}
                      >
                        <Reply size={14} /> Respond
                      </Button>
                    )
                  ) : (
                    <span className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
                      ✓ Responded
                    </span>
                  )}

                  <button
                    onClick={() => handleToggleFeatured(review.id)}
                    className={`p-2 rounded-lg transition-all ${
                      review.featured
                        ? 'text-amber-500 bg-amber-50 hover:bg-amber-100'
                        : 'text-gray-400 hover:text-amber-500 hover:bg-amber-50'
                    }`}
                    title={review.featured ? 'Remove from featured' : 'Add to featured'}
                  >
                    <Flag size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(review.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    title="Delete review"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Review text */}
              <p className="text-sm text-gray-600 leading-relaxed mt-4 pl-16">
                {review.comment}
              </p>
            </div>
          ))
        )}
      </div>

      {/* ── Pagination ──────────────────────────────────────── */}
      {filteredReviews.length > ITEMS_PER_PAGE && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Showing{' '}
            <span className="font-bold text-gray-900">
              {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredReviews.length)}
            </span>{' '}
            of <span className="font-bold text-gray-900">{filteredReviews.length}</span> reviews
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                  page === currentPage
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      <DeleteConfirmationModal
        isOpen={!!reviewToDelete}
        onClose={() => setReviewToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Review?"
        message="Are you sure you want to permanently delete this guest review?"
        itemName={reviewToDelete?.guest_name}
      />
    </div>
  );
};

export default ReviewsPage;
