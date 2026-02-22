"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Target, Info, Plus, Trash2, Calculator } from "lucide-react";

interface Position {
  id: string;
  price: string;
  size: string;
}

interface BreakEvenResult {
  averagePrice: number;
  totalSize: number;
  totalValue: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
}

export function BreakEvenCalculator() {
  const [positions, setPositions] = useState<Position[]>([
    { id: "1", price: "100", size: "10" },
    { id: "2", price: "95", size: "15" },
  ]);
  const [currentPrice, setCurrentPrice] = useState<string>("98");

  const addPosition = () => {
    setPositions([
      ...positions,
      { id: Date.now().toString(), price: "", size: "" },
    ]);
  };

  const removePosition = (id: string) => {
    if (positions.length > 1) {
      setPositions(positions.filter((p) => p.id !== id));
    }
  };

  const updatePosition = (id: string, field: "price" | "size", value: string) => {
    setPositions(
      positions.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const result = useMemo((): BreakEvenResult | null => {
    const current = parseFloat(currentPrice);
    if (isNaN(current) || current <= 0) return null;

    let totalValue = 0;
    let totalSize = 0;

    for (const pos of positions) {
      const price = parseFloat(pos.price);
      const size = parseFloat(pos.size);
      if (isNaN(price) || isNaN(size) || price <= 0 || size <= 0) continue;
      totalValue += price * size;
      totalSize += size;
    }

    if (totalSize === 0) return null;

    const averagePrice = totalValue / totalSize;
    const pnl = (current - averagePrice) * totalSize;
    const pnlPercent = ((current - averagePrice) / averagePrice) * 100;

    return {
      averagePrice,
      totalSize,
      totalValue,
      currentPrice: current,
      pnl,
      pnlPercent,
    };
  }, [positions, currentPrice]);

  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  return (
    <Card className="glass-card glass-card-hover">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Break-Even Calculator (DCA)
            </CardTitle>
            <CardDescription className="mt-1">
              Calculate average entry price for multiple positions
            </CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Info className="h-4 w-4 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p className="text-sm">
                  <strong>How it works:</strong> Perfect for Dollar-Cost Averaging (DCA). 
                  Enter all your positions to find your average entry price and current P&L.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Positions Input */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-muted-foreground">Your Positions</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={addPosition}
              className="border-primary/30 text-primary"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Position
            </Button>
          </div>

          <div className="space-y-2">
            {positions.map((pos, index) => (
              <div key={pos.id} className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded bg-muted text-xs font-medium">
                  #{index + 1}
                </div>
                <Input
                  type="number"
                  placeholder="Price"
                  value={pos.price}
                  onChange={(e) => updatePosition(pos.id, "price", e.target.value)}
                  className="flex-1 bg-muted/50 border-primary/20 focus:border-primary"
                />
                <Input
                  type="number"
                  placeholder="Size"
                  value={pos.size}
                  onChange={(e) => updatePosition(pos.id, "size", e.target.value)}
                  className="flex-1 bg-muted/50 border-primary/20 focus:border-primary"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removePosition(pos.id)}
                  disabled={positions.length <= 1}
                  className="h-10 w-10"
                >
                  <Trash2 className="h-4 w-4 text-red-400" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Current Price */}
        <div className="space-y-2">
          <Label htmlFor="currentPrice" className="text-muted-foreground">
            Current Market Price
          </Label>
          <Input
            id="currentPrice"
            type="number"
            value={currentPrice}
            onChange={(e) => setCurrentPrice(e.target.value)}
            placeholder="Current price"
            className="bg-muted/50 border-primary/20 focus:border-primary"
          />
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-4">
            {/* Main Result */}
            <div className="bg-primary/20 rounded-lg p-6 text-center border border-primary/30">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Average Entry Price (Break-Even)
              </p>
              <p className="text-4xl font-bold text-primary mt-2">
                ${formatNumber(result.averagePrice)}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Total Position: {formatNumber(result.totalSize)} units
              </p>
            </div>

            {/* P&L Display */}
            <div className="grid grid-cols-2 gap-4">
              <div
                className={`rounded-lg p-4 text-center border ${
                  result.pnl >= 0
                    ? "bg-secondary/10 border-secondary/30"
                    : "bg-red-500/10 border-red-500/30"
                }`}
              >
                <p className="text-xs text-muted-foreground">Current P&L</p>
                <p
                  className={`text-2xl font-bold mt-1 ${
                    result.pnl >= 0 ? "text-secondary" : "text-red-400"
                  }`}
                >
                  {result.pnl >= 0 ? "+" : ""}${formatNumber(result.pnl)}
                </p>
              </div>

              <div
                className={`rounded-lg p-4 text-center border ${
                  result.pnlPercent >= 0
                    ? "bg-secondary/10 border-secondary/30"
                    : "bg-red-500/10 border-red-500/30"
                }`}
              >
                <p className="text-xs text-muted-foreground">P&L %</p>
                <p
                  className={`text-2xl font-bold mt-1 ${
                    result.pnlPercent >= 0 ? "text-secondary" : "text-red-400"
                  }`}
                >
                  {result.pnlPercent >= 0 ? "+" : ""}
                  {formatNumber(result.pnlPercent)}%
                </p>
              </div>
            </div>

            {/* Price Analysis */}
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Current Price:</span>
                <span className="font-medium">${formatNumber(result.currentPrice)}</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-2">
                <span className="text-muted-foreground">Break-Even Price:</span>
                <span className="font-medium text-primary">${formatNumber(result.averagePrice)}</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-2">
                <span className="text-muted-foreground">Price Distance:</span>
                <span
                  className={`font-medium ${
                    result.currentPrice >= result.averagePrice
                      ? "text-secondary"
                      : "text-red-400"
                  }`}
                >
                  {result.currentPrice >= result.averagePrice ? "+" : ""}
                  {formatNumber(result.currentPrice - result.averagePrice)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Educational Note */}
        <div className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-2">DCA Strategy Tips:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Dollar-Cost Averaging reduces impact of volatility</li>
            <li>Lower your average price by buying during dips</li>
            <li>Set target price based on your break-even + desired profit</li>
            <li>Consider position sizing for each DCA entry</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export default BreakEvenCalculator;
