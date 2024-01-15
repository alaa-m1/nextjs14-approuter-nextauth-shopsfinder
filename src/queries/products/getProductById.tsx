import { Product } from "@/types";
import { axiosInstance } from "@/utils/axiosInstance";

export const getProductById = async (id: string): Promise<Product | null> => {
    try {
        const response = await axiosInstance.get(`products/${id}`);
        return response.data as Product;
    } catch (error) {
        console.log(`Error in fetching Product with ID= ${id}`, Error)
        return null
    }
}