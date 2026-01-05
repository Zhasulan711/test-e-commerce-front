import { ProductCard } from "../types";

export async function getAllProducts(): Promise<ProductCard[]> {
  const response = await fetch("https://fakestoreapi.com/products");

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}
