import React, { Suspense } from "react";
import {
  CategoriesList,
  CategoriesLoadingSkeleton,
  ProductsList,
  ProductsListLoadingSkeleton,
} from "./components";
type ProductsProps = {
  searchParams?: {
    category?: string;
  };
};

export const dynamic = 'force-static'

const Page = ({ searchParams }: ProductsProps) => {
  return (
    <div className="flex flex-col gap-1">
      <Suspense fallback={<CategoriesLoadingSkeleton />}>
        <CategoriesList />
      </Suspense>
      <Suspense fallback={<ProductsListLoadingSkeleton />}>
        <ProductsList category={searchParams?.category} />
      </Suspense>
    </div>
  );
};
export default Page;
