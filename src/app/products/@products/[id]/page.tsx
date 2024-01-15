import React from "react";
import { ProductDetails } from "./components";
import { getProductById } from "@/queries";
type ProductDetailsProps = {
  params: { id: string };
};
const Page = async ({ params }: ProductDetailsProps) => {
  const product = await getProductById(params.id);
  return <ProductDetails product={product} />;
};
export default Page;
