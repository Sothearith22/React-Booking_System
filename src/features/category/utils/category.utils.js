export const EMPTY_CATEGORY_FORM = {
  name: "",
  description: "",
  price: "",
  duration: "",
  status: "available",
};

export const mapCategoryToForm = (category = {}) => ({
  ...EMPTY_CATEGORY_FORM,
  name: category?.name || "",
  description: category?.description || category?.desc || "",
  price: String(category?.price ?? category?.price_per_night ?? ""),
  duration: String(category?.duration ?? ""),
  status: category?.status || (category?.is_active === false ? "unavailable" : "available"),
});

export const buildCategoryPayload = (form) => ({
  name: String(form?.name || "").trim(),
  description: String(form?.description || "").trim(),
  price: Number(form?.price || 0),
  duration: Number(form?.duration || 0),
  status: String(form?.status || "available"),
});
