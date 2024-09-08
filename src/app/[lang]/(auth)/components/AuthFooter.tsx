"use client";
import { LinkButton } from "@/shared";
import { usePathname } from "next/navigation";
import React from "react";

export const AuthFooter = () => {
  const pathName = usePathname();
  return pathName !== "/signin" ? (
    <div className="w-full flex flex-row justify-left [#_button]:hover:bg-transparent">
      <div className="w-auto size-5 text-black text-ellipsis overflow-hidden ">
        If you already have an account &nbsp;
      </div>
      <LinkButton href="/signin" className="size-[15px] font-bold">
        Sign In
      </LinkButton>
    </div>
  ) : (
    <div className="w-full flex flex-row justify-left [#_button]:hover:bg-transparent">
      <div className="w-auto size-5 text-black text-ellipsis overflow-hidden ">
        If you do not have an account &nbsp;
      </div>
      <LinkButton href="/signup" className="size-[15px] font-bold">
        Sign Up
      </LinkButton>
    </div>
  );
};
