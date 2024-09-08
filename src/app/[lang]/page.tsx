import React from "react";
import Home from "./home/Home";
import { languages } from "../i18n/settings";


export async function generateStaticParams() {
  return languages.map((lng) => ({ lang:lng }))
}

export default function Page({params}: Readonly<{params: { lang: string }}>) {
  return (
    <Home lng={params.lang}/>
  )
}
