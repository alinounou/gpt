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
5. أضف تحذير المخاطر عند الاقتضاء

أمثلة على الردود الممتازة:
- للتحليل: اذكر المستويات (دعم/مقاومة) بأرقام محددة
- للاستراتيجيات: اشرح خطوات التنفيذ
- للمخاطر: قدم نسب ونصائح محددة`;

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { message } = body;

    if (!message?.trim()) {
      return NextResponse.json({ error: "اكتب سؤالك" }, { status: 400 });
    }

    console.log("📩 Received:", message);

    // Create ZAI instance
    const zai = await ZAI.create();
    
    // Call AI
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
      throw new Error("No response from AI");
    }

    console.log("✅ Response:", response.substring(0, 100) + "...");

    return NextResponse.json({ response });

  } catch (error) {
    console.error("❌ Chat Error:", error);
    return NextResponse.json(
      { error: "حدث خطأ، حاول مرة أخرى" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Infinity Algo AI Chat - Built-in ZAI SDK",
    powered: "Super Z AI (Free & Unlimited)",
  });
}
