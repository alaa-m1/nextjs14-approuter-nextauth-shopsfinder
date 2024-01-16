import _ from "lodash";
import React from "react";
import { CategoriesPanel } from "./components";
import { Categories } from "@/types";
import { NoItemsFound } from "@/shared";
import { getCategories } from "@/queries";

const Page = async () => {
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
        <CategoriesPanel categories={categories} />
      )}
    </>
  );
};
export default Page;
