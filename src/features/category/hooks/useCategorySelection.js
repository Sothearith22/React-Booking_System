
import { useMemo, useState } from "react";

export const useCategorySelection = (visibleIds = []) => {
  const [selected, setSelected] = useState([]);

  const allVisibleSelected = useMemo(
    () => visibleIds.length > 0 && visibleIds.every((id) => selected.includes(id)),
    [selected, visibleIds]
  );

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelected((prev) => {
      if (allVisibleSelected) {
        return prev.filter((id) => !visibleIds.includes(id));
      }

      return Array.from(new Set([...prev, ...visibleIds]));
    });
  };

  const clearSelection = () => {
    setSelected([]);
  };

  return {
    selected,
    setSelected,
    toggleSelect,
    toggleSelectAll,
    clearSelection,
    allVisibleSelected,
  };
};
