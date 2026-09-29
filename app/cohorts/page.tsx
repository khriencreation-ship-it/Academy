import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaBrain, FaRocket, FaCheckCircle, FaGraduationCap } from "react-icons/fa";

export const metadata = {
    title: 'Cohorts & Courses | Khrien Academy',
    description: 'Explore active and upcoming cohorts at Khrien Academy: Catalyst Cohort and Genesis Cohort.',
};

export default function CohortsPage() {
    return (
        <main className="bg-black text-white min-h-screen pt-24 pb-20">
            {/* Header / Hero */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center pt-8 pb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brandPurple/20 border border-brandPurple/40 text-brandPurple text-xs md:text-sm font-semibold uppercase tracking-wider mb-6">
                    <FaGraduationCap className="text-sm" />
                    Khrien Academy Programs
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-6 leading-tight">
                    Structured Learning. <br className="hidden sm:inline" /> Real Impact.
                </h1>
                <p className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
                    Our cohort-based programs are designed to build practical capability, from core foundational principles to advanced automation and autonomous agents.
                </p>
            </section>

            {/* Cohorts Grid */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    
                    {/* Catalyst Cohort Card (First) */}
                    <div className="bg-neutral-950 border border-brandPurple/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-brandPurple transition-all duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brandPurple/20 rounded-full blur-3xl group-hover:bg-brandPurple/30 transition-all"></div>

                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div className="p-3 rounded-2xl bg-brandPurple/20 border border-brandPurple/40 text-brandPurple text-2xl">
                                    <FaRocket />
                                </div>
                                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brandPurple text-white">
                                    Current Cohort
                                </span>
                            </div>

                            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3">
                                The Catalyst Cohort
                            </h2>

                            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-6">
                                6 courses. Real skills. Built for where you're headed. Whether you're picking up a new skill from scratch or sharpening one you already have.
                            </p>

                            <div className="bg-neutral-900/80 rounded-2xl p-5 mb-8 border border-neutral-850 space-y-3">
                                <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-300">
                                    <FaCheckCircle className="text-brandPurple shrink-0" />
                                    <span>AI Foundations & Practical Intelligence</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-300">
                                    <FaCheckCircle className="text-brandPurple shrink-0" />
                                    <span>UI/UX Design & WordPress Development</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-300">
                                    <FaCheckCircle className="text-brandPurple shrink-0" />
                                    <span>Product Management, Frontend & Operations</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Link
                                href="/cohorts/catalyst"
                                className="flex items-center justify-between w-full bg-brandPurple text-white font-semibold px-6 py-3.5 rounded-2xl hover:bg-brandPurple/90 transition-all duration-300 group/btn shadow-lg shadow-purple-900/30"
                            >
                                <span>Explore Catalyst Cohort</span>
                                <FaArrowRight className="text-sm group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Genesis Cohort Card (Second) */}
                    <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-neutral-700 transition-all duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brandPurple/10 rounded-full blur-3xl group-hover:bg-brandPurple/20 transition-all"></div>
                        
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-400 text-2xl">
                                    <FaBrain />
                                </div>
                                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-neutral-800 text-neutral-300">
                                    Ended
                                </span>
                            </div>

                            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3">
                                The Genesis Cohort
                            </h2>

                            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-6">
                                The inaugural cohort of Khrien Academy. A focused experience crafted to build strong foundations, practical intelligence, and confidence with modern AI tools.
                            </p>

                            <div className="bg-neutral-900/80 rounded-2xl p-5 mb-8 border border-neutral-850 space-y-3">
                                <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-400">
                                    <FaCheckCircle className="text-neutral-500 shrink-0" />
                                    <span>AI Foundations & Practical Intelligence</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-400">
                                    <FaCheckCircle className="text-neutral-500 shrink-0" />
                                    <span>Google Gemini, Claude & NotebookLM Research</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-400">
                                    <FaCheckCircle className="text-neutral-500 shrink-0" />
                                    <span>AI Ethics, Visual Design & Work Acceleration</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Link
                                href="/cohorts/genesis"
                                className="flex items-center justify-between w-full bg-neutral-800 text-white font-semibold px-6 py-3.5 rounded-2xl hover:bg-neutral-700 transition-all duration-300 group/btn"
                            >
                                <span>View Genesis Cohort Archive</span>
                                <FaArrowRight className="text-sm group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}
