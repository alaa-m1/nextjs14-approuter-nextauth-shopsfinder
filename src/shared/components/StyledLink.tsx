"use client";
import React, { useMemo, CSSProperties } from "react";
import { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import classNames from "classnames";
import { Button } from "@nextui-org/react";
import { useLanguage } from "../context/LanguageContext";
import { useIsClient } from "usehooks-ts";

/**
 * Handle link
 *
 * The link will be bolded if it is the active link by comparing the pathname with the passed href
 * If you are using a search params E.g.?key=value, you can provide active props to control the link style directly
 * @param [active] To control the link style directlym if active is true then the link will be bold
 * @param href The target link
 * @param [style] CSSProperties
 */

type LinkComponentProps = LinkProps & {
  children: React.ReactNode;
  href: string;
  style?: CSSProperties | undefined;
  active?: boolean;
};
export const StyledLink = ({
  children,
  active,
  ...props
}: LinkComponentProps) => {
  const pathname = usePathname();
  const { language } = useLanguage();

  const isActive = useMemo(
    () =>
      active ??
      pathname?.replace(`/${language}`, "") ===
        (props.href === "/" ? "" : props.href),
    [active, pathname, language, props.href]
  );
  const router = useRouter();
  const isClient = useIsClient();

  return (
    <Button
      onClick={() => {
        router.push(props.href);
      }}
      className={classNames(
        "group bg-transparent flex gap-0 justify-center items-center"
      )}
    >
      <span
        className={classNames(
          { "font-bold": isActive },
          { "font-normal": !isActive },
          { "text-light-label dark:text-dark-label": isClient }
        )}
      >
        {children}
      </span>
    </Button>
  );
};
