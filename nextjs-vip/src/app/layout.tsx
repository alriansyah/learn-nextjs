"use client";

import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [count, setCount] = useState(0);

  const handleClick = (): void => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main>
          <div>Layout: {count}</div>
          <button onClick={handleClick}>Layout Increment</button>
          {children}
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
      </body>
    </html>
  );
}
