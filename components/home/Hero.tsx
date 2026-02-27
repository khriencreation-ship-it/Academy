"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

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

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const imageSlider = [
        {
            image: '/hero-section/image-one.jpg',
            alt: 'Hero Image 1',
        },
        {
            image: '/hero-section/image-two.jpg',
            alt: 'Hero Image 2',
        },
        {
            image: '/hero-section/image-three.jpg',
            alt: 'Hero Image 3',
        },
        {
            image: '/hero-section/image-four.jpg',
            alt: 'Hero Image 4',
        },
        {
            image: '/hero-section/image-five.jpg',
            alt: 'Hero Image 5',
        },
        {
            image: '/hero-section/image-six.jpg',
            alt: 'Hero Image 6',
        },
        {
            image: '/hero-section/image-seven.jpg',
            alt: 'Hero Image 7',
        },
    ];

    // Auto-slide every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === imageSlider.length - 1 ? 0 : prevIndex + 1
            );
        }, 2000);

        return () => clearInterval(interval);
    }, [imageSlider.length]);

    return (
        <div className="bg-black">
            <section className="max-w-360 mx-auto relative flex items-center justify-center h-[85vh] sm:h-screen overflow-hidden sm:mx-0 rounded-3xl">
                {/* Image Carousel */}
                {imageSlider.map((image, index) => (
                    <motion.div
                        key={image.image}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: currentIndex === index ? 0.8 : 0 }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={image.image}
                            alt={image.alt}
                            fill
                            priority={index === 0}
                            className="w-full h-full object-cover"
                            sizes="100vw"
                        />
                    </motion.div>
                ))}
                <div className="absolute inset-0 bg-black/20" />

                {/* contents */}
                <motion.div
                    className="text-center relative z-10 px-4 sm:px-6"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Headline */}
                    <motion.h1
                        variants={fadeInUp}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight mb-3 sm:mb-4 md:mb-6 text-white/80 leading-tight"
                    >
                        Learn the Skills Shaping the Future.
                    </motion.h1>

                    {/* Supporting Copy */}
                    <motion.div
                        variants={fadeInUp}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="max-w-4xl mx-auto mb-6 sm:mb-8 md:mb-10"
                    >
                        <p className="text-base md:text-lg lg:text-xl text-white/80 leading-relaxed px-1">
                            Khrien Academy is a modern learning institution focused on helping individuals build relevant, practical skills through structured programs, live instruction, and hands-on application.
                        </p>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        variants={fadeInUp}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4"
                    >
                        <div className="flex justify-center mt-6">
                            <Link
                                href="/apply"
                                className="relative inline-block overflow-hidden rounded-sm bg-brandPurple px-6 md:px-8 lg:px-10 py-2.5 md:py-3 text-sm md:text-base lg:text-lg font-semibold group"
                            >
                                {/* Default Text */}
                                <span className="block text-white transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0">
                                    Apply Now
                                </span>

                                {/* Hover Text */}
                                <span className="absolute inset-0 flex items-center justify-center text-brandPurple bg-white transition-all duration-300 translate-y-full group-hover:translate-y-0">
                                    Apply Now
                                </span>
                            </Link>
                        </div>
                        <p className="text-sm text-white/60 font-medium">
                            Applications now open • Limited cohort size
                        </p>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
};

export default Hero;
