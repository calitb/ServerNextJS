import Head from "next/head";

import Navbar from "./Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="initial-scale=1, viewport-fit=cover" />
      </Head>
      <body>
        <div className="flex max-h-screen min-h-screen min-w-[100vw] max-w-[100vw] flex-col bg-gray-100">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
