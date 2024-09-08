"use client";

import { ErrorPanel } from "@/shared";
import React, { useEffect } from "react";

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

  return <ErrorPanel btnCallback={() => reset()} />;
};

export default ErrorFnc;
