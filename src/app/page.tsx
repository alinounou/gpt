"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  GoldCalculator,
  PositionSizeCalc,
  PivotPointsCalc,
  FibonacciCalc,
  RiskManagementCalc,
} from "@/components/calculators";
import {
  BrainCircuit,
  Calculator,
  TrendingUp,
  Gift,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Crown,
  Star,
  Download,
  BarChart3,
  Target,
  Shield,
  Zap,
  Globe,
  Menu,
  X,
} from "lucide-react";

// Translations
const translations = {
  ar: {
    title: "أكاديمية التداول الذهبي",
    subtitle: "تحليلات احترافية بالذكاء الاصطناعي",
    heroTitle: "تداول الذهب باحترافية",
    heroSubtitle: "تحليلات AI متقدمة • حواسب دقيقة • أدوات مجانية",
    startNow: "ابدأ الآن",
    tryAI: "جرب AI",
    goldAnalysis: "تحليل الذهب المباشر",
    currentPrice: "السعر الحالي",
    change: "التغير",
    analysis: "التحليل",
    calculators: "حواسب التداول",
    profitLoss: "حاسبة الربح/الخسارة",
    positionSize: "حجم المركز",
    pivotPoints: "نقاط الدوران",
    fibonacci: "فيبوناتشي",
    riskManagement: "إدارة المخاطر",
    products: "منتجات مجانية",
    freeGifts: "هدايا مجانية",
    download: "تحميل",
    visitAcademy: "زيارة الأكاديمية",
    academyDesc: "اكتشف أفضل أدوات التداول المجانية",
    footer: "جميع الحقوق محفوظة",
    poweredBy: "مدعوم من",
    goldLivePrice: "سعر الذهب الحي",
    buySignal: "إشارة شراء",
    sellSignal: "إشارة بيع",
    neutral: "محايد",
  },
  en: {
    title: "Gold Trading Academy",
    subtitle: "Professional AI-Powered Analysis",
    heroTitle: "Trade Gold Like a Pro",
    heroSubtitle: "Advanced AI Analysis • Precise Calculators • Free Tools",
    startNow: "Start Now",
    tryAI: "Try AI",
    goldAnalysis: "Live Gold Analysis",
    currentPrice: "Current Price",
    change: "Change",
    analysis: "Analysis",
    calculators: "Trading Calculators",
    profitLoss: "Profit/Loss Calculator",
    positionSize: "Position Size",
    pivotPoints: "Pivot Points",
    fibonacci: "Fibonacci",
    riskManagement: "Risk Management",
    products: "Free Products",
    freeGifts: "Free Gifts",
    download: "Download",
    visitAcademy: "Visit Academy",
    academyDesc: "Discover the best free trading tools",
    footer: "All Rights Reserved",
    poweredBy: "Powered by",
    goldLivePrice: "Live Gold Price",
    buySignal: "Buy Signal",
    sellSignal: "Sell Signal",
    neutral: "Neutral",
  },
};

// Free Products
const freeProducts = [
  { name: "AI Gold Scalp Pro", desc: "AI-powered gold scalping indicator", price: "$0", link: "https://infinityalgoacademy.net/" },
  { name: "ACD Indicator MT5", desc: "Advanced trend detection", price: "$0", link: "https://infinityalgoacademy.net/" },
  { name: "Arbitrage Detector", desc: "LuxAlgo arbitrage scanner", price: "$0", link: "https://infinityalgoacademy.net/" },
  { name: "Gold Fibonacci Pro", desc: "Auto Fibonacci levels", price: "$0", link: "https://infinityalgoacademy.net/" },
  { name: "RSI Divergence Scanner", desc: "Multi-timeframe RSI", price: "$0", link: "https://infinityalgoacademy.net/" },
  { name: "Support/Resistance Pro", desc: "Auto S/R detection", price: "$0", link: "https://infinityalgoacademy.net/" },
];

