import { useState, useMemo } from "react";

interface UsePaginationProps<T> {
  items: T[];
  itemsPerPage: number;
}

interface UsePaginationReturn<T> {
  currentPage: number;
  totalPages: number;
  paginatedItems: T[];
  canGoNext: boolean;
  canGoPrevious: boolean;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
}

export const usePagination = <T>({
  items,
  itemsPerPage,
}: UsePaginationProps<T>): UsePaginationReturn<T> => {
  const [page, setPage] = useState<number>(1);

  const totalPages = useMemo(
    () => Math.ceil(items.length / itemsPerPage),
    [items.length, itemsPerPage]
  );

  const startIndex = useMemo(
    () => (page - 1) * itemsPerPage,
    [page, itemsPerPage]
  );

  const paginatedItems = useMemo(
    () => items.slice(startIndex, startIndex + itemsPerPage),
    [items, startIndex, itemsPerPage]
  );

  const canGoNext = page !== totalPages;
  const canGoPrevious = page > 1;

  const handleNextPage = () => {
    if (!canGoNext) return;
    setPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (!canGoPrevious) return;
    setPage((prev) => prev - 1);
  };

  return {
    currentPage: page,
    totalPages,
    paginatedItems,
    canGoNext,
    canGoPrevious,
    handleNextPage,
    handlePreviousPage,
  };
};
