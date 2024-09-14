import type { Metadata } from "next";
import { Cairo, Roboto } from "next/font/google";
import "../globals.css";
import React from "react";
import { AppRootProvider, Footer, Header, ThemeProvider } from "@/shared";
import { Session } from "next-auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { dir } from "i18next";
import { languages } from "../i18n/settings";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: '--font-roboto',
});

const cairo = Cairo({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["arabic"],
  display: "swap",
  variable: '--font-cairo',
});

export const metadata: Metadata = {
  title: 'Shops Finder',
  description: 'Shoping becomes easy with us',
}

export default function RootLayout({
  children,
  modal,
  session,
  params
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
  session: Session;
  params:{lang:string}
}>) {
  return (
    <html lang={params.lang} dir={dir(params.lang)}>
      <Head>
      <link rel="shortcut icon" href="@/assets/images/favicon.ico" />
    </Head>
      <body className={`${roboto.variable} ${cairo.variable}`}>
        <ThemeProvider>
          <AppRootProvider session={session}>
            <div className="relative flex min-h-[100vh] flex-col justify-between">
              <Header lang={params.lang}/>
              <div className="flex grow">
                <div className={`w-[100%]`}>
                  {children}
                  {modal}
                </div>
              </div>
              <Footer lng={params.lang}/>
            </div>
          </AppRootProvider>
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
