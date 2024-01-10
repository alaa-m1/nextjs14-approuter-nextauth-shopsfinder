import React from 'react';
import '../app/globals.css';
import { Footer, Header } from '@/shared';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
          <div className='relative flex min-h-[100vh] flex-col justify-between'>
            <Header />
            <div className='flex grow'>
              <main className={`w-[100%] px-[5px] py-[10px]`}>{children}</main>
            </div>
            <Footer />
          </div>
      </body>
    </html>
  );
}
