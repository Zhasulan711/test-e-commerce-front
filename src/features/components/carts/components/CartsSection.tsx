"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAllCarts } from "@/features/components/carts/api";
import { CartProduct } from "../types";

export const CartsSection = () => {
  const { data: carts } = useQuery({
    queryKey: ["carts"],
    queryFn: getAllCarts,
  });

  return (
    <>
      <h3 className="text-2xl uppercase">Shopping Carts</h3>

      <div className="h-px self-stretch bg-[#EBEAEB]" />

      <div className="gap-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        {carts?.map(({ id, userId, date, products }) => (
          <Card key={id} className="p-4">
            <CardHeader>
              <h4 className="text-lg font-bold">Cart id:{id}</h4>
              <p className="text-sm">User id: {userId}</p>
              <p className="text-xs">{new Date(date).toLocaleDateString()}</p>
            </CardHeader>

            <CardContent>
              <p className="text-sm mb-2">Products:</p>
              <div className="space-y-2">
                {products.map(({ quantity, productId }: CartProduct, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>Product id: {productId}</span>
                    <span>quantity: {quantity}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};
