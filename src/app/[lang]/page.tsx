import React from "react";
import { languages } from "../i18n/settings";
import Home from "./(public_routes)/home/Home";


export async function generateStaticParams() {
  return languages.map((lng) => ({ lang:lng }))
}

export default function Page({params}: Readonly<{params: { lang: string }}>) {
  return (
    <Home lng={params.lang}/>
  )
}
