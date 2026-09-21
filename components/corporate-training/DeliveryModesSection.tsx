"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaLaptop, FaBuilding, FaCheck } from "react-icons/fa";

export default function DeliveryModesSection() {
  return (
    <section className="py-20 lg:py-28 bg-white text-gray-900 border-t border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-wider text-brandPurple mb-3 block"
          >
            Flexible Learning Formats
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4"
          >
            Delivered Your Way
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600"
          >
            Choose the delivery mode that best aligns with your team&apos;s structure, location, and preferred workflow.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Virtual Training */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 sm:p-10 rounded-3xl bg-gray-50 border-2 border-gray-200/80 hover:border-brandPurple hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="w-16 h-16 rounded-2xl bg-purple-100 text-brandPurple flex items-center justify-center mb-8 text-2xl group-hover:scale-110 transition-transform">
                <FaLaptop />
              </div>

              <div className="inline-block px-3 py-1 rounded-md bg-purple-50 text-brandPurple text-xs font-bold uppercase tracking-wider mb-3">
                Virtual & Remote
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Virtual Training
              </h3>

              <p className="text-gray-600 text-base leading-relaxed mb-6">
                Live, instructor-led sessions online. Your team joins from anywhere, which makes it ideal for remote teams, multiple locations, and tight schedules.
              </p>

              <ul className="space-y-3 pt-2 text-sm text-gray-700">
                <li className="flex items-center gap-2.5">
                  <span className="p-1 rounded-full bg-purple-100 text-brandPurple"><FaCheck className="text-xs" /></span>
                  Interactive screen shares & live Q&A
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="p-1 rounded-full bg-purple-100 text-brandPurple"><FaCheck className="text-xs" /></span>
                  No location or travel fees required
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="p-1 rounded-full bg-purple-100 text-brandPurple"><FaCheck className="text-xs" /></span>
                  Session recordings provided for reference
                </li>
              </ul>
            </div>
          </motion.div>

          {/* On-Site Training */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="p-8 sm:p-10 rounded-3xl bg-neutral-900 text-white border-2 border-neutral-800 hover:border-brandPurple hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="w-16 h-16 rounded-2xl bg-brandPurple/20 text-purple-400 flex items-center justify-center mb-8 text-2xl group-hover:scale-110 transition-transform">
                <FaBuilding />
              </div>

              <div className="inline-block px-3 py-1 rounded-md bg-brandPurple/20 text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
                In-Person at Your Venue
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                Training at Your Office
              </h3>

              <p className="text-gray-300 text-base leading-relaxed mb-6">
                We come to you. Your whole team learns together in your own space, with hands-on practice and direct facilitation.
              </p>

              <ul className="space-y-3 pt-2 text-sm text-gray-300">
                <li className="flex items-center gap-2.5">
                  <span className="p-1 rounded-full bg-purple-950 text-purple-400"><FaCheck className="text-xs" /></span>
                  Direct face-to-face team collaboration
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="p-1 rounded-full bg-purple-950 text-purple-400"><FaCheck className="text-xs" /></span>
                  Tailored live group exercises in your workplace
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="p-1 rounded-full bg-purple-950 text-purple-400"><FaCheck className="text-xs" /></span>
                  Dedicated instructor facilitation & feedback
                </li>
              </ul>
            </div>
          </motion.div>

        </div>

        {/* Footer Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-base sm:text-lg font-semibold text-gray-700">
            Same curriculum. Same hands-on approach. <span className="text-brandPurple">You choose what works best for your team.</span>
          </p>
        </motion.div>

      </div>
    </section>
  );
}
