import { ProductCard } from "../types";

export async function getAllProducts(): Promise<ProductCard[]> {
  const response = await fetch("https://fakestoreapi.com/products");

  return response.json();
}
