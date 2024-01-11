import { getProducts } from "./actions";

import React from "react";
import { ProductCard } from "./components";
const Page = async () => {
  const products = await getProducts(100);
  return (<div className="flex justify-between flex-wrap">{(products || []).map((product) => (
    <ProductCard key={product.id} product={product} />
  ))}</div>);
};
export default Page;
