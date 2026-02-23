"use client"
import React from 'react'
import { PiTreeStructure } from "react-icons/pi";
import { MdCoPresent } from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";
import { motion } from 'framer-motion'

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const beliefs = [
    { icon: PiTreeStructure, label: 'Structured', sub: 'not overwhelming' },
    { icon: MdCoPresent, label: 'Practical', sub: 'not abstract' },
    { icon: TbTargetArrow, label: 'Purpose-driven', sub: 'not trend-chasing' },
]

const BelieveSection = () => {
    return (
        <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 max-w-360 mx-auto">
            <div className="mx-auto">
                <motion.h2
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-black tracking-tight text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    We believe learning should be
                </motion.h2>
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                >
                    {beliefs.map(({ label, sub, icon }) => {
                        const IconComponent = icon;
                        return (
                            <motion.div
                                key={label}
                                className="bg-white rounded-xl md:rounded-2xl p-5 sm:p-6 md:p-8 border border-gray-200 hover:shadow-lg hover:border-brandPurple transition-all duration-300"
                                variants={fadeInUp}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <IconComponent className="text-brandPurple text-xl sm:text-2xl md:text-3xl" />
                                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-black">{label}</p>
                                </div>
                                <p className="text-sm sm:text-base md:text-lg text-gray-500">{sub}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
                <motion.p
                    className="text-center text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mt-6 sm:mt-8 md:mt-10 lg:mt-12 leading-relaxed max-w-3xl mx-auto px-2"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                >
                    Our goal is to help learners move from understanding concepts to applying skills with
                    confidence and clarity.
                </motion.p>
            </div>
        </section>
    )
}

export default BelieveSection
