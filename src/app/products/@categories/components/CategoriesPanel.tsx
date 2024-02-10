"use client";
import { Categories } from "@/types";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import React, { useMemo } from "react";

type CategoriesPanelProps = {
  categories: Categories | null;
};
export const CategoriesPanel = ({ categories }: CategoriesPanelProps) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams ?? "");
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    replace(`${pathName}?${params.toString()}`);
  };

  const currentCategory = useMemo(
    () =>
      searchParams?.get("category")?.toString()
        ? searchParams?.get("category")?.toString()
        : "all",
    [searchParams]
  );

  return (
    <ul className="flex flex-wrap gap-4 justify-center">
      {(categories ?? []).map((category) => (
        <li
          key={category.id}
          className={
            currentCategory === category.label ? "[&>button]:font-bold" : ""
          }
        >
          <button onClick={() => handleCategoryClick(category.label)}>
            {category.label}
          </button>
        </li>
      ))}
      <li className={currentCategory === "all" ? "[&>button]:font-bold" : ""}>
        <button onClick={() => handleCategoryClick("all")}>
          {"All Categories"}
        </button>
      </li>
    </ul>
  );
};
