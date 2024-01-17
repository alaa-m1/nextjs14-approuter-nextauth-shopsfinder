"use client";
import Link from "next/link";
import React from "react";

type LinkButtonProps = React.ComponentProps<typeof Link>;
const LinkButton = ({ children, className, ...props }: LinkButtonProps) => {
  return (
    <div>
      <Link
        className={`inline-block min-h-[25px] w-auto max-w-[200px] text-ellipsis overflow-hidden px-2 rounded-md hover:underline transition-all duration-500 ${
          className ?? ""
        }`}
        {...props}
      >
        {children}
      </Link>
    </div>
  );
};

export { LinkButton };
