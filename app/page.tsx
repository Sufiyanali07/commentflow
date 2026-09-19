"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Concept from "../components/Concept";
import Pillars from "../components/Pillars";
import PricingSection from "../components/PricingSection";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState<string>("Studio Pro");

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF8FB] text-[#262626] flex flex-col selection:bg-[#FCEDF5] selection:text-[#C13584]">
      {/* 1. Minimalist Editorial Navbar */}
      <Navbar />

      <main className="flex-1 w-full">
        {/* 2. Poetic, Spacious Hero Section */}
        <Hero />

        {/* 3. The Concept / Narrative Manifesto */}
        <Concept />

        {/* 4. Core Usage / Feature Pillars */}
        <Pillars />

        {/* 5. Minimalist Transparent Pricing */}
        <PricingSection onSelectPlan={handleSelectPlan} />

        {/* 6. Aesthetic Lead & Early Access Form */}
        <ContactForm selectedPlan={selectedPlan} />

        {/* 7. Editorial Footer */}
        <Footer />
      </main>
    </div>
  );
}
