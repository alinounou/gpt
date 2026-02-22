"use client";

import React from "react";
import { Navbar } from "./Navbar";

interface LayoutShellProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  sidebar?: React.ReactNode;
  rightPanel?: React.ReactNode;
}

export function LayoutShell({ children, showSidebar = false, sidebar, rightPanel }: LayoutShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-16 flex min-h-screen">
        {/* Left Sidebar */}
        {showSidebar && sidebar && (
          <div className="fixed left-0 top-16 bottom-0 z-40 hidden md:block">
            {sidebar}
          </div>
        )}
        
        {/* Main Content */}
        <main className={`flex-1 ${showSidebar ? "md:ml-72" : ""} ${rightPanel ? "md:mr-72" : ""}`}>
          <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
        
        {/* Right Panel */}
        {rightPanel && (
          <div className="fixed right-0 top-16 bottom-0 w-72 z-40 hidden md:block">
            {rightPanel}
          </div>
        )}
      </div>
    </div>
  );
}

export default LayoutShell;
