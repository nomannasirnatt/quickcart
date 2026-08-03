import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Header from "@/components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuickCart — Next.js + dummy backend sample",
  description:
    "A small Next.js App Router demo that reads its data from built-in API routes. Ready to deploy on Vercel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Header />
        {children}
        <footer className="border-t border-black/10 dark:border-white/10">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-5 py-6 text-sm text-black/50 dark:text-white/50">
            <span>QuickCart — sample app, data from in-app API routes.</span>
            <a
              className="underline underline-offset-4 hover:text-foreground"
              href="https://nextjs.org/docs/app"
              target="_blank"
              rel="noreferrer"
            >
              Next.js App Router docs
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
