import { baseUrl } from "@/shared";
import { Product } from "@/types";
import "server-only";

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await fetch(`${baseUrl}products/${id}`);
    const data = (await response.json()) as Product;
    return data;
  } catch (error) {
    console.log(`Error in fetching Product with ID= ${id}`, Error);
    return null;
  }
};
