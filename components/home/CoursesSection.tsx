import React from "react";
import Link from "next/link";
import { GiCheckMark } from "react-icons/gi";
import { PiBookmarksSimpleFill } from "react-icons/pi";

const CoursesSection = () => {
    return (
        <section className="bg-white py-10 px-6 md:px-12 lg:px-24">
            <div className="max-w-360 mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 text-black tracking-tight">
                        What You'll Learn
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                        Our courses are built to meet learners where they are and guide them forward through a balanced mix of theory, practice, and guided instruction.
                    </p>
                </div>

                {/* Course Card */}
                <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white shadow-md border duration-300 text-center p-8 rounded-2xl border-brandPurple/40 transition-colors">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-brandPurple">
                            AI Foundations & Applied Intelligence
                        </h3>

                        <p className="text-md text-gray-700 mb-5 leading-relaxed">
                            A comprehensive beginner-to-intermediate program designed to help learners understand Artificial Intelligence from the ground up, covering concepts, tools, real-world applications, and modern workflows.
                        </p>

                        <div className="mb-5">
                            <h4 className="text-xl font-semibold mb-3 text-black">This course is suitable for:</h4>
                            <ul className="space-y-4">
                                {[
                                    "Beginners with no prior AI experience",
                                    "Professionals looking to understand and use AI confidently",
                                    "Creators and builders using modern AI tools",
                                    "Developers and non-developers alike"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-2 text-gray-700">
                                        <span className="text-brandPurple text-lg mt-0.5 shrink-0 text-left"><PiBookmarksSimpleFill /></span>
                                        <span className="text-lg text-left">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Link
                            href="#"
                            className="bg-brandPurple text-white font-semibold px-10 py-3 rounded-full  border border-black border-b-5 border-l-5 hover:opacity-90 transition-all duration-300 text-lg shadow-md hover:shadow-lg"
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