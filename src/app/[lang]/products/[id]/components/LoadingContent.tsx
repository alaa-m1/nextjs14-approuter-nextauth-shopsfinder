"use client"
import { useTheme } from "next-themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export const LoadingContent = () => {
  const {theme}=useTheme();
  return (
    <div>
      <Skeleton baseColor={theme==="dark"?"#463f4e":"#eee"} highlightColor={theme==="dark"?"#3c2e4b":"#aaa"} style={{ height: "50px", margin: "10px 0px 20px" }} />
      <Skeleton baseColor={theme==="dark"?"#463f4e":"#eee"} highlightColor={theme==="dark"?"#3c2e4b":"#aaa"} style={{ height: "75vh" }}/>
    </div>
  );
};
