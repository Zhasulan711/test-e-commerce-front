"use client";

import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ProductCard as ProductCardType } from "../types";
import { useAuthStore } from "@/stores/auth-store";
import { getCartsByUserId, createCart, updateCart } from "@/features/cart/api";
import { useRouter } from "next/router";

interface ProductCardProps {
  product: ProductCardType;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { id: productId, name, price, image, description, category } = product;
  const { userId, isAuthenticated } = useAuthStore();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);

  const { data: userCarts } = useQuery({
    queryKey: ["carts", userId],
    queryFn: () => {
      if (!userId) throw new Error("User ID not found");
      return getCartsByUserId(userId);
    },
    enabled: isAuthenticated && userId !== null,
  });

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      if (!userId) {
        throw new Error("Please log in to add products to cart");
      }

      let cartToUpdate = userCarts?.[0];

      if (!cartToUpdate) {
        return createCart(userId, [{ productId, quantity: 1 }]);
      } else {
        const existingProductIndex = cartToUpdate.products.findIndex(
          (p) => p.productId === productId
        );

        let updatedProducts;
        if (existingProductIndex >= 0) {
          updatedProducts = [...cartToUpdate.products];
          updatedProducts[existingProductIndex] = {
            ...updatedProducts[existingProductIndex],
            quantity: updatedProducts[existingProductIndex].quantity + 1,
          };
        } else {
          updatedProducts = [
            ...cartToUpdate.products,
            { productId, quantity: 1 },
          ];
        }

        return updateCart(cartToUpdate.id, {
          userId: cartToUpdate.userId,
          date: cartToUpdate.date,
          products: updatedProducts,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts", userId] });
      setIsAdding(false);
    },
    onError: (error) => {
      setIsAdding(false);
      console.error("Failed to add product to cart:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to add product to cart. Please try again."
      );
    },
  });

  const handleAddToCart = async () => {
    if (!isAuthenticated || !userId) {
      router.push("/login");
      return;
    }

    setIsAdding(true);
    addToCartMutation.mutate();
  };

  return (
    <Card className="py-2.5 h-full p-2.5 cursor-pointer flex flex-col">
      <CardHeader className="flex justify-center">
        <img
          src={image}
          alt={name}
          className="block mt-2 object-contain 2xl:w-34 xl:w-30 md:w-37 sm:w-32 w-24 sm:h-38.5 h-28"
        />
      </CardHeader>

      <CardContent className="flex flex-col items-center flex-1 justify-end gap-1.5">
        <h4 className="self-start text-[1.188rem] line-clamp-1">{name}</h4>
        <p className="self-start text-[1rem] text-gray-600 line-clamp-2">
          {description}
        </p>
        <span className="self-start text-sm text-gray-500 capitalize">
          {category}
        </span>
        <span className="self-start text-black text-2xl font-bold">
          ${price}
        </span>

        <Button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="bg-[#FDD327] font-bold h-8 mt-2 w-full text-black hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAdding ? "ADDING..." : "ADD TO CART"}
        </Button>
      </CardContent>
    </Card>
  );
};
