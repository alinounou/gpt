"use client";

import { PlaceholderCalculator } from "./PlaceholderCalculator";

export function RMultiplesCalculator() {
  return (
    <PlaceholderCalculator
      title="R-Multiples Calculator"
      description="Calculate R-multiples for trade evaluation and performance tracking"
      inputs={["Initial Risk (R)", "Actual Profit/Loss", "Number of Trades"]}
      outputs={["R-Multiple", "Total R", "Average R per Trade"]}
      formula="R-Multiple = Actual P/L ÷ Initial Risk"
    />
  );
}

export default RMultiplesCalculator;
