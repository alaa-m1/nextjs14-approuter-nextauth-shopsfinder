"use client";

import React, { useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { RiGlobalLine } from "react-icons/ri";
import { languages } from "@/app/i18n/settings";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import classNames from "classnames";
import { useIsClient } from "usehooks-ts";
import { useLanguage } from "@/shared/context/LanguageContext";

export const LanguageMenu = ({ lang }: { lang: string }) => {
  const segments = useSelectedLayoutSegments();
  const { t } = useTranslation(lang);
  const { updateLanguage } = useLanguage();

  useEffect(() => {
    if (lang === "ar" || lang === "en" || lang === "de") {
      updateLanguage(lang);
    }
  }, [lang, updateLanguage]);

  // Filter out route groups (segments starting with "(" )
  const currentSegments = (segments ?? [])
    .filter((segment) => !segment.startsWith("("))
    .join("/");

  const isClient = useIsClient();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isIconOnly
          className={classNames(
            "px-2 border-none bg-transparent hover:[&>svg]:text-[#e76712] hover:[&>svg]:transition-all hover:[&>svg]:duration-300",
            { "[&>svg]:text-white": !isClient },
            {
              "[&>svg]:text-light-label [&>svg]:dark:text-dark-label": isClient,
            }
          )}
        >
          <RiGlobalLine size={22} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        className="p-[10px] rounded-sm bg-light-card dark:bg-dark-card"
      >
        {languages.map((l) => (
          <DropdownItem
            key={l}
            className="text-light-primary dark:text-dark-primary p-0"
            color="default"
          >
            <Link
              href={`/${l}/${currentSegments}`}
              className="block w-full h-full p-1"
            >
              {l === "ar" ? t("arabic") : ""}
              {l === "en" ? t("english") : ""}
              {l === "de" ? t("german") : ""}
            </Link>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
