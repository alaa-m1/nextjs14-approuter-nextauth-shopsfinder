"use client";
import React, { Suspense } from "react";
import { SearchPanel, SearchResults } from "./components";
import { LoadingSpinner } from "@/shared";
const Page = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <SearchPanel />
      </Suspense>
      <SearchResults />
    </div>
  );
};
export default Page;
