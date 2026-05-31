import { Filter } from "lucide-react";

const CategoryFilterBar = ({
  statusFilter,
  onStatusFilterChange,
  selectedCount,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="flex items-center gap-3">
        <button className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs font-bold text-gray-700 flex items-center gap-2">
          <Filter size={14} /> Filter
        </button>
        <div className="flex items-center gap-2 text-xs text-gray-500 border-l border-gray-200 pl-4 h-6">
          <span>Status:</span>
          <select
            className="bg-transparent font-bold text-gray-800 focus:outline-none"
            value={statusFilter}
            onChange={(event) => onStatusFilterChange(event.target.value)}
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
      </div>
      <div className="flex items-center gap-4 text-xs font-bold">
        <span className="text-gray-400 italic font-medium">{selectedCount} selected</span>
        <button className="text-red-500 hover:underline">Delete Selected</button>
        <button className="text-blue-600 hover:underline">Mark as Inactive</button>
      </div>
    </div>
  );
};

export default CategoryFilterBar;
