"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getFeaturedCalculators } from "@/config/calculators";
import {
  Calculator,
  BrainCircuit,
  TrendingUp,
  Target,
  Activity,
  Zap,
  Shield,
  BarChart3,
  ExternalLink,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI-Enhanced Analysis",
    description: "Get intelligent market insights with our AI assistant. Analyze any market with natural language queries in Arabic or English.",
  },
  {
    icon: Calculator,
    title: "20+ Pro Calculators",
    description: "Professional-grade trading calculators for position sizing, Fibonacci levels, risk management, and more.",
  },
  {
    icon: Shield,
    title: "100% Free Tools",
    description: "All calculators and analysis tools are completely free. No sign-up required. Built by traders, for traders.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Real-time calculations with no page reloads. Copy results to your clipboard and use them immediately.",
  },
];

export default function HomePage() {
  const featuredCalculators = getFeaturedCalculators();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto relative">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo size="lg" />
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4">
            <span className="gradient-text">Professional Trading Tools</span>
            <br />
            <span className="text-foreground">Made Simple</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-8">
            Free pro-grade calculators + AI-powered market analysis. 
            Built for serious traders who demand precision.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Link href="/calculators">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                <Calculator className="mr-2 h-5 w-5" />
                Open Calculators
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/ai">
              <Button size="lg" variant="outline" className="border-primary/30 text-lg px-8 py-6">
                <BrainCircuit className="mr-2 h-5 w-5" />
                Ask AI
              </Button>
            </Link>
          </div>

          {/* Academy Link */}
          <div className="flex justify-center">
            <Link
              href="https://infinityalgoacademy.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <GraduationCap className="h-4 w-4" />
              <span>Learn more at Infinity Algo Academy</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Calculators */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            Featured Calculators
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
            Our most popular tools used by thousands of traders worldwide
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCalculators.map((calc) => {
              const IconComponent = calc.icon;
              return (
                <Link key={calc.id} href={`/calculators?calc=${calc.slug}`}>
                  <Card className="glass-card glass-card-hover h-full cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        {calc.isNew && (
                          <Badge className="bg-secondary text-secondary-foreground text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg">{calc.name}</CardTitle>
                      <CardDescription>{calc.shortDescription}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1">
                        {calc.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs border-primary/20">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link href="/calculators">
              <Button variant="outline" className="border-primary/30">
                View All 20+ Calculators
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Infinity Algo */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            Why Infinity Algo?
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Built by traders who understand what you need
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="glass-card border-primary/10">
                  <CardContent className="pt-6">
                    <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Analysis Teaser */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6">
              <BrainCircuit className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              AI-Powered Market Analysis
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Ask questions in Arabic or English. Get structured analysis with bias, key levels, 
              and risk scenarios. Works with any market - Forex, Crypto, Stocks, and more.
            </p>
            <div className="bg-muted/30 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-muted-foreground mb-2">Example queries:</p>
              <ul className="text-sm space-y-1">
                <li className="text-foreground">• "حلل لي الذهب على فريم الساعة مع التركيز على فيبوناتشي"</li>
                <li className="text-foreground">• "Analyze EUR/USD with focus on support/resistance zones"</li>
                <li className="text-foreground">• "What's the risk-reward for BTC at current levels?"</li>
              </ul>
            </div>
            <Link href="/ai">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Try AI Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Academy Strip */}
      <section className="py-12 px-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground mb-4">
            Want to learn professional trading strategies?
          </p>
          <Link
            href="https://infinityalgoacademy.net/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" variant="outline" className="border-primary/30 text-lg">
              <GraduationCap className="mr-2 h-5 w-5" />
              Visit Infinity Algo Academy
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-primary/10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Logo size="sm" />
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/calculators" className="hover:text-foreground transition-colors">
                Calculators
              </Link>
              <Link href="/ai" className="hover:text-foreground transition-colors">
                AI Analysis
              </Link>
              <Link href="/about" className="hover:text-foreground transition-colors">
                About
              </Link>
              <Link
                href="https://infinityalgoacademy.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Academy
              </Link>
            </div>
          </div>
          <div className="mt-6 text-center text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} Infinity Algo by Jeremy. All rights reserved.</p>
            <p className="mt-1">
              Powered by{" "}
              <Link
                href="https://infinityalgoacademy.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Infinity Algo Academy
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
