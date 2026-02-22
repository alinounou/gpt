import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

interface ChatRequest {
  message: string;
}

// Real-time price fetching from Yahoo Finance
async function fetchPrice(symbol: string): Promise<{
  price: number;
  change: number;
  changePercent: number;
} | null> {
  try {
    let yahooSymbol = symbol.toUpperCase().replace("/", "").replace("-", "");
    
    const symbolMap: Record<string, string> = {
      "XAUUSD": "GC=F", "GOLD": "GC=F",
      "XAGUSD": "SI=F", "SILVER": "SI=F",
      "OIL": "CL=F", "WTI": "CL=F",
      "BTC": "BTC-USD", "ETH": "ETH-USD",
      "SOL": "SOL-USD", "XRP": "XRP-USD",
      "EURUSD": "EURUSD=X", "EUR/USD": "EURUSD=X",
      "GBPUSD": "GBPUSD=X", "GBP/USD": "GBPUSD=X",
      "USDJPY": "USDJPY=X", "USD/JPY": "USDJPY=X",
      "NAS100": "^NDX", "NASDAQ": "^NDX",
      "US30": "^DJI", "US500": "^GSPC", "DAX": "^GDAXI",
    };

    yahooSymbol = symbolMap[symbol.toUpperCase()] || yahooSymbol;

    const response = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbol}?interval=1d&range=5d`,
      { headers: { 'User-Agent': 'Mozilla/5.0' }, cache: 'no-store' }
    );

    if (!response.ok) return null;

    const data = await response.json();
    const meta = data.chart?.result?.[0]?.meta;
    
    if (!meta?.regularMarketPrice) return null;

    const price = meta.regularMarketPrice;
    const previousClose = meta.previousClose || price;
    
    return {
      price,
      change: price - previousClose,
      changePercent: ((price - previousClose) / previousClose) * 100,
    };
  } catch {
    return null;
  }
}

// Extract trading symbols from message
function extractSymbols(message: string): string[] {
  const patterns = [
    /\b(XAUUSD|XAGUSD|GOLD|SILVER|OIL|WTI)\b/gi,
    /\b(BTC|ETH|SOL|XRP|BNB|ADA|DOGE|DOT|AVAX)\b/gi,
    /\b(EUR\/USD|GBP\/USD|USD\/JPY|AUD\/USD)\b/gi,
    /\b(EURUSD|GBPUSD|USDJPY|AUDUSD)\b/gi,
    /\b(NAS100|US30|US500|DAX|NASDAQ)\b/gi,
    /\b(AAPL|TSLA|GOOGL|MSFT|AMZN|META|NVDA)\b/gi,
  ];
  
  const symbols: string[] = [];
  patterns.forEach(p => {
    const matches = message.match(p);
    if (matches) symbols.push(...matches);
  });
  
  return [...new Set(symbols.map(s => s.toUpperCase().replace("/", "")))];
}

// Chat with AI using z-ai-web-dev-sdk
async function chatWithAI(message: string, priceData: Record<string, any>): Promise<string> {
  const priceInfo = Object.keys(priceData).length > 0 
    ? `\n\n📊 أسعار حقيقية الآن:\n${Object.entries(priceData)
        .map(([sym, data]: [string, any]) => 
          `• ${sym}: ${data.price.toFixed(2)} (${data.changePercent >= 0 ? '+' : ''}${data.changePercent.toFixed(2)}%)`
        ).join('\n')}`
    : '';

  const systemPrompt = `أنت خبير تداول محترف مع 20 سنة خبرة في الأسواق المالية.

مهمتك: مساعدة المتداولين بالإجابة على أسئلتهم.

قدراتك:
✅ تحليل فني (فيبوناتشي، دعم/مقاومة، اتجاهات)
✅ استراتيجيات تداول
✅ إدارة مخاطر
✅ شرح المؤشرات (RSI, MACD, MA)

قواعد:
1. أجب بنفس لغة السؤال
2. كن محدد مع الأرقام
3. استخدم الإيموجي
${priceInfo}`;

  try {
    const zai = await ZAI.create();
    
    const completion = await zai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    return completion.choices?.[0]?.message?.content || "عذراً، لم أتمكن من الرد.";
  } catch (error) {
    console.error("ZAI Error:", error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { message } = body;

    if (!message?.trim()) {
      return NextResponse.json({ error: "اكتب سؤالك" }, { status: 400 });
    }

    // Extract symbols and fetch prices
    const symbols = extractSymbols(message);
    const priceData: Record<string, any> = {};
    
    for (const symbol of symbols.slice(0, 3)) {
      const price = await fetchPrice(symbol);
      if (price) priceData[symbol] = price;
    }

    // Get AI response
    const response = await chatWithAI(message, priceData);

    return NextResponse.json({ response, prices: priceData });

  } catch (error) {
    console.error("Chat Error:", error);
    return NextResponse.json(
      { error: "حدث خطأ، حاول مرة أخرى" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Infinity Algo Chat API - Global Access",
    provider: "Z-AI SDK",
  });
}
