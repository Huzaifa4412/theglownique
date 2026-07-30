import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  DM_Sans,
  Manrope, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Glownique — Custom Neon Signs",
  description:
    "Custom LED neon signs for homes, weddings, businesses and events, handcrafted around your words and ideas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(dmSans.variable, manrope.variable, cormorant.variable, "font-sans", geist.variable)}>
      <body>{children}</body>
    </html>
  );
}
