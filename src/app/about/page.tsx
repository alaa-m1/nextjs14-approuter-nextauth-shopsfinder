import { ExternalLink } from "@/shared";
import React from "react";

const Page = () => {
  return (
    <div
      className="mx-auto mt-[150px] max-w-[600px] py-[10px] text-center text-black shadow-md hover:shadow-lg"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "secondary.dark",
        }}
      >
        <span className="font-bold text-[#1976d2]">Alaa Mohammad</span>
        <span>
          Senior Frontend Developer | React - JavaScript - TypeScript - Next.js - Test
          Automation | Software Developer
        </span>
      </div>
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
      </div>
    </div>
  );
};
export default Page;
