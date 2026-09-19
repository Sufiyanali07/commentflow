"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  MessageCircle,
  Send,
  Zap,
  Bot,
  User,
  ExternalLink,
  ArrowRight,
  Flame,
  Check,
  Clock,
  Filter
} from "lucide-react";
import gsap from "gsap";

interface PresetScenario {
  id: string;
  keyword: string;
  tag: string;
  userComment: string;
  publicReply: string;
  dmTitle: string;
  dmBody: string;
  ctaText: string;
  ctaUrl: string;
}

const PRESETS: PresetScenario[] = [
  {
    id: "promo",
    keyword: "DISCOUNT",
    tag: "E-Commerce / Flash Sale",
    userComment: "Love these sneakers! Please send me the DISCOUNT code 🔥",
    publicReply: "Just DM'd your exclusive 30% off VIP coupon code! Check your inbox 👟✨",
    dmTitle: "Here is your 30% Off Code!",
    dmBody: "Use code VIP30 at checkout to unlock 30% off your entire cart + free shipping. Valid for the next 24 hours.",
    ctaText: "Claim 30% Off Now",
    ctaUrl: "#claim-discount",
  },
  {
    id: "leadmagnet",
    keyword: "WORKBOOK",
    tag: "Creator / Digital Product",
    userComment: "Need this strategy! Send me the WORKBOOK please 📚",
    publicReply: "Check your DMs @user! Your 24-page IG Growth Playbook is ready for download 🚀",
    dmTitle: "Your Free Growth Workbook (PDF)",
    dmBody: "Hey! Tap the link below to get instant access to the exact templates we used to generate $120k in Instagram sales.",
    ctaText: "Download Free PDF",
    ctaUrl: "#download-pdf",
  },
  {
    id: "booking",
    keyword: "CALL",
    tag: "Agency / B2B Consulting",
    userComment: "Interested in hiring your team. Send info on how to book a CALL 📞",
    publicReply: "Awesome! Sent you our private calendar link in DMs to pick a time that works for you 🗓️",
    dmTitle: "VIP 1-on-1 Growth Consultation",
    dmBody: "Thanks for reaching out! Let's audit your Instagram funnel together. Pick a 20-minute slot on our private calendar.",
    ctaText: "Book 20-Min Strategy Call",
    ctaUrl: "#book-call",
  },
  {
    id: "pricing",
    keyword: "PRICING",
    tag: "SaaS / Service Business",
    userComment: "How much is the software? Send PRICING details please 🙏",
    publicReply: "Sent our full plan breakdown & starter discount straight to your private messages! 💼",
    dmTitle: "CommentFlow Pricing & Plans",
    dmBody: "Plans start at $29/mo with unlimited public replies and a 14-day free trial. Here's your transparent overview:",
    ctaText: "View Transparent Pricing",
    ctaUrl: "#pricing",
  },
];

