"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowDown, Sparkles, ArrowRight } from "lucide-react";
import gsap from "gsap";

// Backup of the centered Hero version
const KEYWORDS = ["'PRICE'", "'LINKS'", "'EBOOK'", "'PROMO'", "'GUIDE'"];

export default function HeroCenteredBackup() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const [keywordIndex, setKeywordIndex] = useState(0);
  const keywordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge-pill", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
      })
        .from(
          headlineRef.current,
          {
            y: 35,
            opacity: 0,
            duration: 1,
          },
          "-=0.5"
        )
        .from(
          ".hero-subtext",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          ".hero-cta-wrap",
          {
            y: 15,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.5"
        );

      const handleParallax = () => {
        const scrollY = window.scrollY;
        if (orb1Ref.current) {
          gsap.to(orb1Ref.current, { y: scrollY * 0.18, duration: 0.3, ease: "power1.out" });
        }
        if (orb2Ref.current) {
          gsap.to(orb2Ref.current, { y: -scrollY * 0.14, duration: 0.3, ease: "power1.out" });
        }
        if (headlineRef.current) {
          gsap.to(headlineRef.current, { y: scrollY * 0.08, duration: 0.3, ease: "power1.out" });
        }
      };

      window.addEventListener("scroll", handleParallax, { passive: true });
      return () => window.removeEventListener("scroll", handleParallax);
    }, containerRef);

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
      ref={containerRef}
      className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 md:pt-44 md:pb-36 overflow-hidden"
    >
      <div
        ref={orb1Ref}
        className="pistachio-orb w-[320px] sm:w-[650px] h-[320px] sm:h-[650px] -top-28 -left-28"
      />
      <div
        ref={orb2Ref}
        className="pistachio-orb w-[300px] sm:w-[550px] h-[300px] sm:h-[550px] top-1/3 -right-24"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="hero-badge-pill inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5F0E6]/90 border border-[#CCE1CE] text-xs font-medium text-[#2D4E31] mb-8 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#55875A] animate-ping" />
          <span>Instagram Comment-to-DM Engine</span>
          <span className="text-[#8FB993]">•</span>
          <span className="font-mono text-[11px] text-[#3E6442]">Official Meta Graph API</span>
        </div>

        <h1
          ref={headlineRef}
          className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#1A1C19] leading-[1.15]"
        >
          Followers comment{" "}
          <span className="inline-block whitespace-nowrap min-w-[7ch] text-center">
            <span
              ref={keywordRef}
              className="inline-block font-mono font-semibold text-[#2D4E31] underline decoration-[#ADCDB0] decoration-2 underline-offset-8"
            >
              {KEYWORDS[keywordIndex]}
            </span>
          </span>
          .<br />
          You deliver instant value in their{" "}
          <span className="font-serif italic font-normal text-[#2D4E31]">
            direct messages.
          </span>
        </h1>

        <p className="hero-subtext mt-8 text-base sm:text-lg md:text-xl text-[#5A6059] max-w-2xl mx-auto font-normal leading-relaxed">
          CommentFlow replaces messy bio links with automated, human-like conversations. Convert comments on your reels and posts into sales, consultation calls, and qualified leads in milliseconds.
        </p>

        <div className="hero-cta-wrap mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={() => scrollTo("contact")}
            className="w-full sm:w-auto pistachio-btn px-8 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wide cursor-pointer shadow-md hover:shadow-lg"
          >
            Request Private Onboarding
          </button>

          <button
            onClick={() => scrollTo("concept")}
            className="w-full sm:w-auto pistachio-btn-secondary px-7 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wide cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Explore The Flow</span>
            <ArrowDown className="w-4 h-4 text-[#55875A]" />
          </button>
        </div>

        <div className="mt-20 pt-8 border-t border-[#1A1C19]/08 grid grid-cols-2 md:grid-cols-4 gap-8 text-left sm:text-center max-w-4xl mx-auto">
          <div>
            <div className="text-2xl sm:text-4xl font-light tracking-tight text-[#1A1C19]">
              0.8<span className="text-sm font-serif italic text-[#55875A]">sec</span>
            </div>
            <div className="text-xs text-[#889085] mt-1">Direct message latency</div>
          </div>
          <div>
            <div className="text-2xl sm:text-4xl font-light tracking-tight text-[#1A1C19]">
              94<span className="text-sm font-serif italic text-[#55875A]">%</span>
            </div>
            <div className="text-xs text-[#889085] mt-1">Average DM open rate</div>
          </div>
          <div>
            <div className="text-2xl sm:text-4xl font-light tracking-tight text-[#1A1C19]">
              100<span className="text-sm font-serif italic text-[#55875A]">%</span>
            </div>
            <div className="text-xs text-[#889085] mt-1">Meta Graph compliant</div>
          </div>
          <div>
            <div className="text-2xl sm:text-4xl font-light tracking-tight text-[#1A1C19]">
              24<span className="text-sm font-serif italic text-[#55875A]">/7</span>
            </div>
            <div className="text-xs text-[#889085] mt-1">Automated conversion</div>
          </div>
        </div>
      </div>
    </section>
  );
}
