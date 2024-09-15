"use client";

import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { MdOutlineLanguage } from "react-icons/md";
import { languages } from "@/app/i18n/settings";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import classNames from "classnames";
import { useIsClient } from "usehooks-ts";
export const LanguageMenu = ({ lang }: { lang: string }) => {
  const segments = useSelectedLayoutSegments();
  const { t } = useTranslation(lang);
  const currentSegments = (segments ?? []).slice(1).join("/");
  const isClient = useIsClient();
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="bordered"
          isIconOnly
          className={classNames(
            "px-2 border-none  hover:[&>svg]:text-[#e76712] hover:[&>svg]:transition-all hover:[&>svg]:duration-300",
            { "[&>svg]:text-white": !isClient },
            {
              "[&>svg]:text-light-label [&>svg]:dark:text-dark-label": isClient,
            }
          )}
        >
          <MdOutlineLanguage size={22} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" className="p-[10px] rounded-sm bg-light-card dark:bg-dark-card">
        {languages.map((l) => {
          return (
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
              </Link>
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
};
