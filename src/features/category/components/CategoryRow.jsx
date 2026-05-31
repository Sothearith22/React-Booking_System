import React from "react";
import { Edit, Hotel, Layers, LayoutGrid, Plus, Trash2 } from "lucide-react";
import CategoryStatus from "./CategoryStatus";

const CATEGORY_ICONS = [
  <Hotel size={18} className="text-blue-500" />,
  <LayoutGrid size={18} className="text-indigo-500" />,
  <Layers size={18} className="text-gray-500" />,
  <Plus size={18} className="text-amber-500" />,
  <Hotel size={18} className="text-emerald-500" />,
];

const getCategoryIcon = (category, index) =>
  React.isValidElement(category.icon)
    ? category.icon
    : CATEGORY_ICONS[index % CATEGORY_ICONS.length];

const CategoryRow = ({
  category,
  index,
  selected,
  onSelect,
  onEdit,
}) => {
  return (
    <tr className={`group transition-colors ${selected ? "bg-blue-50/30" : "hover:bg-gray-50/50"}`}>
      <td className="px-6 py-4 text-left">
        <input
          type="checkbox"
          className="rounded-sm accent-blue-600 cursor-pointer"
          checked={selected}
          onChange={() => onSelect(category.id)}
        />
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50/50 flex items-center justify-center border border-blue-100 shadow-sm">
            {getCategoryIcon(category, index)}
          </div>
          <div>
            <span className="font-bold text-gray-900 block">{category.name}</span>
            <span className="text-[10px] text-gray-400 font-medium">
              {category.slug || category.code || "Category"}
            </span>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <p className="text-xs text-gray-500 font-medium line-clamp-2 leading-relaxed max-w-sm">
          {category.description || category.desc || "-"}
        </p>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-center">
        <span className="font-bold text-gray-900">{category.rooms ?? 0}</span>
        <span className="text-[10px] text-gray-400 block font-bold uppercase">Rooms</span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-center">
        <CategoryStatus status={category.status} />
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
            onClick={() => onEdit(category)}
            type="button"
          >
            <Edit size={16} />
          </button>
          <button className="p-2 text-gray-400 hover:text-red-500 transition-colors" type="button">
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CategoryRow;
