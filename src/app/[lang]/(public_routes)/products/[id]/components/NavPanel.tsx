"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { MdArrowBackIos } from "react-icons/md";

export const NavPanel = () => {
  const router = useRouter();
  const handleGoBack = () => {
    if (window.history?.length) {
      router.back();
    } else router.replace("/products");
  };

  return (
    <div className="flex justify-between shadow-sm my-4 mx-1 px-2">
      <div>
        <button onClick={handleGoBack}>
          <div className="place-items-center">
            <MdArrowBackIos className="font-bold inline-block text-black dark:text-white" />{" "}
            <span className="text-black dark:text-white">Go Back</span>
          </div>
        </button>
      </div>
    </div>
  );
};
