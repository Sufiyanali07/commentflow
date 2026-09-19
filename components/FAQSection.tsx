"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, ShieldCheck, Zap } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Is CommentFlow compliant with Instagram & Meta platform policies?",
      answer:
        "Yes, 100%. CommentFlow is built exclusively on top of the official Meta Graph API v20.0 and Instagram Messaging API. We never use unauthorized browser scrapers or simulate fake logins. Your account credentials and token remain completely safe and protected under Meta's developer terms.",
    },
    {
      question: "Will my Instagram account get shadowbanned or restricted?",
      answer:
        "No. Unlike unofficial bots, our engine automatically incorporates human-like randomized delays, AI reply spin variations, and strict adherence to Meta's hourly API rate-limits. CommentFlow actually improves your post's algorithmic ranking because Instagram's algorithm rewards high comment velocity and DM engagement.",
    },
    {
      question: "Does CommentFlow work on Instagram Reels, Carousel posts, and Ads?",
      answer:
        "Yes! CommentFlow operates across standard feed posts, Reels, Carousels, Boosted Ads, Story Mentions, and Live Stream chats. You can set global keyword triggers or tailor specific triggers to individual posts or campaigns.",
    },
    {
      question: "Can I collect customer emails and phone numbers inside Instagram DMs?",
      answer:
        "Absolutely. Our multi-step DM funnel builder lets you ask questions, validate email and phone formats in real-time, and automatically send captured contact data to your CRM (HubSpot, Klaviyo, ActiveCampaign, Zapier, Google Sheets).",
    },
    {
      question: "How long does it take to set up?",
      answer:
        "Most creators and brands go live in under 2 minutes. You simply log in via Meta OAuth, choose your trigger keyword, specify your automated reply and DM message, and publish your content.",
    },
    {
      question: "Can I try CommentFlow before committing?",
      answer:
        "Yes! We offer a full 14-day free trial on all plans with zero credit card required. You can also test our interactive simulator above anytime.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-b from-transparent via-[#080a12] to-transparent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/30 text-xs font-semibold text-indigo-300 mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#0095f6]" />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Frequently Asked <span className="ig-gradient-text">Questions</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base">
            Everything you need to know about safety, setup, AI replies, and Instagram conversion funnels.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl glass-panel border border-white/[0.08] hover:border-white/[0.16] transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-bold text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#0095f6]/20 text-[#38bdf8]" : "text-slate-400"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 text-sm text-slate-300 leading-relaxed border-t border-white/[0.04] mt-2 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
