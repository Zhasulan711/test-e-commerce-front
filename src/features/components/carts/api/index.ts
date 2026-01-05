import { Cart } from "../types";

export async function getAllCarts(): Promise<Cart[]> {
  const response = await fetch("https://fakestoreapi.com/carts");
  return response.json();
}
