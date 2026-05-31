import { ChevronLeft, ChevronRight } from "lucide-react";

const CategoryPagination = ({ visibleCount, totalCount }) => {
  return (
    <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
      <p className="text-[11px] text-gray-500 font-medium">
        Showing{" "}
        <span className="font-bold text-gray-900">
          {visibleCount ? 1 : 0} to {visibleCount}
        </span>{" "}
        of {totalCount} categories
      </p>
      <div className="flex items-center gap-1">
        <button className="p-1.5 text-gray-400 hover:text-gray-900" type="button">
          <ChevronLeft size={16} />
        </button>
        <button className="w-7 h-7 bg-blue-600 text-white rounded-md text-xs font-bold shadow-sm" type="button">
          1
        </button>
        <button className="w-7 h-7 hover:bg-white text-gray-600 rounded-md text-xs font-bold" type="button">
          2
        </button>
        <button className="w-7 h-7 hover:bg-white text-gray-600 rounded-md text-xs font-bold" type="button">
          3
        </button>
        <button className="p-1.5 text-gray-400 hover:text-gray-900" type="button">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default CategoryPagination;
