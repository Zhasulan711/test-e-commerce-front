import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authApi } from "@/features/auth/api";
import { AuthState } from "@/types";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,

      login: async (username: string, password: string) => {
        const response = await authApi.login({ username, password });
        set({ token: response.token, isAuthenticated: true });
      },

      logout: () => {
        set({ token: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
