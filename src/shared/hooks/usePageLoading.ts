"use client"
import { useEffect, useState } from "react";

export const usePageLoading = () => {
  const [pageLoading, setPageLoading] = useState(true);
  useEffect(() => setPageLoading(false), []);
  return pageLoading;
};
