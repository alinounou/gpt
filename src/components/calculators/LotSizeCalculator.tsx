"use client";

import { PlaceholderCalculator } from "./PlaceholderCalculator";

export function LotSizeCalculator() {
  return (
    <PlaceholderCalculator
      title="Lot Size Calculator (Forex)"
      description="Calculate proper lot size for Forex trading"
      inputs={["Account Balance", "Risk Percentage", "Stop Loss (Pips)", "Currency Pair"]}
      outputs={["Lot Size", "Risk Amount", "Pip Value"]}
      formula="Lot Size = Risk Amount ÷ (Stop Loss Pips × Pip Value)"
    />
  );
}

export default LotSizeCalculator;
