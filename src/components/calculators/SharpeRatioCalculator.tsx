"use client";

import { PlaceholderCalculator } from "./PlaceholderCalculator";

export function SharpeRatioCalculator() {
  return (
    <PlaceholderCalculator
      title="Sharpe Ratio Calculator"
      description="Calculate risk-adjusted returns for your strategy"
      inputs={["Average Return %", "Risk-Free Rate %", "Standard Deviation %"]}
      outputs={["Sharpe Ratio", "Risk-Adjusted Return", "Rating"]}
      formula="Sharpe = (Return - Risk-Free Rate) ÷ Std Dev"
    />
  );
}

export default SharpeRatioCalculator;
