"use client";
import React from "react";

export const StyledList = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="[& a]:no-underline [& a]:text-[#fff] mb-[10px] w-[180px] p-[5px]">
      {children}
    </div>
  );
};
