"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { RightPanel } from "@/components/RightPanel";
import { getCalculatorBySlug } from "@/config/calculators";
import {
  FibonacciCalculator,
  PositionSizeCalculator,
  RiskRewardCalculator,
  BreakEvenCalculator,
  AtrStopCalculator,
  RMultiplesCalculator,
  CompoundingCalculator,
  PivotPointsCalculator,
  MarginLeverageCalculator,
  LotSizeCalculator,
  ProfitLossCalculator,
  AveragePriceCalculator,
  CorrelationCalculator,
  SharpeRatioCalculator,
  ExpectancyCalculator,
  KellyCriterionCalculator,
  TimeToTargetCalculator,
  SupportResistanceCalculator,
  SessionRangeCalculator,
  PositionRiskCalculator,
} from "@/components/calculators";
import { Badge } from "@/components/ui/badge";
import { Construction } from "lucide-react";

// Map calculator slugs to components
const calculatorComponents: Record<string, React.ComponentType> = {
  "fibonacci-retracement": FibonacciCalculator,
  "position-size": PositionSizeCalculator,
  "risk-reward": RiskRewardCalculator,
  "break-even": BreakEvenCalculator,
  "atr-stop": AtrStopCalculator,
  "r-multiples": RMultiplesCalculator,
  "compounding": CompoundingCalculator,
  "pivot-points": PivotPointsCalculator,
  "margin-leverage": MarginLeverageCalculator,
  "lot-size": LotSizeCalculator,
  "profit-loss": ProfitLossCalculator,
  "average-price": AveragePriceCalculator,
  "correlation": CorrelationCalculator,
  "sharpe-ratio": SharpeRatioCalculator,
  "expectancy": ExpectancyCalculator,
  "kelly-criterion": KellyCriterionCalculator,
  "time-to-target": TimeToTargetCalculator,
  "support-resistance": SupportResistanceCalculator,
  "session-range": SessionRangeCalculator,
  "position-risk": PositionRiskCalculator,
};

function CalculatorContent() {
  const searchParams = useSearchParams();
  const calcSlug = searchParams.get("calc") || "fibonacci-retracement";
  const calculator = getCalculatorBySlug(calcSlug);

  const CalculatorComponent = calculatorComponents[calcSlug];

  if (!calculator) {
    return (
      <div className="glass-card rounded-lg p-8 text-center">
        <Construction className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Calculator Not Found</h2>
        <p className="text-muted-foreground">
          Select a calculator from the sidebar to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl font-bold">{calculator.name}</h1>
          {calculator.isImplemented ? (
            <Badge className="bg-secondary/20 text-secondary">Available</Badge>
          ) : (
            <Badge className="bg-yellow-500/20 text-yellow-400">Coming Soon</Badge>
          )}
        </div>
        <p className="text-muted-foreground">{calculator.longDescription || calculator.shortDescription}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {calculator.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs border-primary/20">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Calculator Component */}
      {CalculatorComponent ? (
        <CalculatorComponent />
      ) : (
        <div className="glass-card rounded-lg p-8 text-center">
          <Construction className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
          <p className="text-muted-foreground">
            This calculator is currently under development.
          </p>
        </div>
      )}
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="glass-card rounded-lg p-8 text-center">
      <div className="animate-pulse">
        <div className="h-8 bg-muted rounded w-1/2 mx-auto mb-4"></div>
        <div className="h-4 bg-muted rounded w-3/4 mx-auto mb-2"></div>
        <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
      </div>
    </div>
  );
}

export default function CalculatorsClient() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-16 flex min-h-screen">
        {/* Left Sidebar */}
        <div className="fixed left-0 top-16 bottom-0 z-40 hidden md:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 md:ml-72 md:mr-72">
          <div className="p-4 sm:p-6 lg:p-8">
            <Suspense fallback={<LoadingFallback />}>
              <CalculatorContent />
            </Suspense>
          </div>
        </main>

        {/* Right Panel */}
        <div className="fixed right-0 top-16 bottom-0 z-40 hidden md:block">
          <RightPanel />
        </div>
      </div>

      {/* Mobile Warning */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-muted/90 backdrop-blur p-4 text-center text-xs text-muted-foreground z-50">
        For the best experience, use a desktop browser or rotate your device.
      </div>
    </div>
  );
}
