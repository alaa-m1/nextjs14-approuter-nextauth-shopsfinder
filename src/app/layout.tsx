import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer, Header, NextAuthProvider, ThemeProvider } from "@/shared";
import { Session } from "next-auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shops Finder Web App",
  description: "Next.js App Router",
};

export default function RootLayout({
  children,
  modal,
  session,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
  session: Session;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <NextAuthProvider session={session}>
            <div className="relative flex min-h-[100vh] flex-col justify-between">
              <Header />
              <div className="flex grow">
                <main className={`w-[100%] px-[5px] py-[10px]`}>
                  {children}
                  {modal}
                </main>
              </div>
              <Footer />
            </div>
          </NextAuthProvider>
        </ThemeProvider>
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
