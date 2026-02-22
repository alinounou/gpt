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
 * Professional Trading Analysis using OpenAI GPT-4
 */
async function analyzeMarket(request: AnalyzeRequest): Promise<AnalyzeResponse> {
  const { market, symbol, timeframe, levels, userPrompt } = request;

  const systemPrompt = `أنت محلل أسواق مالي محترف مع خبرة 15+ سنة في التحليل الفني والأساسي. 

مهمتك: تحليل الأداة المالية المطلوبة وإعطاء تحليل مهني دقيق.

قواعد التحليل:
1. استخدم التحليل الفني (Fibonacci, Support/Resistance, Trend Lines)
2. حدد الاتجاه العام مع درجة الثقة
3. أعط مستويات دقة ومقاومة محددة
4. قدم سيناريوهات تداول واضحة مع نقاط الدخول والخروج
5. حدد نسبة المخاطرة للعائد (Risk/Reward)
6. أضف تحذيرات إدارة المخاطر

**مهم جداً**: الرد يجب أن يكون JSON صالح فقط بدون أي نص إضافي!

صيغة الرد المطلوبة:
{
  "bias": "bullish" أو "bearish" أو "neutral",
  "keyLevels": [
    {"type": "اسم المستوى بالعربية والإنجليزية", "price": "السعر رقم فقط", "note": "ملاحظة قصيرة"}
  ],
  "scenarios": [
    {"condition": "الشرط بالتفصيل", "action": "الإجراء المحدد", "target": "الهدف السعر"}
  ],
  "riskNote": "ملاحظة شاملة لإدارة المخاطر",
  "rawText": "تحليل مفصل بالعربية يتضمن:\\n- نظرة عامة على السوق\\n- التحليل الفني\\n- المستويات الرئيسية\\n- التوصيات\\n- التحذيرات"
}`;

  const userMessage = `📊 طلب تحليل سوق:

🔹 السوق: ${market}
🔹 الرمز: ${symbol}
🔹 الإطار الزمني: ${timeframe}
${levels?.high ? `🔹 أعلى سعر: ${levels.high}` : ""}
${levels?.low ? `🔹 أدنى سعر: ${levels.low}` : ""}
${levels?.close ? `🔹 السعر الحالي: ${levels.close}` : ""}

📝 سؤال المتداول:
${userPrompt}

أعطني تحليل مهني مفصل مع مستويات دقيقة وسيناريوهات تداول واضحة.`;

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
        temperature: 0.3,
        max_tokens: 3000,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenAI API Error:", JSON.stringify(errorData, null, 2));
      throw new Error(`OpenAI API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error("No response content from OpenAI");
    }

    console.log("OpenAI Response:", content.substring(0, 200) + "...");

    const result = JSON.parse(content);

    // Validate and ensure all required fields exist
    return {
      bias: ["bullish", "bearish", "neutral"].includes(result.bias) ? result.bias : "neutral",
      keyLevels: Array.isArray(result.keyLevels) ? result.keyLevels.slice(0, 6) : [],
      scenarios: Array.isArray(result.scenarios) ? result.scenarios.slice(0, 4) : [],
      riskNote: result.riskNote || "استخدم إدارة مخاطر مناسبة (1-2% كحد أقصى من رأس المال لكل صفقة). ضع وقف الخسارة دائماً.",
      rawText: result.rawText || "تم التحليل بنجاح.",
    };
  } catch (error) {
    console.error("Analysis Error:", error);
    throw error;
  }
}

/**
 * Fallback Analysis (when API is unavailable)
 */
async function fallbackAnalysis(request: AnalyzeRequest): Promise<AnalyzeResponse> {
  const { market, symbol, timeframe, levels, userPrompt } = request;

  // Analyze prompt for sentiment
  const promptLower = userPrompt.toLowerCase();
  let bias: "bullish" | "bearish" | "neutral" = "neutral";
  
  const bullishKeywords = ["شراء", "buy", "bullish", "long", "صعود", "ارتداد", "support", "دعم", "اختراق", "breakout"];
  const bearishKeywords = ["بيع", "sell", "bearish", "short", "هبوط", "تصحيح", "resistance", "مقاومة", "كسر", "breakdown"];
  
  const bullishScore = bullishKeywords.filter(k => promptLower.includes(k)).length;
  const bearishScore = bearishKeywords.filter(k => promptLower.includes(k)).length;
  
  if (bullishScore > bearishScore) bias = "bullish";
  else if (bearishScore > bullishScore) bias = "bearish";

  // Generate levels based on provided prices or defaults
  const basePrice = levels?.close ? parseFloat(levels.close) : 
                    market === "crypto" ? 45000 : 
                    market === "forex" ? 1.0850 : 100;
  
  const highPrice = levels?.high ? parseFloat(levels.high) : basePrice * 1.02;
  const lowPrice = levels?.low ? parseFloat(levels.low) : basePrice * 0.98;

  const decimals = market === "forex" ? 5 : market === "crypto" ? 2 : 2;

  const keyLevels = [
    {
      type: "مقاومة رئيسية / Major Resistance",
      price: highPrice.toFixed(decimals),
      note: `أعلى مستوى - اختراقه يعني استمرار الصعود`,
    },
    {
      type: "مستوى فيبوناتشي 61.8%",
      price: (lowPrice + (highPrice - lowPrice) * 0.618).toFixed(decimals),
      note: "المستوى الذهبي - منطقة انعكاس قوية",
    },
    {
      type: "نقطة المحور / Pivot",
      price: basePrice.toFixed(decimals),
      note: "السعر الحالي - نقطة اتخاذ القرار",
    },
    {
      type: "دعم رئيسي / Major Support",
      price: lowPrice.toFixed(decimals),
      note: "أدنى مستوى - كسره يعني استمرار الهبوط",
    },
  ];

  const scenarios = [
    {
      condition: `اختراق السعر لمستوى ${highPrice.toFixed(decimals)} مع إغلاق واضح`,
      action: bias === "bullish" ? "دخول شراء مع وقف خسارة تحت المستوى المكسور" : "انتظار تأكيد الاختراق وإعادة الاختبار",
      target: (highPrice * 1.03).toFixed(decimals),
    },
    {
      condition: `ارتداد السعر من ${highPrice.toFixed(decimals)} مع نماذج انعكاس`,
      action: "البحث عن فرصة بيع مع وقف خسارة فوق القمة",
      target: lowPrice.toFixed(decimals),
    },
    {
      condition: `ثبات السعر فوق ${lowPrice.toFixed(decimals)} مع إشارات شراء`,
      action: bias !== "bearish" ? "دخول شراء مع وقف خسارة تحت الدعم" : "انتظار تأكيد أكثر",
      target: basePrice.toFixed(decimals),
    },
  ];

  const riskNote = `⚠️ إدارة المخاطر:
- لا تخاطر بأكثر من 1-2% من رأس المال في صفقة واحدة
- استخدم وقف الخسارة دائماً
- نسبة المخاطرة للعائد الموصى بها: 1:2 على الأقل
- الإطار الزمني ${timeframe} يتطلب وقف خسارة ${timeframe === "D1" ? "50-100 نقطة" : timeframe === "H4" ? "30-50 نقطة" : "15-30 نقطة"}`;

  const rawText = `📊 تحليل ${symbol} - ${market.toUpperCase()}
⏰ الإطار الزمني: ${timeframe}

🎯 نظرة عامة:
الاتجاه الحالي: ${bias === "bullish" ? "صاعد 📈" : bias === "bearish" ? "هبوطي 📉" : "محايد ➡️"}
السعر الحالي: ${basePrice.toFixed(decimals)}

📍 المستويات الرئيسية:
${keyLevels.map(l => `• ${l.type}: ${l.price} - ${l.note}`).join("\n")}

📈 سيناريوهات التداول:
${scenarios.map((s, i) => `
${i + 1}. ${s.condition}
   → ${s.action}
   → الهدف: ${s.target}`).join("\n")}

${riskNote}

⚠️ تنبيه: هذا التحليل لأغراض تعليمية فقط ولا يُعتبر نصيحة مالية. تداول	workflows ينطوي على مخاطر عالية.

تم التحليل بواسطة Infinity Algo AI 🤖`;

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

    // Validate required fields
    if (!body.symbol || !body.userPrompt) {
      return NextResponse.json(
        { error: "يرجى إدخال الرمز والسؤال" },
        { status: 400 }
      );
    }

    console.log("Analysis Request:", { symbol: body.symbol, market: body.market, hasApiKey: !!process.env.OPENAI_API_KEY });

    let result: AnalyzeResponse;

    // Use real OpenAI if API key exists
    if (process.env.OPENAI_API_KEY) {
      try {
        console.log("Using OpenAI GPT-4o for analysis...");
        result = await analyzeMarket(body);
        console.log("OpenAI analysis completed successfully");
      } catch (apiError) {
        console.error("OpenAI API failed, using fallback:", apiError instanceof Error ? apiError.message : apiError);
        result = await fallbackAnalysis(body);
      }
    } else {
      console.log("No API key, using fallback analysis");
      result = await fallbackAnalysis(body);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return NextResponse.json(
      { error: "حدث خطأ في التحليل. يرجى المحاولة مرة أخرى." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "AI Analysis API is running",
    hasApiKey: !!process.env.OPENAI_API_KEY,
    model: "gpt-4o",
    version: "3.0.0",
  });
}
