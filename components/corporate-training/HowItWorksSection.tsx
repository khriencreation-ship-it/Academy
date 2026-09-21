"use client";

import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Tell us about your team",
    desc: "Share your team size, your industry, and what you want your staff to achieve with AI.",
  },
  {
    step: "02",
    title: "We shape the programme",
    desc: "We tailor the AI Foundations curriculum to your roles, your tools, and your goals.",
  },
  {
    step: "03",
    title: "We train your team",
    desc: "Your staff learn through live, practical sessions, either virtually or at your office.",
  },
  {
    step: "04",
    title: "Your team puts it to work",
    desc: "Staff leave with skills and workflows they can apply to their own tasks straight away.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 lg:py-28 bg-neutral-950 text-white relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-wider text-brandPurple mb-3 block"
          >
            Seamless Onboarding Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-gray-400"
          >
            A simple 4-step process to equip your organisation with practical AI execution.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 relative flex flex-col justify-between group hover:border-brandPurple/50 transition-all duration-300"
            >
              <div>
                <div className="text-4xl font-extrabold text-brandPurple/30 group-hover:text-brandPurple transition-colors mb-4 font-mono">
                  {s.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-brandPurple font-semibold">
                <span>Step {s.step}</span>
                <span>→</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
