import React from "react";
import { Product } from "@/types";
import Image from "next/image";
import { NoItemsFound } from "@/shared";

type ProductDetailsProps = {
  product: Product | null;
};
export const ProductDetails = ({ product }: ProductDetailsProps) => {
  return product ? (
    <div className="flex flex-col gap-1 h-full bg-white dark:bg-gray-900 p-4">
      <div className="m-2">
        <h5 className="mb-2 text-xl font-medium leading-tight text-black dark:text-white">
          {product?.title}
        </h5>
        <p className="mb-4 text-base text-black dark:text-white">{product?.description}</p>
        <p className="text-bas">
          <span className="text-black dark:text-white">
            Price: <span className="font-bold">{`${product?.price} $`}</span>
          </span>
        </p>
      </div>
      <Image
        width="500"
        height="500"
        className=" w-[50vw] aspect-auto rounded-lg shadow-md"
        src={product?.image}
        alt={product?.title}
      />
    </div>
  ) : (
    <NoItemsFound />
  );
};
