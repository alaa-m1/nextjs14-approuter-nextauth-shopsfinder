import { getProductsByCategory } from "./actions";
import _ from "lodash";
import React from "react";
import { CategoriesPanel, ProductCard } from "./components";
import { getCategories } from "./actions/getCategories";
import { Categories } from "@/types";

type ProductsProps = {
  searchParams?: {
    category?: string;
  };
};

const Page = async ({ searchParams }: ProductsProps) => {
  const currentCategory = searchParams?.category ?? "all";
  const products = await getProductsByCategory(currentCategory);

  const categoriesRes = await getCategories();
  const categories: Categories = (categoriesRes ?? []).map((category) => ({
    label: category,
    id: _.uniqueId(),
  }));

  return (
    <div className="flex flex-col gap-1">
      <CategoriesPanel categories={categories} />
      <div className="flex justify-between flex-wrap">
        {(products ?? []).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
export default Page;
