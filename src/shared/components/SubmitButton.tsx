"use client";
import classNames from "classnames";
import React, { useMemo } from "react";
import { RiseLoader } from "react-spinners";

type SubmitButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  isLoading: boolean;
  loadingIndicator?: React.ReactNode;
  label?: string;
  variant?: "contained" | "outlined";
};

export const SubmitButton = ({
  label = "",
  variant = "contained",
  isLoading,
  loadingIndicator,
  ...props
}: SubmitButtonProps) => {
  const hasBg = useMemo(() => variant === "contained", [variant]);
  return (
    <button
      aria-disabled={isLoading}
      disabled={isLoading}
      {...props}
      type="submit"
      className={classNames(
        "text-white overflow-hidden h-[40px] w-auto max-w-[200px] focus:ring-2  focus:ring-blue-500 font-medium rounded-md text-sm px-5 py-1 text-center  transition-all duration-300 inline-flex items-center",
        { "bg-blue-600": hasBg },
        { "ring-1 ring-blue-800": !hasBg },
        { "hover:shadow-md": !isLoading },
        { "hover:bg-blue-800": hasBg && !isLoading }
      )}
    >
      <div className="flex place-items-center [&_svg]:size-1">
        {isLoading && (
          <div>
            {loadingIndicator ?? <RiseLoader size="8" color="#36d7b7" />}
          </div>
        )}
        <div className="text-gray-800 pl-1 ">{label ? label : "Submit"}</div>
      </div>
    </button>
  );
};
