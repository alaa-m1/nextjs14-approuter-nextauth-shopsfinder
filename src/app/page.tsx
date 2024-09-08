import React from "react";
import Home from "./[lang]/home/Home";


export default function Page({params}:Readonly<{params: { lang: string }}>) {
  return (
    <Home lng={params.lang}/>
  )
}
