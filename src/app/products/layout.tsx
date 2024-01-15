import React from "react";

const ProductsLayout = ({
  categories,
  products,
  modal
}: {
  categories: React.ReactNode;
  products: React.ReactNode;
  modal: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-1">
      {modal}
      {categories}
      {products}
    </div>
  );
};
export default ProductsLayout;
