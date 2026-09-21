"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaBuilding, FaArrowRight, FaCheckCircle, FaUsers, FaLaptopHouse } from "react-icons/fa";

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-black text-white pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background ambient lighting & grid patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(147,74,179,0.25),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(46,183,129,0.15),transparent_50%)] pointer-events-none" />
      
      <Image
        src="/lines/bg-line-left.webp"
        alt=""
        width={600}
        height={600}
        className="absolute top-0 left-0 z-0 opacity-40 pointer-events-none"
      />
      <Image
        src="/lines/bg-line-right.webp"
        alt=""
        width={600}
        height={600}
        className="hidden md:block absolute top-0 right-0 z-0 opacity-40 pointer-events-none"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brandPurple/20 border border-brandPurple/40 text-brandPurple font-semibold text-xs sm:text-sm tracking-wide uppercase mb-6"
          >
            <FaBuilding className="text-sm" />
            <span>For Organisations</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            Train Your Team to <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-purple-400 via-brandPurple to-emerald-400 bg-clip-text text-transparent">
              Work Smarter with AI
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10 font-normal"
          >
            Practical, hands-on AI training that helps your staff use AI confidently in their daily work, from writing better prompts to building AI into real workflows.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8"
          >
            <button
              onClick={() => scrollToSection("enquiry-form")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-brandPurple hover:bg-brandPurple/90 text-white font-semibold text-base sm:text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-brandPurple/30 transition-all duration-200 group"
            >
              Book Your Team Training
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-900/80 hover:bg-neutral-800 text-white border border-neutral-700 font-medium text-base sm:text-lg px-7 py-4 rounded-lg transition-all duration-200"
            >
              See Pricing
            </button>
          </motion.div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm sm:text-base text-gray-400 italic flex items-center justify-center gap-2"
          >
            <FaLaptopHouse className="text-brandPurple" />
            <span>Delivered virtually or at your office.</span>
          </motion.p>

          {/* Proof indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-14 pt-8 border-t border-neutral-800/80 grid grid-cols-2 md:grid-cols-3 gap-6 text-left max-w-3xl mx-auto"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-purple-950/60 border border-purple-800/40 text-purple-400">
                <FaCheckCircle className="text-xl" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">130+ Certified</p>
                <p className="text-xs text-gray-400">Proven curriculum</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-emerald-400">
                <FaUsers className="text-xl" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Tailored for Teams</p>
                <p className="text-xs text-gray-400">Customized to your roles</p>
              </div>
            </div>
            <div className="col-span-2 md:col-span-1 flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-amber-950/60 border border-amber-800/40 text-amber-400">
                <FaLaptopHouse className="text-xl" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Flexible Format</p>
                <p className="text-xs text-gray-400">Virtual or In-Person</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
