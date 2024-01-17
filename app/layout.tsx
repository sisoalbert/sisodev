import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { getAnalytics, logEvent } from "firebase/analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Siso Dev",
  description: "Freelancer, Fullstack Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const firebaseAnalytics = getAnalytics();
  logEvent(firebaseAnalytics, "notification_received");
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
