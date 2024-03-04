import React from "react";
import { getProductById } from "@/queries";
import { ProductDetails, ProductModal } from "@/app/products/[id]/components";
type ProductDetailsProps = {
  params: { id: string };
};
const Page = async ({ params }: ProductDetailsProps) => {
  const product = await getProductById(params.id);
  return (
    <ProductModal>
      <ProductDetails product={product} />
    </ProductModal>
  );
};
export default Page;


