"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { LoadingSpinner } from "../components";

export const LandingPanel = () => {
  const router = useRouter();
  useEffect(() => {
    const navigateToHome = () => {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
      if (window && baseUrl) {
        window.location.replace(`${baseUrl}/en`);
      } else {
        router.push("/en");
      }
    };
    const timeoutId = setTimeout(navigateToHome, 1);
    return () => {
      clearTimeout(timeoutId);
    };
  });
  return (
    <div className="h-[100vh] w-[100vw]">
      <div className="absolute bottom-0 left-0 right-0 top-0 grid place-items-center">
        <LoadingSpinner />
      </div>
    </div>
  );
};
