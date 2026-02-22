"use client";

import { PlaceholderCalculator } from "./PlaceholderCalculator";

export function ProfitLossCalculator() {
  return (
    <PlaceholderCalculator
      title="Profit/Loss Calculator"
      description="Calculate profit or loss for any trade"
      inputs={["Entry Price", "Exit Price", "Position Size", "Direction"]}
      outputs={["P&L (Pips)", "P&L (Currency)", "Return %"]}
      formula="P&L = (Exit - Entry) × Position Size"
    />
  );
}

export default ProfitLossCalculator;
