"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaTerminal, FaBriefcase, FaPhotoVideo, FaShieldAlt, FaAward } from "react-icons/fa";

const modules = [
  {
    num: "01",
    title: "AI Foundations",
    description: "Understand what AI is, how modern AI tools work, and where they genuinely help in a working day.",
    icon: FaGraduationCap,
    color: "from-purple-500 to-indigo-500",
  },
  {
    num: "02",
    title: "Prompt Engineering",
    description: "Learn how to write clear, effective prompts that produce reliable, high quality results, every time.",
    icon: FaTerminal,
    color: "from-emerald-500 to-teal-500",
  },
  {
    num: "03",
    title: "AI for Everyday Work",
    description: "Use AI for writing, research, analysis, summarising, planning, and communication, with hands-on practice on real tasks.",
    icon: FaBriefcase,
    color: "from-amber-500 to-orange-500",
  },
  {
    num: "04",
    title: "AI Media Generation",
    description: "Generate high-quality graphics, branded images, and engaging videos using generative AI tools for marketing and business communications.",
    icon: FaPhotoVideo,
    color: "from-blue-500 to-cyan-500",
  },
  {
    num: "05",
    title: "Responsible AI Use",
    description: "Protect company and client data, check AI output for accuracy, and know when not to use AI.",
    icon: FaShieldAlt,
    color: "from-purple-600 to-pink-600",
  },
];

export default function CurriculumSection() {
  return (
    <section className="py-20 lg:py-28 bg-white text-gray-900 relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-brandPurple text-xs font-semibold uppercase tracking-wider mb-3"
          >
            <FaAward className="text-sm" />
            <span>Proven 5-Module Curriculum</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6"
          >
            What Your Team Will Learn
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 leading-relaxed"
          >
            Our programme is built on the <strong className="text-gray-900 font-semibold">AI Foundations curriculum</strong>, the same curriculum that has certified over 130 students through Khrien Academy. We adapt it to the way your organisation works.
          </motion.p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((mod, index) => {
            const Icon = mod.icon;
            return (
              <motion.div
                key={mod.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-8 rounded-2xl bg-gray-50 border border-gray-200 hover:border-brandPurple/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group ${
                  index === 4 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold tracking-widest text-gray-400 group-hover:text-brandPurple transition-colors">
                      MODULE {mod.num}
                    </span>
                    <div className="p-3 rounded-xl bg-white shadow-sm border border-gray-100 text-brandPurple group-hover:bg-brandPurple group-hover:text-white transition-all duration-300">
                      <Icon className="text-xl" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brandPurple transition-colors">
                    {mod.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-200/60 flex items-center justify-between text-xs text-gray-500 font-medium">
                  <span>Hands-on Practice</span>
                  <span className="text-brandPurple group-hover:translate-x-1 transition-transform">Interactive →</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
