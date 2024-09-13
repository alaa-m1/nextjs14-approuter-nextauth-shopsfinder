"use client";
import React from "react";
import logoSrc from "@/assets/images/phoenix.png";
import { StyledLink, useSmallScreen, NavLinks, ThemeSwitcher } from "@/shared";
import Link from "next/link";
import Image from "next/image";
import { Drawer, LanguageMenu } from "./components";
import { useSession, signOut } from "next-auth/react";
import { UserInfo } from "@/types";

export const Header = ({ lang }: { lang: string }) => {
  const isSmallScreen = useSmallScreen();
  const { data: session } = useSession();
  const currentUser: UserInfo | undefined = session?.user;

  return (
    <header className="shadow-with-border grow-0 text-black">
      <nav
        className="relative flex  
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
              <div className="flex gap-4">
                {NavLinks.map((link, index) =>
                  link.protected ? (
                    currentUser ? (
                      <StyledLink key={index} href={link.path}>
                        {link.label}
                      </StyledLink>
                    ) : null
                  ) : (
                    <StyledLink key={index} href={link.path}>
                      {link.label}
                    </StyledLink>
                  )
                )}
              </div>
            </div>
            <div className="flex px-2 grow-0 nav-bts">
              {currentUser ? (
                <StyledLink href={"/"} onClick={() => signOut()}>
                  <span>Sign Out</span>
                </StyledLink>
              ) : (
                <StyledLink href={"/signin"}>Sign In</StyledLink>
              )}
            </div>
            <ThemeSwitcher/>
            <LanguageMenu lang={lang} />
          </>
        )}
        <Drawer
          links={NavLinks}
          currentUser={currentUser}
          isSmallScreen={isSmallScreen}
          lang={lang}
        />
      </nav>
    </header>
  );
};
