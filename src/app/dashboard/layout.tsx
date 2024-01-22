"use client";
import React from "react";
import { useState } from "react";
import { Sidebar } from "./components";
import { useSmallScreen } from "@/shared";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSmallScreen = useSmallScreen();
  const [open, setOpen] = useState(true);
  return (
    <div className={`h-full flex ${isSmallScreen ? "flex-col" : ""}`}>
      <Sidebar
        isSmallScreen={isSmallScreen}
        fullWidth={open}
        onCloseSideBar={(v) => setOpen(v)}
      />
      <div className="bg-gray-100 flex-[8] p-4 rounded min-h-[300px] overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
