import React from "react";
import "../app/globals.css";
import { Footer, Header } from "@/shared";
import { Session } from "next-auth";
import { NextAuthProvider } from "@/shared/appContainers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
  modal,
  session,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  session: Session;
}) {
  return (
    <html lang="en">
      <body>
        <div className="relative flex min-h-[100vh] flex-col justify-between">
          <NextAuthProvider session={session}>
            <Header />
            <div className="flex grow">
              <main className={`w-[100%] px-[5px] py-[10px]`}>
                {children}
                {modal}
              </main>
            </div>
            <Footer />
          </NextAuthProvider>
        </div>
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