export default function LiveDemoSimulator() {
  const [selectedPreset, setSelectedPreset] = useState<PresetScenario>(PRESETS[0]);
  const [customKeyword, setCustomKeyword] = useState("");
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [latencyMs, setLatencyMs] = useState<number>(640);

  const simulatorRef = useRef<HTMLDivElement>(null);
  const commentBoxRef = useRef<HTMLDivElement>(null);
  const publicReplyRef = useRef<HTMLDivElement>(null);
  const dmModalRef = useRef<HTMLDivElement>(null);
  const triggerPulseRef = useRef<HTMLDivElement>(null);

  const activeKeyword = customKeyword.trim() ? customKeyword.toUpperCase() : selectedPreset.keyword;

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setIsCompleted(false);
    setCurrentStep(1);

    // Random realistic API latency between 520ms and 840ms
    const randomLatency = Math.floor(Math.random() * 320) + 520;
    setLatencyMs(randomLatency);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsRunning(false);
        setIsCompleted(true);
        setCurrentStep(4);
      },
    });

    // Step 1: Animate customer comment typing/appearing
    if (commentBoxRef.current) {
      tl.fromTo(
        commentBoxRef.current,
        { scale: 0.9, opacity: 0, y: 15 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
      );
    }

    // Step 2: Highlight trigger keyword detection
    tl.call(() => setCurrentStep(2));
    if (triggerPulseRef.current) {
      tl.fromTo(
        triggerPulseRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1.05, opacity: 1, duration: 0.35, ease: "power2.out" }
      ).to(triggerPulseRef.current, { scale: 1, duration: 0.2 });
    }

    // Step 3: Animate public auto-reply
    tl.call(() => setCurrentStep(3));
    if (publicReplyRef.current) {
      tl.fromTo(
        publicReplyRef.current,
        { opacity: 0, x: -20, height: 0 },
        { opacity: 1, x: 0, height: "auto", duration: 0.6, ease: "power3.out" },
        "+=0.2"
      );
    }

    // Step 4: Animate Instagram DM drawer sliding in
    if (dmModalRef.current) {
      tl.fromTo(
        dmModalRef.current,
        { opacity: 0, y: 30, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.5)" },
        "+=0.3"
      );
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsRunning(false);
    setIsCompleted(false);
  };

  const handleSelectPreset = (preset: PresetScenario) => {
    setSelectedPreset(preset);
    setCustomKeyword("");
    handleReset();
  };

  return (
    <section
      id="simulator"
      ref={simulatorRef}
      className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-b from-transparent via-[#0b0e17] to-transparent"
    >
      {/* Background glow */}
      <div className="ig-glow-sphere w-[500px] h-[500px] bg-[#0064e0]/15 top-1/2 left-10 -translate-y-1/2" />
      <div className="ig-glow-sphere w-[400px] h-[400px] bg-[#f59e0b]/10 bottom-10 right-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0095f6]/10 border border-[#0095f6]/30 text-xs font-semibold text-[#38bdf8] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>Interactive Automation Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Experience the CommentFlow <span className="ig-gradient-text">Magic Live</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Pick a use case below or enter a custom keyword, then click &apos;Test Trigger&apos; to watch the real-time Instagram automated comment reply and instant DM funnel execute.
          </p>
        </div>

        {/* Preset Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10 max-w-4xl mx-auto">
          {PRESETS.map((preset) => {
            const isSelected = selectedPreset.id === preset.id && !customKeyword;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? "bg-gradient-to-r from-[#0064e0] to-[#6366f1] text-white shadow-lg shadow-[#0095f6]/25 border border-[#0095f6]"
                    : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/[0.08]"
                }`}
              >
                <span>Keyword: &quot;{preset.keyword}&quot;</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-slate-300">
                  {preset.tag.split("/")[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Simulator Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Control Panel & Live Workflow Telemetry */}
          <div className="lg:col-span-4 space-y-6">
            {/* Control Panel Card */}
            <div className="p-6 rounded-2xl glass-panel border border-white/[0.1] space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Bot className="w-4 h-4 text-[#0095f6]" />
                  Trigger Configuration
                </h3>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">
                  ● Engine Ready
                </span>
              </div>

              {/* Keyword Customizer Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>Trigger Keyword:</span>
                  <span className="text-[10px] text-slate-500 font-mono">Case-Insensitive</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={customKeyword || selectedPreset.keyword}
                    onChange={(e) => setCustomKeyword(e.target.value.toUpperCase())}
                    placeholder="e.g. VIP, EBOOK, PROMO"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/[0.12] focus:border-[#0095f6] focus:outline-none text-white font-mono text-sm tracking-wider uppercase"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#0095f6] bg-[#0095f6]/10 px-2 py-0.5 rounded">
                    Active
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={runSimulation}
                  disabled={isRunning}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
                    isRunning
                      ? "bg-slate-700 opacity-60 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#0064e0] via-[#0095f6] to-[#6366f1] hover:shadow-xl hover:shadow-[#0095f6]/30 hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                >
                  <Play className="w-4 h-4 fill-current text-white" />
                  <span>{isRunning ? "Simulating Workflow..." : "Test Automation Trigger"}</span>
                </button>

                <button
                  onClick={handleReset}
                  className="w-full py-2.5 rounded-xl font-medium text-xs text-slate-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset State</span>
                </button>
              </div>

              {/* Telemetry Status Steps */}
              <div className="pt-3 border-t border-white/[0.08] space-y-2.5">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Live Execution Telemetry
                </div>

                <div className="space-y-2">
                  <div
                    className={`p-2.5 rounded-lg border text-xs flex items-center justify-between transition-all ${
                      currentStep >= 1
                        ? "bg-blue-950/30 border-[#0095f6]/40 text-blue-200"
                        : "bg-white/[0.02] border-white/[0.06] text-slate-500"
                    }`}
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <span className="w-5 h-5 rounded-full bg-[#0095f6]/20 flex items-center justify-center text-[10px] font-bold text-[#0095f6]">
                        1
                      </span>
                      Keyword Detected
                    </span>
                    <span className="font-mono text-[10px]">
                      {currentStep >= 1 ? `"${activeKeyword}" (Matched)` : "Waiting..."}
                    </span>
                  </div>

                  <div
                    className={`p-2.5 rounded-lg border text-xs flex items-center justify-between transition-all ${
                      currentStep >= 3
                        ? "bg-indigo-950/30 border-[#6366f1]/40 text-indigo-200"
                        : "bg-white/[0.02] border-white/[0.06] text-slate-500"
                    }`}
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <span className="w-5 h-5 rounded-full bg-[#6366f1]/20 flex items-center justify-center text-[10px] font-bold text-[#6366f1]">
                        2
                      </span>
                      Smart Public Reply
                    </span>
                    <span className="font-mono text-[10px]">
                      {currentStep >= 3 ? "Sent (AI Rotated)" : "Pending"}
                    </span>
                  </div>

                  <div
                    className={`p-2.5 rounded-lg border text-xs flex items-center justify-between transition-all ${
                      currentStep >= 4
                        ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-200"
                        : "bg-white/[0.02] border-white/[0.06] text-slate-500"
                    }`}
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px] font-bold text-emerald-400">
                        3
                      </span>
                      Instant DM Delivered
                    </span>
                    <span className="font-mono text-[10px] text-emerald-400 font-bold">
                      {currentStep >= 4 ? `${latencyMs}ms (200 OK)` : "Pending"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Stage (Instagram Post + Instant DM Drawer) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-2xl glass-panel border border-white/[0.12] overflow-hidden shadow-2xl shadow-black/80">
              {/* Simulation Header */}
              <div className="px-6 py-4 bg-black/50 border-b border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0095f6] animate-pulse" />
                  <span className="text-xs font-bold text-white tracking-wide">
                    Live Instagram Environment Simulation
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Execution Latency: <strong className="text-white font-mono">{latencyMs}ms</strong></span>
                </div>
              </div>

              {/* Split Simulation Canvas */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#080b12]">
                {/* Left: Instagram Post & Public Comment Section */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/[0.08] space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <MessageCircle className="w-4 h-4 text-[#0095f6]" />
                      Public Post Comments
                    </span>
                    <span className="text-[10px] text-slate-400">Reel #4092</span>
                  </div>

                  {/* Initial Post Context */}
                  <div className="p-3 rounded-lg bg-white/[0.03] text-xs text-slate-300">
                    <p className="font-semibold text-white">@yourbrand_official:</p>
                    <p className="text-slate-300 mt-0.5">
                      Drop &apos;<span className="text-amber-400 font-bold">{activeKeyword}</span>&apos; in the comments and our automation will DM you the instant link! 🔥
                    </p>
                  </div>

                  {/* Customer's Incoming Comment */}
                  <div className="space-y-2">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase">Incoming Comment</div>

                    <div
                      ref={commentBoxRef}
                      className={`p-3.5 rounded-xl border transition-all ${
                        currentStep >= 1
                          ? "bg-white/[0.05] border-[#0095f6]/40 shadow-md"
                          : "bg-white/[0.02] border-white/[0.06] opacity-40"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-white">@sarah_creator</span>
                        <span className="text-[10px] text-slate-400">Just now</span>
                      </div>
                      <p className="text-xs text-slate-200">
                        {customKeyword ? (
                          <>
                            Hey! Please send me the <strong className="text-amber-400 font-bold">{activeKeyword}</strong> details!
                          </>
                        ) : (
                          selectedPreset.userComment
                        )}
                      </p>
                    </div>

                    {/* Trigger Keyword Match Pulse */}
                    {currentStep >= 2 && (
                      <div
                        ref={triggerPulseRef}
                        className="py-1 px-3 rounded-md bg-[#0095f6]/15 border border-[#0095f6]/40 text-[11px] font-mono text-[#38bdf8] flex items-center justify-between"
                      >
                        <span className="flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-amber-400" />
                          Keyword &quot;{activeKeyword}&quot; Triggered!
                        </span>
                        <span className="text-emerald-400 font-bold">Rule: Match Exact</span>
                      </div>
                    )}

                    {/* Automated Public Reply */}
                    <div
                      ref={publicReplyRef}
                      className={`overflow-hidden transition-all ${
                        currentStep >= 3 ? "block" : "hidden"
                      }`}
                    >
                      <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#0064e0]/15 via-[#6366f1]/15 to-transparent border border-[#0095f6]/40 ml-3 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#38bdf8] flex items-center gap-1">
                            <Bot className="w-3.5 h-3.5" />
                            @yourbrand_official (AI Auto-Reply)
                          </span>
                          <span className="text-[9px] text-emerald-400 font-mono">0.6s</span>
                        </div>
                        <p className="text-xs text-slate-200">
                          {selectedPreset.publicReply}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Instagram Direct Message (DM) Simulated Window */}
                <div
                  ref={dmModalRef}
                  className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                    currentStep >= 4
                      ? "bg-slate-900/90 border-[#0095f6]/40 shadow-2xl shadow-[#0095f6]/10"
                      : "bg-slate-950/40 border-white/[0.06] opacity-40"
                  }`}
                >
                  <div className="space-y-4">
                    {/* DM Header */}
                    <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.08]">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#0064e0] to-[#6366f1] flex items-center justify-center text-xs font-bold text-white">
                          CF
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">Direct Message</div>
                          <div className="text-[10px] text-emerald-400">● Active now</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono bg-white/[0.06] px-2 py-0.5 rounded text-slate-300">
                        IG API v20.0
                      </span>
                    </div>

                    {/* DM Chat Bubble */}
                    <div className="space-y-3">
                      <div className="p-3.5 rounded-2xl rounded-tl-sm bg-[#1877f2]/25 border border-[#1877f2]/40 text-xs text-slate-100 space-y-2">
                        <div className="font-bold text-white text-sm">
                          {selectedPreset.dmTitle}
                        </div>
                        <p className="text-slate-200 text-xs leading-relaxed">
                          {selectedPreset.dmBody}
                        </p>
                      </div>

                      {/* Interactive DM Call to Action Button */}
                      <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.1] hover:border-[#0095f6]/40 transition-all space-y-2">
                        <a
                          href={selectedPreset.ctaUrl}
                          className="w-full py-2.5 px-3 rounded-lg bg-[#0095f6] hover:bg-[#0080d3] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#0095f6]/20 transition-colors"
                        >
                          <span>{selectedPreset.ctaText}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                        <p className="text-[10px] text-center text-slate-400">
                          ⚡ Direct link delivered in under 1 second
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Status */}
                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Delivered & Read
                    </span>
                    <span className="font-mono text-[10px]">Lead ID: #CF-9824</span>
                  </div>
                </div>
              </div>

              {/* Bottom Result Callout */}
              {isCompleted && (
                <div className="p-4 bg-gradient-to-r from-[#0064e0]/20 via-[#6366f1]/20 to-[#f59e0b]/10 border-t border-[#0095f6]/30 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in duration-300">
                  <div className="flex items-center gap-2.5 text-xs text-slate-200">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>
                      <strong className="text-white">Workflow Completed!</strong> Comment replied publicly + DM sent directly to user&apos;s Instagram inbox.
                    </span>
                  </div>
                  <a
                    href="#contact"
                    className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-[#0095f6] hover:bg-[#0080d3] transition-colors whitespace-nowrap shadow"
                  >
                    Deploy This for Your Instagram →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
