import { Loader2 } from "lucide-react";
import CategoryRow from "./CategoryRow";

const CategoryTable = ({
  categories,
  loading,
  selected,
  onSelect,
  onSelectAll,
  allVisibleSelected,
  onEdit,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/50">
            <th className="px-6 py-5 text-left w-12">
              <input
                type="checkbox"
                className="rounded-sm accent-blue-600"
                checked={allVisibleSelected}
                disabled={categories.length === 0}
                onChange={onSelectAll}
              />
            </th>
            <th className="px-6 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Category Name
            </th>
            <th className="px-6 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Description
            </th>
            <th className="px-6 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">
              Rooms
            </th>
            <th className="px-6 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">
              Status
            </th>
            <th className="px-6 py-5 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {loading ? (
            <tr>
              <td colSpan={6} className="px-6 py-16 text-center">
                <Loader2 className="mx-auto mb-3 animate-spin text-blue-600" size={32} />
                <p className="text-sm font-semibold text-gray-500">Loading categories</p>
              </td>
            </tr>
          ) : categories.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-16 text-center">
                <p className="text-sm font-semibold text-gray-500">No categories found.</p>
              </td>
            </tr>
          ) : (
            categories.map((cat, index) => (
              <CategoryRow
                key={cat.id}
                category={cat}
                index={index}
                selected={selected.includes(cat.id)}
                onSelect={onSelect}
                onEdit={onEdit}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
