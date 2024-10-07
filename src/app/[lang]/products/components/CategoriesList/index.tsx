import _ from "lodash";
import React from "react";
import { CategoriesPanel } from "./components";
import { Categories } from "@/types";
import { LoadingSpinner, NoItemsFound } from "@/shared";
import { getCategories } from "@/queries";
import { useIsClient } from "usehooks-ts";

export const CategoriesList = async () => {
  const categoriesRes = await getCategories();
  const categories: Categories = (categoriesRes ?? []).map((category) => ({
    label: category,
    id: _.uniqueId(),
  }));
  const isClient = useIsClient();
  return (
    <>
      {categories.length === 0 ? (
        <NoItemsFound label="No Categories Found" />
      ) : isClient ? (
        <CategoriesPanel categories={categories} />
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};
