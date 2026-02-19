import React from "react";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
    return (
        <section className="relative flex items-center justify-center min-h-screen bg-white px-4 md:px-8 lg:px-12 py-24 md:py-32">
            <div className="absolute top-0 left-0 w-full h-full">
                <Image src="/study-group.jpg" alt="Hero Image" fill className="object-cover" />
                <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>
            </div>
            <div className="max-w-4xl mx-auto text-center pt-16 md:pt-20 relative z-10">
                {/* Headline */}
                <h1 className="text-base md:text-lg lg:text-2xl font-normal tracking-tight mb-4 md:mb-6 text-white/80 leading-tight">
                    Learn the Skills Shaping the Future.
                </h1>

                {/* Subheadline */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 md:mb-8 tracking-tight leading-tight">
                    Practical learning for a changing world.
                </h2>

                {/* Supporting Copy */}
                <div className="max-w-3xl mx-auto mb-8 md:mb-10">
                    <p className="text-base md:text-lg lg:text-xl text-white/80 leading-relaxed">
                        Khrien Academy is a modern learning institution focused on helping individuals build relevant, practical skills through structured programs, live instruction, and hands-on application.
                        We believe education should be intentional, clear, and empowering — designed to help learners grow with confidence.
                    </p>
                </div>

                {/* CTA */}
                <div className="flex flex-col items-center gap-3 md:gap-4">
                    <Link
                        href="/apply"
                        className="text-center rounded-full text-white font-semibold bg-brandPurple px-8 md:px-10 py-2.5 md:py-3 hover:opacity-90 transition-all duration-300 text-base md:text-lg"
                    >
                        Join the Academy
                    </Link>
                    <p className="text-xs md:text-sm text-white/60 font-medium">
                        Applications now open • Limited cohort size
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
