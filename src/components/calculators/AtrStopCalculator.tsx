"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Activity, Info, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

interface AtrStopResult {
  stopPrice: number;
  stopDistance: number;
  stopPercent: number;
  atrValue: number;
  atrMultiple: number;
  currentPrice: number;
  direction: "long" | "short";
}

export function AtrStopCalculator() {
  const [atrValue, setAtrValue] = useState<string>("0.0025");
  const [atrMultiple, setAtrMultiple] = useState<string>("2");
  const [currentPrice, setCurrentPrice] = useState<string>("1.09000");
  const [direction, setDirection] = useState<"long" | "short">("long");

  const result = useMemo((): AtrStopResult | null => {
    const atr = parseFloat(atrValue);
    const multiple = parseFloat(atrMultiple);
    const price = parseFloat(currentPrice);

    if (isNaN(atr) || isNaN(multiple) || isNaN(price)) return null;
    if (atr <= 0 || multiple <= 0 || price <= 0) return null;

    const stopDistance = atr * multiple;
    const stopPrice = direction === "long" 
      ? price - stopDistance 
      : price + stopDistance;
    const stopPercent = (stopDistance / price) * 100;

    return {
      stopPrice,
      stopDistance,
      stopPercent,
      atrValue: atr,
      atrMultiple: multiple,
      currentPrice: price,
      direction,
    };
  }, [atrValue, atrMultiple, currentPrice, direction]);

  const formatPrice = (price: number) => {
    return price.toFixed(5);
  };

  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const quickMultiples = [1, 1.5, 2, 2.5, 3];

  return (
    <Card className="glass-card glass-card-hover">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              ATR Stop-Loss Calculator
            </CardTitle>
            <CardDescription className="mt-1">
              Calculate dynamic stop-loss based on Average True Range
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
                  <strong>How it works:</strong> ATR measures market volatility. 
                  Using ATR for stop-loss places your stop at a volatility-adjusted 
                  distance, avoiding getting stopped out by normal market noise.
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
            <Label htmlFor="atrValue" className="text-muted-foreground">
              ATR Value (14-period)
            </Label>
            <Input
              id="atrValue"
              type="text"
              value={atrValue}
              onChange={(e) => setAtrValue(e.target.value)}
              placeholder="e.g., 0.0025"
              className="bg-muted/50 border-primary/20 focus:border-primary"
            />
            <p className="text-xs text-muted-foreground">
              Find ATR from your chart indicator
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentPrice" className="text-muted-foreground">
              Current Price
            </Label>
            <Input
              id="currentPrice"
              type="text"
              value={currentPrice}
              onChange={(e) => setCurrentPrice(e.target.value)}
              placeholder="e.g., 1.09000"
              className="bg-muted/50 border-primary/20 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="atrMultiple" className="text-muted-foreground">
              ATR Multiple
            </Label>
            <Input
              id="atrMultiple"
              type="number"
              step="0.1"
              value={atrMultiple}
              onChange={(e) => setAtrMultiple(e.target.value)}
              placeholder="e.g., 2"
              className="bg-muted/50 border-primary/20 focus:border-primary"
            />
            <div className="flex gap-1 mt-1">
              {quickMultiples.map((mult) => (
                <Button
                  key={mult}
                  variant="outline"
                  size="sm"
                  onClick={() => setAtrMultiple(mult.toString())}
                  className={`text-xs ${
                    parseFloat(atrMultiple) === mult
                      ? "border-primary text-primary bg-primary/10"
                      : "border-primary/20"
                  }`}
                >
                  {mult}x
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="direction" className="text-muted-foreground">
              Trade Direction
            </Label>
            <Select
              value={direction}
              onValueChange={(value) => setDirection(value as "long" | "short")}
            >
              <SelectTrigger className="bg-muted/50 border-primary/20 focus:border-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="long">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-secondary" />
                    Long (Stop Below)
                  </div>
                </SelectItem>
                <SelectItem value="short">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-red-500" />
                    Short (Stop Above)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-4">
            {/* Main Stop Price */}
            <div className="bg-primary/20 rounded-lg p-6 text-center border border-primary/30">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Suggested Stop-Loss Price
              </p>
              <p className="text-4xl font-bold text-primary mt-2">
                {formatPrice(result.stopPrice)}
              </p>
              <div className="flex justify-center gap-4 mt-3">
                <Badge variant="outline" className="border-primary/30">
                  {result.direction === "long" ? "↓" : "↑"} {formatPrice(result.stopDistance)}
                </Badge>
                <Badge variant="outline" className="border-primary/30">
                  {formatNumber(result.stopPercent)}% from entry
                </Badge>
              </div>
            </div>

            {/* Detailed Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-muted/30 rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground">ATR Value</p>
                <p className="text-lg font-bold">{formatPrice(result.atrValue)}</p>
              </div>

              <div className="bg-muted/30 rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground">ATR Multiple</p>
                <p className="text-lg font-bold">{result.atrMultiple}x</p>
              </div>

              <div className="bg-muted/30 rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground">Stop Distance</p>
                <p className="text-lg font-bold">{formatPrice(result.stopDistance)}</p>
              </div>

              <div className="bg-muted/30 rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground">Entry Price</p>
                <p className="text-lg font-bold">{formatPrice(result.currentPrice)}</p>
              </div>
            </div>

            {/* Visual Representation */}
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-3">Stop-Loss Visualization:</p>
              <div className="relative h-24 bg-gradient-to-b from-secondary/20 via-muted to-red-500/20 rounded-lg">
                {result.direction === "long" ? (
                  <>
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-secondary text-secondary-foreground">Entry: {formatPrice(result.currentPrice)}</Badge>
                    </div>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-red-500 text-white">Stop: {formatPrice(result.stopPrice)}</Badge>
                    </div>
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">
                      {result.atrMultiple}x ATR
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-secondary text-secondary-foreground">Entry: {formatPrice(result.currentPrice)}</Badge>
                    </div>
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-red-500 text-white">Stop: {formatPrice(result.stopPrice)}</Badge>
                    </div>
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">
                      {result.atrMultiple}x ATR
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Educational Note */}
        <div className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-2">ATR Stop-Loss Tips:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Common ATR multiples: 1.5x (tight) to 3x (loose)</li>
            <li>Higher timeframe = larger ATR = wider stops</li>
            <li>ATR stops adapt to market volatility automatically</li>
            <li>Use trailing ATR stops to lock in profits as price moves</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export default AtrStopCalculator;
