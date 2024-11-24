import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ProductCardProps = {
  product: Product;
};
export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="m-3 inline-block w-[300px] rounded-lg bg-white shadow-md overflow-hidden">
      <a href="#!">
        <Image
          width="300"
          height="250"
          className="w-[100%] h-[250px] aspect-auto rounded-t-lg hover:scale-110 hover:opacity-80 transition-all duration-700 "
          src={product.image}
          alt={product.title}
        />
      </a>
      <div className="p-5">
        <h5 className="h-[20px] overflow-hidden text-nowrap text-ellipsis mb-2 text-xl font-medium leading-tight text-gray-700">
          {product.title}
        </h5>
        <div className="h-[50px] line2-clamp">
          <p className=" mb-4 text-base text-neutral-500 ">
            {product.description}
          </p>
        </div>
        <div className="mt-2">
          <Link
            className="border-solid border-2 border-gray-500 rounded-md p-1 hover:shadow-md dark:text-[#e76712]"
            href={`/products/${product.id}`}
          >
            Product Details
          </Link>
        </div>
      </div>
    </div>
  );
};
