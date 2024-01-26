import React from "react";
import { Metadata } from "next";
import Home from "./home/page";

export const metadata: Metadata = {
  title: 'Shops Finder',
  description: 'Shoping becomes easy with us',
}

export default function Page() {
  return (
    <Home/>
  )
}
