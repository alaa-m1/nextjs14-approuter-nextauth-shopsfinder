"use client";
import React, { Suspense } from "react";
import { useState } from "react";
import { Sidebar } from "./components";
import { LoadingSpinner, useSmallScreen } from "@/shared";

const DashboardLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) => {
  const isSmallScreen = useSmallScreen();
  const [open, setOpen] = useState(true);
  return (
    <div className={`h-full flex ${isSmallScreen ? "flex-col" : ""}`}>
      <Suspense fallback={<LoadingSpinner />}>
        <Sidebar
          lang={params.lang}
          isSmallScreen={isSmallScreen}
          fullWidth={open}
          onCloseSideBar={(v) => setOpen(v)}
        />
      </Suspense>
      <div className="bg-gray-100 flex-[8] p-4 rounded min-h-[300px] overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
