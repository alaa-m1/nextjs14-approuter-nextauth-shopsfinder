import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: 'Shops Finder',
  description: 'Shoping becomes easy with us',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>
}
