import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { fonts } from "./font";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "C1 Chat",
  description: "Generative UI App powered by Thesys C1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fonts.map((font) => font.variable).join(" ")}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
