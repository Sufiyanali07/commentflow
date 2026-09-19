"use client";

import React, { useState, useRef, useEffect } from "react";
import { Plus, Minus, Check } from "lucide-react";
import gsap from "gsap";

interface Capability {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  highlights: string[];
  sampleTrigger: string;
  sampleOutcome: string;
}

const CAPABILITIES: Capability[] = [
  {
    id: "cap-1",
    num: "01",
    title: "Automated Comment-to-DM Fulfillment",
    subtitle: "Instant Link & Coupon Delivery",
    tag: "Core Engine",
    description:
      "When a follower comments your trigger keyword on any Post or Reel, CommentFlow immediately slides into their direct messages with the exact link, coupon, or PDF they requested.",
    highlights: [
      "Fires in under 800ms directly to Instagram Direct inbox",
      "Delivers interactive rich cards with custom CTA buttons",
      "Works on Feed Posts, Reels, Carousels, & Boosted Ads",
    ],
    sampleTrigger: "Follower comments 'BLUEPRINT' on your viral reel",
    sampleOutcome: "Instant DM delivered with high-res PDF download link",
  },
  {
    id: "cap-2",
    num: "02",
    title: "Context-Aware Public Auto-Replies",
    subtitle: "Algorithm Booster & Anti-Spam",
    tag: "AI Intelligence",
    description:
      "Keep your post's algorithmic momentum surging by automatically replying to incoming comments with randomized, polite AI variations that avoid repetitive spam flags.",
    highlights: [
      "Rotates dozens of human-like natural comment variations",
      "Tags the follower's @username automatically",
      "Signals massive engagement to Instagram's recommendation algorithm",
    ],
    sampleTrigger: "'Love this! Where can I get it?'",
    sampleOutcome: "AI replies: 'Hey @sarah! Just sent the link to your DMs 🚀'",
  },
  {
    id: "cap-3",
    num: "03",
    title: "Multi-Step Lead Qualification in DMs",
    subtitle: "In-Chat Email & Phone Capture",
    tag: "Conversion Funnel",
    description:
      "Go beyond a single message. Guide interested prospects through an interactive conversation, ask qualification questions, and collect verified contact details natively.",
    highlights: [
      "Native email and phone number format validation",
      "Branching logic based on the user's answers",
      "Instant synchronization to HubSpot, Klaviyo, and Zapier",
    ],
    sampleTrigger: "User taps 'Book Consultation' button inside DM",
    sampleOutcome: "Funnels into 2-step booking flow and syncs to CRM",
  },
  {
    id: "cap-4",
    num: "04",
    title: "Story Mentions & Live Stream Triggers",
    subtitle: "24/7 Omnichannel Capture",
    tag: "Social CRM",
    description:
      "Never leave a brand mention unanswered. Automatically thank followers who tag your handle in their Stories or drop comments during your live broadcasts.",
    highlights: [
      "Automated thank-you DM when tagged in a Story",
      "Real-time offer fulfillment during Instagram Live streams",
      "Builds genuine 1-on-1 brand loyalty at scale",
    ],
    sampleTrigger: "Follower tags @yourbrand in their Story",
    sampleOutcome: "Automated DM: 'Thanks for the shoutout! Here's a 15% VIP code 🎁'",
  },
];

const CAP_COLORS: { [key: string]: { main: string; tint: string; border: string } } = {
  "cap-1": { main: "#833AB4", tint: "#F5EEFB", border: "#E4D5F4" },
  "cap-2": { main: "#E1306C", tint: "#FCEDF5", border: "#FAD3E7" },
  "cap-3": { main: "#F56040", tint: "#FFF2EE", border: "#FED9CF" },
  "cap-4": { main: "#D97706", tint: "#FFFBEF", border: "#FDE68A" },
};

