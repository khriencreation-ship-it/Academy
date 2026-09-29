"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaFileAlt, FaMoneyBillWave, FaCreditCard, FaClipboardCheck, FaCheck, FaArrowRight } from "react-icons/fa";

const steps = [
    {
        num: "01",
        title: "Fill out application form",
        desc: "Complete the online application form with your details and preferred course(s).",
        icon: FaFileAlt,
    },
    {
        num: "02",
        title: "Pay application fee",
        desc: "Pay your one-time, non-refundable application fee of ₦2,000.",
        icon: FaMoneyBillWave,
    },
    {
        num: "03",
        title: "Pay your tuition",
        desc: "Pay in full (to lock early-bird pricing) or choose split payment (at standard pricing).",
        icon: FaCreditCard,
    },
    {
        num: "04",
        title: "Take a placement check",
        desc: "Take a short placement check — not a pass/fail test, just a way for your tutor to know where to start with you.",
        icon: FaClipboardCheck,
    },
    {
        num: "05",
        title: "You're in!",
        desc: "Access your cohort portal and prepare for your first class.",
        icon: FaCheck,
    },
];

const CatalystHowToApply = () => {
    return (
        <section className="py-16 md:py-24 px-4 md:px-6 bg-neutral-950 text-white border-t border-neutral-900">
            <div className="max-w-[1440px] mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                    <span className="text-xs md:text-sm font-semibold text-brandPurple uppercase tracking-widest block mb-2">
                        Simple Step-by-Step
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight mb-4">
                        How to Apply
                    </h2>
                    <p className="text-base md:text-lg text-white/70 leading-relaxed">
                        Getting started with the Catalyst Cohort is simple and straightforward.
                    </p>
                </div>

                {/* Steps List */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-6xl mx-auto mb-16">
                    {steps.map((step, idx) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col justify-between hover:border-brandPurple/60 transition-all duration-300 relative group"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs font-bold text-brandPurple bg-brandPurple/10 px-2.5 py-1 rounded-full border border-brandPurple/30">
                                            Step {step.num}
                                        </span>
                                        <div className="p-2.5 rounded-xl bg-neutral-800 text-brandPurple text-lg group-hover:bg-brandPurple group-hover:text-white transition-colors">
                                            <Icon />
                                        </div>
                                    </div>

                                    <h3 className="text-base font-semibold text-white mb-2">
                                        {step.title}
                                    </h3>

                                    <p className="text-xs text-neutral-400 leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="text-center">
                    <Link
                        href="/apply"
                        className="inline-flex items-center gap-3 bg-brandPurple text-white font-semibold text-base sm:text-lg px-9 py-4 rounded-full hover:bg-brandPurple/90 transition-all duration-300 shadow-xl shadow-purple-900/40"
                    >
                        <span>Apply Now</span>
                        <FaArrowRight className="text-sm" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CatalystHowToApply;
