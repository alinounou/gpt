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
 * Real OpenAI Analysis Function
 */
async function realAnalyze(request: AnalyzeRequest): Promise<AnalyzeResponse> {
  const { market, symbol, timeframe, levels, userPrompt } = request;

  const systemPrompt = `أنت محلل أسواق مالي محترف. قم بتحليل البيانات المقدمة وأعطِ رداً منظم بالشكل التالي:

يجب أن يكون الرد بتنسيق JSON صالح فقط (بدون أي نص إضافي):

{
  "bias": "bullish" أو "bearish" أو "neutral",
  "keyLevels": [
    {"type": "اسم المستوى", "price": "السعر", "note": "ملاحظة قصيرة"}
  ],
  "scenarios": [
    {"condition": "الشرط", "action": "الإجراء", "target": "الهدف"}
  ],
  "riskNote": "ملاحظة إدارة المخاطر",
  "rawText": "التحليل الكامل بالعربية أو الإنجليزية"
}

قواعد التحليل:
1. حدد اتجاه السوق (bullish/bearish/neutral)
2. حدد 3-4 مستويات رئيسية (دعم/مقاومة/فيبوناتشي)
3. قدم 2-3 سيناريوهات تداول IF-THEN
4. أضف ملاحظة إدارة مخاطر واضحة
5. التحليل يجب أن يكون مهني ومفصل`;

  const userMessage = `تحليل السوق:
- السوق: ${market}
- الرمز: ${symbol}
- الإطار الزمني: ${timeframe}
${levels?.high ? `- أعلى سعر: ${levels.high}` : ""}
${levels?.low ? `- أدنى سعر: ${levels.low}` : ""}
${levels?.close ? `- السعر الحالي: ${levels.close}` : ""}

سؤال المتداول: ${userPrompt}`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 2000,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenAI API Error:", errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error("No response from OpenAI");
    }

    const result = JSON.parse(content);

    // Ensure all required fields exist
    return {
      bias: result.bias || "neutral",
      keyLevels: result.keyLevels || [],
      scenarios: result.scenarios || [],
      riskNote: result.riskNote || "استخدم إدارة مخاطر مناسبة ولا تخاطر بأكثر من 1-2% من رأس المال.",
      rawText: result.rawText || "تم التحليل بنجاح.",
    };
  } catch (error) {
    console.error("Analysis Error:", error);
    throw error;
  }
}

/**
 * Fallback Mock Analysis (used when API fails)
 */
async function mockAnalyze(request: AnalyzeRequest): Promise<AnalyzeResponse> {
  const { market, symbol, timeframe, levels, userPrompt } = request;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const promptLower = userPrompt.toLowerCase();
  let bias: "bullish" | "bearish" | "neutral" = "neutral";

  if (
    promptLower.includes("شراء") ||
    promptLower.includes("buy") ||
    promptLower.includes("bullish") ||
    promptLower.includes("long") ||
    promptLower.includes("صعود")
  ) {
    bias = "bullish";
  } else if (
    promptLower.includes("بيع") ||
    promptLower.includes("sell") ||
    promptLower.includes("bearish") ||
    promptLower.includes("short") ||
    promptLower.includes("هبوط")
  ) {
    bias = "bearish";
  }

  const basePrice = levels?.close ? parseFloat(levels.close) : 1.08500;
  const highPrice = levels?.high ? parseFloat(levels.high) : basePrice * 1.01;
  const lowPrice = levels?.low ? parseFloat(levels.low) : basePrice * 0.99;

  const keyLevels = [
    {
      type: "مقاومة 1 / Resistance 1",
      price: highPrice.toFixed(5),
      note: "أعلى سوينج - مستوى اختراق مهم",
    },
    {
      type: "نقطة المحور / Pivot",
      price: basePrice.toFixed(5),
      note: "السعر الحالي - نقطة قرار",
    },
    {
      type: "دعم 1 / Support 1",
      price: lowPrice.toFixed(5),
      note: "أدنى سوينج - منطقة طلب",
    },
    {
      type: "فيبوناتشي 61.8%",
      price: (lowPrice + (highPrice - lowPrice) * 0.618).toFixed(5),
      note: "مستوى فيبوناتشي الذهبي",
    },
  ];

  const scenarios = [
    {
      condition: `اختراق السعر فوق ${highPrice.toFixed(5)}`,
      action: bias === "bullish" ? "ابحث عن دخول شراء عند إعادة الاختبار" : "انتظر التأكيد",
      target: (highPrice * 1.015).toFixed(5),
    },
    {
      condition: `ثبات السعر فوق ${lowPrice.toFixed(5)}`,
      action: "ابحث عن نماذج انعكاس صاعدة",
      target: basePrice.toFixed(5),
    },
    {
      condition: `كسر السعر تحت ${lowPrice.toFixed(5)}`,
      action: bias === "bearish" ? "ابحث عن دخول بيع" : "اخرج من صفقات الشراء",
      target: (lowPrice * 0.985).toFixed(5),
    },
  ];

  const riskNote = `التقلب الحالي على ${symbol} يشير إلى استخدام وقف خسارة ${timeframe === "D1" ? "أوسع" : "قياسي"}. خاطر بـ 1-2% كحد أقصى من رأس المال. ظروف السوق قد تتغير بسرعة.`;

  const rawText = `📊 تحليل AI لـ ${symbol} (${market.toUpperCase()})

🎯 اتجاه السوق: ${bias === "bullish" ? "صاعد BULLISH" : bias === "bearish" ? "هبوطي BEARISH" : "محايد NEUTRAL"}
⏰ الإطار الزمني: ${timeframe}

📍 المستويات الرئيسية:
${keyLevels.map((l) => `  • ${l.type}: ${l.price} - ${l.note}`).join("\n")}

📈 سيناريوهات التداول:
${scenarios.map((s, i) => `  ${i + 1}. IF ${s.condition}\n     THEN ${s.action}\n     الهدف: ${s.target}`).join("\n\n")}

⚠️ إدارة المخاطر:
${riskNote}

---
هذا التحليل لأغراض تعليمية فقط ولا يُعتبر نصيحة مالية. دائماً قم بأبحاثك الخاصة وأدر مخاطرك بشكل مناسب.

تم إنشاؤه بواسطة Infinity Algo AI Assistant`;

  return {
    bias,
    keyLevels,
    scenarios,
    riskNote,
    rawText,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: AnalyzeRequest = await request.json();

    if (!body.symbol || !body.userPrompt) {
      return NextResponse.json(
        { error: "Symbol and user prompt are required" },
        { status: 400 }
      );
    }

    // Try real analysis first, fall back to mock if API fails
    let result: AnalyzeResponse;

    if (process.env.OPENAI_API_KEY) {
      try {
        result = await realAnalyze(body);
      } catch (apiError) {
        console.warn("OpenAI API failed, using mock analysis:", apiError);
        result = await mockAnalyze(body);
      }
    } else {
      result = await mockAnalyze(body);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return NextResponse.json(
      { error: "Failed to analyze market data" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "AI Analysis API is running",
    hasApiKey: !!process.env.OPENAI_API_KEY,
    version: "2.0.0",
  });
}
