import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authApi } from "@/features/auth/api";
import { AuthState } from "@/types";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userId: null,
      username: null,
      isAuthenticated: false,

      login: async (username: string, password: string) => {
        const response = await authApi.login({ username, password });
        const user = await authApi.getUserByUsername(username);
        
        if (user) {
          set({
            token: response.token,
            userId: user.id,
            username: username,
            isAuthenticated: true,
          });
        } else {
          set({
            token: response.token,
            userId: null,
            username: username,
            isAuthenticated: true,
          });
        }
      },

      logout: () => {
        set({
          token: null,
          userId: null,
          username: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
