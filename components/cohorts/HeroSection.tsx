"use client"
import React from 'react'
import Image from 'next/image'
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
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};

const HeroSection = () => {
    return (
        <div className="pt-16 sm:pt-20 px-2 sm:px-4 md:px-10 bg-black pb-8 sm:pb-12 md:pb-20">
            <section className="relative h-[70vh] sm:h-[80vh] md:h-screen w-full overflow-hidden">
                <Image
                    src="/cohorts/image-one.jpg"
                    alt="Hero"
                    fill
                    priority
                    className="object-cover rounded-xl sm:rounded-2xl md:rounded-3xl"
                />

                <div className="absolute inset-0 bg-black/50 rounded-xl sm:rounded-2xl md:rounded-3xl"></div>
                <motion.div
                    className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 sm:px-6"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-white leading-tight mb-4 sm:mb-6"
                        variants={fadeInUp}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        The Genesis Cohort.
                    </motion.h1>
                    <motion.p
                        className="text-sm sm:text-base text-white/80 leading-relaxed max-w-3xl mx-auto px-2"
                        variants={fadeInUp}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    >
                        The Genesis Cohort marks the beginning of Khrien Academy, a focused and intentional learning experience crafted to build strong foundations, practical skills, and real confidence for the future.
                    </motion.p>
                </motion.div>
            </section>
        </div>
    )
}

export default HeroSection
