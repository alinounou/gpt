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
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  Target,
  Shield,
  Loader2,
  Copy,
  Check,
  Sparkles,
  Lightbulb,
  DollarSign,
  Activity,
} from "lucide-react";

interface AnalysisResult {
  bias: "bullish" | "bearish" | "neutral";
  currentPrice?: string;
  priceChange?: string;
  keyLevels: Array<{ type: string; price: string; note: string }>;
  scenarios: Array<{ condition: string; action: string; target: string }>;
  riskNote: string;
  rawText: string;
}

const examplePrompts = [
  { ar: "حلل لي الذهب على فريم الساعة مع التركيز على فيبوناتشي ومناطق الانعكاس", market: "commodities", symbol: "XAUUSD" },
  { ar: "أعطني مستويات الدعم والمقاومة لليورو دولار مع سيناريوهات التداول", market: "forex", symbol: "EUR/USD" },
  { ar: "ما هو اتجاه البيتكوين على اليومي؟ وأين أفضل مناطق الشراء؟", market: "crypto", symbol: "BTC" },
  { ar: "حلل مؤشر ناسداك مع نقاط الدخول والخروج", market: "indices", symbol: "NAS100" },
];

export default function AIAnalysisPage() {
  const [market, setMarket] = useState("commodities");
  const [symbol, setSymbol] = useState("XAUUSD");
  const [timeframe, setTimeframe] = useState("H1");
  const [userPrompt, setUserPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleAnalyze = async () => {
    if (!symbol || !userPrompt) {
      setError("يرجى إدخال الرمز وسؤالك");
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
          userPrompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "فشل التحليل");
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ");
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
        return <TrendingUp className="h-6 w-6 text-green-500" />;
      case "bearish":
        return <TrendingDown className="h-6 w-6 text-red-500" />;
      default:
        return <Minus className="h-6 w-6 text-yellow-500" />;
    }
  };

  const getBiasColor = (bias: string) => {
    switch (bias) {
      case "bullish":
        return "bg-green-500/20 text-green-400 border-green-500/50";
      case "bearish":
        return "bg-red-500/20 text-red-400 border-red-500/50";
      default:
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
    }
  };

  const getBiasLabel = (bias: string) => {
    switch (bias) {
      case "bullish":
        return "صاعد BULLISH 📈";
      case "bearish":
        return "هبوطي BEARISH 📉";
      default:
        return "محايد NEUTRAL ➡️";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-8 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-green-500 flex items-center justify-center animate-pulse-glow">
                <BrainCircuit className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="gradient-text">AI Market Analysis</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              تحليل السوق بالذكاء الاصطناعي مع أسعار حقيقية
            </p>
            <div className="flex justify-center gap-2 mt-3">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <Sparkles className="h-3 w-3 mr-1" />
                GPT-4o
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                <Activity className="h-3 w-3 mr-1" />
                Live Prices
              </Badge>
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                Yahoo Finance
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Form */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  بيانات السوق
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">السوق</Label>
                    <Select value={market} onValueChange={setMarket}>
                      <SelectTrigger className="bg-muted/50 border-primary/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="forex">💹 Forex</SelectItem>
                        <SelectItem value="crypto">🪙 Crypto</SelectItem>
                        <SelectItem value="stocks">📈 Stocks</SelectItem>
                        <SelectItem value="indices">📊 Indices</SelectItem>
                        <SelectItem value="commodities">🥇 Commodities</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground">الرمز</Label>
                    <Input
                      placeholder="XAUUSD, EUR/USD, BTC"
                      value={symbol}
                      onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                      className="bg-muted/50 border-primary/20 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground">الإطار الزمني</Label>
                  <Select value={timeframe} onValueChange={setTimeframe}>
                    <SelectTrigger className="bg-muted/50 border-primary/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M15">M15 (15 دقيقة)</SelectItem>
                      <SelectItem value="M30">M30 (30 دقيقة)</SelectItem>
                      <SelectItem value="H1">H1 (ساعة)</SelectItem>
                      <SelectItem value="H4">H4 (4 ساعات)</SelectItem>
                      <SelectItem value="D1">D1 (يومي)</SelectItem>
                      <SelectItem value="W1">W1 (أسبوعي)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Prompt Input */}
                <div className="space-y-2">
                  <Label className="text-muted-foreground">سؤالك</Label>
                  <Textarea
                    placeholder="مثال: حلل لي الذهب على فريم الساعة..."
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    className="bg-muted/50 border-primary/20 min-h-[100px] resize-none"
                  />
                </div>

                {/* Example Prompts */}
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs flex items-center gap-1">
                    <Lightbulb className="h-3 w-3" />
                    أمثلة سريعة
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {examplePrompts.map((ex, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setUserPrompt(ex.ar);
                          setMarket(ex.market);
                          setSymbol(ex.symbol);
                        }}
                        className="text-xs border-primary/20 hover:border-primary justify-start"
                      >
                        {ex.symbol}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-sm text-red-400">
                    ⚠️ {error}
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  onClick={handleAnalyze}
                  disabled={isLoading || !symbol || !userPrompt}
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 hover:opacity-90"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      جاري التحليل...
                    </>
                  ) : (
                    <>
                      <BrainCircuit className="mr-2 h-5 w-5" />
                      تحليل بالذكاء الاصطناعي
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-4">
              {result ? (
                <>
                  {/* Current Price */}
                  {result.currentPrice && (
                    <Card className="glass-card bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <DollarSign className="h-5 w-5 text-primary" />
                            <div>
                              <p className="text-xs text-muted-foreground">السعر الحالي / Current Price</p>
                              <p className="text-2xl font-bold font-mono">{result.currentPrice}</p>
                            </div>
                          </div>
                          <Badge 
                            className={result.priceChange?.startsWith('+') 
                              ? "bg-green-500/20 text-green-400" 
                              : "bg-red-500/20 text-red-400"
                            }
                          >
                            {result.priceChange}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Bias */}
                  <Card className="glass-card">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getBiasIcon(result.bias)}
                          <div>
                            <p className="text-xs text-muted-foreground">اتجاه السوق</p>
                            <p className="text-xl font-bold">{getBiasLabel(result.bias)}</p>
                          </div>
                        </div>
                        <Badge className={`px-4 py-2 ${getBiasColor(result.bias)}`}>
                          {result.bias.toUpperCase()}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Key Levels */}
                  <Card className="glass-card">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Target className="h-4 w-4 text-primary" />
                        المستويات الرئيسية
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2">
                        {result.keyLevels.map((level, index) => (
                          <div key={index} className="bg-muted/30 rounded-lg p-3">
                            <p className="text-xs text-muted-foreground">{level.type}</p>
                            <p className="text-lg font-bold font-mono">{level.price}</p>
                            <p className="text-xs text-muted-foreground mt-1">{level.note}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Scenarios */}
                  {result.scenarios.length > 0 && (
                    <Card className="glass-card">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">سيناريوهات التداول</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {result.scenarios.map((scenario, index) => (
                            <div key={index} className="bg-muted/30 rounded-lg p-3">
                              <div className="flex items-start gap-2">
                                <Badge variant="outline" className="border-blue-500/30 text-blue-400 shrink-0 text-xs">
                                  IF
                                </Badge>
                                <p className="text-sm flex-1">{scenario.condition}</p>
                              </div>
                              <div className="flex items-start gap-2 mt-2">
                                <Badge variant="outline" className="border-green-500/30 text-green-400 shrink-0 text-xs">
                                  THEN
                                </Badge>
                                <p className="text-sm flex-1">{scenario.action}</p>
                              </div>
                              {scenario.target && (
                                <p className="text-xs text-muted-foreground mt-2 ml-10">
                                  🎯 الهدف: {scenario.target}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Risk Note */}
                  <Card className="glass-card border-yellow-500/30">
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.riskNote}</p>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="glass-card h-full flex items-center justify-center min-h-[300px]">
                  <CardContent className="text-center">
                    <BrainCircuit className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">أدخل بيانات السوق واضغط تحليل</p>
                    <p className="text-xs text-muted-foreground/60 mt-2">
                      ⚡ أسعار حقيقية من Yahoo Finance
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Full Analysis */}
          {result && (
            <Card className="glass-card mt-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">📝 التحليل الكامل</CardTitle>
                  <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 rounded-lg p-4 text-sm whitespace-pre-wrap font-mono leading-relaxed">
                  {result.rawText}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Disclaimer */}
          <div className="mt-8 flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-200">تنبيه مهم</p>
              <p className="text-xs text-muted-foreground mt-1">
                الأسعار حقيقية من Yahoo Finance. التحليل لأغراض تعليمية فقط ولا يُعتبر نصيحة مالية.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <Logo size="sm" className="inline-flex" />
            <p className="text-xs text-muted-foreground mt-2">
              Powered by GPT-4o + Yahoo Finance Real-Time Data
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
