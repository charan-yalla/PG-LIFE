import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSession } from "@/lib/session";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "PG Life — Happiness per Square Foot",
  description: "Find the best high-end paying guest accommodations across India.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  const user = session.user ?? null;
  return (
    <html lang="en" className={outfit.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar user={user} />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
