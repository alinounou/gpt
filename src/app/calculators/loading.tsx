"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="glass-card rounded-lg p-8 text-center">
      <div className="animate-pulse">
        <div className="h-8 bg-muted rounded w-1/2 mx-auto mb-4"></div>
        <div className="h-4 bg-muted rounded w-3/4 mx-auto mb-2"></div>
        <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
      </div>
    </div>
  );
}
