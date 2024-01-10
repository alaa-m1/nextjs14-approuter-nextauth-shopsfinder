"use client";
import React from "react";

export const StyledList = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" w-full max-w-[360px] [&_a>span]:no-underline [&_a>span]:text-[#fff] mb-[10px] w-[180px] p-[5px]">
      {children}
    </div>
  );
};
