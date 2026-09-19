"use client";

import React, { useState, useEffect, useRef } from "react";
import { Check, ArrowRight, Sparkles, Zap, ShieldCheck } from "lucide-react";
import gsap from "gsap";

interface PlanTier {
  id: string;
  name: string;
  tag: string;
  priceMonthly: number;
  priceAnnual: number;
  accounts: string;
  volume: string;
  highlight: string;
  features: string[];
}

const TIERS: PlanTier[] = [
  {
    id: "starter",
    name: "Starter Solo",
    tag: "1 Account",
    priceMonthly: 2499,
    priceAnnual: 1899,
    accounts: "1 Instagram Creator / Business Account",
    volume: "3,000 Automated DMs / month",
    highlight: "Instant Link Delivery & Public Replies",
    features: [
      "Instant Comment-to-DM Trigger Engine",
      "Public Comment AI Auto-Replies",
      "Direct Link & Coupon Cards",
      "Standard Latency (< 1.5s)",
      "Standard Email Support",
    ],
  },
  {
    id: "pro",
    name: "Studio Pro",
    tag: "Most Popular",
    priceMonthly: 5999,
    priceAnnual: 4499,
    accounts: "3 Instagram Connected Accounts",
    volume: "25,000 Automated DMs / month",
    highlight: "Dynamic AI Reply Spin & Lead Qualification",
    features: [
      "Everything in Starter included",
      "Dynamic AI Reply Variations (Anti-Spam)",
      "Multi-Step DM Funnels & Email Capture",
      "Story Mentions & Live Stream Triggers",
      "HubSpot, Klaviyo & Zapier Webhook Sync",
      "Priority VIP Support",
    ],
  },
  {
    id: "agency",
    name: "Agency Scale",
    tag: "Enterprise",
    priceMonthly: 14999,
    priceAnnual: 11499,
    accounts: "10+ Instagram Accounts",
    volume: "Unlimited Automated DMs / month",
    highlight: "Dedicated Account Strategist & Custom Webhooks",
    features: [
      "Everything in Studio Pro included",
      "Unlimited Automated DMs & Comments",
      "Custom REST API & Webhook Ingestion",
      "White-Label Lead Reporting for Clients",
      "Dedicated Account Strategist & 99.99% SLA",
    ],
  },
];

