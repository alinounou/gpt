import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Infinity Algo by Jeremy | Free Pro-Grade Trading Calculators & AI Analysis",
  description: "Free professional trading calculators including Fibonacci, Position Size, Risk-Reward, and AI-powered market analysis. Built for serious traders by Infinity Algo Academy.",
  keywords: [
    "trading calculator",
    "fibonacci calculator",
    "position size calculator",
    "risk reward calculator",
    "free trading tools",
    "forex calculator",
    "ATR stop loss",
    "trading AI",
    "market analysis",
    "Infinity Algo Academy",
  ],
  authors: [{ name: "Jeremy - Infinity Algo" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Infinity Algo by Jeremy | Free Trading Calculators",
    description: "Professional-grade trading calculators and AI analysis tools. 100% free.",
    url: "https://infinityalgo.com",
    siteName: "Infinity Algo",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Infinity Algo - Free Trading Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Infinity Algo by Jeremy",
    description: "Free pro-grade trading calculators & AI analysis",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
