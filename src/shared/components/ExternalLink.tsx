"use client";
import React from "react";
import { MdInsertLink } from "react-icons/md";
const ExternalLink = ({ url, title = "" }: { url: string; title?: string }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex no-underline font-bold text-[#ff9800]"
    >
      <div>
        <MdInsertLink className="inline-block" />
        <span>&nbsp;{title ? title : url}</span>
      </div>
      <br />
    </a>
  );
};
export { ExternalLink };
