import type { Metadata } from "next";
import "./globals.css";
import { TopNavBar } from "@/components/TopNavBar";

export const metadata: Metadata = {
  title: "Seerah Q&A",
  description:
    "Ask about the Seerah and receive answers grounded in approved Shamail and Seerah Timeline sources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@600;700&display=swap"
          rel="stylesheet"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <TopNavBar />
        {children}
      </body>
    </html>
  );
}
