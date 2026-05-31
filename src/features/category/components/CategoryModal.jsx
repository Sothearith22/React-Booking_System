import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import Select from "../../../components/ui/Select";
import {
  ROOM_INPUT_CLASS,
  ROOM_TEXTAREA_CLASS,
} from "../../rooms/constants/room.constants";

const CATEGORY_STATUS_OPTIONS = [
  { value: "available", label: "Available" },
  { value: "unavailable", label: "Unavailable" },
];

export default function CategoryModal({
  isOpen,
  onClose,
  onSubmit,
  editCategory,
  categoryForm = {},
  formError,
  isSaving = false,
  onFieldChange = () => {},
}) {
  const labelClassName =
    "mb-2 block text-[11px] font-black uppercase tracking-[0.18em] text-slate-800";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editCategory ? "Edit Service" : "Add New Service"}
      className="max-w-[42rem]"
      contentClassName="p-0"
    >
      <form onSubmit={onSubmit} className="flex max-h-[100vh] flex-col">
        <div className="overflow-y-auto px-2 py-2">
          {formError ? (
            <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
              {formError}
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClassName}>Name</label>
              <input
                className={`${ROOM_INPUT_CLASS} min-h-14 rounded-2xl text-base`}
                placeholder="e.g. Premium Consultation"
                value={categoryForm.name || ""}
                onChange={(event) => onFieldChange("name", event.target.value)}
              />
            </div>

            <div>
              <label className={labelClassName}>Price</label>
              <input
                className={`${ROOM_INPUT_CLASS} min-h-14 rounded-2xl text-base`}
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g. 150.00"
                value={categoryForm.price || ""}
                onChange={(event) => onFieldChange("price", event.target.value)}
              />
            </div>

            <div>
              <label className={labelClassName}>Duration</label>
              <input
                className={`${ROOM_INPUT_CLASS} min-h-14 rounded-2xl text-base`}
                type="number"
                min="1"
                step="1"
                placeholder="e.g. 60"
                value={categoryForm.duration || ""}
                onChange={(event) => onFieldChange("duration", event.target.value)}
              />
            </div>

            <div className="sm:col-span-2">
              <label className={labelClassName}>Status</label>
              <Select
                className="min-h-14 rounded-2xl text-base"
                value={categoryForm.status || "available"}
                onChange={(event) => onFieldChange("status", event.target.value)}
              >
                {CATEGORY_STATUS_OPTIONS.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </Select>
            </div>

            <div className="sm:col-span-2">
              <label className={labelClassName}>Description</label>
              <textarea
                className={`${ROOM_TEXTAREA_CLASS} rounded-2xl text-base`}
                rows={4}
                placeholder="A one-hour deep dive into project strategy."
                value={categoryForm.description || ""}
                onChange={(event) =>
                  onFieldChange("description", event.target.value)
                }
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-b-slate-700 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="min-h-12 text-base sm:min-w-[8rem]"
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="min-h-14 rounded-2xl text-base shadow-lg shadow-blue-500/20 sm:min-w-[12rem]"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : editCategory ? "Update Service" : "Save Service"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
