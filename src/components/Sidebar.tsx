"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { calculators, CalculatorConfig, calculatorCategories } from "@/config/calculators";
import {
  Search,
  TrendingUp,
  Percent,
  Target,
  BarChart3,
  Activity,
  DollarSign,
  Layers,
  Calculator as CalculatorIcon,
} from "lucide-react";

const categoryIcons: Record<string, React.ElementType> = {
  "Position Sizing": TrendingUp,
  "Risk Management": Target,
  "Technical Analysis": Activity,
  "Performance": BarChart3,
  "Price Analysis": DollarSign,
  "Advanced": Layers,
};

interface SidebarProps {
  activeSlug?: string;
  onCalculatorSelect?: (slug: string) => void;
}

export function Sidebar({ activeSlug, onCalculatorSelect }: SidebarProps) {
  const [search, setSearch] = React.useState("");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSlug = activeSlug || searchParams.get("calc") || "fibonacci-retracement";

  const filteredCalculators = calculators.filter(
    (calc) =>
      calc.name.toLowerCase().includes(search.toLowerCase()) ||
      calc.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
      calc.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  const groupedCalculators = calculatorCategories.reduce((acc, category) => {
    const items = filteredCalculators.filter((calc) => calc.category === category);
    if (items.length > 0) {
      acc[category] = items;
    }
    return acc;
  }, {} as Record<string, CalculatorConfig[]>);

  return (
    <aside className="w-72 glass-card border-r border-primary/20 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-primary/10">
        <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <CalculatorIcon className="h-5 w-5 text-primary" />
          Trading Calculators
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search calculators..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-muted/50 border-primary/20 focus:border-primary"
          />
        </div>
      </div>

      {/* Calculator List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {Object.entries(groupedCalculators).map(([category, items]) => {
            const CategoryIcon = categoryIcons[category] || CalculatorIcon;
            return (
              <div key={category} className="mb-4">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2 flex items-center gap-2">
                  <CategoryIcon className="h-3 w-3" />
                  {category}
                </h3>
                <div className="space-y-1">
                  {items.map((calc) => (
                    <Link
                      key={calc.id}
                      href={`${pathname}?calc=${calc.slug}`}
                      onClick={() => onCalculatorSelect?.(calc.slug)}
                      className={`block px-3 py-2.5 rounded-lg transition-all ${
                        currentSlug === calc.slug
                          ? "bg-primary/20 border border-primary/30 text-foreground"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{calc.name}</span>
                        {calc.isNew && (
                          <Badge className="bg-secondary text-secondary-foreground text-xs px-1.5 py-0">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                        {calc.shortDescription}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-primary/10">
        <p className="text-xs text-muted-foreground text-center">
          {calculators.length} free pro-grade calculators
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
