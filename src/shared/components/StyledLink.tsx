"use client";
import React, { useMemo, CSSProperties } from "react";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { useLanguage } from "../context/LanguageContext";
import { useIsClient } from "usehooks-ts";
import { useTranslation } from "@/app/i18n/client";

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
  // children: React.ReactNode;
  href: string;
  style?: CSSProperties | undefined;
  active?: boolean;
  lang: string;
  label: string;
};
export const StyledLink = ({
  // children,
  active,
  label,
  lang,
  ...props
}: LinkComponentProps) => {
  const pathname = usePathname();
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const isActive = useMemo(
    () =>
      active ??
      pathname?.replace(`/${language}`, "") ===
        (props.href === "/" ? "" : props.href),
    [active, pathname, language, props.href]
  );
  const isClient = useIsClient();

  return (
    <Link
      {...props}
      href={props.href === "/" ? `/${lang}` : `/${lang}${props.href}`}
      className={classNames("group flex gap-0 justify-center items-center", {
        "[&>span]:text-white [&>span]:dark:text-white": !isClient,
      })}
    >
      <span
        className={classNames(
          { "font-bold": isActive },
          { "font-normal": !isActive },
          { "text-light-label dark:text-dark-label": isClient }
        )}
      >
        {t(label)}
      </span>
    </Link>
  );
};
