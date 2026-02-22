import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

interface ChatRequest {
  message: string;
}

const SYSTEM_PROMPT = `أنت خبير تداول محترف مع 20 سنة خبرة في الأسواق المالية (Forex, Crypto, Stocks, Gold, Oil, Indices).

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
5. أضف تحذير المخاطر عند الاقتضاء`;

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { message } = body;

    if (!message?.trim()) {
      return NextResponse.json({ error: "اكتب سؤالك" }, { status: 400 });
    }

    console.log("📩 Message:", message);

    // Try Gemini first, fallback to ZAI
    const apiKey = process.env.GOOGLE_AI_API_KEY;

    if (apiKey) {
      try {
        // Try Gemini 1.5 Flash (different quota)
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{
                parts: [
                  { text: SYSTEM_PROMPT + "\n\nسؤال: " + message }
                ]
              }],
              generationConfig: { temperature: 0.7, maxOutputTokens: 2000 }
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            console.log("✅ Gemini response");
            return NextResponse.json({ response: text, provider: "Gemini" });
          }
        }
      } catch (e) {
        console.log("Gemini failed, trying ZAI...");
      }
    }

    // Fallback to Z-AI SDK (always works)
    const zai = await ZAI.create();
    const completion = await zai.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const response = completion.choices?.[0]?.message?.content;

    if (!response) {
      throw new Error("No response");
    }

    console.log("✅ ZAI response");
    return NextResponse.json({ response, provider: "Super Z AI" });

  } catch (error) {
    console.error("❌ Error:", error);
    return NextResponse.json(
      { error: "حدث خطأ، حاول مرة أخرى" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Infinity Algo AI",
    providers: ["Google Gemini", "Super Z AI (fallback)"],
    hasGeminiKey: !!process.env.GOOGLE_AI_API_KEY,
  });
}
