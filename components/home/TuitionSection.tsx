import React from "react";
import Link from "next/link";

import Image from "next/image";
const TuitionSection = () => {
    return (
        <section className="bg-white py-16 relative overflow-hidden">
            <div className="max-w-360 mx-auto relative z-20">
                {/* Background lines */}
                <div className="absolute top-0 bottom-20  left-1/2 -translate-x-1/2 z-0  pointer-events-none">
                    <Image
                        src="/lines/bg-line-center.webp"
                        className="opacity-50 w-200 max-w-none"
                        alt="Background lines"
                        width={1000}
                        height={1000}
                    />
                </div>

                {/* Content */}
                <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-0">
                    {" "}
                    <div className="flex flex-col gap-10 items-end">
                        {" "}
                        <div className="relative w-75 h-75">
                            <Image
                                src="/home/imageTwo.jpg"
                                alt="Quiz"
                                fill
                                className="border border-brandGreen rounded-lg object-cover shadow-[0_0_1px_#22c55e,0_0_5px_#22c55e]"
                            />{" "}
                        </div>
                        <div className="relative w-87.5 h-17.5 mr-12">
                            <Image
                                src="/home/live-class.png"
                                alt="Quiz"
                                fill
                                className="shadow-lg rounded-lg object-cover "
                            />
                        </div>
                    </div>{" "}
                    <div className="flex flex-col gap-10 justify-end items-start">
                        {" "}
                        <div className="relative w-87.5 h-17.5">
                            <Image
                                src="/home/quiz.png"
                                alt="Quiz"
                                fill
                                className="shadow-lg rounded-lg"
                            />
                        </div>
                        <div className="relative w-62.5 h-62.5 mx-6">
                            <Image
                                src="/home/imageOne.jpg"
                                alt="Quiz"
                                fill
                                className="object-cover border border-brandPurple rounded-lg shadow-[0_0_1px_#934ab3,0_0_5px_#934ab3]"
                            />{" "}
                        </div>
                    </div>{" "}
                </div>
            </div>
            <div className="max-w-4xl mx-auto mt-6 sm:mt-12 lg:mt-28">
                <h2 className="text-5xl text-center">
                    Khrien Academy was created to bridge the gap between curiosity and capability.
                </h2>
                <div className="flex justify-center mt-6">
                    <Link
                        href="/about"
                        className="relative inline-block overflow-hidden rounded-sm bg-brandPurple px-8 md:px-10 py-3 text-base md:text-lg font-semibold group"
                    >
                        {/* Default Text */}
                        <span className="block text-white transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0">
                            Learn More
                        </span>

                        {/* Hover Text */}
                        <span className="absolute inset-0 flex items-center justify-center text-white bg-brandGreen transition-all duration-300 translate-y-full group-hover:translate-y-0">
                            Learn More
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default TuitionSection;
