import React from "react";
import Link from "next/link";
import { GiCheckMark } from "react-icons/gi";
import { PiBookmarksSimpleFill } from "react-icons/pi";

const CoursesSection = () => {
    return (
        <section className="bg-white py-12 md:py-16 lg:py-20 px-4 md:px-8">
            <div className="max-w-360 mx-auto">
                {/* Header */}
                <div className="text-center mb-10 md:mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-black tracking-tight">
                        What You'll Learn
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
                        Our courses are built to meet learners where they are and guide them forward through a balanced mix of theory, practice, and guided instruction.
                    </p>
                </div>

                {/* Course Card */}
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white shadow-md border duration-300 text-center p-6 md:p-8 rounded-2xl border-brandPurple/40 transition-colors">
                        <h3 className="text-2xl sm:text-3xl md:text-3xl font-bold mb-4 text-brandPurple">
                            AI Foundations & Applied Intelligence
                        </h3>

                        <p className="text-sm md:text-base text-gray-700 mb-6 leading-relaxed">
                            A comprehensive beginner-to-intermediate program designed to help learners understand Artificial Intelligence from the ground up, covering concepts, tools, real-world applications, and modern workflows.
                        </p>

                        <div className="mb-6">
                            <h4 className="text-lg md:text-xl font-semibold mb-4 text-black">This course is suitable for:</h4>
                            <ul className="space-y-3 md:space-y-4">
                                {[
                                    "Beginners with no prior AI experience",
                                    "Professionals looking to understand and use AI confidently",
                                    "Creators and builders using modern AI tools",
                                    "Developers and non-developers alike"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-2 md:gap-3 text-gray-700">
                                        <span className="text-brandPurple text-base md:text-lg mt-0.5 shrink-0"><PiBookmarksSimpleFill /></span>
                                        <span className="text-sm md:text-base lg:text-lg text-left">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Link
                            href="/cohorts"
                            className="inline-block bg-brandPurple text-white font-semibold px-8 md:px-10 py-2.5 md:py-3 rounded-full hover:opacity-90 transition-all duration-300 text-base md:text-lg shadow-md hover:shadow-lg"
                        >
                            Explore Course
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CoursesSection;