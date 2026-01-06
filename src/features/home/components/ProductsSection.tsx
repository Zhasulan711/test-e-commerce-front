"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../api";
import { usePagination } from "../../../hooks/usePagination";
import { EmptyProductsState } from "./EmptyProductsState";
import { LoadingProductsState } from "./LoadingProductsState";
import { ErrorProductsState } from "./ErrorProductsState";
import { ProductCard } from "./ProductCard";
import { Pagination } from "../../../components/Pagination";
import { PRODUCTS_PER_PAGE } from "../constants";

export const ProductsSection = () => {
  const {
    data: products,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const {
    currentPage,
    totalPages,
    paginatedItems: productsToShow,
    canGoNext,
    canGoPrevious,
    handleNextPage,
    handlePreviousPage,
  } = usePagination({
    items: products || [],
    itemsPerPage: PRODUCTS_PER_PAGE,
  });

  if (isLoading) {
    return <LoadingProductsState />;
  }

  if (isError) {
    return <ErrorProductsState onRetry={() => refetch()} />;
  }

  if (!products || products?.length === 0) {
    return <EmptyProductsState />;
  }

  return (
    <section className="flex flex-col gap-5">
      <div className="flex justify-between">
        <h3 className="text-2xl uppercase">Sale Products</h3>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          canGoNext={canGoNext}
          canGoPrevious={canGoPrevious}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        />
      </div>
      <div className="h-px self-stretch bg-[#EBEAEB]" />

      <div className="gap-5 flex-1 grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 items-stretch">
        {productsToShow.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
