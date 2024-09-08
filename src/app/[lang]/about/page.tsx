"use client";
import { ExternalLink, LoadingSpinner, usePageLoading } from "@/shared";
import React from "react";
import parse from "html-react-parser";
import { ProfilePhoto } from "./components";

const Page = () => {
  const isPageLoading = usePageLoading();
  const ABOUT_ME = `<Strong>Hi, I'm Alaa Mohammad, I'm a senior frontend developer</Strong>.<br/>
  I have worked in frontend development fields over the last six years 💻. <br/>
  Before that I worked for over seven years as a software developer 🖥️.</br>
  <Strong>My principles:</Strong> Work hard 👨‍💻, be kind, exercise regularly and enjoy live with my family 👨‍👩‍👧‍👦.<br/>
  I am self-motivated. I enjoy new challenges, collaborating with other developers and developing good software.`;
  return (
    <div className="h-full pt-[20px] py-[10px] text-black px-1 bg-[#eee]">
      <div className="flex flex-col gap-3">
        <div className="flex justify-center h-[340px] items-center">
          {isPageLoading ? <LoadingSpinner /> : <ProfilePhoto />}
        </div>
        <div className="font-[18px]">{parse(ABOUT_ME)}</div>
        <p className="font-bold text-center">
          Senior Frontend Developer | React - JavaScript - TypeScript - Next.js
          - Test Automation | Software Developer
        </p>

        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <ExternalLink
            url="https://www.linkedin.com/in/alaa-mohammad-767622199/"
            title="LinkedIn"
          />
          <ExternalLink
            url="https://www.xing.com/profile/alaa_mohammad8/cv"
            title="Xing"
          />
          <ExternalLink url="https://github.com/alaa-m1" title="GitHub" />
          <ExternalLink url="https://dev.to/alaa-m1" title="Dev.to" />
        </div>
      </div>
    </div>
  );
};
export default Page;
