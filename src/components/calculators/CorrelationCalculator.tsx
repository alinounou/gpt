"use client";

import { PlaceholderCalculator } from "./PlaceholderCalculator";

export function CorrelationCalculator() {
  return (
    <PlaceholderCalculator
      title="Correlation Calculator"
      description="Calculate correlation coefficient between two assets"
      inputs={["Asset 1 Returns (comma separated)", "Asset 2 Returns (comma separated)"]}
      outputs={["Correlation Coefficient", "Correlation Strength", "Interpretation"]}
      formula="r = Σ(X-X̄)(Y-Ȳ) / √[Σ(X-X̄)² × Σ(Y-Ȳ)²]"
    />
  );
}

export default CorrelationCalculator;
