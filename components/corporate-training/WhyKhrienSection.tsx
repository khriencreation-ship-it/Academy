"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaWrench, FaAward, FaSlidersH, FaCode } from "react-icons/fa";

const differentiators = [
  {
    icon: FaWrench,
    title: "Practical, Not Theoretical",
    description: "Your staff work on real tasks and leave with skills they use the next day.",
  },
  {
    icon: FaAward,
    title: "Proven Curriculum",
    description: "Built on the AI Foundations curriculum that has certified over 130 students.",
  },
  {
    icon: FaSlidersH,
    title: "Tailored to You",
    description: "We adapt examples and exercises to your industry, your roles, and the tools your team already uses.",
  },
  {
    icon: FaCode,
    title: "Taught by Builders",
    description: "The Khrien team uses AI every day to build and ship real products, so we teach what works in practice.",
  },
];

export default function WhyKhrienSection() {
  return (
    <section className="py-20 lg:py-28 bg-black text-white relative overflow-hidden border-t border-neutral-900">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-wider text-brandPurple mb-3 block"
          >
            Why Choose Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            Why Khrien Academy
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-gray-400"
          >
            We don&apos;t just teach AI theory—we empower teams with immediate, practical impact.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentiators.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-8 rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-brandPurple/60 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-purple-950/60 border border-purple-800/40 text-purple-400 flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">
                    <Icon />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brandPurple transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