export default function PricingSection({ onSelectPlan }: { onSelectPlan?: (planName: string) => void }) {
  const [activeTierId, setActiveTierId] = useState<string>("pro");
  const [annualBilling, setAnnualBilling] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const activePlan = TIERS.find((t) => t.id === activeTierId) || TIERS[1];
  const price = annualBilling ? activePlan.priceAnnual : activePlan.priceMonthly;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate flowing signal dashes in fresh mint
      gsap.to(".flow-dash-line", {
        strokeDashoffset: -40,
        duration: 2.2,
        repeat: -1,
        ease: "none",
      });

      // Subtle breathing pulse on the SVG nodes
      gsap.to(".pulsing-svg-node", {
        scale: 1.12,
        transformOrigin: "center center",
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      });

      // Price switch transition
      gsap.fromTo(
        ".sculptural-price-text",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeTierId, annualBilling]);

  const handleSelectTier = (tier: PlanTier) => {
    setActiveTierId(tier.id);
    if (onSelectPlan) {
      onSelectPlan(tier.name);
    }
  };

  const handleCheckoutClick = () => {
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="py-20 sm:py-32 relative border-t border-[#833AB4]/08 bg-[#FAF8FB] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#833AB4] font-semibold block mb-3">
            [ Transparent Pricing Spectrum ]
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#262626] leading-tight">
            Invest in seamless{" "}
            <span className="font-serif italic font-normal ig-gradient-text">
              conversion.
            </span>
          </h2>
          <p className="mt-4 text-[#5E5868] text-base sm:text-lg font-normal">
            Select your volume tier below. Every plan includes a 14-day free trial with zero setup fees.
          </p>

          {/* Billing Switcher */}
          <div className="mt-8 inline-flex items-center gap-2 p-1.5 rounded-full bg-[#FFFFFF] border border-[#833AB4]/20 shadow-sm">
            <button
              onClick={() => setAnnualBilling(false)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                !annualBilling
                  ? "bg-[#833AB4] text-white shadow-sm"
                  : "text-[#5E5868] hover:text-[#262626]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnualBilling(true)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                annualBilling
                  ? "bg-gradient-to-r from-[#833AB4] to-[#C13584] text-white shadow-sm"
                  : "text-[#5E5868] hover:text-[#262626]"
              }`}
            >
              <span>Annual</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FFF2EE] text-[#F56040] border border-[#F56040]/30">
                Save 25%
              </span>
            </button>
          </div>
        </div>

        {/* Tier Selector Horizontal Spectrum Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-12 border-b border-[#833AB4]/10 pb-8">
          {TIERS.map((tier) => {
            const isSelected = activeTierId === tier.id;
            return (
              <button
                key={tier.id}
                onClick={() => handleSelectTier(tier)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer flex items-center gap-2.5 ${
                  isSelected
                    ? "bg-gradient-to-r from-[#833AB4] via-[#C13584] to-[#F56040] text-white shadow-md scale-105"
                    : "text-[#5E5868] hover:text-[#262626] hover:bg-[#FFFFFF]/80"
                }`}
              >
                <span>{tier.name}</span>
                <span
                  className={`text-[11px] font-mono px-2 py-0.5 rounded-full transition-colors ${
                    isSelected
                      ? "bg-white/25 text-white"
                      : "bg-[#FCEDF5] text-[#C13584]"
                  }`}
                >
                  {tier.tag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Box-Free Interactive Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (6 cols): Large Sculptural Price & Tier Capabilities */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono text-[#833AB4] font-semibold uppercase tracking-wider">
                  Tier: {activePlan.name}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FCEDF5] text-[#C13584] border border-[#C13584]/25">
                  {activePlan.volume}
                </span>
              </div>

              {/* Sculptural Price */}
              <div className="sculptural-price-text flex items-baseline gap-2 my-4">
                <span className="text-3xl sm:text-4xl text-[#5E5868] font-light">₹</span>
                <span className="text-5xl sm:text-7xl font-light tracking-tighter text-[#262626]">
                  {price.toLocaleString("en-IN")}
                </span>
                <span className="text-sm text-[#8E8A98] pl-1 font-mono">
                  / month {annualBilling && <span className="text-xs text-[#C13584] block font-semibold">billed annually</span>}
                </span>
              </div>

              <p className="text-base text-[#5E5868] leading-relaxed pt-1">
                {activePlan.highlight}
              </p>
            </div>

            {/* Feature Checklist */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono uppercase tracking-widest text-[#833AB4] font-semibold">
                What&apos;s Included:
              </div>
              <div className="space-y-2.5">
                {activePlan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-[#262626]">
                    <div className="w-5 h-5 rounded-full bg-[#FCEDF5] border border-[#C13584]/30 text-[#C13584] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="leading-snug">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={handleCheckoutClick}
                className="w-full sm:w-auto theme-btn px-8 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wide cursor-pointer shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <span>Start 14-Day Free Trial</span>
                <ArrowRight className="w-4 h-4 opacity-90" />
              </button>

              <div className="text-xs text-[#8E8A98] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#3797F0]" />
                <span>No credit card required to start</span>
              </div>
            </div>
          </div>

          {/* Right Column (6 cols): Bespoke Animated GSAP SVG Flow Architecture in Multi-Color Instagram Theme */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="w-full max-w-lg aspect-square relative flex items-center justify-center">
              <svg
                ref={svgRef}
                viewBox="0 0 400 400"
                className="w-full h-full drop-shadow-sm select-none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="igHubGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#833AB4" />
                    <stop offset="50%" stopColor="#C13584" />
                    <stop offset="100%" stopColor="#F56040" />
                  </linearGradient>
                </defs>

                {/* Concentric orbital rings */}
                <circle cx="200" cy="200" r="160" stroke="#833AB4" strokeWidth="1" strokeDasharray="4 6" opacity="0.18" />
                <circle cx="200" cy="200" r="110" stroke="#C13584" strokeWidth="1" opacity="0.22" />
                <circle cx="200" cy="200" r="60" stroke="#E1306C" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.35" />

                {/* Animated flowing signal paths connecting nodes */}
                <path
                  className="flow-dash-line"
                  d="M 200 40 L 200 140"
                  stroke="#F56040"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                />
                <path
                  className="flow-dash-line"
                  d="M 40 200 L 140 200"
                  stroke="#3797F0"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                />
                <path
                  className="flow-dash-line"
                  d="M 360 200 L 260 200"
                  stroke="#E1306C"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                />
                <path
                  className="flow-dash-line"
                  d="M 200 360 L 200 260"
                  stroke="#833AB4"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                />

                {/* Diagonal connecting branches */}
                <line x1="100" y1="100" x2="160" y2="160" stroke="#C13584" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
                <line x1="300" y1="100" x2="240" y2="160" stroke="#F56040" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
                <line x1="100" y1="300" x2="160" y2="240" stroke="#3797F0" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
                <line x1="300" y1="300" x2="240" y2="240" stroke="#833AB4" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />

                {/* Central Hub Node */}
                <circle cx="200" cy="200" r="32" fill="url(#igHubGrad)" />
                <circle cx="200" cy="200" r="42" stroke="#E1306C" strokeWidth="1.5" className="pulsing-svg-node" opacity="0.4" />
                <text x="200" y="196" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="monospace" fontWeight="600">
                  COMMENT
                </text>
                <text x="200" y="210" textAnchor="middle" fill="#FCEDF5" fontSize="9" fontFamily="monospace">
                  FLOW ENGINE
                </text>

                {/* Top Node: Post Trigger (Sunset Coral) */}
                <circle cx="200" cy="40" r="22" fill="#FFF2EE" stroke="#F56040" strokeWidth="1.5" className="pulsing-svg-node" />
                <text x="200" y="44" textAnchor="middle" fill="#F56040" fontSize="9" fontFamily="sans-serif" fontWeight="700">
                  POST
                </text>

                {/* Left Node: Meta API (Meta Blue) */}
                <circle cx="40" cy="200" r="22" fill="#EEF6FF" stroke="#3797F0" strokeWidth="1.5" className="pulsing-svg-node" />
                <text x="40" y="204" textAnchor="middle" fill="#3797F0" fontSize="9" fontFamily="sans-serif" fontWeight="700">
                  META
                </text>

                {/* Right Node: Direct Message (Instagram Rose) */}
                <circle cx="360" cy="200" r="22" fill="#FCEDF5" stroke="#E1306C" strokeWidth="1.5" className="pulsing-svg-node" />
                <text x="360" y="204" textAnchor="middle" fill="#E1306C" fontSize="9" fontFamily="sans-serif" fontWeight="700">
                  DM
                </text>

                {/* Bottom Node: CRM Sync (Royal Purple) */}
                <circle cx="200" cy="360" r="22" fill="#F5EEFB" stroke="#833AB4" strokeWidth="1.5" className="pulsing-svg-node" />
                <text x="200" y="364" textAnchor="middle" fill="#833AB4" fontSize="9" fontFamily="sans-serif" fontWeight="700">
                  CRM
                </text>

                {/* Satellite Mini-Pills with Multi-Color Highlights */}
                <rect x="75" y="85" width="50" height="18" rx="9" fill="#FCEDF5" stroke="#E1306C" strokeOpacity="0.3" />
                <text x="100" y="97" textAnchor="middle" fill="#C13584" fontSize="7.5" fontFamily="monospace">0.8s</text>

                <rect x="275" y="85" width="50" height="18" rx="9" fill="#FFF2EE" stroke="#F56040" strokeOpacity="0.3" />
                <text x="300" y="97" textAnchor="middle" fill="#F56040" fontSize="7.5" fontFamily="monospace">AI SPIN</text>

                <rect x="75" y="295" width="50" height="18" rx="9" fill="#EEF6FF" stroke="#3797F0" strokeOpacity="0.3" />
                <text x="100" y="307" textAnchor="middle" fill="#3797F0" fontSize="7.5" fontFamily="monospace">WEBHOOK</text>

                <rect x="275" y="295" width="50" height="18" rx="9" fill="#FFFBEF" stroke="#FCAF45" strokeOpacity="0.5" />
                <text x="300" y="307" textAnchor="middle" fill="#D97706" fontSize="7.5" fontFamily="monospace">99.8%</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
