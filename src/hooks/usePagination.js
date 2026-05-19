import { useMemo, useState } from 'react';

export function usePagination(items = [], pageSize = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedItems = useMemo(
    () => items.slice((safePage - 1) * pageSize, safePage * pageSize),
    [items, pageSize, safePage]
  );

  const meta = useMemo(() => {
    const start = items.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
    const end = Math.min(safePage * pageSize, items.length);

    return {
      currentPage: safePage,
      totalPages,
      start,
      end,
      totalItems: items.length,
    };
  }, [items.length, pageSize, safePage, totalPages]);

  return {
    ...meta,
    currentPage,
    setCurrentPage,
    onPageChange: setCurrentPage,
    paginatedItems,
  };
}
