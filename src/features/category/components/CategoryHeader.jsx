import Button from "../../../components/ui/Button";
import { ChevronRight, Download, Plus } from "lucide-react";

const CategoryHeader = ({ onAdd }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
          <span>Admin</span>
          <ChevronRight size={12} />
          <span className="text-gray-900">Service Categories</span>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Service Categories</h1>
        <p className="text-sm text-gray-500 mt-1">
          Create and manage your hotel's room types and pricing tiers.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="bg-white hover:bg-gray-50 h-10 px-4">
          <Download size={16} className="mr-2" /> Export
        </Button>
        <Button className="h-10 px-4 shadow-lg shadow-blue-500/10" onClick={onAdd}>
          <Plus size={16} className="mr-2" /> Add New Category
        </Button>
      </div>
    </div>
  );
};

export default CategoryHeader;
