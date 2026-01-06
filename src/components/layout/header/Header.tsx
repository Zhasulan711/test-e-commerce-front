"use client";

import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth-store";
import { Button } from "@/components/ui/button";
import { CartIcon } from "@/components/Icons/CartIcon";
import { getCartsByUserId } from "@/features/cart/api";

export const Header = () => {
  const { isAuthenticated, logout, userId } = useAuthStore();
  const router = useRouter();

  const { data: carts } = useQuery({
    queryKey: ["carts", userId],
    queryFn: () => {
      if (!userId) throw new Error("User ID not found");
      return getCartsByUserId(userId);
    },
    enabled: isAuthenticated && userId !== null,
  });

  const totalItems = carts?.reduce((total, cart) => {
    return (
      total +
      cart.products.reduce((sum, product) => sum + product.quantity, 0)
    );
  }, 0) || 0;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleCartClick = () => {
    router.push("/carts");
  };

  const handleHomeClick = () => {
    router.push("/");
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="flex justify-between items-center mx-auto 2xl:max-w-325 xl:max-w-300 lg:max-w-220 md:max-w-172 sm:max-w-100 max-w-80 py-4 px-4">
        <h1
          onClick={handleHomeClick}
          className="text-xl font-bold cursor-pointer hover:text-gray-600 transition-colors"
        >
          E-Commerce
        </h1>

        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <Button
              onClick={handleLoginClick}
              className="bg-black hover:bg-gray-800 text-white"
            >
              Login
            </Button>
          ) : (
            <>
              <button
                onClick={handleCartClick}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Shopping cart"
              >
                <CartIcon className="w-6 h-6 text-gray-700" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </button>
              <Button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
