"use client";

import React, { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  BrainCircuit,
  Send,
  Loader2,
  User,
  Sparkles,
  TrendingUp,
  Calculator,
  BookOpen,
  Shield,
  Trash2,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  { icon: TrendingUp, text: "حلل الذهب XAUUSD وأعطني المستويات", color: "text-yellow-500" },
  { icon: Calculator, text: "ما هو أفضل حجم صفقة لـ EUR/USD؟", color: "text-blue-500" },
  { icon: BookOpen, text: "اشرح لي استراتيجية فيبوناتشي", color: "text-green-500" },
  { icon: Shield, text: "كيف أدير المخاطر في التداول؟", color: "text-purple-500" },
];

declare global {
  interface Window {
    puter: {
      ai: {
        chat: (message: string, options?: { model?: string }) => Promise<string>;
      };
    };
  }
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [puterReady, setPuterReady] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load Puter.js
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.puter.com/v2/";
    script.async = true;
    script.onload = () => {
      setPuterReady(true);
      console.log("Puter.js loaded!");
    };
    document.body.appendChild(script);
  }, []);

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading || !puterReady) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const systemPrompt = `أنت خبير تداول محترف مع 20 سنة خبرة في الأسواق المالية (Forex, Crypto, Stocks, Gold, Oil).

مهمتك: مساعدة المتداولين بالإجابة على أسئلتهم بشكل واضح ومفصل.

قدراتك:
✅ تحليل فني (فيبوناتشي، دعم/مقاومة، اتجاهات، نماذج شموع يابانية)
✅ استراتيجيات تداول (سكالبينج، سوينج، داي تريدنج)
✅ إدارة مخاطر وحساب حجم الصفقات
✅ شرح المؤشرات (RSI, MACD, Moving Averages)
✅ تحليل العملات والذهب والكريبتو

قواعد الرد:
1. أجب بنفس لغة السؤال (عربي أو إنجليزي)
2. كن محدد مع الأرقام والمستويات
3. قدم خطوات عملية واضحة
4. استخدم الإيموجي للتنسيق
5. أضف تحذير المخاطر عند الاقتضاء`;

      const fullMessage = `${systemPrompt}\n\nسؤال المتداول: ${messageText}`;

      const response = await window.puter.ai.chat(fullMessage, { model: "gpt-4o-mini" });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response || "عذراً، لم أتمكن من الرد.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "❌ حدث خطأ في الاتصال. حاول مرة أخرى.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-16 flex flex-col max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="p-4 border-b border-primary/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-green-500 flex items-center justify-center">
                <BrainCircuit className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Infinity Algo AI</h1>
                <p className="text-xs text-muted-foreground">اسأل أي سؤال عن التداول</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={`${puterReady ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-yellow-500/20 text-yellow-400"}`}>
                <Sparkles className="h-3 w-3 mr-1" />
                {puterReady ? "Ready" : "Loading..."}
              </Badge>
              {messages.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearChat}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-green-500/20 flex items-center justify-center mb-6">
                <BrainCircuit className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">مرحباً! 👋</h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                أنا مساعدك في التداول. اسألني أي شيء عن الأسواق، التحليل الفني، 
                استراتيجيات التداول، أو إدارة المخاطر.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
                {suggestions.map((s, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    className="justify-start text-left h-auto py-3 px-4 border-primary/20 hover:border-primary"
                    onClick={() => sendMessage(s.text)}
                    disabled={!puterReady}
                  >
                    <s.icon className={`h-4 w-4 mr-2 shrink-0 ${s.color}`} />
                    <span className="text-xs">{s.text}</span>
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shrink-0">
                    <BrainCircuit className="h-4 w-4 text-white" />
                  </div>
                )}
                
                <Card
                  className={`max-w-[85%] p-4 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50"
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </div>
                </Card>
                
                {message.role === "user" && (
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <User className="h-4 w-4 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shrink-0">
                <BrainCircuit className="h-4 w-4 text-white" />
              </div>
              <Card className="bg-muted/50 p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">جاري التفكير...</span>
                </div>
              </Card>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-primary/10">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="اكتب سؤالك هنا... (مثال: حلل الذهب XAUUSD)"
              className="min-h-[50px] max-h-[150px] resize-none bg-muted/50 border-primary/20 focus:border-primary"
              disabled={isLoading || !puterReady}
            />
            <Button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading || !puterReady}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 hover:opacity-90 shrink-0"
              size="icon"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            ⚡ Powered by Puter AI (Free) | ⚠️ التحليل لأغراض تعليمية فقط
          </p>
        </div>
      </div>
    </div>
  );
}
