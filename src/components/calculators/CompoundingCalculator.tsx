"use client";

import { PlaceholderCalculator } from "./PlaceholderCalculator";

export function CompoundingCalculator() {
  return (
    <PlaceholderCalculator
      title="Compounding Calculator"
      description="Calculate compound growth and future account value"
      inputs={["Starting Capital", "Monthly Return %", "Duration (Months)"]}
      outputs={["Final Value", "Total Growth %", "Monthly Breakdown"]}
      formula="FV = PV × (1 + r)^n"
    />
  );
}

export default CompoundingCalculator;
