import React from "react";
import Home from "./home/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Shops Finder',
  description: 'Shoping becomes easy with us',
}


export default function Page() {
  return (
    <Home/>
  )
}
