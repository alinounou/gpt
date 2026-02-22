import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

interface ChatRequest {
  message: string;
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
async function chatWithAI(message: string): Promise<string> {
  const systemPrompt = `أنت خبير تداول محترف مع 20 سنة خبرة في الأسواق المالية (Forex, Crypto, Stocks, Gold, Oil).

مهمتك: مساعدة المتداولين بالإجابة على أسئلتهم بشكل واضح ومفصل.

قدراتك:
✅ تحليل فني (فيبوناتشي، دعم/مقاومة، اتجاهات، نماذج شموع يابانية)
✅ استراتيجيات تداول (سكالبينج، سوينج، داي تريدنج)
✅ إدارة مخاطر وحساب حجم الصفقات
✅ شرح المؤشرات (RSI, MACD, Moving Averages, Bollinger Bands)
✅ تحليل العملات والذهب والكريبتو

قواعد الرد:
1. أجب بنفس لغة السؤال (عربي أو إنجليزي)
2. كن محدد مع الأرقام والمستويات
3. قدم خطوات عملية واضحة
4. استخدم الإيموجي للتنسيق
5. أضف تحذير المخاطر عند الاقتضاء

مثال على الرد الممتاز:
📌 التحليل: ...
📊 المستويات: دعم xxx - مقاومة xxx
🎯 السيناريو: إذا كسر xxx فإن ...
⚠️ إدارة المخاطر: ...`;

  try {
    const zai = await ZAI.create();
    
    const completion = await zai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      temperature: 0.7,
      max_tokens: 2000,
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

    console.log("Chat message:", message);

    // Get AI response
    const response = await chatWithAI(message);

    return NextResponse.json({ response });

  } catch (error) {
    console.error("Chat Error:", error);
    return NextResponse.json(
      { error: "حدث خطأ في الاتصال بالذكاء الاصطناعي. حاول مرة أخرى." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Infinity Algo Chat API",
    provider: "Z-AI SDK (Built-in)",
  });
}
