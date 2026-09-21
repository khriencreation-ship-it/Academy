"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";

const faqs = [
  {
    q: "Does my team need any technical background?",
    a: "No. The training is designed for non-technical staff and starts from the basics.",
  },
  {
    q: "Can the training be customised to our industry?",
    a: "Yes. We adapt examples and exercises to your industry and the roles in your team.",
  },
  {
    q: "Can we choose between virtual and in-person training?",
    a: "Yes. We deliver both. Virtual sessions run live online, and in-person sessions are held at your office.",
  },
  {
    q: "How long does the training take?",
    a: "Programme length depends on your team size and goals. We confirm the schedule with you when you book.",
  },
  {
    q: "Can we train just one person?",
    a: "Yes. Individual pricing is available for a single staff member.",
  },
  {
    q: "How do we get started?",
    a: 'Click "Book Your Team Training," tell us about your team, and we will get back to you to plan the programme.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 lg:py-28 bg-white text-gray-900 border-t border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-brandPurple text-xs font-semibold uppercase tracking-wider mb-3"
          >
            <FaQuestionCircle className="text-sm" />
            <span>Got Questions?</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600"
          >
            Everything you need to know about our corporate AI training programs.
          </motion.p>
        </div>

        {/* Accordion Container */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-brandPurple/40 bg-purple-50/40 shadow-md"
                    : "border-gray-200 bg-gray-50/60 hover:bg-gray-50 hover:border-gray-300"
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 font-semibold text-gray-900 text-lg sm:text-xl"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <div className={`p-2 rounded-full transition-transform duration-200 ${
                    isOpen ? "bg-brandPurple text-white rotate-180" : "bg-gray-200 text-gray-600"
                  }`}>
                    <FaChevronDown className="text-sm" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-6 pt-0 text-gray-600 text-base leading-relaxed border-t border-purple-100/60 mt-2 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
