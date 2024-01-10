"use client";
import React, { useMemo, CSSProperties } from "react";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

type LinkComponentProps = LinkProps & {
  children: React.ReactNode;
  style?: CSSProperties | undefined;
};
export const StyledLink = ({ children, ...props }: LinkComponentProps) => {
  const pathname = usePathname();
  const isActive = useMemo(
    () => pathname === props.href,
    [pathname, props.href]
  );
  return (
    <Link {...props}>
      <span
        className={`text-[16px] text-white ${
          isActive ? "font-bold" : "font-normal"
        }`}
      >
        {children}
      </span>
    </Link>
  );
};
