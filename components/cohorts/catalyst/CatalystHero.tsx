"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaRocket, FaArrowRight, FaBookOpen } from "react-icons/fa";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};

const CatalystHero = () => {
    return (
        <div className="pt-16 sm:pt-20 px-2 sm:px-4 md:px-10 pb-8 sm:pb-12 md:pb-16">
            <section className="relative min-h-[75vh] sm:min-h-[80vh] w-full overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl border border-neutral-800 flex items-center justify-center">
                <Image
                    src="/Untitled-2.jpg"
                    alt="Catalyst Cohort"
                    fill
                    priority
                    className="object-cover"
                />

                {/* Dark Overlay with Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50"></div>

                <motion.div
                    className="relative z-10 flex flex-col justify-center items-center text-center px-4 sm:px-6 py-16 max-w-5xl mx-auto"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        variants={fadeInUp}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brandPurple/20 border border-brandPurple/40 text-brandPurple text-xs md:text-sm font-semibold tracking-wide uppercase mb-6"
                    >
                        <FaRocket className="text-xs" />
                        The Catalyst Cohort
                    </motion.div>

                    <motion.h1
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight mb-4 sm:mb-6"
                        variants={fadeInUp}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        Welcome to the Catalyst Cohort
                    </motion.h1>

                    <motion.p
                        className="text-lg sm:text-xl md:text-2xl font-medium text-brandPurple mb-6"
                        variants={fadeInUp}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                    >
                        6 courses. Real skills. Built for where you're headed.
                    </motion.p>

                    <motion.p
                        className="text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl mx-auto px-2 mb-8"
                        variants={fadeInUp}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    >
                        The Catalyst Cohort is your starting point, or your next step. Whether you're picking up a new skill from scratch or sharpening one you already have, this cohort is built to move you forward.
                    </motion.p>

                    <motion.div
                        variants={fadeInUp}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Link
                            href="/apply"
                            className="flex items-center gap-2 bg-brandPurple text-white font-semibold px-8 py-3.5 rounded-full hover:bg-brandPurple/90 transition-all duration-300 shadow-lg hover:shadow-purple-500/20 text-base"
                        >
                            Apply Now
                            <FaArrowRight className="text-sm" />
                        </Link>
                        <a
                            href="#courses"
                            className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 font-semibold px-8 py-3.5 rounded-full hover:bg-white/20 transition-all duration-300 text-base"
                        >
                            <FaBookOpen className="text-sm" />
                            Explore 6 Courses
                        </a>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
};

export default CatalystHero;
