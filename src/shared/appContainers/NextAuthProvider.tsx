"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { useTheme } from "next-themes";
import React from "react";

type NextAuthProvider = {
  children: React.ReactNode;
  session: Session;
};

export const NextAuthProvider = ({ children, session }: NextAuthProvider) => {
  const { theme } = useTheme();
  return (
    <main className={theme==="dark"?"dark text-foreground bg-background":"light text-foreground bg-background"}>
      <SessionProvider session={session}>{children}</SessionProvider>
    </main>
  );
};
