import { ProductCard } from "../types";

export async function getAllProducts(): Promise<ProductCard[]> {
  const response = await fetch("https://fakestoreapi.com/products");

  return response.json();
}

export async function getProductById(id: number): Promise<ProductCard> {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  return response.json();
}