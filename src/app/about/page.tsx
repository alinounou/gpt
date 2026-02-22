"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  BrainCircuit,
  Shield,
  Zap,
  GraduationCap,
  ExternalLink,
  Target,
  Users,
  Heart,
} from "lucide-react";

const stats = [
  { label: "Calculators", value: "20+" },
  { label: "Free Tools", value: "100%" },
  { label: "Languages", value: "AR/EN" },
  { label: "Markets", value: "All" },
];

const values = [
  {
    icon: Shield,
    title: "Built for Serious Traders",
    description:
      "We create tools that professional traders actually need. No fluff, no gimmicks—just practical calculators and analysis that help you make better trading decisions.",
  },
  {
    icon: Zap,
    title: "Free Forever",
    description:
      "All our tools are completely free. No hidden fees, no premium tiers, no sign-up required. We believe every trader deserves access to professional-grade tools.",
  },
  {
    icon: Target,
    title: "Accuracy First",
    description:
      "Our calculators use industry-standard formulas and methodologies. We prioritize accuracy and reliability because we know how important precision is in trading.",
  },
  {
    icon: Heart,
    title: "Community Driven",
    description:
      "Built by traders, for traders. We listen to feedback and continuously improve our tools based on what the community actually needs.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Logo size="lg" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              About Infinity Algo
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional trading tools built with passion by Jeremy and the 
              Infinity Algo Academy team.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, index) => (
              <Card key={index} className="glass-card text-center">
                <CardContent className="pt-6">
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Story */}
          <Card className="glass-card mb-12">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Infinity Algo was born from a simple frustration: most trading calculators 
                  online were either outdated, inaccurate, or hidden behind paywalls. As 
                  traders ourselves, we knew there had to be a better way.
                </p>
                <p>
                  Jeremy, the founder, started building these tools for personal use. 
                  Friends and fellow traders kept asking for access, and eventually, 
                  Infinity Algo became a public project. Today, thousands of traders 
                  worldwide use our calculators daily.
                </p>
                <p>
                  Our mission is simple: provide every trader—regardless of experience 
                  or budget—with access to professional-grade tools that actually work.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Values */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">What We Stand For</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card key={index} className="glass-card">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">{value.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {value.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Academy Connection */}
          <Card className="glass-card bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30 mb-12">
            <CardContent className="pt-8">
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <GraduationCap className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-2">
                    Powered by Infinity Algo Academy
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Infinity Algo Academy is our educational platform where you can learn 
                    professional trading strategies, risk management techniques, and 
                    technical analysis. Join thousands of students who have transformed 
                    their trading journey.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="https://infinityalgoacademy.net/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="bg-primary hover:bg-primary/90">
                        <GraduationCap className="mr-2 h-4 w-4" />
                        Visit Academy
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tools Overview */}
          <Card className="glass-card mb-12">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold mb-4">Our Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Calculator className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">20+ Trading Calculators</h3>
                    <p className="text-sm text-muted-foreground">
                      Fibonacci, Position Size, Risk-Reward, ATR Stop, and many more.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BrainCircuit className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">AI Market Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Get intelligent analysis with bias, levels, and scenarios.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">Ready to Start?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/calculators">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Calculator className="mr-2 h-4 w-4" />
                  Open Calculators
                </Button>
              </Link>
              <Link href="/ai">
                <Button size="lg" variant="outline" className="border-primary/30">
                  <BrainCircuit className="mr-2 h-4 w-4" />
                  Try AI Analysis
                </Button>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Infinity Algo by Jeremy. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
