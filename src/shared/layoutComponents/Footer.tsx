import React from "react";
import Link from "next/link";
import { MdEmail } from "react-icons/md";

type FooterProps = {
  lang: string;
};

export const Footer = ({ lang }: FooterProps) => {
  const date = new Date();
  const copyrights = `©${date.getFullYear()} Shops Finder`;
  return (
    <div style={{direction:"ltr"}} className=" overflow-hidden flex flex-wrap grow-0 justify-around items-center h-[50px] shadow-with-border bg-light-card dark:bg-dark-card">
      <div>
        <Link href={`/${lang}`}>
          <span className="text-slate-800 dark:text-dark-primary">{copyrights}</span>
        </Link>
      </div>
      <div className="flex place-items-center gap-1 ">
        <MdEmail className="[&>path]:text-slate-800 dark:[&>path]:text-dark-primary" />
        <a href="mailto:alaa85a@gmail.com">
          <span className="text-slate-800 dark:text-dark-primary">alaa85a@gmail.com</span>
        </a>
      </div>
    </div>
  );
};
