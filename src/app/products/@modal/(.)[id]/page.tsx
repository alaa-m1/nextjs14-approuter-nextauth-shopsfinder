import React from "react";
import { ProductDetails, ProductModal } from "../../@products/[id]/components";
import { getProductById } from "@/queries";
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
