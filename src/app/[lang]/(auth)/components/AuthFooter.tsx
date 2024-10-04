"use client";
import { LinkButton } from "@/shared";
import { useSelectedLayoutSegments } from "next/navigation";
import React from "react";

export const AuthFooter = () => {
  const segments = useSelectedLayoutSegments();
  const pathName = segments?.[0] ?? "";
  return pathName !== "signin" ? (
    <div className="w-full flex flex-row justify-left [#_button]:hover:bg-transparent">
      <div className="w-auto size-5 text-black text-ellipsis overflow-hidden dark:text-dark-text">
        If you already have an account &nbsp;
      </div>
      <LinkButton
        href="/signin"
        className="size-[15px] font-bold dark:text-dark-text"
      >
        Sign In
      </LinkButton>
    </div>
  ) : (
    <div className="w-full flex flex-row justify-left [#_button]:hover:bg-transparent">
      <div className="w-auto size-5 text-black text-ellipsis overflow-hidden dark:text-dark-text">
        If you do not have an account &nbsp;
      </div>
      <LinkButton
        href="/signup"
        className="size-[15px] font-bold text-gray-800 dark:text-dark-text"
      >
        Sign Up
      </LinkButton>
    </div>
  );
};
