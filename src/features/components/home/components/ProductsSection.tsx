"use client";

import { ChevronLeftIcon } from "@/components/Icons/ChevronLeftIcon";
import { ChevronRightIcon } from "@/components/Icons/ChevronRightIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import iphone from "@/assets/images/iphone.png";
import { PRODUCTS } from "@/features/components/home/constants";
import { useEffect, useState, useMemo } from "react";
import { ProductCard } from "@/features/components/home/types";

export const ProductsSection = () => {
  const [visibleCount, setVisibleCount] = useState<number>(8);
  const [startIndex, setStartIndex] = useState<number>(0);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (typeof window === "undefined") return;

      const width = window.innerWidth;
      const numberOfCatchvisiblesCounts =
        width >= 1280 ? 8 : width >= 768 ? 6 : 4;

      updateVisibleCount();

      setVisibleCount(numberOfCatchvisiblesCounts);
    };

    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const visibleProductCards = useMemo(() => {
    const items: ProductCard[] = [];

    for (let i = 0; i < visibleCount; i++) {
      const Index = (startIndex + i) % PRODUCTS.length;
      items.push({ ...PRODUCTS[Index] });
    }

    return items;
  }, [startIndex, visibleCount, PRODUCTS]);

  const handleClickNext = () => {
    setStartIndex((prev) => (prev + visibleCount) % PRODUCTS.length);
  };
  const handleClickPrev = () => {
    setStartIndex((prev) => (prev - visibleCount) % PRODUCTS.length);
  };

  return (
    <>
      <div className="flex justify-between">
        <h3 className="text-2xl uppercase">Sale Products</h3>
        <div className="flex gap-2.5 text-black items-center">
          <ChevronLeftIcon
            className="md:w-7 md:h-7 w-5.5 h-5.5 cursor-pointer"
            onClick={handleClickPrev}
          />
          <span className="xl:text-[1.375rem] text-[1.188rem]">1/34</span>
          <ChevronRightIcon
            className="md:w-7 md:h-7 w-5.5 h-5.5 cursor-pointer"
            onClick={handleClickNext}
          />
        </div>
      </div>
      <div className="h-px self-stretch bg-[#EBEAEB]" />

      <div className="gap-5 flex-1 grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 items-stretch">
        {visibleProductCards.map(
          ({ name, price, image, description, category }) => (
            <Card className="py-2.5 h-full p-2.5 cursor-pointer flex flex-col">
              <CardHeader className="flex justify-center">
                <img
                  src={iphone.src || image}
                  className="block mt-2 2xl:w-34 xl:w-30 md:w-37 sm:w-32 w-24 sm:h-38.5 h-28"
                ></img>
              </CardHeader>

              <CardContent className="flex flex-col items-center flex-1 justify-end gap-1.5">
                <div className="flex self-start text-[1.188rem]">
                  <h4>{name}</h4>
                </div>

                <div className="flex self-start text-[1.188rem]">
                  <h4>{description}</h4>
                </div>

                <div className="flex self-start text-[1.188rem]">
                  <h4>{category}</h4>
                </div>

                <div className="flex text-black self-start">
                  <span className="text-2xl">{price}</span>
                </div>

                <Button className="bg-[#FDD327] font-bold h-8 mt-2  text-black hover:bg-yellow-400 cursor-pointer">
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
