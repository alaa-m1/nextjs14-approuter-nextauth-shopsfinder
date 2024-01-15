import React from "react";
type NoItemsFoundProps = {
  label?: string;
};
export const NoItemsFound = ({ label }: NoItemsFoundProps) => {
  return (
    <div className="flex w-full">
      <div className="m-auto  shadow-sm by-1 px-5">
        <span className="text-blue-900 ">{label ?? "No Items Found"}</span>
      </div>
    </div>
  );
};
