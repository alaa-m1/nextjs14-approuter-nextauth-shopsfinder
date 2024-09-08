import _ from "lodash";
import React, { Suspense } from "react";
import { CategoriesPanel } from "./components";
import { Categories } from "@/types";
import { LoadingSpinner, NoItemsFound } from "@/shared";
import { getCategories } from "@/queries";

export const CategoriesList = async () => {
  const categoriesRes = await getCategories();
  const categories: Categories = (categoriesRes ?? []).map((category) => ({
    label: category,
    id: _.uniqueId(),
  }));

  return (
    <>
      {categories.length === 0 ? (
        <NoItemsFound label="No Categories Found" />
      ) : (
        <Suspense fallback={<LoadingSpinner />}>
          <CategoriesPanel categories={categories} />
        </Suspense>
      )}
    </>
  );
};
