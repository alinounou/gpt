import { LucideIcon } from "lucide-react";
import {
  TrendingUp,
  Target,
  Activity,
  BarChart3,
  DollarSign,
  Layers,
  Calculator,
  Percent,
  LineChart,
  Scale,
  Clock,
  Grid3X3,
  CandlestickChart,
} from "lucide-react";

// Calculator category type
export type CalculatorCategory =
  | "Position Sizing"
  | "Risk Management"
  | "Technical Analysis"
  | "Performance"
  | "Price Analysis"
  | "Advanced";

// Calculator configuration interface
export interface CalculatorConfig {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  longDescription?: string;
  category: CalculatorCategory;
  tags: string[];
  icon: LucideIcon;
  featured?: boolean;
  isNew?: boolean;
  isImplemented?: boolean;
}

// Available calculator categories
export const calculatorCategories: CalculatorCategory[] = [
  "Position Sizing",
  "Risk Management",
  "Technical Analysis",
  "Performance",
  "Price Analysis",
  "Advanced",
];

// All calculators configuration
export const calculators: CalculatorConfig[] = [
  // Position Sizing
  {
    id: "position-size",
    name: "Position Size Calculator",
    slug: "position-size",
    shortDescription: "Calculate optimal position size based on risk parameters",
    longDescription: "Calculate the optimal position size for your trades based on your account size, risk percentage, and stop loss distance. Essential for proper risk management.",
    category: "Position Sizing",
    tags: ["risk", "lot size", "forex", "trading"],
    icon: TrendingUp,
    featured: true,
    isImplemented: true,
  },
  {
    id: "lot-size",
    name: "Lot Size Calculator",
    slug: "lot-size",
    shortDescription: "Calculate lot size for Forex trades",
    longDescription: "Determine the correct lot size for your Forex trades based on account currency, pair, and risk parameters.",
    category: "Position Sizing",
    tags: ["forex", "lot", "units", "size"],
    icon: Calculator,
    featured: false,
    isImplemented: false,
  },
  {
    id: "position-risk",
    name: "Position Risk Calculator",
    slug: "position-risk",
    shortDescription: "Calculate position risk as % of equity",
    longDescription: "Quick back-of-the-envelope calculation for position risk percentage.",
    category: "Position Sizing",
    tags: ["equity", "risk", "percentage"],
    icon: Percent,
    featured: false,
    isImplemented: false,
  },

  // Risk Management
  {
    id: "risk-reward",
    name: "Risk-Reward Calculator",
    slug: "risk-reward",
    shortDescription: "Calculate risk-reward ratio and R-multiples",
    longDescription: "Calculate the risk-reward ratio, R-multiple, and potential profit/loss for your trades. Essential for evaluating trade setups.",
    category: "Risk Management",
    tags: ["R-multiple", "ratio", "profit", "loss"],
    icon: Scale,
    featured: true,
    isImplemented: true,
  },
  {
    id: "r-multiples",
    name: "R-Multiples Calculator",
    slug: "r-multiples",
    shortDescription: "Calculate R-multiples for trade evaluation",
    longDescription: "Calculate R-multiples to evaluate trade performance and compare different trade outcomes.",
    category: "Risk Management",
    tags: ["R-multiple", "performance", "trading"],
    icon: Target,
    featured: false,
    isImplemented: false,
  },
  {
    id: "atr-stop",
    name: "ATR Stop-Loss Calculator",
    slug: "atr-stop",
    shortDescription: "Calculate stop-loss based on ATR volatility",
    longDescription: "Calculate dynamic stop-loss levels based on Average True Range (ATR) for volatility-adjusted risk management.",
    category: "Risk Management",
    tags: ["ATR", "volatility", "stop-loss", "dynamic"],
    icon: Activity,
    featured: true,
    isImplemented: true,
  },
  {
    id: "margin-leverage",
    name: "Margin & Leverage Calculator",
    slug: "margin-leverage",
    shortDescription: "Calculate margin requirements and leverage effects",
    longDescription: "Calculate required margin and understand leverage effects on your trading positions.",
    category: "Risk Management",
    tags: ["margin", "leverage", "forex"],
    icon: DollarSign,
    featured: false,
    isImplemented: false,
  },
  {
    id: "break-even",
    name: "Break-Even Calculator",
    slug: "break-even",
    shortDescription: "Calculate break-even price for multiple positions",
    longDescription: "Calculate the break-even price when you have multiple entries at different prices. Perfect for DCA strategies.",
    category: "Risk Management",
    tags: ["DCA", "average", "break-even"],
    icon: Target,
    featured: false,
    isImplemented: true,
  },
  {
    id: "expectancy",
    name: "Expectancy Calculator",
    slug: "expectancy",
    shortDescription: "Calculate trading system expectancy",
    longDescription: "Calculate the expectancy of your trading system based on win rate and average win/loss.",
    category: "Risk Management",
    tags: ["win rate", "RR", "system", "expectancy"],
    icon: BarChart3,
    featured: false,
    isImplemented: false,
  },
  {
    id: "kelly-criterion",
    name: "Kelly Criterion Calculator",
    slug: "kelly-criterion",
    shortDescription: "Calculate optimal bet size using Kelly Criterion",
    longDescription: "Use the Kelly Criterion formula to determine the optimal position size based on your edge.",
    category: "Risk Management",
    tags: ["kelly", "optimal", "bet size", "edge"],
    icon: Calculator,
    featured: false,
    isImplemented: false,
  },

  // Technical Analysis
  {
    id: "fibonacci-retracement",
    name: "Fibonacci Calculator",
    slug: "fibonacci-retracement",
    shortDescription: "Calculate Fibonacci retracement & extension levels",
    longDescription: "Calculate Fibonacci retracement and extension levels for any price swing. Essential tool for identifying support/resistance and profit targets.",
    category: "Technical Analysis",
    tags: ["fibonacci", "retracement", "extension", "levels"],
    icon: TrendingUp,
    featured: true,
    isImplemented: true,
  },
  {
    id: "pivot-points",
    name: "Pivot Points Calculator",
    slug: "pivot-points",
    shortDescription: "Calculate pivot points and support/resistance levels",
    longDescription: "Calculate classic, Woodie, Camarilla, and Fibonacci pivot points for intraday trading.",
    category: "Technical Analysis",
    tags: ["pivot", "support", "resistance", "levels"],
    icon: Grid3X3,
    featured: false,
    isImplemented: false,
  },
  {
    id: "support-resistance",
    name: "Support/Resistance Zones",
    slug: "support-resistance",
    shortDescription: "Size and map support/resistance zones",
    longDescription: "Tool for sizing and mapping support and resistance zones from price data.",
    category: "Technical Analysis",
    tags: ["support", "resistance", "zones", "levels"],
    icon: Layers,
    featured: false,
    isImplemented: false,
  },
  {
    id: "session-range",
    name: "Session Range Analyzer",
    slug: "session-range",
    shortDescription: "Analyze session highs, lows, and percentage moves",
    longDescription: "Analyze trading session ranges including high/low and percentage moves for different market sessions.",
    category: "Technical Analysis",
    tags: ["session", "range", "high", "low"],
    icon: CandlestickChart,
    featured: false,
    isImplemented: false,
  },

  // Performance
  {
    id: "profit-loss",
    name: "Profit/Loss Calculator",
    slug: "profit-loss",
    shortDescription: "Calculate profit or loss for any trade",
    longDescription: "Calculate the profit or loss for your trades in both pips and monetary terms.",
    category: "Performance",
    tags: ["profit", "loss", "pips", "trading"],
    icon: DollarSign,
    featured: false,
    isImplemented: false,
  },
  {
    id: "compounding",
    name: "Compounding Calculator",
    slug: "compounding",
    shortDescription: "Calculate compound growth over time",
    longDescription: "See how your account grows with compound interest at different return rates.",
    category: "Performance",
    tags: ["compound", "growth", "interest"],
    icon: TrendingUp,
    featured: false,
    isImplemented: false,
  },
  {
    id: "sharpe-ratio",
    name: "Sharpe Ratio Calculator",
    slug: "sharpe-ratio",
    shortDescription: "Calculate risk-adjusted returns",
    longDescription: "Calculate the Sharpe Ratio to measure risk-adjusted returns of your trading strategy.",
    category: "Performance",
    tags: ["sharpe", "risk-adjusted", "returns"],
    icon: BarChart3,
    featured: false,
    isImplemented: false,
  },
  {
    id: "time-to-target",
    name: "Time to Target Calculator",
    slug: "time-to-target",
    shortDescription: "Calculate time to reach profit targets using CAGR",
    longDescription: "Estimate how long it takes to reach your profit target based on compound annual growth rate.",
    category: "Performance",
    tags: ["CAGR", "target", "time", "growth"],
    icon: Clock,
    featured: false,
    isImplemented: false,
  },

  // Price Analysis
  {
    id: "average-price",
    name: "Average Price Calculator (DCA)",
    slug: "average-price",
    shortDescription: "Calculate average entry price for DCA positions",
    longDescription: "Calculate the average price when dollar-cost averaging into positions with multiple entries.",
    category: "Price Analysis",
    tags: ["DCA", "average", "entry", "price"],
    icon: Calculator,
    featured: false,
    isImplemented: false,
  },
  {
    id: "correlation",
    name: "Correlation Calculator",
    slug: "correlation",
    shortDescription: "Calculate correlation between two assets",
    longDescription: "Calculate the correlation coefficient between two assets to understand their relationship.",
    category: "Price Analysis",
    tags: ["correlation", "assets", "pairs"],
    icon: LineChart,
    featured: false,
    isImplemented: false,
  },

  // Advanced
  {
    id: "volatility",
    name: "Volatility Calculator",
    slug: "volatility",
    shortDescription: "Calculate price volatility metrics",
    longDescription: "Calculate historical volatility and other volatility metrics for any asset.",
    category: "Advanced",
    tags: ["volatility", "standard deviation", "risk"],
    icon: Activity,
    featured: false,
    isImplemented: false,
  },
];

// Get calculator by slug
export function getCalculatorBySlug(slug: string): CalculatorConfig | undefined {
  return calculators.find((calc) => calc.slug === slug);
}

// Get featured calculators
export function getFeaturedCalculators(): CalculatorConfig[] {
  return calculators.filter((calc) => calc.featured);
}

// Get calculators by category
export function getCalculatorsByCategory(category: CalculatorCategory): CalculatorConfig[] {
  return calculators.filter((calc) => calc.category === category);
}

// Get implemented calculators
export function getImplementedCalculators(): CalculatorConfig[] {
  return calculators.filter((calc) => calc.isImplemented);
}

export default calculators;
