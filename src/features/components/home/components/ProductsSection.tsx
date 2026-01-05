"use client";

import { useEffect, useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeftIcon } from "@/components/Icons/ChevronLeftIcon";
import { ChevronRightIcon } from "@/components/Icons/ChevronRightIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAllProducts } from "@/features/components/home/api";

export const ProductsSection = () => {
  const [visibleCount, setVisibleCount] = useState<number>(8);
  const [startIndex, setStartIndex] = useState<number>(0);

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      const numberOfCatchvisiblesCounts =
        width >= 1280 ? 8 : width >= 768 ? 6 : 4;

      setVisibleCount(numberOfCatchvisiblesCounts);
    };

    updateVisibleCount();

    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const visibleProductCards = useMemo(() => {
    if (!products || products.length === 0) return [];

    const items = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (startIndex + i) % products.length;
      items.push(products[index]);
    }

    return items;
  }, [startIndex, visibleCount, products]);

  const handleClickNext = () => {
    if (!products) return;
    setStartIndex((prev) => (prev + visibleCount) % products.length);
  };

  const handleClickPrev = () => {
    if (!products) return;
    setStartIndex(
      (prev) => (prev - visibleCount + products.length) % products.length
    );
  };

  const currentPage = Math.floor(startIndex / visibleCount) + 1;
  const totalPages = products ? Math.ceil(products.length / visibleCount) : 1;

  return (
    <>
      <div className="flex justify-between">
        <h3 className="text-2xl uppercase">Sale Products</h3>
        <div className="flex gap-2.5 text-black items-center">
          <ChevronLeftIcon
            className="md:w-7 md:h-7 w-5.5 h-5.5 cursor-pointer"
            onClick={handleClickPrev}
          />
          <span className="xl:text-[1.375rem] text-[1.188rem]">
            {currentPage}/{totalPages}
          </span>
          <ChevronRightIcon
            className="md:w-7 md:h-7 w-5.5 h-5.5 cursor-pointer"
            onClick={handleClickNext}
          />
        </div>
      </div>
      <div className="h-px self-stretch bg-[#EBEAEB]" />

      <div className="gap-5 flex-1 grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 items-stretch">
        {visibleProductCards.map(
          ({ id, name, price, image, description, category }) => (
            <Card
              key={id}
              className="py-2.5 h-full p-2.5 cursor-pointer flex flex-col"
            >
              <CardHeader className="flex justify-center">
                <img
                  src={image}
                  alt={name}
                  className="block mt-2 object-contain 2xl:w-34 xl:w-30 md:w-37 sm:w-32 w-24 sm:h-38.5 h-28"
                />
              </CardHeader>

              <CardContent className="flex flex-col items-center flex-1 justify-end gap-1.5">
                <h4 className="self-start text-[1.188rem] line-clamp-1">
                  {name}
                </h4>
                <p className="self-start text-[1rem] text-gray-600 line-clamp-2">
                  {description}
                </p>
                <span className="self-start text-sm text-gray-500 capitalize">
                  {category}
                </span>
                <span className="self-start text-black text-2xl font-bold">
                  ${price}
                </span>

                <Button className="bg-[#FDD327] font-bold h-8 mt-2 w-full text-black hover:bg-yellow-400">
                  ADD TO CART
                </Button>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </>
  );
};
