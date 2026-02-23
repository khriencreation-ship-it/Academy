"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

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

    // Auto-slide every 1 second
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === imageSlider.length - 1 ? 0 : prevIndex + 1
            );
        }, 2000);

        return () => clearInterval(interval);
    }, [imageSlider.length]);

    return (
        <div className="bg-black pt-16 sm:pt-20">
            <section className="max-w-360 mx-auto relative flex items-center justify-center h-[85vh] sm:h-screen overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl mx-2 sm:mx-0">
                {/* Image Carousel */}
                {imageSlider.map((image, index) => (
                    <motion.div
                        key={image.image}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: currentIndex === index ? 0.8 : 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
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
                <div className="text-center relative z-10 px-4 sm:px-6">
                    {/* Headline */}
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight mb-3 sm:mb-4 md:mb-6 text-white/80 leading-tight">
                        Learn the Skills Shaping the Future.
                    </h1>

                    {/* Supporting Copy */}
                    <div className="max-w-4xl mx-auto mb-6 sm:mb-8 md:mb-10">
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 leading-relaxed px-2">
                            Khrien Academy is a modern learning institution focused on helping individuals build relevant, practical skills through structured programs, live instruction, and hands-on application.
                        </p>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4">
                        <Link
                            href="/apply"
                            className="text-center rounded-full text-white font-semibold bg-brandPurple px-6 sm:px-8 md:px-10 py-2 sm:py-2.5 md:py-3 hover:opacity-90 transition-all duration-300 text-sm sm:text-base md:text-lg"
                        >
                            Apply Now
                        </Link>
                        <p className="text-xs md:text-sm text-white/60 font-medium">
                            Applications now open • Limited cohort size
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Hero;
