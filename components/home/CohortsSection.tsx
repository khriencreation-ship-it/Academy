"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BiMoney } from 'react-icons/bi'
import { SlCalender } from 'react-icons/sl'
import { motion } from 'framer-motion'

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
};

const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
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

const CohortsSection = () => {
    return (
        <section className='bg-white py-12 md:py-16 lg:py-20 px-4 md:px-8'>
            <div className="max-w-360 mx-auto">
                {/* Header */}
                <motion.div
                    className="text-center mb-10 md:mb-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-4 text-black tracking-tight">
                        Join Our Cohort
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
                        Start your learning journey with a community of peers
                    </p>
                </motion.div>

                {/* Cohort Card */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">
                    {/* Text Content */}
                    <motion.div
                        className="space-y-6"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                    >
                        <motion.h3
                            className="text-3xl sm:text-4xl md:text-5xl font-normal text-brandPurple tracking-tight"
                            variants={fadeInLeft}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            The Genesis Cohort
                        </motion.h3>
                        <motion.p
                            className="text-base md:text-lg text-gray-700 leading-relaxed"
                            variants={fadeInUp}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            The Genesis Cohort marks the beginning of Khrien Academy, a focused, intentional learning experience designed to build strong foundations and real confidence.
                        </motion.p>
                        <motion.div
                            className="space-y-3"
                            variants={staggerContainer}
                        >
                            <motion.div
                                className="flex items-center gap-3"
                                variants={fadeInUp}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                <span className="text-2xl"><SlCalender /></span>
                                <div>
                                    <p className="text-sm font-semibold text-gray-600">Program Dates</p>
                                    <p className="text-lg font-normal text-black">April 5 -  May 29</p>
                                </div>
                            </motion.div>
                            <motion.div
                                className="flex items-center gap-3"
                                variants={fadeInUp}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                <span className="text-2xl"><BiMoney /></span>
                                <div>
                                    <p className="text-sm font-semibold text-gray-600">Tuition Fee</p>
                                    <p className="text-lg font-normal text-black">Scholarship Based</p>
                                </div>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            className="flex justify-start mt-6"
                            variants={fadeInUp}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <Link
                                href="/apply"
                                className="relative inline-block overflow-hidden rounded-sm bg-brandPurple px-6 md:px-8 lg:px-10 py-2.5 md:py-3 text-sm md:text-base lg:text-lg font-semibold group"
                            >
                                {/* Default Text */}
                                <span className="block text-white transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0">
                                    Apply Now
                                </span>

                                {/* Hover Text */}
                                <span className="absolute inset-0 flex items-center justify-center text-white bg-brandPurple transition-all duration-300 translate-y-full group-hover:translate-y-0">
                                    Apply Now
                                </span>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        className="relative w-full h-64 sm:h-80 md:h-96 lg:h-125 overflow-hidden shadow-lg"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeInRight}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <Image
                            src='/hero-section/image-one.jpg'
                            fill
                            alt='The Genesis Cohort - Students learning together'
                            className="object-cover"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default CohortsSection
