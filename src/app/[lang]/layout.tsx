import { Cairo, Raleway } from "next/font/google";
import React from "react";
import { AppRootProvider, Footer, Header, ThemeProvider } from "@/shared";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { dir } from "i18next";
import { languages } from "../i18n/settings";
import { getSession } from "next-auth/react";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
  // fallback: ["Arial", "initial"],
});

const cairo = Cairo({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-cairo",
});

export async function generateMetadata({ params }: any) {
  const locale = params.lang || "en";
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

export default async function RootLayout({
  children,
  modal,
  params,
}: Readonly<{
  children: React.ReactNode;
  modal?: React.ReactNode;
  params: { lang: string };
}>) {
  const session = await getSession();
  return (
    <html lang={params.lang} dir={dir(params.lang)}>
      <Head>
        <link rel="shortcut icon" href="@/assets/images/favicon.ico" />
      </Head>
      <body className={`${raleway.variable} ${cairo.variable}`}>
        <ThemeProvider>
          <AppRootProvider session={session}>
            <div className="relative flex min-h-[100vh] flex-col justify-between">
              <Header lang={params.lang} />
              <div className="flex grow">
                <div className={`w-[100%] p-2`}>
                  {children}
                  {modal}
                </div>
              </div>
              <Footer lang={params.lang} />
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
