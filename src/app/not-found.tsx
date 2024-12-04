import React from "react";
import { Cairo, Raleway } from "next/font/google";
import "./globals.css";
import {
  Footer,
  AppRootProvider,
  NotFoundSecion,
  ThemeProvider,
} from "@/shared";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { dir } from "i18next";
import { headers } from "next/headers";

const raleway = Raleway({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});

const cairo = Cairo({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-cairo",
});

export async function generateMetadata() {
  const headersList = headers();
  const referer = headersList.get("referer") || "";

  const pathSegments = referer.split("/").filter(Boolean);
  const locale = pathSegments[2] || "en";
  let title;

  if (locale === "en") {
    title = "Shops Finder - your best choice";
  } else if (locale === "de") {
    title = "Shops-Finder - Ihre beste Wahl";
  } else {
    title = "Shops-Finder - اختيارك الأفضل";
  }
  let description;

  if (locale === "en") {
    description = "Shopping becomes easy with us";
  } else if (locale === "de") {
    description = "Mit uns wird Einkaufen einfach";
  } else {
    description = "التسوق يصبح سهلا معنا";
  }

  return {
    metadataBase: new URL(process.env.NEXTAUTH_URL!),
    title,

    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function NotFound({
  params,
}: Readonly<{
  params: { lang: string };
}>) {
  return (
    <html lang={params?.lang ?? "ltr"} dir={dir(params?.lang ?? "ltr")}>
      <Head>
        <link rel="shortcut icon" href="@/assets/images/favicon.ico" />
      </Head>
      <body className={`${raleway.variable} ${cairo.variable}`}>
        <ThemeProvider>
          <AppRootProvider>
            <div className="relative flex min-h-[100vh] flex-col justify-between">
              <div className="flex grow">
                <div className={`w-[100%]`}>
                  <NotFoundSecion />
                </div>
              </div>
              <Footer lang={params?.lang ?? "ltr"} />
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
