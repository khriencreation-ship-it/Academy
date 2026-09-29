"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTag, FaCreditCard, FaArrowRight, FaCalendarAlt, FaInfoCircle } from "react-icons/fa";

const CatalystPricing = () => {
    return (
        <section id="pricing" className="bg-white text-black py-16 md:py-24 px-4 md:px-6">
            <div className="max-w-[1440px] mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
                    <span className="text-xs md:text-sm font-semibold text-brandPurple uppercase tracking-widest block mb-2">
                        Transparent Tuition
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black tracking-tight mb-4">
                        Pricing Options
                    </h2>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                        Apply early to get the lowest rate. Flexible plans available to suit your goals.
                    </p>
                </div>

                {/* 1. Standout Gold Application Fee Card (First) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-600/10 border-2 border-amber-400 rounded-3xl p-6 sm:p-8 text-black shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 mb-10 md:mb-12"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-4 rounded-2xl bg-amber-500 text-white text-2xl shrink-0 shadow-md">
                            <FaInfoCircle />
                        </div>
                        <div>
                            <div className="inline-block bg-amber-500/20 text-amber-900 border border-amber-300 text-xs font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1">
                                Application Fee
                            </div>
                            <h4 className="text-xl sm:text-2xl font-bold text-amber-950">
                                Non-Refundable Application Fee
                            </h4>
                            <p className="text-sm text-amber-900/90 leading-relaxed mt-1">
                                Every applicant pays a one-time application fee of <strong className="text-amber-950 font-bold">₦2,000</strong>, whether you take 1 course or 2.
                            </p>
                        </div>
                    </div>
                    <div className="shrink-0 text-center md:text-right bg-white/80 border border-amber-300 px-6 py-3 rounded-2xl shadow-sm">
                        <span className="text-xs uppercase tracking-wider font-extrabold text-amber-800 block">One-Time Fee</span>
                        <span className="text-3xl font-extrabold text-amber-950">₦2,000</span>
                    </div>
                </motion.div>

                {/* 2. Pricing Cards Grid (Early-Bird & Standard) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    
                    {/* Early-Bird Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white rounded-3xl p-8 border-2 border-brandPurple shadow-xl relative overflow-hidden flex flex-col justify-between"
                    >
                        <div className="absolute top-4 right-4 bg-brandPurple/10 text-brandPurple text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            Best Value
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 rounded-xl bg-purple-50 text-brandPurple text-xl">
                                    <FaTag />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-semibold text-black">Early-Bird Pricing</h3>
                                    <p className="text-xs text-brandPurple font-medium">Limited window offer</p>
                                </div>
                            </div>

                            {/* Duration Badge */}
                            <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-purple-900 bg-purple-50 border border-purple-200 px-3.5 py-2 rounded-xl mb-4">
                                <FaCalendarAlt className="text-brandPurple shrink-0 text-base" />
                                <span>Earlybird starts <strong>October 1</strong> & ends <strong>October 8</strong></span>
                            </div>

                            <div className="my-6 space-y-3">
                                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100 flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">1 Course</span>
                                    <span className="text-2xl font-bold text-black">₦8,000</span>
                                </div>
                                <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100 flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">Any 2 Courses</span>
                                    <span className="text-2xl font-bold text-brandPurple">₦15,000</span>
                                </div>
                            </div>

                            <ul className="space-y-3 mb-8 text-xs sm:text-sm text-gray-600">
                                <li className="flex items-start gap-2">
                                    <FaCheckCircle className="text-brandPurple mt-0.5 shrink-0" />
                                    <span>Full payment required to lock in early-bird pricing.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <FaCheckCircle className="text-brandPurple mt-0.5 shrink-0" />
                                    <span>Save up to ₦4,000 when enrolling early.</span>
                                </li>
                            </ul>
                        </div>

                        <Link
                            href="/apply"
                            className="flex items-center justify-center gap-2 w-full bg-brandPurple text-white font-semibold py-3.5 px-6 rounded-2xl hover:bg-brandPurple/90 transition-colors shadow-md"
                        >
                            <span>Lock Early-Bird Rate</span>
                            <FaArrowRight className="text-sm" />
                        </Link>
                    </motion.div>

                    {/* Standard Pricing Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white rounded-3xl p-8 border border-gray-200 shadow-md hover:border-gray-400 transition-all flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 rounded-xl bg-neutral-100 text-gray-700 text-xl">
                                    <FaCreditCard />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-semibold text-black">Standard Pricing</h3>
                                    <p className="text-xs text-gray-500 font-medium">Standard window offer</p>
                                </div>
                            </div>

                            {/* Standard Duration Info */}
                            <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-800 bg-neutral-100 border border-neutral-200 px-3.5 py-2 rounded-xl mb-4">
                                <FaCalendarAlt className="text-gray-600 shrink-0 text-base" />
                                <span>From <strong>October 9</strong> to <strong>October 24</strong></span>
                            </div>

                            <div className="my-6 space-y-3">
                                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100 flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">1 Course</span>
                                    <span className="text-2xl font-bold text-black">₦10,000</span>
                                </div>
                                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100 flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">Any 2 Courses</span>
                                    <span className="text-2xl font-bold text-black">₦18,000</span>
                                </div>
                            </div>

                            <ul className="space-y-3 mb-8 text-xs sm:text-sm text-gray-600">
                                <li className="flex items-start gap-2">
                                    <FaCheckCircle className="text-gray-400 mt-0.5 shrink-0" />
                                    <span>Split payment available: pay half at enrollment, the rest before your course ends.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <FaCheckCircle className="text-gray-400 mt-0.5 shrink-0" />
                                    <span>Flexibility to manage your tuition schedule.</span>
                                </li>
                            </ul>
                        </div>

                        <Link
                            href="/apply"
                            className="flex items-center justify-center gap-2 w-full bg-black text-white font-semibold py-3.5 px-6 rounded-2xl hover:bg-neutral-800 transition-colors"
                        >
                            <span>Apply with Standard Rate</span>
                            <FaArrowRight className="text-sm" />
                        </Link>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default CatalystPricing;
