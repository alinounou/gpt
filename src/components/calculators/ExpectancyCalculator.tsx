"use client";

import { PlaceholderCalculator } from "./PlaceholderCalculator";

export function ExpectancyCalculator() {
  return (
    <PlaceholderCalculator
      title="Expectancy Calculator"
      description="Calculate trading system expectancy from win rate"
      inputs={["Win Rate %", "Average Win", "Average Loss", "Number of Trades"]}
      outputs={["Expectancy", "Expected Value per Trade", "System Rating"]}
      formula="E = (Win% × Avg Win) - (Loss% × Avg Loss)"
    />
  );
}

export default ExpectancyCalculator;
