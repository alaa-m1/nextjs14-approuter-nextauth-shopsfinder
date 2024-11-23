"use client";

import { ErrorPanel } from "@/shared";
import React, { useEffect } from "react";
import { ProductModal } from "../../../products/[id]/components";

const ErrorFnc = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <ProductModal>
      <ErrorPanel btnCallback={() => reset()} />
    </ProductModal>
  );
};

export default ErrorFnc;
