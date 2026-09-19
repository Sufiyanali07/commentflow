"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, Sparkles, MessageSquare, Send, Check, ShieldCheck, Zap, Heart } from "lucide-react";
import gsap from "gsap";

const KEYWORDS = ["'PRICE'", "'LINKS'", "'EBOOK'", "'PROMO'", "'GUIDE'"];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const [keywordIndex, setKeywordIndex] = useState(0);
  const keywordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Staged editorial entrance
      tl.from(".hero-badge-pill", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
      })
        .from(
          ".hero-headline-el",
          {
            y: 35,
            opacity: 0,
            duration: 1,
          },
          "-=0.5"
        )
        .from(
          ".hero-subtext-el",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          ".hero-cta-group",
          {
            y: 15,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.5"
        )
        .from(
          ".floating-token",
          {
            scale: 0.8,
            y: 40,
            opacity: 0,
            stagger: 0.15,
            duration: 1,
            ease: "back.out(1.6)",
          },
          "-=0.7"
        );

      // Continuous harmonic floating physics for dialogue tokens
      gsap.to(".token-float-1", {
        y: -12,
        rotation: -1.5,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".token-float-2", {
        y: 14,
        rotation: 1.8,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.4,
      });

      gsap.to(".token-float-3", {
        y: -10,
        rotation: 1,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.8,
      });

      gsap.to(".token-float-4", {
        y: 10,
        rotation: -2,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.2,
      });

      // Mouse interactive tilt
      const handleMouseMove = (e: MouseEvent) => {
        if (!rightColRef.current) return;
        const { clientX, clientY } = e;
        const xOffset = (clientX / window.innerWidth - 0.5) * 20;
        const yOffset = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to(".token-float-1", { x: xOffset * 0.8, duration: 0.6, ease: "power1.out" });
        gsap.to(".token-float-2", { x: -xOffset * 1.2, duration: 0.6, ease: "power1.out" });
        gsap.to(".token-float-3", { x: xOffset * 1.5, duration: 0.6, ease: "power1.out" });
        gsap.to(".token-float-4", { x: -xOffset * 0.9, duration: 0.6, ease: "power1.out" });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);

    // Dynamic cycling keyword animation with GSAP
    const interval = setInterval(() => {
      if (keywordRef.current) {
        gsap.to(keywordRef.current, {
          y: -10,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => {
            setKeywordIndex((prev) => (prev + 1) % KEYWORDS.length);
            gsap.fromTo(
              keywordRef.current,
              { y: 10, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.32, ease: "power2.out" }
            );
          },
        });
      }
    }, 2400);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 md:pt-40 md:pb-32 overflow-hidden"
    >
      {/* Background ambient lighting orbs (Instagram Magenta & Sunset Coral) */}
      <div
        ref={orb1Ref}
        className="ambient-orb-ig-magenta w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] -top-28 -left-28"
      />
      <div
        ref={orb2Ref}
        className="ambient-orb-ig-sunset w-[300px] sm:w-[550px] h-[300px] sm:h-[550px] top-1/2 -right-24"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column (7 cols): Editorial Typography & CTA */}
          <div ref={leftColRef} className="lg:col-span-7 space-y-8 text-left">
            {/* Pill Tag with Instagram Story Ring */}
            <div className="hero-badge-pill inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E8E0EE] text-xs font-medium text-[#262626] shadow-sm">
              <div className="w-2.5 h-2.5 rounded-full ig-story-ring p-[1px] animate-pulse">
                <div className="w-full h-full rounded-full bg-[#FFFFFF]" />
              </div>
              <span className="font-semibold text-[#833AB4]">Instagram Comment-to-DM Engine</span>
              <span className="text-[#C13584]">•</span>
              <span className="font-mono text-[11px] ig-gradient-text font-bold">Meta Graph API v20.0</span>
            </div>

            {/* Headline */}
            <h1 className="hero-headline-el text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#262626] leading-[1.14]">
              Followers comment{" "}
              <span className="inline-block whitespace-nowrap min-w-[6.5ch]">
                <span
                  ref={keywordRef}
                  className="inline-block font-mono font-bold ig-gradient-text underline decoration-[#F56040] decoration-2 underline-offset-8"
                >
                  {KEYWORDS[keywordIndex]}
                </span>
              </span>
              .<br />
              You deliver instant value in their{" "}
              <span className="font-serif italic font-normal ig-gradient-text font-bold">
                direct messages.
              </span>
            </h1>

            {/* Subtext */}
            <p className="hero-subtext-el text-base sm:text-lg text-[#5E5868] font-normal leading-relaxed max-w-xl">
              CommentFlow replaces friction-heavy bio links with automated, human-like conversations. Convert comments on your reels and posts into sales, consultation calls, and qualified leads in milliseconds.
            </p>

            {/* CTA Group */}
            <div className="hero-cta-group flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
              <button
                onClick={() => scrollTo("contact")}
                className="w-full sm:w-auto theme-btn px-8 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wide cursor-pointer shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <span>Request Private Access</span>
                <ArrowRight className="w-4 h-4 opacity-90" />
              </button>

              <button
                onClick={() => scrollTo("concept")}
                className="w-full sm:w-auto theme-btn-secondary px-7 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wide cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Explore The Concept</span>
                <ArrowDown className="w-4 h-4 text-[#833AB4]" />
              </button>
            </div>
          </div>

          {/* Right Column (5 cols): Authentic Instagram DM Message Bubble Animated Stream */}
          <div
            ref={rightColRef}
            className="lg:col-span-5 relative flex flex-col items-center justify-center min-h-[400px] select-none py-6"
          >
            {/* Ambient subtle decorative background lines */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <div className="w-72 h-72 rounded-full border border-[#C13584] border-dashed animate-[spin_60s_linear_infinite]" />
            </div>

            {/* Floating Kinetic Token 1: Public Instagram Comment */}
            <div className="floating-token token-float-1 w-full max-w-sm self-start mb-4">
              <div className="inline-flex items-center gap-3 py-2.5 px-4 rounded-2xl bg-[#FFFFFF] border border-[#E8E0EE] shadow-[0_8px_25px_-4px_rgba(131,58,180,0.1)]">
                {/* User Story Avatar */}
                <div className="w-7 h-7 rounded-full p-[1.5px] ig-story-ring shrink-0">
                  <div className="w-full h-full rounded-full bg-[#FAF8FB] flex items-center justify-center text-[10px] font-bold text-[#833AB4]">
                    SK
                  </div>
                </div>
                <div className="text-xs text-[#262626] leading-tight">
                  <span className="font-semibold text-[#262626]">sarah.k</span> &quot;Send me the <strong className="ig-gradient-text font-bold">{KEYWORDS[keywordIndex]}</strong> link!&quot;
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#ED4956] font-medium ml-auto shrink-0">
                  <Heart className="w-3.5 h-3.5 fill-[#ED4956] text-[#ED4956]" />
                  <span>1</span>
                </div>
              </div>
            </div>

            {/* Floating Kinetic Token 2: Public Auto-Reply Badge */}
            <div className="floating-token token-float-2 self-end my-2">
              <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-[#FFFFFF] border border-[#E8E0EE] text-xs font-medium text-[#262626] shadow-[0_6px_20px_-3px_rgba(245,96,64,0.15)]">
                <div className="w-4 h-4 rounded-full ig-gradient-bg flex items-center justify-center">
                  <Zap className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="text-[#5E5868]">Public reply sent:</span>
                <span className="text-[#833AB4] font-semibold">0.8s</span>
              </div>
            </div>

            {/* Floating Kinetic Token 3: Signature Instagram Direct Message Gradient Bubble */}
            <div className="floating-token token-float-3 w-full max-w-sm self-center my-3">
              <div className="p-4 rounded-3xl bg-[#FFFFFF] border border-[#E8E0EE] shadow-[0_16px_35px_-8px_rgba(193,53,132,0.12)] space-y-3">
                {/* DM Header */}
                <div className="flex items-center justify-between text-[11px] font-mono border-b border-[#262626]/06 pb-2">
                  <div className="flex items-center gap-1.5 font-sans font-semibold text-[#262626]">
                    <div className="w-2 h-2 rounded-full bg-[#3797F0]" />
                    <span>Instagram Direct</span>
                  </div>
                  <span className="text-[10px] text-[#8E8A98]">Just now</span>
                </div>

                {/* Animated DM Sent Soft Light Gradient Bubble */}
                <div className="ig-dm-bubble p-3.5 rounded-2xl rounded-tr-sm shadow-xs space-y-2">
                  <p className="text-xs text-[#262626] leading-relaxed font-normal">
                    Hey Sarah! 👋 Here is your instant VIP blueprint link:
                  </p>
                  <div className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-[#FFFFFF] border border-[#E1306C]/25 text-[11px] font-mono font-semibold tracking-wide shadow-xs">
                    <span className="ig-gradient-text font-bold">commentflow.io/vip-access</span>
                    <span className="text-[#E1306C]">→</span>
                  </div>
                </div>

                {/* Meta Graph Certified Line */}
                <div className="flex items-center justify-between text-[10px] text-[#8E8A98] pt-0.5">
                  <span className="flex items-center gap-1 text-[#3797F0] font-medium">
                    <Check className="w-3 h-3 text-[#3797F0]" /> Delivered & Seen
                  </span>
                  <span className="font-mono text-[10px]">100% Meta Safe</span>
                </div>
              </div>
            </div>

            {/* Floating Kinetic Token 4: Conversion Metric Badge */}
            <div className="floating-token token-float-4 self-start mt-1">
              <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#FFFBEF] border border-[#FDE68A] text-xs font-semibold text-[#D97706] shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#F56040]" />
                <span>+380% Higher Conversion vs Bio Links</span>
              </div>
            </div>
          </div>
        </div>

        {/* Minimalist Key Metric Line (Clean borderless layout) */}
        <div className="mt-20 pt-8 border-t border-[#262626]/08 grid grid-cols-2 md:grid-cols-4 gap-8 text-left sm:text-center max-w-5xl mx-auto">
          <div>
            <div className="text-2xl sm:text-4xl font-light tracking-tight text-[#262626]">
              0.8<span className="text-sm font-serif italic text-[#E1306C] font-bold">sec</span>
            </div>
            <div className="text-xs text-[#8E8A98] mt-1">Direct message latency</div>
          </div>
          <div>
            <div className="text-2xl sm:text-4xl font-light tracking-tight text-[#262626]">
              94<span className="text-sm font-serif italic text-[#833AB4] font-bold">%</span>
            </div>
            <div className="text-xs text-[#8E8A98] mt-1">Average DM open rate</div>
          </div>
          <div>
            <div className="text-2xl sm:text-4xl font-light tracking-tight text-[#262626]">
              100<span className="text-sm font-serif italic text-[#3797F0] font-bold">%</span>
            </div>
            <div className="text-xs text-[#8E8A98] mt-1">Meta Graph compliant</div>
          </div>
          <div>
            <div className="text-2xl sm:text-4xl font-light tracking-tight text-[#262626]">
              24<span className="text-sm font-serif italic text-[#F56040] font-bold">/7</span>
            </div>
            <div className="text-xs text-[#8E8A98] mt-1">Automated conversion</div>
          </div>
        </div>
      </div>
    </section>
  );
}
