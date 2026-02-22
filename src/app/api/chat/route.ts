import { NextRequest, NextResponse } from "next/server";

interface AnalyzeRequest {
  message: string;
  symbol?: string;
  market?: string;
}

/**
 * Fetch real-time price from Yahoo Finance
 */
async function fetchPrice(symbol: string): Promise<{
  price: number;
  change: number;
  changePercent: number;
} | null> {
  try {
    let yahooSymbol = symbol.toUpperCase().replace("/", "");
    
    // Auto-detect symbol type
    if (symbol.includes("XAU") || symbol.toUpperCase().includes("GOLD")) {
      yahooSymbol = "GC=F";
    } else if (symbol.includes("XAG") || symbol.toUpperCase().includes("SILVER")) {
      yahooSymbol = "SI=F";
    } else if (symbol.toUpperCase().includes("OIL") || symbol.toUpperCase().includes("WTI")) {
      yahooSymbol = "CL=F";
    } else if (["BTC", "ETH", "SOL", "XRP", "BNB"].some(s => symbol.toUpperCase().includes(s))) {
      yahooSymbol = symbol.toUpperCase().replace("/", "-") + "-USD";
    } else if (["EUR", "GBP", "USD", "JPY", "AUD", "CAD", "CHF", "NZD"].some(s => symbol.toUpperCase().includes(s))) {
      yahooSymbol = symbol.toUpperCase().replace("/", "") + "=X";
    } else if (["NAS", "US30", "US500", "SPX", "DAX", "DJI"].some(s => symbol.toUpperCase().includes(s))) {
      const indexMap: Record<string, string> = {
        "NAS100": "^NDX", "NASDAQ": "^NDX", "NAS": "^NDX",
        "US30": "^DJI", "DJI": "^DJI", 
        "US500": "^GSPC", "SPX500": "^GSPC", "SPX": "^GSPC",
        "DAX": "^GDAXI",
      };
      yahooSymbol = indexMap[symbol.toUpperCase()] || symbol;
    }

    const response = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbol}?interval=1d&range=5d`,
      { headers: { 'User-Agent': 'Mozilla/5.0' } }
    );

    if (!response.ok) return null;

    const data = await response.json();
    const meta = data.chart?.result?.[0]?.meta;
    
    if (!meta) return null;

    return {
      price: meta.regularMarketPrice,
      change: meta.regularMarketPrice - meta.previousClose,
      changePercent: ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose) * 100,
    };
  } catch {
    return null;
  }
}

/**
 * Extract symbols from message
 */
function extractSymbols(message: string): string[] {
  const patterns = [
    /\b(XAUUSD|XAGUSD|GOLD|SILVER|OIL|WTI)\b/gi,
    /\b(BTC|ETH|SOL|XRP|BNB|ADA|DOGE|DOT|AVAX|MATIC)\b/gi,
    /\b(EUR\/USD|GBP\/USD|USD\/JPY|AUD\/USD|USD\/CHF|USD\/CAD|NZD\/USD)\b/gi,
    /\b(EURUSD|GBPUSD|USDJPY|AUDUSD|USDCHF|USDCAD|NZDUSD)\b/gi,
    /\b(NAS100|US30|US500|SPX500|DAX|NASDAQ|DJI)\b/gi,
    /\b(AAPL|TSLA|GOOGL|MSFT|AMZN|META|NVDA)\b/gi,
  ];
  
  const symbols: string[] = [];
  patterns.forEach(p => {
    const matches = message.match(p);
    if (matches) symbols.push(...matches);
  });
  
  return [...new Set(symbols.map(s => s.toUpperCase()))];
}

/**
 * Chat with GPT-4o
 */
async function chatWithAI(message: string, priceData: Record<string, any>): Promise<string> {
  const systemPrompt = `أنت خبير تداول محترف مع 20 سنة خبرة في الأسواق المالية.

مهمتك: الإجابة على أسئلة المتداولين بشكل واضح ومفصل.

قدراتك:
- تحليل فني (فيبوناتشي، مستويات، اتجاهات، نماذج)
- تحليل أساسي (أخبار، أحداث اقتصادية)
- استراتيجيات تداول
- إدارة مخاطر
- تفسير المؤشرات (RSI, MACD, Moving Averages)

قواعد:
1. أجب باللغة التي سُئلت بها (عربي أو إنجليزي)
2. كن محدداً مع الأرقام والمستويات
3. قدم خطوات عملية واضحة
4. أضف تحذيرات المخاطر عند الحاجة
5. استخدم الإيموجي لتوضيح النقاط

${Object.keys(priceData).length > 0 ? `
📊 أسعار حقيقية حالية:
${Object.entries(priceData).map(([sym, data]: [string, any]) => 
  `- ${sym}: ${data.price} (${data.changePercent >= 0 ? '+' : ''}${data.changePercent.toFixed(2)}%)`
).join('\n')}
` : ''}`;

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
        { role: "user", content: message },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || "عذراً، لم أتمكن من الرد.";
}

export async function POST(request: NextRequest) {
  try {
    const body: AnalyzeRequest = await request.json();
    const { message } = body;

    if (!message?.trim()) {
      return NextResponse.json({ error: "اكتب سؤالك" }, { status: 400 });
    }

    // Extract symbols and fetch prices
    const symbols = extractSymbols(message);
    const priceData: Record<string, any> = {};

    for (const symbol of symbols.slice(0, 3)) {
      const price = await fetchPrice(symbol);
      if (price) {
        priceData[symbol] = price;
      }
    }

    // Get AI response
    let response: string;
    
    if (process.env.OPENAI_API_KEY) {
      response = await chatWithAI(message, priceData);
    } else {
      // Fallback without API
      response = `🤖 **أنا Infinity Algo AI**

شكراً لسؤالك! للإجابة الكاملة، يرجى إضافة OpenAI API Key.

**الأسعار الحالية:**
${Object.entries(priceData).map(([sym, data]: [string, any]) => 
  `• ${sym}: ${data.price} (${data.changePercent >= 0 ? '+' : ''}${data.changePercent.toFixed(2)}%)`
).join('\n') || 'لم أجد أسعار لهذا الرمز'}

💡 **نصيحة:** تأكد من كتابة الرمز بشكل صحيح (مثل XAUUSD, BTC, EUR/USD)`;
    }

    return NextResponse.json({ 
      response,
      prices: priceData 
    });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "حدث خطأ، حاول مرة أخرى" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Infinity Algo Chat API",
    hasApiKey: !!process.env.OPENAI_API_KEY,
  });
}
