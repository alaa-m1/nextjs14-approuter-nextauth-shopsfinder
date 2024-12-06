"use client";
import React from "react";
import logoSrc from "@/assets/images/phoenix.png";
import { StyledLink, useSmallScreen, NavLinks, ThemeSwitcher } from "@/shared";
import Link from "next/link";
import Image from "next/image";
import { Drawer, LanguageMenu } from "./components";
import { useSession, signOut } from "next-auth/react";
import { UserInfo } from "@/types";
import { useIsClient } from "usehooks-ts";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

export const Header = ({ lang }: { lang: string }) => {
  const isClient = useIsClient();
  return <HeaderComponent lang={lang} key={isClient ? "1" : "0"} />;
};

export const HeaderComponent = ({ lang }: { lang: string }) => {
  const isSmallScreen = useSmallScreen();
  const { data: session } = useSession();
  const isClient = useIsClient();
  const currentUser: UserInfo | undefined = session?.user;

  return (
    <header className="shadow-with-border grow-0 text-black">
      <nav
        className="relative flex  
          place-items-center justify-between p-6 px-2 lg:px-8 bg-gradient-to-b  from-indigo-900
          via-indigo-500 to-indigo-600  dark:from-slate-600
          dark:via-slate-400 dark:to-slate-500 pr-0 [&_.MuiToolbar-root]:w-full"
      >
        {isSmallScreen ? (
          <div className="grow-[1]">
            <Link href={`/${lang}`}>
              <Image src={logoSrc} alt="Logo" className="mx-[2px]" />
            </Link>
          </div>
        ) : (
          <>
            <div className="grow-[1]">
              <Link href={`/${lang}`}>
                <Image src={logoSrc} alt="Logo" className="mx-[2px]" />
              </Link>
            </div>
            {isClient ? (
              <>
                <div className="flex grow-[2] nav-bts">
                  <div className="flex gap-4">
                    {NavLinks.map((link, index) =>
                      link.protected ? (
                        currentUser ? (
                          <StyledLink
                            lang={lang}
                            key={index}
                            href={link.path}
                            label={link.label}
                            icon={link.icon}
                          />
                        ) : null
                      ) : (
                        <StyledLink
                          lang={lang}
                          key={index}
                          href={link.path}
                          label={link.label}
                          icon={link.icon}
                        />
                      )
                    )}
                  </div>
                </div>
                <div className="flex px-2 grow-0 nav-bts">
                  <div>
                    {currentUser ? (
                      <StyledLink
                        lang={lang}
                        href={`/${lang}`}
                        onClick={() => signOut()}
                        label={"signout"}
                        active={false}
                        icon={<LogoutIcon fontSize="medium" />}
                      />
                    ) : (
                      <StyledLink
                        lang={lang}
                        href={"/signin"}
                        label={"signin"}
                        icon={<LoginIcon fontSize="medium" />}
                      />
                    )}
                  </div>
                </div>
              </>
            ) : null}
            <ThemeSwitcher />
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
