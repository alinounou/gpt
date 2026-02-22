# Infinity Algo by Jeremy

Professional-grade trading calculators and AI-powered market analysis tools. 100% free.

![Infinity Algo](https://infinityalgoacademy.net/og-image.png)

## 🚀 Features

- **20+ Trading Calculators**: Fibonacci, Position Size, Risk-Reward, ATR Stop, Break-Even, and many more
- **AI Market Analysis**: Natural language queries in Arabic or English
- **Professional Dark Theme**: Modern glassmorphism design inspired by TrendSpider
- **100% Free**: No sign-up required, no hidden fees
- **Mobile Responsive**: Works on all devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui
- **Backend**: Next.js API Routes
- **AI**: Mock implementation (ready for real LLM integration)

## 📦 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/infinity-algo.git
cd infinity-algo
```

2. Install dependencies:
```bash
bun install
# or
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
bun run dev
# or
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add environment variables (if using real LLM)
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/infinity-algo)

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `LLM_API_KEY` | API key for LLM provider | No (only for real AI) |

## 📚 Adding New Calculators

1. Create a new component in `src/components/calculators/`:

```typescript
// src/components/calculators/MyCalculator.tsx
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MyCalculator() {
  return (
    <Card className="glass-card glass-card-hover">
      <CardHeader>
        <CardTitle>My Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Calculator inputs and logic */}
      </CardContent>
    </Card>
  );
}
```

2. Register it in `src/config/calculators.ts`:

```typescript
{
  id: "my-calculator",
  name: "My Calculator",
  slug: "my-calculator",
  shortDescription: "Description here",
  category: "Position Sizing",
  tags: ["tag1", "tag2"],
  icon: TrendingUp,
  isImplemented: true,
}
```

3. Add to the component map in `src/app/calculators/page.tsx`

## 🤖 Connecting a Real LLM

Replace the mock implementation in `src/app/api/ai-analyze/route.ts`:

```typescript
import ZAI from 'z-ai-web-dev-sdk';

async function realAnalyze(request: AnalyzeRequest): Promise<AnalyzeResponse> {
  const zai = await ZAI.create();
  
  const completion = await zai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a trading analyst..." },
      { role: "user", content: JSON.stringify(request) }
    ]
  });
  
  return JSON.parse(completion.choices[0].message.content);
}
```

## 📈 How to Promote

### Social Media Post Ideas

**LinkedIn:**
> 🔥 Free professional trading calculators! 
> 
> Infinity Algo offers 20+ pro-grade tools including:
> - Fibonacci calculator
> - Position size calculator
> - Risk-reward calculator
> - AI market analysis
>
> 100% free, no sign-up required. Built for serious traders.
> 
> Try it now: [link]
> Learn trading at Infinity Algo Academy: https://infinityalgoacademy.net/

**Twitter/X:**
> 📊 Free Fibonacci calculator + AI analysis for traders!
> 
> No sign-up. No fees. Just professional tools.
> 
> Try it: [link]
> 
> #Trading #Forex #Crypto #FreeTools

**Arabic Posts:**
> 🔥 أدوات تداول مجانية احترافية!
> 
> حاسبة فيبوناتشي + تحليل AI بالعربي والإنجليزي
> 
> مجاني 100% بدون تسجيل
> 
> جرب الآن: [link]
> 
> #تداول #فوركس #ذكاء_اصطناعي

### SEO Keywords

- Free Fibonacci trading calculator
- Free position size calculator
- Free risk reward calculator
- Trading calculator online
- Forex lot size calculator
- ATR stop loss calculator
- AI market analysis tool
- Arabic trading analysis

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Home page
│   ├── calculators/page.tsx # Calculator listing
│   ├── ai/page.tsx         # AI analysis page
│   ├── about/page.tsx      # About page
│   └── api/
│       └── ai-analyze/route.ts # AI analysis API
├── components/
│   ├── Logo.tsx            # Brand logo
│   ├── Navbar.tsx          # Top navigation
│   ├── Sidebar.tsx         # Calculator sidebar
│   ├── RightPanel.tsx      # Tips & insights panel
│   ├── LayoutShell.tsx     # Layout wrapper
│   └── calculators/        # Calculator components
│       ├── FibonacciCalculator.tsx
│       ├── PositionSizeCalculator.tsx
│       └── ... (20+ more)
├── config/
│   └── calculators.ts      # Calculator registry
└── lib/
    └── utils.ts            # Utility functions
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - feel free to use this for your own projects.

## 🔗 Links

- **Live Demo**: [Coming Soon]
- **Infinity Algo Academy**: https://infinityalgoacademy.net/
- **Report Issues**: [GitHub Issues]

---

Built with ❤️ by Jeremy and the Infinity Algo Academy team
