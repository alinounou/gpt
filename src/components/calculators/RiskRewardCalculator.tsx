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
import { Scale, Info, TrendingUp, TrendingDown, Target } from "lucide-react";

interface RiskRewardResult {
  riskAmount: number;
  rewardAmount: number;
  riskPercent: number;
  rewardPercent: number;
  rrRatio: number;
  rMultiple: number;
  tradeType: "long" | "short";
}

export function RiskRewardCalculator() {
  const [entryPrice, setEntryPrice] = useState<string>("1.09000");
  const [stopLoss, setStopLoss] = useState<string>("1.08500");
  const [takeProfit, setTakeProfit] = useState<string>("1.10000");
  const [accountSize, setAccountSize] = useState<string>("10000");

  const result = useMemo((): RiskRewardResult | null => {
    const entry = parseFloat(entryPrice);
    const stop = parseFloat(stopLoss);
    const target = parseFloat(takeProfit);
    const account = parseFloat(accountSize);

    if (isNaN(entry) || isNaN(stop) || isNaN(target) || isNaN(account)) return null;
    if (entry <= 0 || stop <= 0 || target <= 0 || account <= 0) return null;

    const tradeType = target > entry ? "long" : "short";
    const riskAmount = Math.abs(entry - stop);
    const rewardAmount = Math.abs(target - entry);
    
    // Calculate percentages (simplified - actual depends on position size)
    const riskPercent = (riskAmount / entry) * 100;
    const rewardPercent = (rewardAmount / entry) * 100;
    
    // R:R ratio
    const rrRatio = rewardAmount / riskAmount;
    
    // R-Multiple potential
    const rMultiple = rrRatio;

    return {
      riskAmount,
      rewardAmount,
      riskPercent,
      rewardPercent,
      rrRatio,
      rMultiple,
      tradeType,
    };
  }, [entryPrice, stopLoss, takeProfit, accountSize]);

  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const formatPrice = (price: number) => {
    return price.toFixed(5);
  };

  return (
    <Card className="glass-card glass-card-hover">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" />
              Risk-Reward Calculator
            </CardTitle>
            <CardDescription className="mt-1">
              Calculate risk-reward ratio and R-multiples for your trades
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
                  <strong>How it works:</strong> The risk-reward ratio compares potential profit 
                  to potential loss. A 1:2 R:R means you risk $1 to potentially make $2. 
                  R-multiples help evaluate trade performance.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="entryPrice" className="text-muted-foreground">
              Entry Price
            </Label>
            <Input
              id="entryPrice"
              type="text"
              value={entryPrice}
              onChange={(e) => setEntryPrice(e.target.value)}
              placeholder="e.g., 1.09000"
              className="bg-muted/50 border-primary/20 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stopLoss" className="text-muted-foreground">
              Stop Loss Price
            </Label>
            <Input
              id="stopLoss"
              type="text"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              placeholder="e.g., 1.08500"
              className="bg-muted/50 border-primary/20 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="takeProfit" className="text-muted-foreground">
              Take Profit Price
            </Label>
            <Input
              id="takeProfit"
              type="text"
              value={takeProfit}
              onChange={(e) => setTakeProfit(e.target.value)}
              placeholder="e.g., 1.10000"
              className="bg-muted/50 border-primary/20 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountSize" className="text-muted-foreground">
              Account Size (optional)
            </Label>
            <Input
              id="accountSize"
              type="number"
              value={accountSize}
              onChange={(e) => setAccountSize(e.target.value)}
              placeholder="e.g., 10000"
              className="bg-muted/50 border-primary/20 focus:border-primary"
            />
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-4">
            {/* Trade Direction */}
            <div className="flex items-center justify-center gap-2 py-2">
              {result.tradeType === "long" ? (
                <Badge className="bg-secondary/20 text-secondary text-base px-4 py-1">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  LONG Position
                </Badge>
              ) : (
                <Badge className="bg-red-500/20 text-red-400 text-base px-4 py-1">
                  <TrendingDown className="h-4 w-4 mr-2" />
                  SHORT Position
                </Badge>
              )}
            </div>

            {/* Main R:R Display */}
            <div className="bg-primary/20 rounded-lg p-6 text-center border border-primary/30">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Risk-Reward Ratio
              </p>
              <p className="text-5xl font-bold text-primary mt-2">
                1:{formatNumber(result.rrRatio, 1)}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {result.rrRatio >= 2 ? "✓ Good R:R ratio" : "⚠ Consider higher R:R"}
              </p>
            </div>

            {/* Detailed Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-red-500/10 rounded-lg p-3 text-center border border-red-500/20">
                <p className="text-xs text-muted-foreground">Risk</p>
                <p className="text-lg font-bold text-red-400">
                  {formatPrice(result.riskAmount)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatNumber(result.riskPercent, 2)}%
                </p>
              </div>

              <div className="bg-secondary/10 rounded-lg p-3 text-center border border-secondary/20">
                <p className="text-xs text-muted-foreground">Reward</p>
                <p className="text-lg font-bold text-secondary">
                  {formatPrice(result.rewardAmount)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatNumber(result.rewardPercent, 2)}%
                </p>
              </div>

              <div className="bg-muted/30 rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground">R-Multiple</p>
                <p className="text-lg font-bold text-foreground">
                  {formatNumber(result.rMultiple, 1)}R
                </p>
                <p className="text-xs text-muted-foreground">Potential</p>
              </div>

              <div className="bg-muted/30 rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground">Win Rate Needed</p>
                <p className="text-lg font-bold text-foreground">
                  {formatNumber(100 / (1 + result.rrRatio), 0)}%
                </p>
                <p className="text-xs text-muted-foreground">Breakeven</p>
              </div>
            </div>

            {/* R-Multiple Visualization */}
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-3">R-Multiple Outcomes:</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-8 bg-gradient-to-r from-red-500 via-yellow-500 to-secondary rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-between px-2 text-xs font-medium text-white">
                    <span>-2R</span>
                    <span>0R</span>
                    <span>+{formatNumber(result.rMultiple, 1)}R</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Educational Note */}
        <div className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-2">R-Multiple Trading:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Positive R-multiples (e.g., +2R) mean profit; negative means loss</li>
            <li>Aim for at least 1:2 risk-reward ratio for sustainable trading</li>
            <li>With 1:2 R:R, you only need 33% win rate to break even</li>
            <li>Track your R-multiples to measure trading performance objectively</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export default RiskRewardCalculator;
