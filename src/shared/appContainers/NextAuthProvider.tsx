"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

type NextAuthProvider = {
  children: React.ReactNode;
  session: Session;
};
export const NextAuthProvider = ({ children, session }: NextAuthProvider) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

import { createContext } from "react";

export const ThemeContext = createContext({});

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>;
}
