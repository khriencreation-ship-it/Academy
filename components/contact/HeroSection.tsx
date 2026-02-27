"use client"
import React from 'react'
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
        <div className="pt-16 sm:pt-20 bg-black pb-8 sm:pb-12 md:pb-16">
            <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] w-full overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-brandPurple/20 to-brandGreen/10"></div>

                <motion.div
                    className="relative z-10 text-center px-4 sm:px-6"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-4 sm:mb-6"
                        variants={fadeInUp}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        Get In <span className="text-brandPurple">Touch</span>
                    </motion.h1>
                    <motion.p
                        className="text-base md:text-lg lg:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto"
                        variants={fadeInUp}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    >
                        Have questions? We'd love to hear from you. Reach out to us through any of the channels below.
                    </motion.p>
                </motion.div>
            </section>
        </div>
    )
}

export default HeroSection
