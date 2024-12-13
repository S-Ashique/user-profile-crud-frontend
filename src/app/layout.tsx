import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Newx | Home",
  description: "developed by ASQE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={""}>
        <main>{children}</main>
      </body>
    </html>
  );
}
