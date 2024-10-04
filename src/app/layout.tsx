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
        <TonConnectUIProvider>
          <Header />
          {children}
        </TonConnectUIProvider>
      </body>
    </html>
  );
}
