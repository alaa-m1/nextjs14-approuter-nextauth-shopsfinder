import { Products } from "@/types";
import { axiosInstance } from "@/utils/axiosInstance";

export const getProducts = async (limit: number): Promise<Products | null> => {
    try {
        const response = await axiosInstance.get(`products?limit=${limit}`);
        return response.data as Products;
    } catch (error) {
        console.log(`Error in fetching Products`, Error)
        return null
    }
}