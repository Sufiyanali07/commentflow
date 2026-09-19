"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-[#833AB4]/08 bg-[#FAF8FB] py-12 sm:py-16 text-[#8E8A98] text-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 pb-8 sm:pb-12 border-b border-[#833AB4]/06">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full ig-story-ring shadow-[0_0_8px_rgba(225,48,108,0.4)]" />
              <span className="text-base font-semibold text-[#262626]">
                Comment<span className="font-serif italic font-normal ig-gradient-text">Flow</span>
              </span>
            </div>
            <p className="text-[#5E5868] max-w-sm text-xs leading-relaxed">
              Quiet, automated bridges between Instagram comments and direct customer conversations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-xs font-medium text-[#5E5868]">
            <a href="#concept" className="hover:text-[#C13584] transition-colors">Concept</a>
            <a href="#pillars" className="hover:text-[#C13584] transition-colors">Core Usage</a>
            <a href="#pricing" className="hover:text-[#C13584] transition-colors">Pricing</a>
            <a href="#contact" className="hover:text-[#C13584] transition-colors">Inquiry</a>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 text-[11px] text-[#8E8A98]">
          <div>
            © {new Date().getFullYear()} CommentFlow Studio. All rights reserved.
          </div>
          <div className="text-[#833AB4] font-mono">
            Official Meta Graph API Integration • Zero Spam Guarantee
          </div>
        </div>
      </div>
    </footer>
  );
}
