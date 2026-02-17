import React from "react";
import Link from "next/link";

const Hero = () => {
    return (
        <section className="bg-white text-black py-20 px-6 md:px-12 lg:px-24 flex flex-col items-center text-center">
            <div className="max-w-4xl">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                    Learn the Skills Shaping the Future.
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto">
                    Explore our courses and the cohorts currently open for application.
                </p>

                <div className="flex flex-col items-center gap-4">
                    <Link
                        href="/apply"
                        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200 text-lg"
                    >
                        Apply to Learn
                    </Link>
                    <p className="text-sm text-gray-500 font-medium">
                        Limited cohort size • Structured learning experience
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
