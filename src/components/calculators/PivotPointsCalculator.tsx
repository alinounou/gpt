"use client";

import { PlaceholderCalculator } from "./PlaceholderCalculator";

export function PivotPointsCalculator() {
  return (
    <PlaceholderCalculator
      title="Pivot Points Calculator"
      description="Calculate classic, Woodie, and Fibonacci pivot points"
      inputs={["Previous High", "Previous Low", "Previous Close"]}
      outputs={["Pivot Point", "Support Levels (S1-S3)", "Resistance Levels (R1-R3)"]}
      formula="PP = (High + Low + Close) / 3"
    />
  );
}

export default PivotPointsCalculator;
