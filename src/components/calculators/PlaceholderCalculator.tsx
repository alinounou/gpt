"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Construction, Info } from "lucide-react";

interface PlaceholderCalculatorProps {
  title: string;
  description: string;
  inputs: string[];
  outputs: string[];
  formula?: string;
}

export function PlaceholderCalculator({
  title,
  description,
  inputs,
  outputs,
  formula,
}: PlaceholderCalculatorProps) {
  return (
    <Card className="glass-card glass-card-hover">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Construction className="h-5 w-5 text-yellow-500" />
              {title}
              <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">Coming Soon</Badge>
            </CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Input Placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inputs.map((input, index) => (
            <div key={index} className="space-y-2">
              <Label className="text-muted-foreground">{input}</Label>
              <Input
                disabled
                placeholder="Coming soon..."
                className="bg-muted/30 border-primary/20"
              />
            </div>
          ))}
        </div>

        {/* Calculate Button */}
        <Button disabled className="w-full bg-muted text-muted-foreground">
          Calculate
        </Button>

        {/* Output Placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {outputs.map((output, index) => (
            <div key={index} className="bg-muted/30 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground">{output}</p>
              <p className="text-xl font-bold text-muted-foreground/50 mt-1">--</p>
            </div>
          ))}
        </div>

        {/* Formula Info */}
        {formula && (
          <div className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-2">Formula:</p>
            <p className="text-xs font-mono bg-muted/50 p-2 rounded">{formula}</p>
          </div>
        )}

        {/* TODO Note */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-sm">
          <p className="text-yellow-200 font-medium">Under Development</p>
          <p className="text-xs text-muted-foreground mt-1">
            This calculator is currently being developed. Check back soon for updates!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default PlaceholderCalculator;
