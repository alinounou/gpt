"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  BrainCircuit,
  Send,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  Target,
  Shield,
  Loader2,
  Copy,
  Check,
} from "lucide-react";

interface AnalysisResult {
  bias: "bullish" | "bearish" | "neutral";
  keyLevels: Array<{ type: string; price: string; note: string }>;
  scenarios: Array<{ condition: string; action: string; target: string }>;
  riskNote: string;
  rawText: string;
}

export default function AIAnalysisPage() {
  const [market, setMarket] = useState("forex");
  const [symbol, setSymbol] = useState("");
  const [timeframe, setTimeframe] = useState("H1");
  const [highPrice, setHighPrice] = useState("");
  const [lowPrice, setLowPrice] = useState("");
  const [closePrice, setClosePrice] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleAnalyze = async () => {
    if (!symbol || !userPrompt) {
      setError("Please enter a symbol and your question.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/ai-analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          market,
          symbol,
          timeframe,
          levels: {
            high: highPrice || null,
            low: lowPrice || null,
            close: closePrice || null,
          },
          userPrompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (result?.rawText) {
      await navigator.clipboard.writeText(result.rawText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getBiasIcon = (bias: string) => {
    switch (bias) {
      case "bullish":
        return <TrendingUp className="h-5 w-5 text-secondary" />;
      case "bearish":
        return <TrendingDown className="h-5 w-5 text-red-500" />;
      default:
        return <Minus className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getBiasColor = (bias: string) => {
    switch (bias) {
      case "bullish":
        return "bg-secondary/20 text-secondary border-secondary/30";
      case "bearish":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-muted text-muted-foreground border-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <BrainCircuit className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">AI Market Analysis</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Ask questions in Arabic or English. Get structured analysis with bias, 
              key levels, and risk scenarios.
            </p>
          </div>

          {/* Input Form */}
          <Card className="glass-card mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Market Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Market</Label>
                  <Select value={market} onValueChange={setMarket}>
                    <SelectTrigger className="bg-muted/50 border-primary/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="forex">Forex</SelectItem>
                      <SelectItem value="crypto">Crypto</SelectItem>
                      <SelectItem value="stocks">Stocks</SelectItem>
                      <SelectItem value="indices">Indices</SelectItem>
                      <SelectItem value="futures">Futures</SelectItem>
                      <SelectItem value="commodities">Commodities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground">Symbol / Pair</Label>
                  <Input
                    placeholder="e.g., XAUUSD, EUR/USD, BTC"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    className="bg-muted/50 border-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground">Timeframe</Label>
                  <Select value={timeframe} onValueChange={setTimeframe}>
                    <SelectTrigger className="bg-muted/50 border-primary/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M1">M1 (1 Minute)</SelectItem>
                      <SelectItem value="M5">M5 (5 Minutes)</SelectItem>
                      <SelectItem value="M15">M15 (15 Minutes)</SelectItem>
                      <SelectItem value="M30">M30 (30 Minutes)</SelectItem>
                      <SelectItem value="H1">H1 (1 Hour)</SelectItem>
                      <SelectItem value="H4">H4 (4 Hours)</SelectItem>
                      <SelectItem value="D1">D1 (Daily)</SelectItem>
                      <SelectItem value="W1">W1 (Weekly)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Optional Price Levels */}
              <details className="group">
                <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                  + Add Price Levels (Optional)
                </summary>
                <div className="grid grid-cols-3 gap-4 mt-3">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">High</Label>
                    <Input
                      placeholder="Swing High"
                      value={highPrice}
                      onChange={(e) => setHighPrice(e.target.value)}
                      className="bg-muted/50 border-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">Low</Label>
                    <Input
                      placeholder="Swing Low"
                      value={lowPrice}
                      onChange={(e) => setLowPrice(e.target.value)}
                      className="bg-muted/50 border-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">Close</Label>
                    <Input
                      placeholder="Current Price"
                      value={closePrice}
                      onChange={(e) => setClosePrice(e.target.value)}
                      className="bg-muted/50 border-primary/20"
                    />
                  </div>
                </div>
              </details>

              {/* Prompt Input */}
              <div className="space-y-2">
                <Label className="text-muted-foreground">Your Question (Arabic or English)</Label>
                <Textarea
                  placeholder='مثال: حلل لي الذهب على فريم الساعة مع التركيز على فيبوناتشي و مناطق الانعكاس&#10;Example: Analyze EUR/USD with focus on support/resistance zones'
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  className="bg-muted/50 border-primary/20 min-h-[100px]"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <Button
                onClick={handleAnalyze}
                disabled={isLoading || !symbol || !userPrompt}
                className="w-full bg-primary hover:bg-primary/90"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <BrainCircuit className="mr-2 h-5 w-5" />
                    Analyze with AI
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {result && (
            <div className="space-y-4 animate-fadeIn">
              {/* Bias */}
              <Card className="glass-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getBiasIcon(result.bias)}
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Market Bias</p>
                        <p className="text-xl font-bold capitalize">{result.bias}</p>
                      </div>
                    </div>
                    <Badge className={`px-4 py-1 ${getBiasColor(result.bias)}`}>
                      {result.bias.toUpperCase()}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Key Levels */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Key Levels
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {result.keyLevels.map((level, index) => (
                      <div key={index} className="bg-muted/30 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground">{level.type}</p>
                        <p className="text-lg font-bold">{level.price}</p>
                        <p className="text-xs text-muted-foreground">{level.note}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Scenarios */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">Trade Scenarios (IF-THEN)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.scenarios.map((scenario, index) => (
                      <div key={index} className="bg-muted/30 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Badge variant="outline" className="border-primary/30 shrink-0">
                            IF
                          </Badge>
                          <div>
                            <p className="text-sm">{scenario.condition}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="border-secondary/30 text-secondary">
                                THEN
                              </Badge>
                              <p className="text-sm">{scenario.action}</p>
                            </div>
                            {scenario.target && (
                              <p className="text-xs text-muted-foreground mt-1">Target: {scenario.target}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Risk Note */}
              <Card className="glass-card border-yellow-500/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-200">Risk Note</p>
                      <p className="text-sm text-muted-foreground mt-1">{result.riskNote}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Raw Analysis */}
              <Card className="glass-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Full Analysis</CardTitle>
                    <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                      {copied ? (
                        <Check className="h-4 w-4 text-secondary" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/30 rounded-lg p-4 text-sm whitespace-pre-wrap">
                    {result.rawText}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-8 flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-200">Disclaimer</p>
              <p className="text-xs text-muted-foreground mt-1">
                This is NOT financial advice. AI analysis is for educational purposes only. 
                Always do your own research and consult with a licensed financial advisor before 
                making any trading decisions. Trading involves significant risk of loss.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-muted-foreground">
            <p>Powered by Infinity Algo Academy</p>
          </div>
        </div>
      </div>
    </div>
  );
}
