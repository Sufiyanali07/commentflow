"use client";

import React, { useEffect, useRef } from "react";
import {
  MessageSquareShare,
  Bot,
  Workflow,
  Sparkles,
  ShieldCheck,
  Zap,
  Layers,
  BarChart,
  Radio,
  Inbox,
  ArrowUpRight
} from "lucide-react";
import gsap from "gsap";

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      id: "comment-dm",
      title: "Instant Comment-to-DM Triggers",
      description:
        "Automatically detect high-intent keywords like 'LINK', 'DISCOUNT', or 'INFO' on your Instagram Reels, Posts, and Ads, and dispatch personalized DMs in milliseconds.",
      icon: MessageSquareShare,
      badge: "Core Engine",
      gradient: "from-[#0064e0] to-[#0095f6]",
      tag: "⚡ 1.2s Delivery",
    },
    {
      id: "smart-replies",
      title: "AI-Powered Smart Comment Replies",
      description:
        "Boost your post's algorithmic ranking by automatically replying to comments with varied, human-like AI responses that prevent repetitive spam flags.",
      icon: Bot,
      badge: "Anti-Spam AI",
      gradient: "from-[#6366f1] to-[#8b5cf6]",
      tag: "🧠 Dynamic Variations",
    },
    {
      id: "dm-funnels",
      title: "Multi-Step Interactive DM Funnels",
      description:
        "Guide prospective buyers through tailored conversation trees. Ask qualifying questions, deliver lead magnets, and collect verified emails directly inside Instagram chat.",
      icon: Workflow,
      badge: "High Conversion",
      gradient: "from-[#0095f6] to-[#6366f1]",
      tag: "🎯 Lead Qualification",
    },
    {
      id: "story-live",
      title: "Story Mentions & Live Broadcast Automation",
      description:
        "Trigger automatic thank-you DMs and special promo codes whenever a follower tags your brand in their Story or comments during your live streams.",
      icon: Radio,
      badge: "Omnichannel",
      gradient: "from-[#f59e0b] to-[#ea580c]",
      tag: "📹 24/7 Engagement",
    },
    {
      id: "crm-sync",
      title: "Unified Lead CRM & Webhook Sync",
      description:
        "Sync leads captured in Instagram DMs straight to HubSpot, Klaviyo, ActiveCampaign, Google Sheets, or Zapier with zero manual export required.",
      icon: Layers,
      badge: "Integrations",
      gradient: "from-[#0064e0] to-[#6366f1]",
      tag: "🔄 Instant Webhooks",
    },
    {
      id: "meta-safe",
      title: "100% Meta Graph API Verified",
      description:
        "Zero shadowban or account restriction risk. Built entirely using official Meta developer endpoints with automatic rate-limit protection and bank-grade security.",
      icon: ShieldCheck,
      badge: "Certified Safe",
      gradient: "from-[#10b981] to-[#059669]",
      tag: "🔒 Official Partner",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger entrance on feature cards
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="ig-glow-sphere w-[600px] h-[600px] bg-[#6366f1]/10 top-20 right-0" />
      <div className="ig-glow-sphere w-[500px] h-[500px] bg-[#0064e0]/15 bottom-0 left-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/30 text-xs font-semibold text-indigo-300 mb-4">
            <Zap className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>Built for Modern Social Commerce</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Everything You Need to Scale Your <span className="ig-gradient-text">Instagram Revenue</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Stop losing qualified buyers in messy comment sections. Automate the entire journey from casual viewer to paying customer in seconds.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="feature-card group relative rounded-2xl glass-panel p-7 border border-white/[0.08] hover:border-white/[0.2] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0095f6]/10 flex flex-col justify-between"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0095f6]/10 via-transparent to-[#6366f1]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Top Icon & Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-0.5 shadow-lg shadow-[#0095f6]/20 group-hover:scale-105 transition-transform duration-300`}
                    >
                      <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center text-white">
                        <Icon className="w-6 h-6 text-[#38bdf8]" />
                      </div>
                    </div>

                    <span className="text-[11px] font-semibold font-mono px-2.5 py-1 rounded-full bg-white/[0.04] text-slate-300 border border-white/[0.08]">
                      {feature.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#38bdf8] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Footer Micro-Interaction */}
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400 group-hover:text-white transition-colors">
                  <span className="font-semibold text-xs text-indigo-300">{feature.badge}</span>
                  <span className="flex items-center gap-1 text-[11px] text-[#0095f6] font-medium group-hover:translate-x-0.5 transition-transform">
                    Explore Capability <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
