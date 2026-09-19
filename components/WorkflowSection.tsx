"use client";

import React, { useEffect, useRef } from "react";
import { Link2, SlidersHorizontal, Rocket, Check, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import gsap from "gsap";

export default function WorkflowSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      number: "01",
      title: "Connect Your Instagram in 1-Click",
      description:
        "Authenticate your Instagram Business or Creator account securely through official Meta OAuth. No passwords shared, zero manual token setup.",
      icon: Link2,
      tag: "Instant 60s Setup",
      details: ["Official Meta OAuth 2.0", "Auto-syncs all current & future Posts/Reels", "Bank-grade token encryption"],
    },
    {
      number: "02",
      title: "Set Your Keywords & DM Sequences",
      description:
        "Pick specific trigger keywords (e.g., 'EBOOK', 'VIP', 'BUY') or enable smart all-comment triggers. Customize your automated public reply variations and private DM funnels.",
      icon: SlidersHorizontal,
      tag: "Drag & Drop Builder",
      details: ["Dynamic AI comment variation", "Rich cards & CTA button links", "Custom delays & typing indicators"],
    },
    {
      number: "03",
      title: "Post on Instagram & Watch Leads Convert",
      description:
        "Publish your Reel or Post telling followers to comment your keyword. CommentFlow monitors your engagement 24/7, delivering instant DMs and capturing leads in real-time.",
      icon: Rocket,
      tag: "24/7 Autopilot",
      details: ["< 2s instant DM fulfillment", "Real-time CRM contact sync", "Detailed ROI & conversion analytics"],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".workflow-step", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="workflow"
      ref={sectionRef}
      className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-b from-transparent via-[#080b13] to-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0095f6]/10 border border-[#0095f6]/30 text-xs font-semibold text-[#38bdf8] mb-4">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>3-Step Automated Engine</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            How CommentFlow Works in <span className="ig-gradient-text">Three Simple Steps</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Get up and running in under 2 minutes. No coding or complex technical setup required.
          </p>
        </div>

        {/* 3 Step Cards Grid with Connecting Visuals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="workflow-step group relative rounded-2xl glass-panel p-8 border border-white/[0.08] hover:border-[#0095f6]/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#0095f6]/10"
              >
                {/* Step Top Header */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0064e0] via-[#0095f6] to-[#6366f1] p-[2px] shadow-lg shadow-[#0095f6]/20">
                      <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center text-white">
                        <Icon className="w-6 h-6 text-[#38bdf8]" />
                      </div>
                    </div>

                    <span className="text-3xl font-black font-mono text-white/20 group-hover:text-[#0095f6]/60 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  <span className="inline-block text-[11px] font-semibold text-amber-300 bg-amber-950/40 border border-amber-500/30 px-2.5 py-0.5 rounded-full mb-3">
                    {step.tag}
                  </span>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#38bdf8] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Bullet details */}
                <div className="space-y-2 pt-4 border-t border-white/[0.06]">
                  {step.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Callout Bar */}
        <div className="mt-14 p-6 rounded-2xl bg-gradient-to-r from-[#0064e0]/15 via-[#6366f1]/15 to-[#f59e0b]/10 border border-[#0095f6]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm text-slate-200">
            <ShieldCheck className="w-6 h-6 text-[#0095f6] shrink-0" />
            <span>
              <strong className="text-white">Zero technical skills needed.</strong> CommentFlow connects directly with your existing Instagram profile in 60 seconds.
            </span>
          </div>
          <a
            href="#contact"
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#0064e0] to-[#0095f6] hover:shadow-lg hover:shadow-[#0095f6]/30 transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
