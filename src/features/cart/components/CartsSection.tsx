"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { getCartsByUserId, updateCart } from "@/features/cart/api";
import { getAllProducts } from "@/features/home/api";
import { useAuthStore } from "@/stores/auth-store";
import { LoadingCartsState } from "./LoadingCartsState";
import { ErrorCartsState } from "./ErrorCartsState";
import { EmptyCartsState } from "./EmptyCartsState";
import { UnauthenticatedCartsState } from "./UnauthenticatedCartsState";
import { CartCard } from "./CartCard";
import { ProductCard } from "@/features/home/types";

export const CartsSection = () => {
  const { userId, isAuthenticated } = useAuthStore();
  const queryClient = useQueryClient();
  const [removingProductId, setRemovingProductId] = useState<number | undefined>();

  const {
    data: carts,
    isLoading: cartsLoading,
    isError: cartsError,
    refetch,
  } = useQuery({
    queryKey: ["carts", userId],
    queryFn: () => {
      if (!userId) {
        throw new Error("User ID not found");
      }
      return getCartsByUserId(userId);
    },
    enabled: isAuthenticated && userId !== null,
  });

  const { data: allProducts, isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    enabled: isAuthenticated && userId !== null && !!carts,
  });

  const removeProductMutation = useMutation({
    mutationFn: async ({
      cartId,
      productId,
    }: {
      cartId: number;
      productId: number;
    }) => {
      const cart = carts?.find((c) => c.id === cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }

      const updatedProducts = cart.products.filter(
        (p) => p.productId !== productId
      );

      return updateCart(cartId, {
        userId: cart.userId,
        date: cart.date,
        products: updatedProducts,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts", userId] });
      setRemovingProductId(undefined);
    },
    onError: () => {
      setRemovingProductId(undefined);
    },
  });

  const productsMap = useMemo(() => {
    if (!allProducts) return new Map<number, ProductCard>();
    return new Map(allProducts.map((product) => [product.id, product]));
  }, [allProducts]);

  const isLoading = cartsLoading || productsLoading;

  const handleRemoveProduct = (cartId: number, productId: number) => {
    setRemovingProductId(productId);
    removeProductMutation.mutate({ cartId, productId });
  };

  if (!isAuthenticated || userId === null) {
    return <UnauthenticatedCartsState />;
  }

  if (isLoading) {
    return <LoadingCartsState />;
  }

  if (cartsError) {
    return <ErrorCartsState onRetry={() => refetch()} />;
  }

  if (!carts || carts.length === 0) {
    return <EmptyCartsState />;
  }

  return (
    <>
      <h3 className="text-2xl uppercase mb-1">My Shopping Carts</h3>
      <p className="text-sm text-gray-600 mb-6">
        View and manage your shopping carts
      </p>

      <div className="h-px self-stretch bg-[#EBEAEB] mb-6" />

      <div className="gap-6 grid lg:grid-cols-2 xl:grid-cols-3 grid-cols-1">
        {carts.map((cart) => (
          <CartCard
            key={cart.id}
            cart={cart}
            products={productsMap}
            onRemoveProduct={handleRemoveProduct}
            removingProductId={removingProductId}
          />
        ))}
      </div>
    </>
  );
};
