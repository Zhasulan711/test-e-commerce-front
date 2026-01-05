"use client";

import { useRouter } from "next/router";
import { useAuthStore } from "@/stores/auth-store";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex justify-between items-center mx-auto 2xl:max-w-325 xl:max-w-300 lg:max-w-220 md:max-w-172 sm:max-w-100 max-w-80 py-4">
      <h1 className="text-xl">E-Commerce</h1>

      {isAuthenticated && (
        <Button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white cursor-pointer"
        >
          Logout
        </Button>
      )}
    </div>
  );
};
