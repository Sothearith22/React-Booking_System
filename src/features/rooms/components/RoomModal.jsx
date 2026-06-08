import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import Select from "../../../components/ui/Select";
import {
  ROOM_INPUT_CLASS,
  ROOM_STATUS_OPTIONS,
  ROOM_TEXTAREA_CLASS,
} from "../constants/room.constants";

export default function RoomModal({
  isOpen,
  onClose,
  onSubmit,
  editRoom,
  roomForm = {},
  formError,
  isSaving = false,
  serviceOptions = [],
  servicesLoading = false,
  servicesError = "",
  onFieldChange = () => {},
  onImagesChange = () => {},
}) {
  const labelClassName =
    "mb-2 block text-[11px] font-black uppercase tracking-[0.18em] text-slate-800";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editRoom ? "Edit Room" : "Add New Room"}
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
              <label className={labelClassName}>Category / Service</label>
              <Select
                className="min-h-14 rounded-2xl text-base"
                value={roomForm.service_id || ""}
                onChange={(event) => onFieldChange("service_id", event.target.value)}
                disabled={servicesLoading}
                required
              >
                <option value="">
                  {servicesLoading ? "Loading services..." : "Select category"}
                </option>
                {serviceOptions.map((service) => (
                  <option key={service.value} value={service.value}>
                    {service.label}
                  </option>
                ))}
              </Select>
              {servicesError ? (
                <p className="mt-2 text-xs font-semibold text-red-600">{servicesError}</p>
              ) : null}
            </div>

            <div className="sm:col-span-2">
              <label className={labelClassName}>Room Name</label>
              <input
                className={`${ROOM_INPUT_CLASS} min-h-14 rounded-2xl text-base`}
                placeholder="e.g. Standard Single Room"
                value={roomForm.name || ""}
                onChange={(event) => onFieldChange("name", event.target.value)}
                required
              />
            </div>

            <div>
              <label className={labelClassName}>Price Per Night</label>
              <input
                className={`${ROOM_INPUT_CLASS} min-h-14 rounded-2xl text-base`}
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g. 45.00"
                value={roomForm.price_per_night || ""}
                onChange={(event) => onFieldChange("price_per_night", event.target.value)}
                required
              />
            </div>

            <div>
              <label className={labelClassName}>Capacity</label>
              <input
                className={`${ROOM_INPUT_CLASS} min-h-14 rounded-2xl text-base`}
                type="number"
                min="1"
                step="1"
                placeholder="e.g. 1"
                value={roomForm.capacity || ""}
                onChange={(event) => onFieldChange("capacity", event.target.value)}
                required
              />
            </div>

            <div>
              <label className={labelClassName}>Status</label>
              <Select
                className="min-h-14 rounded-2xl text-base"
                value={roomForm.status || "available"}
                onChange={(event) => {
                  onFieldChange("status", event.target.value);
                  onFieldChange("is_active", event.target.value === "available");
                }}
              >
                {ROOM_STATUS_OPTIONS.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className={labelClassName}>Sort Order</label>
              <input
                className={`${ROOM_INPUT_CLASS} min-h-14 rounded-2xl text-base`}
                type="number"
                min="0"
                step="1"
                placeholder="e.g. 1"
                value={roomForm.sort_order || ""}
                onChange={(event) => onFieldChange("sort_order", event.target.value)}
              />
            </div>

            <div className="sm:col-span-2">
              <label className={labelClassName}>Description</label>
              <textarea
                className={`${ROOM_TEXTAREA_CLASS} rounded-2xl text-base`}
                rows={4}
                placeholder="A cozy room for solo travelers featuring a twin bed and a workspace."
                value={roomForm.description || ""}
                onChange={(event) =>
                  onFieldChange("description", event.target.value)
                }
              />
            </div>

            <div className="sm:col-span-2">
              <label className={labelClassName}>Amenities</label>
              <input
                className={`${ROOM_INPUT_CLASS} min-h-14 rounded-2xl text-base`}
                placeholder="Wi-Fi, Coffee Maker, Desk"
                value={roomForm.amenities || ""}
                onChange={(event) => onFieldChange("amenities", event.target.value)}
              />
              <p className="mt-2 text-xs font-semibold text-slate-500">
                Separate amenities with commas.
              </p>
            </div>

            <div className="sm:col-span-2">
              <label className={labelClassName}>Room Images</label>
              <input
                className={`${ROOM_INPUT_CLASS} min-h-14 rounded-2xl text-base`}
                type="file"
                accept="image/*"
                multiple
                onChange={(event) => onImagesChange(event.target.files)}
              />
              {roomForm.images?.length ? (
                <p className="mt-2 text-xs font-semibold text-slate-500">
                  {roomForm.images.length} image{roomForm.images.length === 1 ? "" : "s"} selected.
                </p>
              ) : null}
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
            {isSaving ? "Saving..." : editRoom ? "Update Room" : "Save Room"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