// Free Gifts
const freeGifts = [
  { name: "Gold Trading Guide PDF", desc: "Complete gold trading strategy", icon: "📘" },
  { name: "RSI Pro Indicator", desc: "Advanced RSI with alerts", icon: "📊" },
  { name: "Fibonacci Template", desc: "TradingView Fibonacci template", icon: "📐" },
  { name: "Risk Calculator Excel", desc: "Professional risk sheet", icon: "📋" },
];

export default function Home() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [goldPrice, setGoldPrice] = useState({ price: 5104.50, change: 0.85 });
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeCalc, setActiveCalc] = useState("profit");

  const t = translations[lang];
  const isRTL = lang === "ar";

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  // Mock gold price update
  useEffect(() => {
    const interval = setInterval(() => {
      setGoldPrice(prev => ({
        price: prev.price + (Math.random() - 0.5) * 2,
        change: prev.change + (Math.random() - 0.5) * 0.1,
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen bg-black text-yellow-400 ${isRTL ? "font-arabic" : "font-english"}`}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-yellow-500/20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Crown className="h-8 w-8 text-yellow-400" />
            <span className="text-xl font-bold gold-gradient">{t.title}</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="#analysis" className="text-yellow-400/80 hover:text-yellow-400 transition">
              {t.goldAnalysis}
            </Link>
            <Link href="#calculators" className="text-yellow-400/80 hover:text-yellow-400 transition">
              {t.calculators}
            </Link>
            <Link href="#products" className="text-yellow-400/80 hover:text-yellow-400 transition">
              {t.products}
            </Link>
            <Link href="https://infinityalgoacademy.net/" target="_blank" className="text-yellow-400/80 hover:text-yellow-400 transition">
              {t.visitAcademy}
            </Link>
          </div>

          {/* Language Toggle & CTA */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/20"
            >
              <Globe className="h-4 w-4 mr-1" />
              {lang === "ar" ? "EN" : "عربي"}
            </Button>
            <Link href="/ai">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-500 gold-glow">
                <BrainCircuit className="h-4 w-4 mr-1" />
                {t.tryAI}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-6xl mx-auto text-center relative">
          {/* Live Gold Price Badge */}
          <div className="inline-flex items-center gap-4 bg-black/50 border border-yellow-500/30 rounded-full px-6 py-3 mb-8 gold-glow">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400 animate-pulse" />
              <span className="text-sm text-yellow-400/80">{t.goldLivePrice}</span>
            </div>
            <div className="h-6 w-px bg-yellow-500/30" />
            <div className="text-center">
              <span className="text-2xl font-bold text-yellow-400">${goldPrice.price.toFixed(2)}</span>
              <span className={`text-sm mr-2 ${goldPrice.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                {goldPrice.change >= 0 ? "+" : ""}{goldPrice.change.toFixed(2)}%
              </span>
            </div>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              {t.buySignal} 📈
            </Badge>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="gold-gradient">{t.heroTitle}</span>
          </h1>
          <p className="text-lg md:text-xl text-yellow-400/70 max-w-2xl mx-auto mb-8">
            {t.heroSubtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="#calculators">
              <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500 gold-glow gold-glow-hover px-8">
                <Calculator className="h-5 w-5 mr-2" />
                {t.startNow}
              </Button>
            </Link>
            <Link href="/ai">
              <Button size="lg" variant="outline" className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 px-8">
                <BrainCircuit className="h-5 w-5 mr-2" />
                {t.tryAI}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Gold Analysis Section with TradingView */}
      <section id="analysis" className="py-16 px-4 bg-gradient-to-b from-black via-yellow-500/5 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 gold-gradient">
            {t.goldAnalysis}
          </h2>
          <p className="text-center text-yellow-400/60 mb-8">
            {t.analysis} • XAUUSD • TradingView
          </p>

          {/* TradingView Chart */}
          <Card className="luxury-card overflow-hidden">
            <CardContent className="p-0">
              <div className="tradingview-widget-container" style={{ height: "500px" }}>
                <iframe
                  src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_widget&symbol=OANDA%3AXAUUSD&interval=D&symboledit=1&saveimage=1&toolbarbg=F1F3F6&studies=%5B%5D&theme=dark&style=1&timezone=Asia%2FBahrain&showPopups=1&locale=ar&showpopupbtn=1"
                  style={{ width: "100%", height: "100%", margin: "0 !important" }}
                  frameBorder="0"
                  allowTransparency={true}
                  scrolling="no"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Calculators Section */}
      <section id="calculators" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 gold-gradient">
            {t.calculators}
          </h2>
          <p className="text-center text-yellow-400/60 mb-8">
            Professional Trading Tools
          </p>

          {/* Calculator Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { id: "profit", label: t.profitLoss, icon: TrendingUp },
              { id: "position", label: t.positionSize, icon: Target },
              { id: "pivot", label: t.pivotPoints, icon: BarChart3 },
              { id: "fib", label: t.fibonacci, icon: Calculator },
              { id: "risk", label: t.riskManagement, icon: Shield },
            ].map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveCalc(tab.id)}
                className={`${
                  activeCalc === tab.id
                    ? "bg-yellow-400 text-black"
                    : "bg-transparent border border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/20"
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Calculator Content */}
          <Card className="luxury-card">
            <CardContent className="p-6">
              {activeCalc === "profit" && <GoldCalculator lang={lang} />}
              {activeCalc === "position" && <PositionSizeCalc lang={lang} />}
              {activeCalc === "pivot" && <PivotPointsCalc lang={lang} />}
              {activeCalc === "fib" && <FibonacciCalc lang={lang} />}
              {activeCalc === "risk" && <RiskManagementCalc lang={lang} />}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 px-4 bg-gradient-to-b from-black via-yellow-500/5 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 gold-gradient">
            {t.products}
          </h2>
          <p className="text-center text-yellow-400/60 mb-8">
            {t.academyDesc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {freeProducts.map((product, i) => (
              <Card key={i} className="luxury-card hover:border-yellow-500/50 transition-all group">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-yellow-400 group-hover:text-yellow-300">
                        {product.name}
                      </h3>
                      <p className="text-sm text-yellow-400/60">{product.desc}</p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      {product.price}
                    </Badge>
                  </div>
                  <a href={product.link} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="w-full border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/20">
                      <Download className="h-4 w-4 mr-2" />
                      {t.download}
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Academy Banner */}
          <Card className="luxury-card mt-8 border-yellow-500/30 gold-glow">
            <CardContent className="p-8 text-center">
              <Crown className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold gold-gradient mb-2">Infinity Algo Academy</h3>
              <p className="text-yellow-400/70 mb-4">
                {t.academyDesc}
              </p>
              <a href="https://infinityalgoacademy.net/" target="_blank" rel="noopener noreferrer">
                <Button className="bg-yellow-400 text-black hover:bg-yellow-500 gold-glow">
                  {t.visitAcademy}
                  <ExternalLink className="h-4 w-4 mr-2" />
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Free Gifts Section */}
      <section id="gifts" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 gold-gradient">
            {t.freeGifts}
          </h2>
          <p className="text-center text-yellow-400/60 mb-8">
            🎁 Free Trading Resources
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {freeGifts.map((gift, i) => (
              <Card key={i} className="luxury-card hover:border-yellow-500/50 transition-all cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <div className="text-4xl mb-3">{gift.icon}</div>
                  <h3 className="font-bold text-yellow-400 group-hover:text-yellow-300 mb-1">
                    {gift.name}
                  </h3>
                  <p className="text-xs text-yellow-400/60 mb-3">{gift.desc}</p>
                  <Button variant="outline" size="sm" className="w-full border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/20">
                    <Gift className="h-4 w-4 mr-2" />
                    {t.download}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-yellow-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Crown className="h-6 w-6 text-yellow-400" />
              <span className="text-lg font-bold gold-gradient">{t.title}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-yellow-400/60">
              <a href="https://infinityalgoacademy.net/" target="_blank" className="hover:text-yellow-400">
                {t.poweredBy} Infinity Algo Academy
              </a>
            </div>
            <p className="text-xs text-yellow-400/40">
              © 2024 {t.footer}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
