"use client";

import { PlaceholderCalculator } from "./PlaceholderCalculator";

export function AveragePriceCalculator() {
  return (
    <PlaceholderCalculator
      title="Average Price Calculator (DCA)"
      description="Calculate average entry price for DCA positions"
      inputs={["Buy Price 1", "Quantity 1", "Buy Price 2", "Quantity 2"]}
      outputs={["Average Price", "Total Quantity", "Total Investment"]}
      formula="Avg Price = Total Cost ÷ Total Quantity"
    />
  );
}

export default AveragePriceCalculator;
