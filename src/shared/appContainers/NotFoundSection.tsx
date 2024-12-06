"use client";
import React from "react";
import Image from "next/image";
import { ColoredDevider } from "../components";
import Link from "next/link";
import notFoundSrc from "@/assets/images/not-found.png";
import { IoMdArrowRoundBack } from "react-icons/io";
export const NotFoundSection = () => {
  return (
    <div className="mx-auto bg-light-card dark:bg-dark-card flex flex-col items-center justify-center gap-2 rounded-md mt-[150px] max-w-[600px] shadow-md hover:shadow-lg py-[10px] text-black">
      <div className="text-blue-600 dark:text-blue-900 text-6xl mb-2">404</div>
      <div className="text-light-text dark:text-dark-text uppercase text-[24px]">
        Page not Found
      </div>
      <Image src={notFoundSrc} alt="Logo" style={{ width: `400px` }} />
      <ColoredDevider />
      <Link
        href="/"
        className="w-fit duration-300 flex items-center gap-1 rounded-sm p-[8px] font-bold no-underline transition-all hover:bg-light-primary hover:shadow-sm hover:ring-1 dark:hover:bg-dark-primary"
      >
        <IoMdArrowRoundBack className="rtl:rotate-180" />
        Home Page
      </Link>
    </div>
  );
};
