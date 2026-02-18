import React from "react";
import { FaUsers, FaBook, FaCheckCircle } from "react-icons/fa";

const HowItWorks = () => {
    return (
        <section className="bg-brandGray py-20 px-6 md:px-12 lg:px-24">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black mb-4 text-black tracking-tight">
                        How It Works
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        At Khrien Academy, you don't enroll in courses alone — you join a cohort.
                        Together, they create a guided and supportive learning experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Cohorts Column */}
                    <div className="bg-gradient-to-br from-brandPurple to-purple-600 rounded-3xl p-8 shadow-xl">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                                <FaUsers className="text-4xl text-white" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white">Cohorts provide:</h3>
                        </div>
                        <ul className="space-y-4">
                            {[
                                "A clear start and end date",
                                "A shared learning schedule",
                                "Live tutor-led sessions",
                                "Accountability and peer support"
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-3 bg-white/15 backdrop-blur-sm p-5 rounded-xl hover:bg-white/25 transition-all duration-300">
                                    <FaCheckCircle className="text-white text-xl flex-shrink-0 mt-0.5" />
                                    <span className="text-white font-medium text-base leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Courses Column */}
                    <div className="bg-linear-to-br from-brandGreen to-green-600 rounded-3xl p-8 shadow-xl">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                                <FaBook className="text-4xl text-white" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white">Courses provide:</h3>
                        </div>
                        <ul className="space-y-4">
                            {[
                                "Structured curriculum",
                                "Clear learning outcomes",
                                "Practical assignments and assessments"
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-3 bg-white/15 backdrop-blur-sm p-5 rounded-xl hover:bg-white/25 transition-all duration-300">
                                    <FaCheckCircle className="text-white text-xl shrink-0 mt-0.5" />
                                    <span className="text-white font-medium text-base leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
