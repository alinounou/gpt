"use client";

import { PlaceholderCalculator } from "./PlaceholderCalculator";

export function KellyCriterionCalculator() {
  return (
    <PlaceholderCalculator
      title="Kelly Criterion Calculator"
      description="Calculate optimal position size using Kelly Criterion"
      inputs={["Win Probability %", "Win/Loss Ratio", "Current Bankroll"]}
      outputs={["Kelly %", "Optimal Bet Size", "Half Kelly"]}
      formula="K% = W - [(1-W) / R]"
    />
  );
}

export default KellyCriterionCalculator;
