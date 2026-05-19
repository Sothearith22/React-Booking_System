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
  const helperClassName = "text-sm text-slate-500";
  const selectedImages = (roomForm.images || []).filter((file) => file?.name);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editRoom ? "Edit Room" : "Add New Room"}
      className="max-w-[60rem]"
      contentClassName="p-0"
    >
      <form onSubmit={onSubmit} className="flex max-h-[88vh] flex-col">
        <div className="overflow-y-auto px-2 py-2">
          {formError ? (
            <div className="mb-2 rounded-2xl border border-red-200 bg-red-50  text-sm font-medium text-red-700">
              {formError}
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
            <div>
              <label className={labelClassName}>Service</label>
              {serviceOptions.length > 0 ? (
                <Select
                  className="min-h-14 rounded-2xl  text-base"
                  value={roomForm.service_id}
                  onChange={(event) =>
                    onFieldChange("service_id", event.target.value)
                  }
                >
                  <option value="">
                    {servicesLoading
                      ? "Loading services..."
                      : "Select a service"}
                  </option>
                  {serviceOptions.map((service) => (
                    <option key={service.value} value={service.value}>
                      {service.label}
                    </option>
                  ))}
                </Select>
              ) : (
                <input
                  className={`${ROOM_INPUT_CLASS} min-h-14 rounded-2xl px-5 text-base`}
                  type="number"
                  min="1"
                  placeholder="e.g. 4"
                  value={roomForm.service_id}
                  onChange={(event) =>
                    onFieldChange("service_id", event.target.value)
                  }
                />
              )}
              <p className={helperClassName}>
                {servicesLoading ? "Loading services..." : servicesError}
              </p>
            </div>

            <div>
              <label className={labelClassName}>Status</label>
              <Select
                className="min-h-14 rounded-2xl  text-base"
                value={roomForm.status}
                onChange={(event) =>
                  onFieldChange("status", event.target.value)
                }
              >
                {ROOM_STATUS_OPTIONS.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </Select>
            </div>

            <div className="sm:col-span-2">
              <label className={labelClassName}>Room Name</label>
              <input
                className={`${ROOM_INPUT_CLASS} min-h-14 rounded-2xl  text-base`}
                placeholder="e.g. Standard Single Room"
                value={roomForm.name}
                onChange={(event) => onFieldChange("name", event.target.value)}
              />
            </div>

            <div>
              <label className={labelClassName}>Price / Night ($)</label>
              <input
                className={`${ROOM_INPUT_CLASS} min-h-14 rounded-2xl  text-base`}
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g. 45.00"
                value={roomForm.price_per_night}
                onChange={(event) =>
                  onFieldChange("price_per_night", event.target.value)
                }
              />
            </div>

            <div>
              <label className={labelClassName}>Capacity</label>
              <input
                className={`${ROOM_INPUT_CLASS} min-h-14 rounded-2xl text-base`}
                type="number"
                min="1"
                placeholder="e.g. 1"
                value={roomForm.capacity}
                onChange={(event) =>
                  onFieldChange("capacity", event.target.value)
                }
              />
            </div>

            <div>
              <label className={labelClassName}>Sort Order</label>
              <input
                className={`${ROOM_INPUT_CLASS} min-h-5 rounded-2xl  text-base`}
                type="number"
                min="1"
                placeholder="e.g. 1"
                value={roomForm.sort_order}
                onChange={(event) =>
                  onFieldChange("sort_order", event.target.value)
                }
              />
            </div>

            <div>
              <label className={labelClassName}>Amenities</label>
              <textarea
                className={`${ROOM_TEXTAREA_CLASS} min-h-14 rounded-2xl px-5 py-4 text-base`}
                rows={1}
                placeholder="Wi-Fi, Air Conditioning, Mini Bar..."
                value={roomForm.amenities}
                onChange={(event) =>
                  onFieldChange("amenities", event.target.value)
                }
              />
              <p className={helperClassName}>Separate amenities with commas.</p>
            </div>

            <div className="sm:col-span-2">
              <label className={labelClassName}>Room Images</label>

              {editRoom?.image && selectedImages.length === 0 ? (
                <div className="mb-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 ">
                  <img
                    src={editRoom.image}
                    alt={editRoom.name}
                    className="h-14 w-14 rounded-xl object-cover"
                  />
                  <p className="text-sm text-slate-500">
                    Current image will stay unchanged unless you upload a new
                    one.
                  </p>
                </div>
              ) : null}

              <label
                htmlFor="room-images"
                className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50  text-center transition hover:border-blue-400 hover:bg-blue-50/60"
              >
                <input
                  id="room-images"
                  className="sr-only"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(event) => onImagesChange(event.target.files)}
                />

                <span className="inline-flex min-w-[10.5rem] items-center justify-center rounded-xl bg-blue-600 px-2 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700">
                  Choose Files
                </span>
                <span className="mt-2 text-base text-slate-500">
                  {selectedImages.length > 0
                    ? `${selectedImages.length} file${selectedImages.length > 1 ? "s" : ""} selected`
                    : "No file chosen"}
                </span>
                <span className="mt-4 text-sm text-slate-400">
                  Images are uploaded after the room details are saved. Max 5MB
                  per file.
                </span>
              </label>

              {selectedImages.length > 0 ? (
                <div className="mt-3 rounded-2xl border border-blue-100 bg-blue-50  text-sm text-blue-700">
                  {selectedImages.map((file) => file.name).join(", ")}
                </div>
              ) : null}
            </div>

            <div className="sm:col-span-2">
              <label className={labelClassName}>Description</label>
              <textarea
                className={`${ROOM_TEXTAREA_CLASS} rounded-2xl  text-base`}
                rows={3}
                placeholder="Add a short room description"
                value={roomForm.description}
                onChange={(event) =>
                  onFieldChange("description", event.target.value)
                }
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-b-slate-700  sm:flex-row sm:items-center sm:justify-between sm:px-8">
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
