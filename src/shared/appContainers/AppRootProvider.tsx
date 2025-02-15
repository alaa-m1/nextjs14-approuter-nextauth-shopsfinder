"use client";

import { Session } from "next-auth";
import React from "react";
import { LanguageProvider } from "../context/LanguageContext";
import { useIsClient } from "usehooks-ts";
import { SessionProvider } from "next-auth/react";

type NextAuthProvider = {
  children: React.ReactNode;
  session?: Session | null;
};

const RootProvider = ({ children, session }: NextAuthProvider) => {
  return (
    <main
      className={
        "light text-light-text bg-light-bg dark:text-dark-text dark:bg-dark-bg"
      }
    >
      <LanguageProvider>
        <SessionProvider session={session}>{children}</SessionProvider>
      </LanguageProvider>
    </main>
  );
};

export const AppRootProvider = ({ children, session }: NextAuthProvider) => {
  const isClient = useIsClient();
  return (
    <RootProvider key={isClient ? "0" : "1"} session={session}>
      {children}
    </RootProvider>
  );
};
