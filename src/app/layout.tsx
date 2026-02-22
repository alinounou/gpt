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
  title: "أكاديمية التداول الذهبي | Gold Trading Academy - AI Analysis & Free Tools",
  description: "تداول الذهب باحترافية - تحليلات AI متقدمة، حواسب تداول دقيقة، أدوات مجانية. سعر الذهب الحي، تحليل XAUUSD، فيبوناتشي، إدارة المخاطر. Professional gold trading with AI analysis, free calculators, and live prices.",
  keywords: [
    "تداول الذهب",
    "Gold Trading",
    "XAUUSD",
    "تحليل الذهب",
    "Gold Analysis",
    "حاسبة تداول",
    "Trading Calculator",
    "فيبوناتشي",
    "Fibonacci",
    "AI Trading",
    "Infinity Algo Academy",
    "مؤشرات مجانية",
    "Free Indicators",
  ],
  authors: [{ name: "Jeremy - Infinity Algo Academy" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "أكاديمية التداول الذهبي | Gold Trading Academy",
    description: "AI-powered gold analysis, free trading calculators, and professional tools",
    url: "https://infinityalgoacademy.net/",
    siteName: "Gold Trading Academy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gold Trading Academy - AI Analysis & Free Tools",
    description: "Professional gold trading with AI analysis and free calculators",
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
    <html lang="ar" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=Roboto:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-yellow-400`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
