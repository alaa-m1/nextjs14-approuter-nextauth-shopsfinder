import React from "react";
import { Metadata } from "next";
import { LandingPanel } from "@/shared/appContainers/LandingPanel";

export const metadata: Metadata = {
  title: 'Shops Finder',
  description: 'Shoping becomes easy with us',
}

export default function Page() {
  return (
    <div>
      <LandingPanel />
    </div>
  )
}
