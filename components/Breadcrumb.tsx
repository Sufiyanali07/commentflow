"use client";

import React, { useEffect, useState } from "react";
import { ChevronRight, Home, Zap } from "lucide-react";

interface BreadcrumbProps {
  className?: string;
}

const SECTION_MAP: { [key: string]: { label: string; urlPath: string } } = {
  hero: { label: "Comment-to-DM Engine", urlPath: "#hero" },
  concept: { label: "The Philosophy", urlPath: "#concept" },
  pillars: { label: "Core Capabilities", urlPath: "#pillars" },
  pricing: { label: "Pricing Spectrum (INR)", urlPath: "#pricing" },
  contact: { label: "Request Access", urlPath: "#contact" },
};

export default function Breadcrumb({ className = "" }: BreadcrumbProps) {
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["contact", "pricing", "pillars", "concept", "hero"];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const current = SECTION_MAP[activeSection] || SECTION_MAP.hero;

  return (
    <nav
      aria-label="Breadcrumb Navigation"
      className={`w-full max-w-6xl mx-auto px-4 sm:px-8 py-3 text-xs font-mono select-none ${className}`}
    >
      <ol
        className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF]/90 border border-[#833AB4]/12 backdrop-blur-md shadow-xs text-[#5E5868]"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {/* Breadcrumb Item 1: Home URL */}
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
          className="inline-flex items-center gap-1"
        >
          <button
            onClick={() => scrollTo("hero")}
            className="hover:text-[#833AB4] transition-colors flex items-center gap-1 cursor-pointer"
            itemProp="item"
          >
            <Home className="w-3 h-3 text-[#833AB4]" />
            <span itemProp="name" className="text-[#262626] font-semibold">
              commentflow.io
            </span>
          </button>
          <meta itemProp="position" content="1" />
        </li>

        <li className="text-[#8E8A98]/60">
          <ChevronRight className="w-3 h-3" />
        </li>

        {/* Breadcrumb Item 2: Primary SEO Focus Category */}
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
          className="inline-flex items-center gap-1"
        >
          <span
            itemProp="name"
            className="text-[#833AB4] font-medium hidden xs:inline"
          >
            instagram-comment-automation
          </span>
          <span className="text-[#833AB4] font-medium xs:hidden">ig-automation</span>
          <meta itemProp="item" content="https://commentflow.io" />
          <meta itemProp="position" content="2" />
        </li>

        <li className="text-[#8E8A98]/60">
          <ChevronRight className="w-3 h-3" />
        </li>

        {/* Breadcrumb Item 3: Active URL Hash Section */}
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
          className="inline-flex items-center gap-1"
        >
          <button
            onClick={() => scrollTo(activeSection)}
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#FCEDF5] text-[#C13584] border border-[#C13584]/25 font-semibold transition-all cursor-pointer"
            itemProp="item"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E1306C] animate-pulse" />
            <span itemProp="name">{current.urlPath}</span>
            <span className="text-[10px] text-[#5E5868] hidden sm:inline">
              ({current.label})
            </span>
          </button>
          <meta itemProp="position" content="3" />
        </li>
      </ol>
    </nav>
  );
}