export default function Pillars() {
  const [activeId, setActiveId] = useState<string>("cap-1");
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const iconRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".capability-row",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleToggle = (id: string) => {
    const isCurrentlyOpen = activeId === id;
    const targetId = isCurrentlyOpen ? "" : id;

    if (activeId && panelRefs.current[activeId]) {
      const closingEl = panelRefs.current[activeId];
      gsap.to(closingEl, {
        height: 0,
        opacity: 0,
        duration: 0.45,
        ease: "power3.inOut",
      });
      if (iconRefs.current[activeId]) {
        gsap.to(iconRefs.current[activeId], {
          rotate: 0,
          backgroundColor: "#FCEDF5",
          color: "#833AB4",
          duration: 0.4,
          ease: "power2.out",
        });
      }
    }

    if (targetId && panelRefs.current[targetId]) {
      const openingEl = panelRefs.current[targetId];
      const colorScheme = CAP_COLORS[targetId] || CAP_COLORS["cap-1"];
      gsap.fromTo(
        openingEl,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.55,
          ease: "power3.out",
        }
      );
      if (iconRefs.current[targetId]) {
        gsap.to(iconRefs.current[targetId], {
          rotate: 180,
          backgroundColor: colorScheme.main,
          color: "#FFFFFF",
          duration: 0.4,
          ease: "back.out(1.7)",
        });
      }
    }

    setActiveId(targetId);
  };

  return (
    <section
      id="pillars"
      ref={sectionRef}
      className="py-20 sm:py-32 relative border-t border-[#262626]/08 bg-[#FAF8FB]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFFFF] border border-[#833AB4]/18 shadow-xs mb-4">
            <span className="w-2 h-2 rounded-full bg-[#833AB4] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#833AB4] font-bold">
              02 / Core Capabilities
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#262626] leading-[1.12]">
            How CommentFlow works in{" "}
            <span className="font-serif italic font-normal ig-gradient-text relative inline-block">
              practice.
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-[#833AB4] to-[#E1306C] opacity-40 rounded-full" />
            </span>
          </h2>
          <p className="mt-4 text-[#5E5868] text-base sm:text-lg font-normal max-w-2xl leading-relaxed">
            Four quiet, powerful workflows that run around the clock to monetize your Instagram engagement.
          </p>
        </div>

        {/* Butter-Smooth Box-Free Interactive Accordion List */}
        <div className="divide-y divide-[#262626]/10 border-t border-b border-[#262626]/10">
          {CAPABILITIES.map((cap) => {
            const isOpen = activeId === cap.id;
            const colors = CAP_COLORS[cap.id] || CAP_COLORS["cap-1"];

            return (
              <div
                key={cap.id}
                className="capability-row transition-colors duration-300 hover:bg-[#FFFFFF]/80 overflow-hidden"
              >
                {/* Accordion Trigger Row */}
                <button
                  onClick={() => handleToggle(cap.id)}
                  className="w-full py-5 sm:py-8 text-left flex items-start sm:items-center justify-between gap-3 sm:gap-4 cursor-pointer group"
                >
                  <div className="flex items-start sm:items-center gap-3 sm:gap-8 min-w-0 flex-1">
                    <span
                      className="text-xs sm:text-sm font-mono font-bold pt-1 sm:pt-0 shrink-0 whitespace-nowrap select-none"
                      style={{ color: colors.main }}
                    >
                      [ {cap.num} ]
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-2xl font-normal text-[#262626] group-hover:text-[#833AB4] transition-colors leading-snug">
                        {cap.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#8E8A98] mt-1 font-normal leading-normal">
                        {cap.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 pt-1 sm:pt-0">
                    <span
                      className="hidden sm:inline-block text-[11px] font-mono px-3 py-1 rounded-full border"
                      style={{
                        backgroundColor: colors.tint,
                        color: colors.main,
                        borderColor: colors.border,
                      }}
                    >
                      {cap.tag}
                    </span>
                    <div
                      ref={(el) => {
                        iconRefs.current[cap.id] = el;
                      }}
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        backgroundColor: isOpen ? colors.main : colors.tint,
                        color: isOpen ? "#FFFFFF" : colors.main,
                      }}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </div>
                </button>

                {/* Animated Height GSAP Container */}
                <div
                  ref={(el) => {
                    panelRefs.current[cap.id] = el;
                  }}
                  className={`overflow-hidden transition-none ${
                    isOpen ? "h-auto opacity-100 pb-8 sm:pb-10" : "h-0 opacity-0 pb-0"
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10 items-start pt-2">
                    {/* Left: Narrative Description */}
                    <div className="md:col-span-7 space-y-4">
                      <p className="text-sm sm:text-base text-[#5E5868] leading-relaxed">
                        {cap.description}
                      </p>

                      <div className="pt-2 space-y-2.5">
                        {cap.highlights.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                            <div
                              className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5"
                              style={{
                                backgroundColor: colors.tint,
                                borderColor: colors.border,
                                color: colors.main,
                              }}
                            >
                              <Check className="w-2.5 h-2.5" />
                            </div>
                            <span className="leading-snug text-[#262626]">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Live Trigger Telemetry Snippet styled like Instagram Box */}
                    <div
                      className="md:col-span-5 p-5 rounded-3xl bg-[#FFFFFF] border space-y-3 shadow-sm"
                      style={{ borderColor: colors.border }}
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono font-semibold border-b border-[#262626]/06 pb-2">
                        <span style={{ color: colors.main }}>Workflow Simulation</span>
                        <span className="text-[#3797F0] font-sans font-medium">0.8s Latency</span>
                      </div>

                      <div className="space-y-1.5 text-xs">
                        <div className="text-[#8E8A98]">Trigger Comment:</div>
                        <div className="text-[#262626] font-medium font-mono bg-[#FAF8FB] p-2.5 rounded-xl border border-[#262626]/08">
                          {cap.sampleTrigger}
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs">
                        <div className="text-[#8E8A98]">Direct Message Action:</div>
                        <div
                          className="font-medium p-2.5 rounded-xl border"
                          style={{
                            backgroundColor: colors.tint,
                            color: colors.main,
                            borderColor: colors.border,
                          }}
                        >
                          {cap.sampleOutcome}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
