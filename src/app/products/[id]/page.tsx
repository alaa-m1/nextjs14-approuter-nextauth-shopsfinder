import React from "react";
import { getProduct } from "../actions";
type ProductDetailsProps = {
  params: { id: string };
};
const Page = async ({ params }: ProductDetailsProps) => {
  const product = await getProduct(params.id);
  return product ? (
    <div className="flex flex-col gap-1">
      <div className="m-2">
        <h5 className="mb-2 text-xl font-medium leading-tight text-black">
          {product?.title}
        </h5>
        <p className="mb-4 text-base text-black">{product?.description}</p>
        <p className="text-base text-black">
          <span className="text-black">
            Price: <span className="font-bold">{`${product?.price} $`}</span>
          </span>
        </p>
      </div>
      <div className="block rounded-lg bg-white shadow-md">
        <img className="rounded-lg" src={product?.image} alt={product?.title} />
      </div>
    </div>
  ) : (
    <div>No items found</div>
  );
};
export default Page;
