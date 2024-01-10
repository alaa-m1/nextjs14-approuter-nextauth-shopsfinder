"use client"
import { useRouter } from "next/navigation";
import React from "react";

type LinkButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  to?: string;
  label: string;
};
const LinkButton = ({ to, label, ...props }: LinkButtonProps) => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        to && router.push(to);
      }}
      {...props}
    >
      {label}
    </button>
  );
};

export { LinkButton };
