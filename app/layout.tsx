import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { analytics as firebaseanalytics } from "@/firebase";
import { logEvent } from "firebase/analytics";

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
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
