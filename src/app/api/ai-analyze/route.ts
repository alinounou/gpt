import { NextRequest, NextResponse } from "next/server";

// Request interface
interface AnalyzeRequest {
  market: string;
  symbol: string;
  timeframe: string;
  levels?: {
    high?: string | null;
    low?: string | null;
    close?: string | null;
  };
  userPrompt: string;
}

// Response interface
interface AnalyzeResponse {
  bias: "bullish" | "bearish" | "neutral";
  currentPrice: string;
  priceChange: string;
  keyLevels: Array<{
    type: string;
    price: string;
    note: string;
  }>;
  scenarios: Array<{
    condition: string;
    action: string;
    target: string;
  }>;
  riskNote: string;
  rawText: string;
}

/**
 * Fetch real-time price data from Yahoo Finance
 */
async function fetchRealPrice(symbol: string, market: string): Promise<{
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
} | null> {
  try {
    // Convert symbol to Yahoo Finance format
    let yahooSymbol = symbol.toUpperCase();
    
    if (market === "forex") {
      // EUR/USD -> EURUSD=X
      yahooSymbol = symbol.replace("/", "") + "=X";
    } else if (market === "crypto") {
      // BTC -> BTC-USD
      if (!symbol.includes("-")) {
        yahooSymbol = symbol + "-USD";
      }
    } else if (market === "commodities") {
      // XAUUSD -> GC=F (Gold Futures) or XAUUSD=X
      if (symbol.toUpperCase() === "XAUUSD" || symbol.toUpperCase() === "GOLD") {
        yahooSymbol = "GC=F"; // Gold Futures
      } else if (symbol.toUpperCase() === "XAGUSD" || symbol.toUpperCase() === "SILVER") {
        yahooSymbol = "SI=F"; // Silver Futures
      } else if (symbol.toUpperCase() === "OIL" || symbol.toUpperCase() === "WTI") {
        yahooSymbol = "CL=F"; // Crude Oil Futures
      }
    } else if (market === "indices") {
      // US30 -> ^DJI, US500 -> ^GSPC, NAS100 -> ^NDX
      const indexMap: Record<string, string> = {
        "US30": "^DJI",
        "US500": "^GSPC", 
        "SPX500": "^GSPC",
        "NAS100": "^NDX",
        "NASDAQ": "^NDX",
        "DAX": "^GDAXI",
        "FTSE": "^FTSE",
      };
      yahooSymbol = indexMap[symbol.toUpperCase()] || symbol;
    }

    console.log(`Fetching price for ${yahooSymbol}...`);

    const response = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbol}?interval=1d&range=1mo`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      }
    );

    if (!response.ok) {
      console.log(`Yahoo Finance error for ${yahooSymbol}: ${response.status}`);
      return null;
    }

    const data = await response.json();
    const result = data.chart?.result?.[0];
    
    if (!result || !result.meta) {
      console.log(`No data found for ${yahooSymbol}`);
      return null;
    }

    const meta = result.meta;
    const quote = result.indicators?.quote?.[0];
    
    const closes = quote?.close || [];
    const validCloses = closes.filter((c: number | null) => c !== null);
    
    return {
      price: meta.regularMarketPrice || validCloses[validCloses.length - 1] || 0,
      change: meta.regularMarketPrice - meta.previousClose,
      changePercent: ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose) * 100,
      high: meta.regularMarketDayHigh || Math.max(...validCloses.slice(-7)),
      low: meta.regularMarketDayLow || Math.min(...validCloses.slice(-7)),
    };
  } catch (error) {
    console.error("Price fetch error:", error);
    return null;
  }
}

/**
 * Professional Trading Analysis using OpenAI GPT-4
 */
async function analyzeMarket(request: AnalyzeRequest, priceData: {
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
} | null): Promise<AnalyzeResponse> {
  const { market, symbol, timeframe, userPrompt } = request;

  const priceInfo = priceData ? `
📊 بيانات السعر الحقيقية (Live Price Data):
- السعر الحالي: ${priceData.price.toFixed(market === "forex" ? 5 : 2)}
- التغير: ${priceData.change >= 0 ? '+' : ''}${priceData.change.toFixed(market === "forex" ? 5 : 2)} (${priceData.changePercent.toFixed(2)}%)
- أعلى سعر اليوم: ${priceData.high.toFixed(market === "forex" ? 5 : 2)}
- أدنى سعر اليوم: ${priceData.low.toFixed(market === "forex" ? 5 : 2)}
` : "";

  const systemPrompt = `أنت محلل أسواق مالي محترف مع خبرة 15+ سنة في التحليل الفني.

مهمتك: تحليل الأداة المالية المطلوبة بناءً على البيانات الحقيقية.

${priceInfo}

قواعد مهمة جداً:
1. استخدم الأسعار الحقيقية المذكورة أعلاه فقط - لا تخترع أسعار!
2. احسب مستويات فيبوناتشي من الأعلى والأدنى الحقيقيين
3. حدد مستويات الدعم والمقاومة بالأرقام الحقيقية
4. قدم سيناريوهات تداول واقعية بالأسعار الفعلية
5. نسبة المخاطرة للعائد يجب أن تكون منطقية (1:2 أو أفضل)

الرد يجب أن يكون JSON صالح فقط:
{
  "bias": "bullish" أو "bearish" أو "neutral",
  "keyLevels": [
    {"type": "اسم المستوى", "price": "السعر من البيانات الحقيقية", "note": "ملاحظة"}
  ],
  "scenarios": [
    {"condition": "الشرط", "action": "الإجراء", "target": "الهدف بالسعر الحقيقي"}
  ],
  "riskNote": "ملاحظة إدارة المخاطر",
  "rawText": "تحليل مفصل بالعربية"
}`;

  const userMessage = `تحليل ${symbol} (${market}) على إطار ${timeframe}

${priceInfo}

سؤال المتداول: ${userPrompt}

أعطني تحليل مهني مع الأسعار الحقيقية فقط!`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        temperature: 0.2,
        max_tokens: 2500,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenAI API Error:", errorData);
      throw new Error(`OpenAI error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error("No response from OpenAI");
    }

    const result = JSON.parse(content);

    return {
      bias: ["bullish", "bearish", "neutral"].includes(result.bias) ? result.bias : "neutral",
      currentPrice: priceData?.price.toFixed(market === "forex" ? 5 : 2) || "N/A",
      priceChange: priceData ? `${priceData.change >= 0 ? '+' : ''}${priceData.changePercent.toFixed(2)}%` : "N/A",
      keyLevels: Array.isArray(result.keyLevels) ? result.keyLevels.slice(0, 6) : [],
      scenarios: Array.isArray(result.scenarios) ? result.scenarios.slice(0, 4) : [],
      riskNote: result.riskNote || "استخدم إدارة مخاطر مناسبة (1-2% كحد أقصى)",
      rawText: result.rawText || "تم التحليل",
    };
  } catch (error) {
    console.error("Analysis Error:", error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: AnalyzeRequest = await request.json();

    if (!body.symbol || !body.userPrompt) {
      return NextResponse.json(
        { error: "يرجى إدخال الرمز والسؤال" },
        { status: 400 }
      );
    }

    console.log("Analysis Request:", { 
      symbol: body.symbol, 
      market: body.market,
      hasApiKey: !!process.env.OPENAI_API_KEY 
    });

    // Fetch real price data
    let priceData = null;
    try {
      priceData = await fetchRealPrice(body.symbol, body.market);
      console.log("Price data:", priceData);
    } catch (e) {
      console.log("Could not fetch price, continuing without it");
    }

    // Analyze with GPT-4o
    if (process.env.OPENAI_API_KEY) {
      try {
        const result = await analyzeMarket(body, priceData);
        return NextResponse.json(result);
      } catch (apiError) {
        console.error("OpenAI failed:", apiError);
      }
    }

    // Fallback response with price data
    if (priceData) {
      const decimals = body.market === "forex" ? 5 : 2;
      const bias = priceData.changePercent >= 0.5 ? "bullish" : 
                   priceData.changePercent <= -0.5 ? "bearish" : "neutral";

      return NextResponse.json({
        bias,
        currentPrice: priceData.price.toFixed(decimals),
        priceChange: `${priceData.change >= 0 ? '+' : ''}${priceData.changePercent.toFixed(2)}%`,
        keyLevels: [
          { type: "مقاومة R1", price: priceData.high.toFixed(decimals), note: "أعلى سعر اليوم" },
          { type: "السعر الحالي", price: priceData.price.toFixed(decimals), note: `التغير: ${priceData.changePercent.toFixed(2)}%` },
          { type: "دعم S1", price: priceData.low.toFixed(decimals), note: "أدنى سعر اليوم" },
        ],
        scenarios: [],
        riskNote: "⚠️ لم يتم الاتصال بـ AI. الأسعار حقيقية من Yahoo Finance.",
        rawText: `📊 بيانات حقيقية لـ ${body.symbol}:
        
السعر الحالي: ${priceData.price.toFixed(decimals)}
التغير: ${priceData.change >= 0 ? '+' : ''}${priceData.changePercent.toFixed(2)}%
أعلى سعر: ${priceData.high.toFixed(decimals)}
أدنى سعر: ${priceData.low.toFixed(decimals)}

⚡ أعد المحاولة للحصول على تحليل AI كامل.`,
      });
    }

    return NextResponse.json({ 
      error: "لم نتمكن من جلب البيانات. تأكد من الرمز وحاول مرة أخرى." 
    }, { status: 500 });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "حدث خطأ. حاول مرة أخرى." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "AI Analysis API with Real-Time Prices",
    hasApiKey: !!process.env.OPENAI_API_KEY,
    model: "gpt-4o",
    features: ["Real-time prices from Yahoo Finance", "GPT-4o Analysis"],
    version: "4.0.0",
  });
}
