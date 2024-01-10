"use client";
import React from "react";
import logoSrc from "@/assets/images/phoenix.png";
import { StyledLink } from "@/shared";
import Link from "next/link";
import Image from "next/image";
import { linksDetails as links } from "@/shared";

export const Header = () => {
  const isSmallScreen = false;
  const currentUser = null;
  return (
    <header className="shadow-with-border grow-0 text-black">
      <nav
        className="relative z-[1000] flex  
          place-items-center justify-between p-6 lg:px-8 bg-gradient-to-b  from-indigo-900
          via-indigo-500 to-indigo-600 pr-0 [&_.MuiToolbar-root]:w-full"
      >
        {isSmallScreen ? (
          <div className="grow-[1]">
            <Link href="/">
              <Image src={logoSrc} alt="Logo" />
            </Link>
          </div>
        ) : (
          <>
            <div className="grow-[1]">
              <Link href="/">
                <Image src={logoSrc} alt="Logo" />
              </Link>
            </div>
            <div className="flex grow-[2] nav-bts">
              <div>
                {links.map((link, index) => (
                  <StyledLink key={index} href={link.path}>
                    {link.label}
                  </StyledLink>
                ))}
              </div>
            </div>
            <div className="flex px-2 grow-0 nav-bts">
              {currentUser ? (
                <StyledLink href={"/"}>
                  <span>Sign Out</span>
                </StyledLink>
              ) : (
                <StyledLink href={"/auth"}>Sign In</StyledLink>
              )}
            </div>
          </>
        )}
      </nav>
    </header>
  );
};
