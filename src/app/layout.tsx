import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TChildren } from "@/components/types";
import QueryProvider from "@/components/providers/tanstack-query";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Newx | Home",
  description: "developed by ASQE",
};

export default function RootLayout({ children }: Readonly<TChildren>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          <main className="min-h-screen relative overflow-x-clip">
            {children}
          </main>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
