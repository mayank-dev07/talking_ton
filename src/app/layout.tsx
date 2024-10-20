"use client";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import "./globals.css";
// import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <TonConnectUIProvider manifestUrl="https://talkington-git-main-mayanks-projects-fd3fa856.vercel.app/assets/tonconnect-manifest.json">
          {/* <Header /> */}
          {children}
        </TonConnectUIProvider>
      </body>
    </html>
  );
}
