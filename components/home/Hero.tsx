import React from "react";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
    return (
        <section className=" flex items-center justify-center min-h-screen w-screen bg-black ">
            <div className="max-w-360 mx-auto text-center pt-16 md:pt-20 relative z-10">
                {/* Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight mb-4 md:mb-6 text-white/80 leading-tight">
                    Learn the Skills Shaping the Future.
                </h1>

                {/* Supporting Copy */}
                <div className="max-w-4xl mx-auto mb-8 md:mb-10">
                    <p className="text-base md:text-lg lg:text-xl text-white/80 leading-relaxed">
                        Khrien Academy is a modern learning institution focused on helping individuals build relevant, practical skills through structured programs, live instruction, and hands-on application.
                    </p>
                </div>

                {/* CTA */}
                <div className="flex flex-col items-center gap-3 md:gap-4">
                    <Link
                        href="/apply"
                        className="text-center rounded-full text-white font-semibold bg-brandPurple px-8 md:px-10 py-2.5 md:py-3 hover:opacity-90 transition-all duration-300 text-base md:text-lg"
                    >
                        Apply Now
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
