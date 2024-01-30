import { baseUrl } from "@/shared";
import { CategoriesRes } from "@/types";
import "server-only";

export const getCategories = async (): Promise<CategoriesRes | null> => {

  // mimic a slow data fetching
  // await new Promise(res => setTimeout(res, 5000))
  
  try {
    const res = await fetch(`${baseUrl}products/categories`, {
      next: { tags: ["categories"] },
    });
    const data = (await res.json()) as CategoriesRes;
    return data;
  } catch (error) {
    console.log(`Error in fetching categories`, Error);
    return null;
  }
};
