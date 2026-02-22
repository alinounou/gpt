"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

interface CalculatorProps {
  lang: "ar" | "en";
}

const texts = {
  ar: {
    entry: "سعر الدخول",
    exit: "سعر الخروج",
    lotSize: "حجم اللوت",
    calculate: "حساب",
    profit: "الربح",
    loss: "الخسارة",
    result: "النتيجة",
    pips: "نقطة",
    gold: "ذهب",
  },
  en: {
    entry: "Entry Price",
    exit: "Exit Price",
    lotSize: "Lot Size",
    calculate: "Calculate",
    profit: "Profit",
    loss: "Loss",
    result: "Result",
    pips: "pips",
    gold: "Gold",
  },
};

export function GoldCalculator({ lang }: CalculatorProps) {
  const t = texts[lang];
  const [entry, setEntry] = useState("3100");
  const [exit, setExit] = useState("3120");
  const [lot, setLot] = useState("0.1");
  const [result, setResult] = useState<{ profit: number; pips: number } | null>(null);

  const calculate = () => {
    const entryPrice = parseFloat(entry);
    const exitPrice = parseFloat(exit);
    const lotSize = parseFloat(lot);

    if (isNaN(entryPrice) || isNaN(exitPrice) || isNaN(lotSize)) return;

    const pips = (exitPrice - entryPrice) * 10;
    const profit = pips * lotSize * 10; // Gold: $10 per pip per standard lot

    setResult({ profit, pips: Math.abs(pips) });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label className="text-yellow-400/80">{t.entry}</Label>
          <Input
            type="number"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            className="bg-black/50 border-yellow-500/30 text-yellow-400 focus:border-yellow-500"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-yellow-400/80">{t.exit}</Label>
          <Input
            type="number"
            value={exit}
            onChange={(e) => setExit(e.target.value)}
            className="bg-black/50 border-yellow-500/30 text-yellow-400 focus:border-yellow-500"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-yellow-400/80">{t.lotSize}</Label>
          <Input
            type="number"
            step="0.01"
            value={lot}
            onChange={(e) => setLot(e.target.value)}
            className="bg-black/50 border-yellow-500/30 text-yellow-400 focus:border-yellow-500"
          />
        </div>
      </div>

      <Button
        onClick={calculate}
        className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
      >
        <DollarSign className="h-4 w-4 mr-2" />
        {t.calculate}
      </Button>

      {result && (
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg border ${result.profit >= 0 ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"}`}>
            <p className="text-sm text-yellow-400/60">{t.result}</p>
            <p className={`text-3xl font-bold ${result.profit >= 0 ? "text-green-400" : "text-red-400"}`}>
              {result.profit >= 0 ? "+" : ""}${result.profit.toFixed(2)}
            </p>
            <p className="text-xs text-yellow-400/40 mt-1">
              {result.pips.toFixed(1)} {t.pips}
            </p>
          </div>
          <div className="p-4 rounded-lg border border-yellow-500/30 bg-yellow-500/5">
            <p className="text-sm text-yellow-400/60">{lang === "ar" ? "النوع" : "Type"}</p>
            <div className="flex items-center gap-2 mt-2">
              {result.profit >= 0 ? (
                <>
                  <TrendingUp className="h-6 w-6 text-green-400" />
                  <Badge className="bg-green-500/20 text-green-400">{t.profit}</Badge>
                </>
              ) : (
                <>
                  <TrendingDown className="h-6 w-6 text-red-400" />
                  <Badge className="bg-red-500/20 text-red-400">{t.loss}</Badge>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function PositionSizeCalc({ lang }: CalculatorProps) {
  const [account, setAccount] = useState("10000");
  const [risk, setRisk] = useState("2");
  const [stopLoss, setStopLoss] = useState("50");
  const [result, setResult] = useState<{ lot: number; riskAmount: number } | null>(null);

  const t = texts[lang];
  const labels = lang === "ar" 
    ? { account: "حساب رأس المال", risk: "نسبة المخاطرة %", stopLoss: "وقف الخسارة (نقطة)", calculate: "حساب", lot: "حجم اللوت", riskAmount: "مبلغ المخاطرة" }
    : { account: "Account Size", risk: "Risk %", stopLoss: "Stop Loss (pips)", calculate: "Calculate", lot: "Lot Size", riskAmount: "Risk Amount" };

  const calculate = () => {
    const acc = parseFloat(account);
    const rsk = parseFloat(risk);
    const sl = parseFloat(stopLoss);

    if (isNaN(acc) || isNaN(rsk) || isNaN(sl)) return;

    const riskAmount = (acc * rsk) / 100;
    const lotSize = riskAmount / (sl * 10); // Gold: $10 per pip per lot

    setResult({ lot: lotSize, riskAmount });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label className="text-yellow-400/80">{labels.account}</Label>
          <Input type="number" value={account} onChange={(e) => setAccount(e.target.value)} className="bg-black/50 border-yellow-500/30 text-yellow-400 focus:border-yellow-500" />
        </div>
        <div className="space-y-2">
          <Label className="text-yellow-400/80">{labels.risk}</Label>
          <Input type="number" value={risk} onChange={(e) => setRisk(e.target.value)} className="bg-black/50 border-yellow-500/30 text-yellow-400 focus:border-yellow-500" />
        </div>
        <div className="space-y-2">
          <Label className="text-yellow-400/80">{labels.stopLoss}</Label>
          <Input type="number" value={stopLoss} onChange={(e) => setStopLoss(e.target.value)} className="bg-black/50 border-yellow-500/30 text-yellow-400 focus:border-yellow-500" />
        </div>
      </div>

      <Button onClick={calculate} className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
        {labels.calculate}
      </Button>

      {result && (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-yellow-500/30 bg-yellow-500/10">
            <p className="text-sm text-yellow-400/60">{labels.lot}</p>
            <p className="text-3xl font-bold text-yellow-400">{result.lot.toFixed(2)}</p>
          </div>
          <div className="p-4 rounded-lg border border-yellow-500/30">
            <p className="text-sm text-yellow-400/60">{labels.riskAmount}</p>
            <p className="text-3xl font-bold text-yellow-400">${result.riskAmount.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function PivotPointsCalc({ lang }: CalculatorProps) {
  const [high, setHigh] = useState("3150");
  const [low, setLow] = useState("3100");
  const [close, setClose] = useState("3120");
  const [result, setResult] = useState<{ pp: number; r1: number; r2: number; s1: number; s2: number } | null>(null);

  const labels = lang === "ar"
    ? { high: "أعلى سعر", low: "أدنى سعر", close: "سعر الإغلاق", calculate: "حساب", pp: "نقطة المحور", r1: "مقاومة 1", r2: "مقاومة 2", s1: "دعم 1", s2: "دعم 2" }
    : { high: "High", low: "Low", close: "Close", calculate: "Calculate", pp: "Pivot Point", r1: "R1", r2: "R2", s1: "S1", s2: "S2" };

  const calculate = () => {
    const h = parseFloat(high);
    const l = parseFloat(low);
    const c = parseFloat(close);

    if (isNaN(h) || isNaN(l) || isNaN(c)) return;

    const pp = (h + l + c) / 3;
    const r1 = 2 * pp - l;
    const r2 = pp + (h - l);
    const s1 = 2 * pp - h;
    const s2 = pp - (h - l);

    setResult({ pp, r1, r2, s1, s2 });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label className="text-yellow-400/80">{labels.high}</Label>
          <Input type="number" value={high} onChange={(e) => setHigh(e.target.value)} className="bg-black/50 border-yellow-500/30 text-yellow-400 focus:border-yellow-500" />
        </div>
        <div className="space-y-2">
          <Label className="text-yellow-400/80">{labels.low}</Label>
          <Input type="number" value={low} onChange={(e) => setLow(e.target.value)} className="bg-black/50 border-yellow-500/30 text-yellow-400 focus:border-yellow-500" />
        </div>
        <div className="space-y-2">
          <Label className="text-yellow-400/80">{labels.close}</Label>
          <Input type="number" value={close} onChange={(e) => setClose(e.target.value)} className="bg-black/50 border-yellow-500/30 text-yellow-400 focus:border-yellow-500" />
        </div>
      </div>

      <Button onClick={calculate} className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
        {labels.calculate}
      </Button>

      {result && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { label: labels.r2, value: result.r2, color: "text-red-400" },
            { label: labels.r1, value: result.r1, color: "text-orange-400" },
            { label: labels.pp, value: result.pp, color: "text-yellow-400" },
            { label: labels.s1, value: result.s1, color: "text-green-400" },
            { label: labels.s2, value: result.s2, color: "text-blue-400" },
          ].map((item, i) => (
            <div key={i} className="p-3 rounded-lg border border-yellow-500/20 bg-black/30">
              <p className="text-xs text-yellow-400/60">{item.label}</p>
              <p className={`text-xl font-bold ${item.color}`}>{item.value.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function FibonacciCalc({ lang }: CalculatorProps) {
  const [high, setHigh] = useState("3150");
  const [low, setLow] = useState("3050");
  const [result, setResult] = useState<{ level: string; price: number }[] | null>(null);

  const labels = lang === "ar"
    ? { high: "أعلى سوينج", low: "أدنى سوينج", calculate: "حساب", retracement: "تصحيح", extension: "امتداد" }
    : { high: "Swing High", low: "Swing Low", calculate: "Calculate", retracement: "Retracement", extension: "Extension" };

  const calculate = () => {
    const h = parseFloat(high);
    const l = parseFloat(low);

    if (isNaN(h) || isNaN(l)) return;

    const diff = h - l;
    const retracements = [0, 23.6, 38.2, 50, 61.8, 78.6, 100];
    const extensions = [127.2, 161.8, 200, 261.8];

    const results = [
      ...retracements.map(r => ({
        level: `${r}% ${labels.retraction}`,
        price: h - (diff * r / 100),
      })),
      ...extensions.map(e => ({
        level: `${e}% ${labels.extension}`,
        price: h + (diff * (e - 100) / 100),
      })),
    ];

    setResult(results);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-yellow-400/80">{labels.high}</Label>
          <Input type="number" value={high} onChange={(e) => setHigh(e.target.value)} className="bg-black/50 border-yellow-500/30 text-yellow-400 focus:border-yellow-500" />
        </div>
        <div className="space-y-2">
          <Label className="text-yellow-400/80">{labels.low}</Label>
          <Input type="number" value={low} onChange={(e) => setLow(e.target.value)} className="bg-black/50 border-yellow-500/30 text-yellow-400 focus:border-yellow-500" />
        </div>
      </div>

      <Button onClick={calculate} className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
        {labels.calculate}
      </Button>

      {result && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {result.slice(0, 11).map((item, i) => (
            <div key={i} className={`p-2 rounded border ${i < 7 ? "border-yellow-500/30 bg-yellow-500/5" : "border-green-500/30 bg-green-500/5"}`}>
              <p className="text-xs text-yellow-400/60">{item.level}</p>
              <p className="text-lg font-bold text-yellow-400">{item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function RiskManagementCalc({ lang }: CalculatorProps) {
  const [balance, setBalance] = useState("10000");
  const [riskPercent, setRiskPercent] = useState("2");
  const [winRate, setWinRate] = useState("60");
  const [rr, setRr] = useState("2");
  const [result, setResult] = useState<{ risk: number; expectancy: number; trades: number } | null>(null);

  const labels = lang === "ar"
    ? { balance: "رصيد الحساب", risk: "نسبة المخاطرة %", winRate: "نسبة الفوز %", rr: "نسبة R:R", calculate: "حساب", riskAmount: "مبلغ المخاطرة", expectancy: "التوقع", trades: "صفقات للربح" }
    : { balance: "Account Balance", risk: "Risk %", winRate: "Win Rate %", rr: "R:R Ratio", calculate: "Calculate", riskAmount: "Risk Amount", expectancy: "Expectancy", trades: "Trades to Profit" };

  const calculate = () => {
    const bal = parseFloat(balance);
    const rsk = parseFloat(riskPercent);
    const wr = parseFloat(winRate);
    const ratio = parseFloat(rr);

    if (isNaN(bal) || isNaN(rsk) || isNaN(wr) || isNaN(ratio)) return;

    const riskAmount = (bal * rsk) / 100;
    const expectancy = (wr / 100 * ratio) - ((100 - wr) / 100 * 1);
    const tradesToProfit = Math.ceil(bal / (riskAmount * expectancy));

    setResult({ risk: riskAmount, expectancy, trades: tradesToProfit });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label className="text-yellow-400/80">{labels.balance}</Label>
          <Input type="number" value={balance} onChange={(e) => setBalance(e.target.value)} className="bg-black/50 border-yellow-500/30 text-yellow-400 focus:border-yellow-500" />
        </div>
        <div className="space-y-2">
          <Label className="text-yellow-400/80">{labels.risk}</Label>
          <Input type="number" value={riskPercent} onChange={(e) => setRiskPercent(e.target.value)} className="bg-black/50 border-yellow-500/30 text-yellow-400 focus:border-yellow-500" />
        </div>
        <div className="space-y-2">
          <Label className="text-yellow-400/80">{labels.winRate}</Label>
          <Input type="number" value={winRate} onChange={(e) => setWinRate(e.target.value)} className="bg-black/50 border-yellow-500/30 text-yellow-400 focus:border-yellow-500" />
        </div>
        <div className="space-y-2">
          <Label className="text-yellow-400/80">{labels.rr}</Label>
          <Input type="number" value={rr} onChange={(e) => setRr(e.target.value)} className="bg-black/50 border-yellow-500/30 text-yellow-400 focus:border-yellow-500" />
        </div>
      </div>

      <Button onClick={calculate} className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
        {labels.calculate}
      </Button>

      {result && (
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border border-yellow-500/30">
            <p className="text-sm text-yellow-400/60">{labels.riskAmount}</p>
            <p className="text-2xl font-bold text-yellow-400">${result.risk.toFixed(2)}</p>
          </div>
          <div className={`p-4 rounded-lg border ${result.expectancy > 0 ? "border-green-500/30" : "border-red-500/30"}`}>
            <p className="text-sm text-yellow-400/60">{labels.expectancy}</p>
            <p className={`text-2xl font-bold ${result.expectancy > 0 ? "text-green-400" : "text-red-400"}`}>{result.expectancy.toFixed(2)}R</p>
          </div>
          <div className="p-4 rounded-lg border border-yellow-500/30">
            <p className="text-sm text-yellow-400/60">{labels.trades}</p>
            <p className="text-2xl font-bold text-yellow-400">{result.trades}</p>
          </div>
        </div>
      )}
    </div>
  );
}
