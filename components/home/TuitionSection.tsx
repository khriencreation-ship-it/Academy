import React from "react";
import Link from "next/link";
import { FaCalendarAlt, FaMoneyBillWave, FaCheckCircle } from "react-icons/fa";

const TuitionSection = () => {
    return (
        <section className="bg-white py-12 md:py-16 lg:py-20 px-4 md:px-8">
            <div className="max-w-360 mx-auto">
                {/* Header */}
                <div className="text-center mb-10 md:mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 text-black tracking-tight">
                        Tuition & Program Dates
                    </h2>
                </div>

                {/* Centered Single Column Layout */}
               <div className="max-w-2xl mx-auto">
               <div className="bg-white shadow-md border duration-300 text-center p-6 md:p-8 rounded-2xl border-brandPurple/40 transition-colors">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-brandPurple">
                        The Genesis Cohort
                    </h3>

                    {/* Stacked Cards */}
                    <div className="space-y-4 md:space-y-5">
                        {/* Program Dates */}
                        <div className="bg-white rounded-xl md:rounded-2xl p-5 md:p-6 border border-gray-100">
                            <div className="flex items-center gap-3 md:gap-4">
                                <div className="bg-brandPurple/10 p-3 md:p-4 rounded-xl">
                                    <FaCalendarAlt className="text-2xl md:text-3xl text-brandPurple" />
                                </div>
                                <div className="flex-1 text-left">
                                    <div className="text-xs md:text-sm font-semibold text-gray-600 mb-1">Program Dates</div>
                                    <div className="text-lg md:text-xl lg:text-2xl font-bold text-black">April 5 – June 27</div>
                                </div>
                            </div>
                        </div>

                        {/* Tuition Fee */}
                        <div className="bg-white rounded-xl md:rounded-2xl p-5 md:p-6 border border-gray-100">
                            <div className="flex items-center gap-3 md:gap-4">
                                <div className="bg-brandGreen/10 p-3 md:p-4 rounded-xl">
                                    <FaMoneyBillWave className="text-2xl md:text-3xl text-brandGreen" />
                                </div>
                                <div className="flex-1 text-left">
                                    <div className="text-xs md:text-sm font-semibold text-gray-600 mb-1">Tuition Fee</div>
                                    <div className="text-lg md:text-xl lg:text-2xl font-bold text-black">₦200,000</div>
                                </div>
                            </div>
                        </div>

                        {/* Application Fee */}
                        <div className="bg-white rounded-xl md:rounded-2xl p-5 md:p-6 border border-gray-100">
                            <div className="flex items-center gap-3 md:gap-4">
                                <div className="bg-brandYellow/10 p-3 md:p-4 rounded-xl">
                                    <FaCheckCircle className="text-2xl md:text-3xl text-brandYellow" />
                                </div>
                                <div className="flex-1 text-left">
                                    <div className="text-xs md:text-sm font-semibold text-gray-600 mb-1">Application Fee</div>
                                    <div className="text-lg md:text-xl lg:text-2xl font-bold text-black">Free</div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-brandPurple/5 rounded-xl md:rounded-2xl p-5 md:p-6 border-2 border-brandPurple/10">
                            <div className="space-y-3 mb-6">
                                <p className="text-sm md:text-base leading-relaxed text-gray-700 text-center">
                                    The Genesis Cohort marks the beginning of Khrien Academy.
                                </p>
                                <p className="text-sm md:text-base leading-relaxed text-gray-700 text-center">
                                    Cohort size is intentionally limited to ensure quality learning, meaningful interaction, and focused tutor support.
                                </p>
                            </div>

                            <Link
                                href="/apply"
                                className="inline-block bg-brandPurple text-white font-semibold px-8 md:px-10 py-2.5 md:py-3 rounded-full hover:opacity-90 transition-all duration-300 text-base md:text-lg shadow-md hover:shadow-lg"
                            >
                                Apply Now
                            </Link>
                        </div>
                    </div>
                </div>
               </div>
            </div>
        </section>
    );
};

export default TuitionSection;
