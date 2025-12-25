import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.sass";
import AuthSync from "@/components/AuthSync/AuthSync";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto Ticker",
  description: "Made by Ayush Chadha :D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <AuthSync />
        <body className={inter.className}>{children}</body>
      </Providers>
    </html>
  );
}
