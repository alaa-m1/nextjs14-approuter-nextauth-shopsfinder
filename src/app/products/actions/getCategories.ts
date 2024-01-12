import { CategoriesRes } from "@/types";
import { axiosInstance } from "@/utils/axiosInstance";

export const getCategories = async (): Promise<CategoriesRes | null> => {
    try {
        const response = await axiosInstance.get(`products/categories`);
        return response.data as CategoriesRes;
    } catch (error) {
        console.log(`Error in fetching categories`, Error)
        return null
    }
}