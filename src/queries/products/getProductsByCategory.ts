import { baseUrl } from "@/shared";
import { Products } from "@/types";

export const getProductsByCategory = async (category: string): Promise<Products | null> => {
    try {
        if (category === 'all') {
            const res = await fetch(`${baseUrl}products`, { next: { tags: ['getProductsByCategory'] } })
            const data = await res.json() as Products
            return data
        } else {
            const res = await fetch(`${baseUrl}products/category/${category}`, { next: { tags: ['getProductsByCategory'] } })
            const data = await res.json() as Products
            return data
        }
    } catch (error) {
        console.log(`Error in fetching Products`, Error)
        return null
    }
}