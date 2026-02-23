"use client"
import React from 'react'
import Image from 'next/image'
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

const MissionAndVision = () => {
    return (
        <div className="bg-white py-8 sm:py-12 md:py-16">
            <section className="max-w-360 mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

                    {/* Text Column - Mission */}
                    <motion.div
                        className="text-black space-y-4 sm:space-y-6 text-center md:text-left"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeInLeft}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                            Our Mission
                        </h2>

                        <p className="text-base sm:text-lg text-black/80 leading-relaxed max-w-lg mx-auto md:mx-0">
                            To provide high-quality, accessible education that empowers learners
                            to grow, adapt, and build confidently in a changing world.
                        </p>
                    </motion.div>

                    {/* Image Column - Mission */}
                    <motion.div
                        className="relative w-full h-64 sm:h-80 md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeInRight}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <Image
                            src="/about-us/image-one.jpg"
                            alt="Mission"
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Image Column - Vision */}
                    <motion.div
                        className="order-2 md:order-1 relative w-full h-64 sm:h-80 md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeInLeft}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <Image
                            src="/about-us/image-two.jpg"
                            alt="Vision"
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Text Column - Vision */}
                    <motion.div
                        className="order-1 md:order-2 text-black space-y-4 sm:space-y-6 text-center md:text-left"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeInRight}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                            Our Vision
                        </h2>

                        <p className="text-base sm:text-lg text-black/80 leading-relaxed max-w-lg mx-auto md:mx-0">
                            To be a trusted institution that cultivates innovation, confidence, and excellence in every learner.
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default MissionAndVision
