"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowRight, Menu, X, Sparkles, ShieldCheck } from "lucide-react";
import gsap from "gsap";

interface NavItem {
  id: string;
  num: string;
  label: string;
  subtitle: string;
  tag: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "concept",
    num: "01",
    label: "The Concept",
    subtitle: "Why link-in-bio is obsolete",
    tag: "Philosophy",
  },
  {
    id: "pillars",
    num: "02",
    label: "Core Capabilities",
    subtitle: "Automated Comment-to-DM flows",
    tag: "Workflows",
  },
  {
    id: "pricing",
    num: "03",
    label: "Pricing & Plans",
    subtitle: "Transparent tiers & 14-day trial",
    tag: "Pricing",
  },
  {
    id: "contact",
    num: "04",
    label: "Request Access",
    subtitle: "Custom onboarding blueprint",
    tag: "Inquiry",
  },
];

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHoverId, setActiveHoverId] = useState<string>("concept");

  const drawerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Header entrance
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: -25, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );
    }, headerRef);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // GSAP Animation for Mobile Sidebar Open/Close
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (backdropRef.current) {
        tl.fromTo(
          backdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4 }
        );
      }

      if (drawerRef.current) {
        tl.fromTo(
          drawerRef.current,
          { x: "100%" },
          { x: "0%", duration: 0.55, ease: "power3.out" },
          "-=0.3"
        );
      }

      tl.fromTo(
        ".mobile-nav-item",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power2.out" },
        "-=0.25"
      );

      tl.fromTo(
        ".mobile-drawer-footer",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
        "-=0.2"
      );
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileOpen]);

  const closeDrawer = (callback?: () => void) => {
    const tl = gsap.timeline({
      onComplete: () => {
        setMobileOpen(false);
        if (callback) callback();
      },
    });

    if (drawerRef.current) {
      tl.to(drawerRef.current, {
        x: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
    }

    if (backdropRef.current) {
      tl.to(
        backdropRef.current,
        {
          opacity: 0,
          duration: 0.3,
        },
        "-=0.25"
      );
    }
  };

  const scrollTo = (id: string) => {
    if (mobileOpen) {
      closeDrawer(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-500 ${
          isScrolled
            ? "py-3 sm:py-4 bg-[#FAF8FB]/90 backdrop-blur-xl border-b border-[#E8E0EE] shadow-[0_4px_20px_-4px_rgba(193,53,132,0.08)]"
            : "py-6 sm:py-8 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Brand */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-4 h-4 rounded-full p-[1.5px] ig-story-ring group-hover:scale-110 transition-transform duration-300">
              <div className="w-full h-full rounded-full bg-[#FFFFFF]" />
            </div>
            <span className="text-base sm:text-lg font-semibold tracking-tight text-[#262626]">
              Comment<span className="font-serif italic font-normal ig-gradient-text font-bold">Flow</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-xs sm:text-sm font-medium text-[#5E5868]">
            <button
              onClick={() => scrollTo("concept")}
              className="hover:text-[#E1306C] transition-colors cursor-pointer"
            >
              Concept
            </button>
            <button
              onClick={() => scrollTo("pillars")}
              className="hover:text-[#833AB4] transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollTo("pricing")}
              className="hover:text-[#F56040] transition-colors cursor-pointer"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="hover:text-[#C13584] transition-colors cursor-pointer"
            >
              Inquiry
            </button>
          </nav>

          {/* Right CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("contact")}
              className="theme-btn px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs font-semibold tracking-wide flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow"
            >
              <span>Request Access</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-90" />
            </button>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-full bg-[#FCEDF5] text-[#C13584] hover:bg-[#F5EEFB] transition-colors cursor-pointer"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Aesthetic GSAP Mobile Sidebar Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          {/* Translucent Backdrop */}
          <div
            ref={backdropRef}
            onClick={() => closeDrawer()}
            className="fixed inset-0 bg-[#262626]/40 backdrop-blur-sm transition-opacity"
          />

          {/* Sliding Editorial Drawer Panel */}
          <div
            ref={drawerRef}
            className="relative z-10 w-[88vw] max-w-sm h-full bg-[#FAF8FB] border-l border-[#E8E0EE] shadow-2xl flex flex-col justify-between p-6 sm:p-8 overflow-y-auto"
          >
            {/* Top Drawer Bar */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#262626]/08">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full p-[1.5px] ig-story-ring animate-spin">
                    <div className="w-full h-full rounded-full bg-[#FFFFFF]" />
                  </div>
                  <span className="text-base font-semibold text-[#262626]">
                    Comment<span className="font-serif italic font-normal ig-gradient-text">Flow</span>
                  </span>
                </div>

                <button
                  onClick={() => closeDrawer()}
                  className="w-9 h-9 rounded-full bg-[#FCEDF5] text-[#C13584] flex items-center justify-center hover:bg-[#F5EEFB] transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Options with Highlighting */}
              <div className="mt-8 space-y-3">
                <div className="text-[10px] font-mono uppercase tracking-widest ig-gradient-text font-bold mb-4 px-2">
                  [ Navigation Directory ]
                </div>

                {NAV_ITEMS.map((item, idx) => {
                  const isHovered = activeHoverId === item.id;
                  const itemColor =
                    idx === 0 ? "#E1306C" : idx === 1 ? "#833AB4" : idx === 2 ? "#F56040" : "#C13584";

                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      onMouseEnter={() => setActiveHoverId(item.id)}
                      className={`mobile-nav-item w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                        isHovered
                          ? "bg-[#FFFFFF] border border-[#E8E0EE] shadow-md -translate-x-1"
                          : "bg-transparent border border-transparent hover:bg-[#FFFFFF]/60"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="text-xs font-mono font-semibold transition-colors"
                            style={{ color: isHovered ? itemColor : "#8E8A98" }}
                          >
                            [ {item.num} ]
                          </span>
                          {/* Highlighted Title */}
                          <span
                            className={`text-lg font-normal tracking-tight transition-colors ${
                              isHovered
                                ? "font-medium"
                                : "text-[#262626]"
                            }`}
                            style={{ color: isHovered ? itemColor : "#262626" }}
                          >
                            {item.label}
                          </span>
                        </div>
                        <p className="text-xs text-[#8E8A98] pl-8">
                          {item.subtitle}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full transition-all ${
                            isHovered
                              ? "bg-[#FCEDF5] font-semibold border border-[#E8E0EE]"
                              : "text-[#8E8A98] bg-[#F3EEF8]"
                          }`}
                          style={{ color: isHovered ? itemColor : undefined }}
                        >
                          {item.tag}
                        </span>
                        <ArrowRight
                          className="w-4 h-4 transition-transform duration-300"
                          style={{
                            color: isHovered ? itemColor : "#8E8A98",
                            opacity: isHovered ? 1 : 0.4,
                            transform: isHovered ? "translateX(4px)" : "none",
                          }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Drawer Footer */}
            <div className="mobile-drawer-footer pt-6 border-t border-[#262626]/08 space-y-3">
              <button
                onClick={() => scrollTo("contact")}
                className="w-full theme-btn py-3.5 rounded-full text-xs font-semibold tracking-wide flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>Request Private Onboarding</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#833AB4] font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E1306C]" />
                <span>Meta Graph API v20.0 Certified</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
