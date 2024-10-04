"use client";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import "./globals.css";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <TonConnectUIProvider manifestUrl="https://talking-ton.vercel.app/tonconnect-manifest.json">
          <Header />
          {children}
        </TonConnectUIProvider>
      </body>
    </html>
  );
}
