import React from "react";

const ProductsLayout = ({
  categories,
  productsList,
  children,
}: {
  categories: React.ReactNode;
  productsList: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-1">
      {categories}
      {productsList}
      {children}
    </div>
  );
};
export default ProductsLayout;
