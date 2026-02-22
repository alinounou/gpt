"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Calculator,
  BrainCircuit,
  Info,
  ExternalLink,
  Menu,
  GraduationCap,
} from "lucide-react";

const navItems = [
  { href: "/calculators", label: "Calculators", icon: Calculator },
  { href: "/ai", label: "AI Analysis", icon: BrainCircuit },
  { href: "/about", label: "About", icon: Info },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground hover:bg-primary/10 gap-2"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
            
            {/* Divider */}
            <div className="w-px h-6 bg-border mx-2" />
            
            {/* Academy Link */}
            <Link
              href="https://infinityalgoacademy.net/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary/10 gap-2"
              >
                <GraduationCap className="h-4 w-4" />
                Infinity Algo Academy
                <ExternalLink className="h-3 w-3" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="glass-card w-72">
                <div className="flex flex-col gap-4 mt-8">
                  <Logo size="lg" className="mb-4" />
                  
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
                      >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                      </Button>
                    </Link>
                  ))}
                  
                  <div className="border-t border-border pt-4 mt-4">
                    <Link
                      href="https://infinityalgoacademy.net/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        className="w-full border-primary/30 text-primary gap-2"
                      >
                        <GraduationCap className="h-5 w-5" />
                        Infinity Algo Academy
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
