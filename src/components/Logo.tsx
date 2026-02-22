"use client";

import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", showText = true, size = "md" }: LogoProps) {
  const sizeMap = {
    sm: { icon: 24, text: "text-lg" },
    md: { icon: 32, text: "text-xl" },
    lg: { icon: 48, text: "text-3xl" },
  };

  const { icon: iconSize, text: textSize } = sizeMap[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Infinity Symbol SVG */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <path
          d="M25 25c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20zm50 0c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20z"
          fill="none"
          stroke="url(#infinityGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          transform="translate(-10, 0)"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          }}
        />
        {/* Infinity shape using two overlapping circles */}
        <path
          d="M30 25c0-8.284 6.716-15 15-15s15 6.716 15 15-6.716 15-15 15-15-6.716-15-15zm25 0c0-8.284 6.716-15 15-15s15 6.716 15 15-6.716 15-15 15-15-6.716-15-15z"
          fill="none"
          stroke="url(#infinityGradient)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
      
      {showText && (
        <div className={`flex flex-col leading-tight ${textSize}`}>
          <span className="font-bold gradient-text">infinity algo</span>
          <span className="text-muted-foreground text-xs font-light tracking-wide">by Jeremy</span>
        </div>
      )}
    </div>
  );
}

export default Logo;
