import { AuthResponse, LoginCredentials, User } from "../types";

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    return response.json();
  },

  async getUserByUsername(username: string): Promise<User | undefined> {
    const response = await fetch("https://fakestoreapi.com/users");
    const users: User[] = await response.json();
    return users.find((user) => user.username === username);
  },
};
