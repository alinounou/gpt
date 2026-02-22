"use client";

import { PlaceholderCalculator } from "./PlaceholderCalculator";

export function PositionRiskCalculator() {
  return (
    <PlaceholderCalculator
      title="Position Risk Calculator"
      description="Quick calculation of position risk as % of equity"
      inputs={["Position Size", "Entry Price", "Stop Loss", "Account Equity"]}
      outputs={["Risk Amount", "Risk %", "Position Value"]}
      formula="Risk % = (Position × |Entry - Stop|) ÷ Equity × 100"
    />
  );
}

export default PositionRiskCalculator;
