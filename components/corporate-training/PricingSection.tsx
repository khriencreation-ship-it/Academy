"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaCheck, FaBuilding, FaUserCheck, FaUsers, FaArrowRight } from "react-icons/fa";

const pricingTiers = [
  {
    size: "Individual",
    range: "1 Person",
    price: "₦150,000",
    unit: "per person",
    badge: "Solo Staff",
    popular: false,
    icon: FaUserCheck,
    features: [
      "Full AI Foundations Curriculum",
      "Virtual live instructor sessions",
      "Practical prompt templates",
      "Certificate of Completion",
    ],
  },
  {
    size: "1 to 5 staff",
    range: "Small Team",
    price: "₦130,000",
    unit: "per person",
    badge: "Most Popular",
    popular: true,
    icon: FaUsers,
    features: [
      "Full AI Foundations Curriculum",
      "Virtual or In-Person option",
      "Role-tailored practical exercises",
      "Repeatable team workflow setup",
      "Certificate of Completion",
    ],
  },
  {
    size: "6 to 10 staff",
    range: "Department Team",
    price: "₦110,000",
    unit: "per person",
    badge: "Best Value",
    popular: false,
    icon: FaBuilding,
    features: [
      "Full AI Foundations Curriculum",
      "Virtual or In-Person option",
      "Department-specific workflows",
      "Group case studies & review",
      "Certificate of Completion",
    ],
  },
  {
    size: "11 staff and above",
    range: "Enterprise / Large",
    price: "From ₦90,000",
    unit: "per person (custom quote)",
    badge: "Custom Quote",
    popular: false,
    icon: FaUsers,
    features: [
      "Tailored executive & team tracks",
      "Custom scheduling & delivery",
      "Dedicated multi-day workshops",
      "Post-training implementation support",
      "Certificates for all staff",
    ],
  },
];

export default function PricingSection() {
  const scrollToEnquiry = () => {
    const el = document.getElementById("enquiry-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-gray-50 text-gray-900 border-t border-gray-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-wider text-brandPurple mb-3 block"
          >
            Transparent Investment
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4"
          >
            Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600"
          >
            Choose the option that fits your team. Prices are per person.
          </motion.p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pricingTiers.map((tier, idx) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.size}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`p-6 sm:p-8 rounded-3xl bg-white border flex flex-col justify-between relative transition-all duration-300 ${
                  tier.popular
                    ? "border-2 border-brandPurple shadow-2xl ring-4 ring-purple-100 scale-102"
                    : "border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brandPurple text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {tier.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {tier.range}
                    </span>
                    <div className={`p-2.5 rounded-xl ${tier.popular ? "bg-purple-100 text-brandPurple" : "bg-gray-100 text-gray-600"}`}>
                      <Icon className="text-lg" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.size}</h3>

                  <div className="mb-6 pt-2">
                    <div className="text-3xl font-extrabold text-gray-900 tracking-tight">
                      {tier.price}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 font-medium">{tier.unit}</div>
                  </div>

                  <ul className="space-y-3 pt-4 border-t border-gray-100 mb-6 text-sm text-gray-600">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <FaCheck className="text-brandPurple text-xs mt-1 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={scrollToEnquiry}
                  className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                    tier.popular
                      ? "bg-brandPurple hover:bg-brandPurple/90 text-white shadow-lg shadow-purple-200"
                      : "bg-gray-900 hover:bg-black text-white"
                  }`}
                >
                  Book Training
                  <FaArrowRight className="text-xs" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Notes callout */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm text-sm text-gray-600">
          <div className="flex items-start gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-brandPurple mt-1.5 flex-shrink-0" />
            <div>
              <strong className="text-gray-900 font-semibold block mb-1">Training at your office:</strong>
              A one-time on-site fee applies and is confirmed when you book. Virtual training has no on-site fee.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-brandPurple mt-1.5 flex-shrink-0" />
            <div>
              <strong className="text-gray-900 font-semibold block mb-1">Larger teams (11+ staff):</strong>
              For 11 or more staff, we prepare a custom quote based on your team size, goals, and preferred delivery format.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
