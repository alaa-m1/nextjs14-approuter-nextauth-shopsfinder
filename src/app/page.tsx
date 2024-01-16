import React from "react";
import { Metadata } from "next";
import Shops from "./shops";

export const metadata: Metadata = {
  title: 'Shops Finder',
  description: 'Shoping becomes easy with us',
}


export default function Page() {
  return (
    <Shops/>
  )
}
