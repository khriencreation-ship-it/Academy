"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaBuilding, FaUsers, FaUserTie, FaRocket, FaCheckCircle } from "react-icons/fa";

const targets = [
  {
    icon: FaBuilding,
    title: "Companies of Any Size",
    desc: "Businesses looking to increase overall team output, streamline communication, and eliminate repetitive admin overhead with AI.",
  },
  {
    icon: FaUsers,
    title: "Department Teams",
    desc: "Operations, marketing, sales, HR, finance, and customer support teams needing role-specific prompts and workflows.",
  },
  {
    icon: FaUserTie,
    title: "Leadership & Management",
    desc: "Executives and managers who want to understand AI capabilities and risks to effectively guide company adoption.",
  },
  {
    icon: FaRocket,
    title: "Zero-to-AI or Active Teams",
    desc: "Organisations starting completely from scratch as well as teams that already use tools like ChatGPT or Claude informally.",
  },
];

export default function WhoItsForSection() {
  return (
    <section className="py-20 lg:py-28 bg-neutral-900 text-white relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-wider text-brandPurple mb-3 block"
          >
            Target Audience
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            Who It's For
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-gray-400"
          >
            Tailored learning paths for diverse corporate functions and experience levels.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {targets.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-brandPurple/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-800/40 text-purple-400 flex items-center justify-center mb-6 text-xl">
                    <Icon />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Highlight banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-12 p-4 sm:p-6 rounded-xl bg-purple-950/40 border border-brandPurple/30 text-center max-w-2xl mx-auto flex items-center justify-center gap-3 text-purple-200"
        >
          <FaCheckCircle className="text-brandPurple text-xl flex-shrink-0" />
          <span className="text-base sm:text-lg font-medium">
            <strong>No technical background needed.</strong> Designed for non-technical professionals.
          </span>
        </motion.div>

      </div>
    </section>
  );
}
