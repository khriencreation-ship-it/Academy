"use client";

import React from "react";
import HeroSection from "./HeroSection";
import ProblemSection from "./ProblemSection";
import CurriculumSection from "./CurriculumSection";
import WhoItsForSection from "./WhoItsForSection";
import DeliveryModesSection from "./DeliveryModesSection";
import HowItWorksSection from "./HowItWorksSection";
import PricingSection from "./PricingSection";
import WhyKhrienSection from "./WhyKhrienSection";
import FaqSection from "./FaqSection";
import EnquiryFormSection from "./EnquiryFormSection";

export default function CorporateTrainingClient() {
  return (
    <main className="w-full overflow-x-hidden bg-black text-white">
      <HeroSection />
      <ProblemSection />
      <CurriculumSection />
      <WhoItsForSection />
      <DeliveryModesSection />
      <HowItWorksSection />
      <PricingSection />
      <WhyKhrienSection />
      <FaqSection />
      <EnquiryFormSection />
    </main>
  );
}
