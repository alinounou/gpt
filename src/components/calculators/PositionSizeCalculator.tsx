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
import { TrendingUp, Info, DollarSign, AlertTriangle } from "lucide-react";

interface PositionResult {
  riskAmount: number;
  positionSize: number;
  positionSizeUnit: string;
  pipValue: number;
}

export function PositionSizeCalculator() {
  const [accountSize, setAccountSize] = useState<string>("10000");
  const [riskPercent, setRiskPercent] = useState<string>("1");
  const [stopLossPips, setStopLossPips] = useState<string>("50");
  const [pipValue, setPipValue] = useState<string>("10");
  const [accountCurrency, setAccountCurrency] = useState<string>("USD");
  const [instrumentType, setInstrumentType] = useState<string>("forex");

  const result = useMemo((): PositionResult | null => {
    const account = parseFloat(accountSize);
    const risk = parseFloat(riskPercent);
    const stopLoss = parseFloat(stopLossPips);
    const pipVal = parseFloat(pipValue);

    if (isNaN(account) || isNaN(risk) || isNaN(stopLoss) || isNaN(pipVal)) return null;
    if (account <= 0 || stopLoss <= 0 || pipVal <= 0) return null;

    const riskAmount = (account * risk) / 100;
    const positionSize = riskAmount / (stopLoss * pipVal);

    return {
      riskAmount,
      positionSize: Math.max(0.01, positionSize),
      positionSizeUnit: instrumentType === "forex" ? "lots" : "units",
      pipValue: pipVal,
    };
  }, [accountSize, riskPercent, stopLossPips, pipValue, instrumentType]);

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
              <DollarSign className="h-5 w-5 text-primary" />
              Position Size Calculator
            </CardTitle>
            <CardDescription className="mt-1">
              Calculate the optimal position size based on your risk parameters
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
                  <strong>How it works:</strong> Position sizing is crucial for risk management. 
                  This calculator helps you determine how many lots or units to trade based on 
                  your account size and acceptable risk percentage.
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
            <Label htmlFor="accountSize" className="text-muted-foreground">
              Account Size ({accountCurrency})
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

          <div className="space-y-2">
            <Label htmlFor="riskPercent" className="text-muted-foreground">
              Risk Per Trade (%)
            </Label>
            <Input
              id="riskPercent"
              type="number"
              step="0.1"
              value={riskPercent}
              onChange={(e) => setRiskPercent(e.target.value)}
              placeholder="e.g., 1"
              className="bg-muted/50 border-primary/20 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stopLossPips" className="text-muted-foreground">
              Stop Loss (pips or points)
            </Label>
            <Input
              id="stopLossPips"
              type="number"
              value={stopLossPips}
              onChange={(e) => setStopLossPips(e.target.value)}
              placeholder="e.g., 50"
              className="bg-muted/50 border-primary/20 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pipValue" className="text-muted-foreground">
              Pip Value ({accountCurrency})
            </Label>
            <Input
              id="pipValue"
              type="number"
              step="0.01"
              value={pipValue}
              onChange={(e) => setPipValue(e.target.value)}
              placeholder="e.g., 10"
              className="bg-muted/50 border-primary/20 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountCurrency" className="text-muted-foreground">
              Account Currency
            </Label>
            <Select value={accountCurrency} onValueChange={setAccountCurrency}>
              <SelectTrigger className="bg-muted/50 border-primary/20 focus:border-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
                <SelectItem value="JPY">JPY (¥)</SelectItem>
                <SelectItem value="AUD">AUD ($)</SelectItem>
                <SelectItem value="CAD">CAD ($)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instrumentType" className="text-muted-foreground">
              Instrument Type
            </Label>
            <Select value={instrumentType} onValueChange={setInstrumentType}>
              <SelectTrigger className="bg-muted/50 border-primary/20 focus:border-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="forex">Forex (Lots)</SelectItem>
                <SelectItem value="stocks">Stocks (Shares)</SelectItem>
                <SelectItem value="crypto">Crypto (Units)</SelectItem>
                <SelectItem value="futures">Futures (Contracts)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted/30 rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Risk Amount
                </p>
                <p className="text-2xl font-bold text-primary mt-1">
                  {accountCurrency} {formatNumber(result.riskAmount)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {riskPercent}% of account
                </p>
              </div>

              <div className="bg-primary/20 rounded-lg p-4 text-center border border-primary/30">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Position Size
                </p>
                <p className="text-3xl font-bold text-primary mt-1">
                  {formatNumber(result.positionSize, 2)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {result.positionSizeUnit}
                </p>
              </div>

              <div className="bg-muted/30 rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Total Risk
                </p>
                <p className="text-2xl font-bold text-secondary mt-1">
                  {accountCurrency} {formatNumber(result.riskAmount)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Max potential loss
                </p>
              </div>
            </div>

            {/* Risk Warning */}
            <div className="flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-200">Risk Management Reminder</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Never risk more than 1-2% of your account on a single trade. Always use stop-loss orders 
                  and consider the spread and slippage in your calculations.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Educational Note */}
        <div className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-2">Position Sizing Tips:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Standard Forex lot = 100,000 units, Mini lot = 10,000, Micro lot = 1,000</li>
            <li>Pip value varies by currency pair and lot size</li>
            <li>For EUR/USD, 1 standard lot = $10 per pip</li>
            <li>Adjust risk percentage based on your experience level</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export default PositionSizeCalculator;
