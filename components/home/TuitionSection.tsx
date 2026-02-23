import React from "react";
import Link from "next/link";

import Image from "next/image";
const TuitionSection = () => {
    return (
        <section className="bg-white py-8 md:py-12 lg:py-16 relative overflow-hidden">
            <div className="max-w-360 mx-auto relative z-20 px-4 md:px-0">
                {/* Background lines - hidden on mobile */}
                <div className="hidden md:block absolute top-0 bottom-20 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
                    <Image
                        src="/lines/bg-line-center.webp"
                        className="w-200 max-w-none"
                        alt="Background lines"
                        width={1000}
                        height={1000}
                    />
                </div>

                {/* Content - Mobile: single column, Desktop: two columns */}
                <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-0">
                    {/* Left Column */}
                    <div className="flex flex-col gap-6 md:gap-10 items-center md:items-end">
                        <div className="relative w-full max-w-72 h-64 sm:h-72 md:w-75 md:h-75">
                            <Image
                                src="/home/imageTwo.jpg"
                                alt="Learning"
                                fill
                                className="border border-brandGreen rounded-lg object-cover shadow-[0_0_1px_#22c55e,0_0_5px_#22c55e]"
                            />
                        </div>
                        <div className="relative w-full max-w-80 h-16 sm:h-20 md:w-87.5 md:h-17.5 md:mr-12">
                            <Image
                                src="/home/live-class.png"
                                alt="Live Class"
                                fill
                                className="shadow-lg rounded-lg object-contain"
                            />
                        </div>
                    </div>
                    {/* Right Column */}
                    <div className="flex flex-col-reverse md:flex-col gap-6 md:gap-10 justify-end items-center md:items-start">
                        <div className="relative w-full max-w-80 h-16 sm:h-20 md:w-87.5 md:h-17.5">
                            <Image
                                src="/home/quiz.png"
                                alt="Quiz"
                                fill
                                className="shadow-lg rounded-lg object-contain"
                            />
                        </div>
                        <div className="relative w-full max-w-72 h-64 sm:h-64 md:w-62.5 md:h-62.5 md:mx-6">
                            <Image
                                src="/home/imageOne.jpg"
                                alt="Study"
                                fill
                                className="object-cover border border-brandPurple rounded-lg shadow-[0_0_1px_#934ab3,0_0_5px_#934ab3]"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-4xl mx-auto mt-6 sm:mt-8 md:mt-12 lg:mt-28 px-4 md:px-0">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center leading-tight">
                    Our programs are carefully designed to help learners not just consume information.
                </h2>
                <div className="flex justify-center mt-6">
                    <Link
                        href="/about"
                        className="relative inline-block overflow-hidden rounded-sm bg-brandPurple px-6 md:px-8 lg:px-10 py-2.5 md:py-3 text-sm md:text-base lg:text-lg font-semibold group"
                    >
                        {/* Default Text */}
                        <span className="block text-white transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0">
                            Apply Now
                        </span>

                        {/* Hover Text */}
                        <span className="absolute inset-0 flex items-center justify-center text-white bg-brandGreen transition-all duration-300 translate-y-full group-hover:translate-y-0">
                            Apply Now
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default TuitionSection;
