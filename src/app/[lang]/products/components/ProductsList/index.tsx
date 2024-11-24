import React from "react";
import { ProductCard } from "./components";
import { NoItemsFound } from "@/shared";
import { getProductsByCategory } from "@/queries";

type ProductsProps = {
  category?: string;
};
export const revalidate = 1800; // revalidate at most every half hour
export const ProductsList = async ({ category }: ProductsProps) => {
  const currentCategory = category || "all";
  const products = await getProductsByCategory(currentCategory);
  return (
    <>
      <div className="grid gap-5 justify-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-[10px]">
        {(products ?? []).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {(products ?? []).length === 0 ? <NoItemsFound /> : null}
    </>
  );
};
