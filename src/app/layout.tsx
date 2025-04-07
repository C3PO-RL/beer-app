import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Beer App",
  description: "Order beers with friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navigation />
          <main className="flex-1 max-w-screen-xl w-full mx-auto bg-white shadow-sm">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
