"use client";
import classNames from "classnames";
import React, { useEffect, useMemo, useState } from "react";
import { RiseLoader } from "react-spinners";

type SubmitButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  disabled?: boolean;
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
  disabled,
  ...props
}: SubmitButtonProps) => {
  const [pageLoading, setPageLoading] = useState(true);
  useEffect(() => setPageLoading(false), []);

  const hasBg = useMemo(() => variant === "contained", [variant]);
  return (
    <button
      aria-disabled={isLoading}
      disabled={isLoading || disabled || pageLoading}
      {...props}
      type="submit"
      className={classNames(
        "text-white overflow-hidden h-[40px] w-[200px] max-w-[300px] focus:ring-2  focus:ring-blue-500 font-medium rounded-md text-sm px-5 py-1 text-center  transition-all duration-300 inline-flex items-center",
        { "ring-1 ring-blue-800": !hasBg },
        { "hover:shadow-md": !isLoading && !disabled && !pageLoading },
        {
          "hover:bg-blue-800 bg-blue-600":
            hasBg && !isLoading && !disabled && !pageLoading,
        },
        {
          " bg-blue-600": hasBg && isLoading,
        },
        { "bg-blue-300": hasBg && (pageLoading || disabled) }
      )}
    >
      <div className="flex w-full justify-center [&_svg]:size-1">
        {isLoading && (
          <div>
            {loadingIndicator ?? <RiseLoader size="8" color="#36d7b7" />}
          </div>
        )}
        <div className="text-gray-800 pl-1 flex place-items-center font-bold">
          {label || "Submit"}
        </div>
      </div>
    </button>
  );
};
