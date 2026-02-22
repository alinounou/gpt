"use client";

import { PlaceholderCalculator } from "./PlaceholderCalculator";

export function TimeToTargetCalculator() {
  return (
    <PlaceholderCalculator
      title="Time to Target Calculator"
      description="Estimate time to reach profit targets using CAGR"
      inputs={["Starting Capital", "Target Capital", "Expected CAGR %"]}
      outputs={["Years to Target", "Months to Target", "Growth Chart"]}
      formula="Years = ln(Target/Start) ÷ ln(1 + CAGR)"
    />
  );
}

export default TimeToTargetCalculator;
