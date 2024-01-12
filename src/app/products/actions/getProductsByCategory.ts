import { Products } from "@/types";
import { axiosInstance } from "@/utils/axiosInstance";

export const getProductsByCategory = async (category: string): Promise<Products | null> => {
    try {
        if (category === 'all') {
            const response = await axiosInstance.get(`products`);
            return response.data as Products;

        } else {
            const response = await axiosInstance.get(`products/category/${category}`);
            return response.data as Products;
        }
    } catch (error) {
        console.log(`Error in fetching Products`, Error)
        return null
    }
}