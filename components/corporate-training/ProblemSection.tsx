"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaExclamationTriangle, FaClock, FaShieldAlt, FaLightbulb, FaCheck } from "react-icons/fa";

export default function ProblemSection() {
  return (
    <section className="py-20 lg:py-28 bg-neutral-950 text-white relative overflow-hidden border-t border-neutral-900">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-wider text-brandPurple mb-3 block"
          >
            The Problem & The Solution
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight"
          >
            Your team is already using AI. <br className="hidden sm:inline" />
            <span className="text-gray-400 font-normal">Are they using it well?</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* Problem Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-col justify-between relative overflow-hidden group hover:border-red-900/50 transition-colors"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full filter blur-2xl pointer-events-none" />
            
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
                  <FaExclamationTriangle className="text-xl" />
                </div>
                <h3 className="text-xl font-bold text-white">The Unguided Reality</h3>
              </div>

              <p className="text-gray-300 text-base leading-relaxed mb-6">
                Many employees use AI tools every day without any formal guidance. The result is uneven quality, wasted time, and avoidable risks with company data.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-sm text-gray-400">
                  <span className="p-1 rounded bg-red-950 text-red-400 mt-0.5"><FaClock className="text-xs" /></span>
                  <span>Hours lost on ineffective prompts and trial-and-error</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-400">
                  <span className="p-1 rounded bg-red-950 text-red-400 mt-0.5"><FaShieldAlt className="text-xs" /></span>
                  <span>Unintentional exposure of sensitive company data</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-400">
                  <span className="p-1 rounded bg-red-950 text-red-400 mt-0.5"><FaExclamationTriangle className="text-xs" /></span>
                  <span>Unchecked hallucinated facts and inconsistent work quality</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Solution Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-2xl bg-gradient-to-b from-purple-950/40 via-neutral-900 to-neutral-900 border border-brandPurple/30 flex flex-col justify-between relative overflow-hidden shadow-xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brandPurple/15 rounded-full filter blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-brandPurple/20 text-brandPurple border border-brandPurple/30">
                  <FaLightbulb className="text-xl" />
                </div>
                <h3 className="text-xl font-bold text-white">The Khrien Advantage</h3>
              </div>

              <p className="text-gray-200 text-base leading-relaxed mb-6 font-medium">
                Khrien Academy closes that gap. We give your staff a clear, practical understanding of AI so they can save time, produce better work, and make smarter decisions—with confidence and with the right safeguards in place.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-sm text-gray-300">
                  <span className="p-1 rounded bg-brandPurple/30 text-purple-300 mt-0.5"><FaCheck className="text-xs" /></span>
                  <span>Clear prompt frameworks for reliable, high-quality results</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-300">
                  <span className="p-1 rounded bg-brandPurple/30 text-purple-300 mt-0.5"><FaCheck className="text-xs" /></span>
                  <span>Responsible AI protocols that keep company data safe</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-300">
                  <span className="p-1 rounded bg-brandPurple/30 text-purple-300 mt-0.5"><FaCheck className="text-xs" /></span>
                  <span>Repeatable daily AI workflows tailored to your company</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
