import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { analytics as firebaseanalytics } from "@/firebase";
import { logEvent } from "firebase/analytics";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Siso Dev",
  description: "Freelancer, Fullstack Developer",
};
firebaseanalytics && logEvent(firebaseanalytics, "Root Layout Loaded");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}`}
        async
        crossOrigin="anonymous"
      />
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
