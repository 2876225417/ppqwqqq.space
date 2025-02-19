import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer"

// import ToolBox from "./components/utils/ToolBox";
// import Cursor from "./utils/cursor";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ppQwQqq",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <header>
          <Header />
        </header>

        {children}

        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
