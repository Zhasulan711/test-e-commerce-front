import { Cart, CartProduct } from "../types";

export async function getAllCarts(): Promise<Cart[]> {
  const response = await fetch("https://fakestoreapi.com/carts");
  return response.json();
}

export async function getCartsByUserId(userId: number): Promise<Cart[]> {
  const response = await fetch(
    `https://fakestoreapi.com/carts/user/${userId}`
  );
  return response.json();
}

export async function updateCart(
  cartId: number,
  updatedCart: Omit<Cart, "id">
): Promise<Cart> {
  const response = await fetch(`https://fakestoreapi.com/carts/${cartId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedCart),
  });
  return response.json();
}

export async function createCart(
  userId: number,
  products: CartProduct[] = []
): Promise<Cart> {
  const response = await fetch("https://fakestoreapi.com/carts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      date: new Date().toISOString(),
      products,
    }),
  });
  return response.json();
}