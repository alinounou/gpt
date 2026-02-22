"use client";

import { PlaceholderCalculator } from "./PlaceholderCalculator";

export function SessionRangeCalculator() {
  return (
    <PlaceholderCalculator
      title="Session Range Analyzer"
      description="Analyze trading session highs, lows, and moves"
      inputs={["Session Open", "Session High", "Session Low", "Session Close"]}
      outputs={["Session Range", "% Change", "Volatility Score"]}
      formula="Range = High - Low, % Change = (Close - Open) / Open × 100"
    />
  );
}

export default SessionRangeCalculator;
