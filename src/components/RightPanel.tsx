"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Lightbulb,
  Shield,
  TrendingUp,
  ExternalLink,
  GraduationCap,
  Target,
} from "lucide-react";

const tips = [
  {
    title: "Risk Management Rule",
    content: "Never risk more than 1-2% of your account on a single trade. This ensures you can survive a series of losses.",
    icon: Shield,
  },
  {
    title: "Fibonacci Golden Ratio",
    content: "The 61.8% retracement level is considered the most important. Look for confluence with other support/resistance.",
    icon: Target,
  },
  {
    title: "Position Sizing",
    content: "Calculate your position size before entering a trade. Many traders fail because they size positions based on emotion.",
    icon: TrendingUp,
  },
];

const riskReminders = [
  "Use stop-loss orders on every trade",
  "Don't over-leverage your account",
  "Diversify across multiple instruments",
  "Keep a trading journal",
  "Review your trades weekly",
];

export function RightPanel() {
  const [currentTip, setCurrentTip] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="w-72 glass-card border-l border-primary/20 flex flex-col h-full overflow-hidden">
      {/* Tips Section */}
      <div className="p-4 border-b border-primary/10">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-yellow-500" />
          Trading Tips
        </h3>
        <div className="bg-muted/30 rounded-lg p-3 animate-fadeIn" key={currentTip}>
          <p className="text-sm font-medium text-foreground">
            {tips[currentTip].title}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {tips[currentTip].content}
          </p>
        </div>
        <div className="flex justify-center gap-1 mt-2">
          {tips.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                index === currentTip ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Risk Reminders */}
      <div className="p-4 border-b border-primary/10">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Shield className="h-4 w-4 text-secondary" />
          Risk Reminders
        </h3>
        <ul className="space-y-2">
          {riskReminders.slice(0, 3).map((reminder, index) => (
            <li key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
              <span className="text-secondary mt-0.5">✓</span>
              {reminder}
            </li>
          ))}
        </ul>
      </div>

      {/* Academy Promotion */}
      <div className="p-4 flex-1">
        <Card className="bg-gradient-to-br from-primary/20 to-secondary/10 border-primary/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-primary" />
              Infinity Algo Academy
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xs text-muted-foreground mb-3">
              Learn professional trading strategies, risk management, and technical analysis 
              at Infinity Algo Academy.
            </p>
            <Button
              asChild
              size="sm"
              className="w-full bg-primary hover:bg-primary/90"
            >
              <a
                href="https://infinityalgoacademy.net/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Academy
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-primary/10">
        <p className="text-xs text-muted-foreground text-center">
          Built for serious traders
        </p>
        <p className="text-xs text-muted-foreground text-center mt-1">
          All tools are 100% free
        </p>
      </div>
    </aside>
  );
}

export default RightPanel;
