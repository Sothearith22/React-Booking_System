import { useState } from "react";
import { categoryService } from "../service/category.service";
import { buildCategoryPayload } from "../utils/category.utils";

export const useCategoryForm = ({ refetch, setError, onSaved }) => {
  const [isSaving, setIsSaving] =
    useState(false);

  const saveCategory = async (
    form,
    editCategory
  ) => {
    if (!String(form.name || "").trim()) {
      setError("Category name is required.");
      return;
    }

    const priceValue = Number(form.price);
    if (String(form.price || "").trim() === "" || Number.isNaN(priceValue)) {
      setError("Price is required.");
      return;
    }

    if (priceValue < 0) {
      setError("Price must be zero or greater.");
      return;
    }

    try {
      setIsSaving(true);
      setError("");

      const payload =
        buildCategoryPayload(form);

      if (editCategory) {
        await categoryService.updateCategory(
          editCategory.id,
          payload
        );
      } else {
        await categoryService.addCategory(
          payload
        );
      }

      await refetch();
      onSaved?.();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Save category failed."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return {
    saveCategory,
    isSaving,
  };
};
