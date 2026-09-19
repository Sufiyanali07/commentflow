"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Concept() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".concept-row",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="concept"
      ref={sectionRef}
      className="py-20 sm:py-32 relative border-t border-[#262626]/08 bg-[#F3EEF8]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="concept-row max-w-4xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFFFF] border border-[#833AB4]/18 shadow-xs mb-4">
            <span className="w-2 h-2 rounded-full bg-[#E1306C] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#833AB4] font-bold">
              01 / The Philosophy
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#262626] leading-[1.12]">
            Why modern creators are leaving{" "}
            <span className="font-serif italic font-normal ig-gradient-text relative inline-block">
              &quot;link in bio&quot;
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-[#E1306C] to-[#F56040] opacity-40 rounded-full" />
            </span>{" "}
            behind.
          </h2>
        </div>

        {/* Narrative editorial text (no boxes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16 items-start pb-16 border-b border-[#262626]/08">
          <div className="concept-row space-y-4 text-[#5E5868] text-base sm:text-lg leading-relaxed font-normal">
            <p>
              When a follower discovers your post or viral reel, their intent is at its highest peak. Telling them to navigate to your profile, tap a link tree, and browse an external web page introduces friction where 82% drop off.
            </p>
            <p>
              <strong className="text-[#262626] font-medium">CommentFlow bridges this friction entirely.</strong> The moment someone comments on your post, our engine fires a targeted private message directly into their inbox.
            </p>
          </div>

          <div className="concept-row space-y-4 text-[#5E5868] text-base sm:text-lg leading-relaxed font-normal">
            <p>
              Whether you are delivering a coupon discount code, a strategy PDF workbook, an event calendar link, or a course registration, your audience gets immediate gratification inside their native Instagram app.
            </p>
            <p className="ig-gradient-text font-serif italic text-lg sm:text-xl pt-2 font-bold">
              &quot;Convert attention into revenue without interrupting the social experience.&quot;
            </p>
          </div>
        </div>

        {/* 3 Editorial Horizontal Flow Lines with Instagram Multi-Colors */}
        <div className="pt-14 space-y-8 sm:space-y-12">
          <div className="concept-row flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-8 border-b border-[#262626]/06">
            <div className="sm:w-1/3 flex items-center gap-3">
              <span className="text-xs font-mono text-[#833AB4] font-bold shrink-0 whitespace-nowrap">[ 01 ]</span>
              <h3 className="text-lg sm:text-xl font-normal text-[#262626]">Natural Keyword Triggers</h3>
            </div>
            <p className="sm:w-2/3 text-sm sm:text-base text-[#5E5868] leading-relaxed">
              Target specific keywords like &quot;PRICE&quot;, &quot;VIP&quot;, or &quot;LINK&quot;. CommentFlow captures the comment and triggers the direct message flow in under 800 milliseconds.
            </p>
          </div>

          <div className="concept-row flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-8 border-b border-[#262626]/06">
            <div className="sm:w-1/3 flex items-center gap-3">
              <span className="text-xs font-mono text-[#E1306C] font-bold shrink-0 whitespace-nowrap">[ 02 ]</span>
              <h3 className="text-lg sm:text-xl font-normal text-[#262626]">Dynamic AI Reply Variations</h3>
            </div>
            <p className="sm:w-2/3 text-sm sm:text-base text-[#5E5868] leading-relaxed">
              Public comments are answered with varied, conversational AI responses. Your comment count skyrockets while keeping interactions genuine and spam-free.
            </p>
          </div>

          <div className="concept-row flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div className="sm:w-1/3 flex items-center gap-3">
              <span className="text-xs font-mono text-[#F56040] font-bold shrink-0 whitespace-nowrap">[ 03 ]</span>
              <h3 className="text-lg sm:text-xl font-normal text-[#262626]">Official Meta Compliance</h3>
            </div>
            <p className="sm:w-2/3 text-sm sm:text-base text-[#5E5868] leading-relaxed">
              Built exclusively on the official Meta Graph API v20.0 with automatic rate-limit protection. Zero shadowban or security risk for your brand.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
