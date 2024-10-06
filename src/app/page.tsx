import React from "react";
import Home from "./[lang]/home/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Shops Finder',
  description: 'Shoping becomes easy with us',
}

export default function Page({params}:Readonly<{params: { lang: string }}>) {
  return (
    <Home lng={params.lang}/>
  )
}
