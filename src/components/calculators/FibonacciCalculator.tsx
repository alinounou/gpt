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
import { TrendingUp, TrendingDown, Info, Copy, Check } from "lucide-react";

interface FibLevel {
  level: number;
  label: string;
  price: number;
  type: "retracement" | "extension";
}

export function FibonacciCalculator() {
  const [swingHigh, setSwingHigh] = useState<string>("1.09500");
  const [swingLow, setSwingLow] = useState<string>("1.08000");
  const [direction, setDirection] = useState<"uptrend" | "downtrend">("uptrend");
  const [copied, setCopied] = useState<string | null>(null);

  const fibLevels = useMemo(() => {
    const high = parseFloat(swingHigh);
    const low = parseFloat(swingLow);

    if (isNaN(high) || isNaN(low) || high <= low) return [];

    const diff = high - low;
    const levels: FibLevel[] = [];

    // Retracement levels
    const retracementPercentages = [0, 23.6, 38.2, 50, 61.8, 78.6, 100];
    const retracementLabels = ["0%", "23.6%", "38.2%", "50%", "61.8%", "78.6%", "100%"];

    retracementPercentages.forEach((percent, index) => {
      const price = direction === "uptrend"
        ? high - (diff * percent) / 100
        : low + (diff * percent) / 100;
      levels.push({
        level: percent,
        label: retracementLabels[index],
        price: price,
        type: "retracement",
      });
    });

    // Extension levels
    const extensionPercentages = [127.2, 161.8, 200, 261.8];
    const extensionLabels = ["127.2%", "161.8%", "200%", "261.8%"];

    extensionPercentages.forEach((percent, index) => {
      const price = direction === "uptrend"
        ? high + (diff * (percent - 100)) / 100
        : low - (diff * (percent - 100)) / 100;
      levels.push({
        level: percent,
        label: extensionLabels[index],
        price: price,
        type: "extension",
      });
    });

    return levels;
  }, [swingHigh, swingLow, direction]);

  const formatPrice = (price: number) => {
    return price.toFixed(5);
  };

  const copyToClipboard = async (price: string) => {
    await navigator.clipboard.writeText(price);
    setCopied(price);
    setTimeout(() => setCopied(null), 2000);
  };

  const swapValues = () => {
    const temp = swingHigh;
    setSwingHigh(swingLow);
    setSwingLow(temp);
  };

  return (
    <Card className="glass-card glass-card-hover">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Fibonacci Retracement & Extension Calculator
            </CardTitle>
            <CardDescription className="mt-1">
              Calculate key Fibonacci levels for any price swing
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
                  <strong>How it works:</strong> Enter the swing high and swing low prices. 
                  Fibonacci retracements help identify potential support/resistance levels during 
                  pullbacks, while extensions project potential profit targets beyond the swing.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="swingHigh" className="text-muted-foreground">
              Swing High Price
            </Label>
            <Input
              id="swingHigh"
              type="text"
              value={swingHigh}
              onChange={(e) => setSwingHigh(e.target.value)}
              placeholder="e.g., 1.09500"
              className="bg-muted/50 border-primary/20 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="swingLow" className="text-muted-foreground">
              Swing Low Price
            </Label>
            <div className="flex gap-2">
              <Input
                id="swingLow"
                type="text"
                value={swingLow}
                onChange={(e) => setSwingLow(e.target.value)}
                placeholder="e.g., 1.08000"
                className="bg-muted/50 border-primary/20 focus:border-primary"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={swapValues}
                className="shrink-0"
                title="Swap High/Low"
              >
                <TrendingDown className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="direction" className="text-muted-foreground">
              Trend Direction
            </Label>
            <Select
              value={direction}
              onValueChange={(value) => setDirection(value as "uptrend" | "downtrend")}
            >
              <SelectTrigger className="bg-muted/50 border-primary/20 focus:border-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="uptrend">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-secondary" />
                    Uptrend (Bullish)
                  </div>
                </SelectItem>
                <SelectItem value="downtrend">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-red-500" />
                    Downtrend (Bearish)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Section */}
        {fibLevels.length > 0 && (
          <div className="space-y-4">
            {/* Retracement Levels */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                <Badge className="bg-primary/20 text-primary">Retracement Levels</Badge>
                <span className="text-xs">Potential pullback zones</span>
              </h3>
              <div className="rounded-lg border border-primary/20 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-2 text-left text-muted-foreground">Level</th>
                      <th className="px-4 py-2 text-right text-muted-foreground">Price</th>
                      <th className="px-4 py-2 text-right text-muted-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fibLevels
                      .filter((l) => l.type === "retracement")
                      .map((level, index) => (
                        <tr
                          key={level.level}
                          className={`border-t border-primary/10 ${
                            index === 4 ? "bg-primary/10" : ""
                          }`}
                        >
                          <td className="px-4 py-2">
                            <span className="font-medium">{level.label}</span>
                            {level.level === 61.8 && (
                              <span className="ml-2 text-xs text-primary">(Golden Ratio)</span>
                            )}
                          </td>
                          <td className="px-4 py-2 text-right font-mono">
                            {formatPrice(level.price)}
                          </td>
                          <td className="px-4 py-2 text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(formatPrice(level.price))}
                              className="h-7"
                            >
                              {copied === formatPrice(level.price) ? (
                                <Check className="h-3 w-3 text-secondary" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Extension Levels */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                <Badge className="bg-secondary/20 text-secondary">Extension Levels</Badge>
                <span className="text-xs">Potential profit targets</span>
              </h3>
              <div className="rounded-lg border border-secondary/20 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-2 text-left text-muted-foreground">Level</th>
                      <th className="px-4 py-2 text-right text-muted-foreground">Price</th>
                      <th className="px-4 py-2 text-right text-muted-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fibLevels
                      .filter((l) => l.type === "extension")
                      .map((level) => (
                        <tr key={level.level} className="border-t border-secondary/10">
                          <td className="px-4 py-2">
                            <span className="font-medium">{level.label}</span>
                            {level.level === 161.8 && (
                              <span className="ml-2 text-xs text-secondary">(Golden Extension)</span>
                            )}
                          </td>
                          <td className="px-4 py-2 text-right font-mono">
                            {formatPrice(level.price)}
                          </td>
                          <td className="px-4 py-2 text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(formatPrice(level.price))}
                              className="h-7"
                            >
                              {copied === formatPrice(level.price) ? (
                                <Check className="h-3 w-3 text-secondary" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Educational Note */}
        <div className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-2">Trading Tips:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>The 61.8% level (Golden Ratio) is often considered the strongest retracement level</li>
            <li>In an uptrend, watch for support at retracement levels during pullbacks</li>
            <li>Use extension levels to set profit targets for your trades</li>
            <li>Combine Fibonacci with other tools like support/resistance for confluence</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export default FibonacciCalculator;
