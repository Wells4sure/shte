import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Silver House Technology Enterprises Limited",
  description:
    "Zambia's premier technology partner — bespoke software, WhatsApp automation, bulk SMS, and Point of Sale systems built for your business.",
  keywords: [
    "Zambia tech",
    "software development",
    "WhatsApp automation",
    "POS system",
    "bulk SMS Zambia",
  ],
  openGraph: {
    title: "Silver House Technology Enterprises Limited",
    description: "Smart tech for smart Zambian businesses.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${syne.variable} ${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
