"use client";
import { ExternalLink, LoadingSpinner, usePageLoading } from "@/shared";
import React from "react";
import parse from "html-react-parser";
import { ProfilePhoto } from "./components";
import { useTheme } from "next-themes";
import classNames from "classnames";

const Page = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  params: { lang },
}: {
  params: { lang: string };
}) => {
  const isPageLoading = usePageLoading();
  const { theme } = useTheme();

  const ABOUT_ME = `<Strong>Hi, I'm Alaa Mohammad, I'm a senior frontend developer</Strong>.<br/>
  I have worked in frontend development fields over the last six years 💻. <br/>
  Before that I worked for over seven years as a software developer 🖥️.</br>
  <Strong>My principles:</Strong> Work hard 👨‍💻, be kind, exercise regularly and enjoy live with my family 👨‍👩‍👧‍👦.<br/>
  I am self-motivated. I enjoy new challenges, collaborating with other developers and developing good software.`;
  return (
    <div
      className={classNames(
        "h-full pt-[20px] py-[10px] px-2 text-black bg-[#eee] dark:bg-[#303030]"
      )}
    >
      <div
        style={{ direction: "ltr" }}
        className={classNames(
          "flex flex-col gap-3 text-light-label dark:text-dark-primary"
        )}
      >
        <div className="flex justify-center h-[340px] items-center">
          {isPageLoading ? (
            <LoadingSpinner />
          ) : (
            <ProfilePhoto bgColor={theme === "light" ? "#eee" : "#303030"} />
          )}
        </div>
        <div className="font-[18px]">{parse(ABOUT_ME)}</div>
        <p className="font-bold text-center">
          Senior Frontend Developer | React - JavaScript - TypeScript - Next.js
          - | Jest - RTL - Test Automation | Software Developer
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
