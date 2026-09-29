"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaBrain, FaPalette, FaWordpress, FaTasks, FaCode, FaHeadset, FaUserTie } from "react-icons/fa";

const coursesData = [
    {
        id: 1,
        title: "AI Foundations and Practical Intelligence",
        description: "Learn how to use AI tools practically, in your work, your business, and your everyday life.",
        tutor: "Keji-Ayodeji Eniibukun",
        icon: FaBrain,
        color: "from-purple-500/20 to-indigo-500/10",
        border: "hover:border-brandPurple",
    },
    {
        id: 2,
        title: "UI/UX Design",
        description: "Learn to research, design, and prototype products people actually enjoy using.",
        tutor: "Keji-Ayodeji Eniibukun",
        icon: FaPalette,
        color: "from-pink-500/20 to-purple-500/10",
        border: "hover:border-pink-500",
    },
    {
        id: 3,
        title: "WordPress Development",
        description: "Learn to build, customize, and manage websites using WordPress.",
        tutor: "Keji-Ayodeji Eniibukun",
        icon: FaWordpress,
        color: "from-blue-500/20 to-cyan-500/10",
        border: "hover:border-blue-500",
    },
    {
        id: 4,
        title: "Product Management",
        description: "Learn how to plan, prioritize, and lead a product from idea to launch.",
        tutor: "Dada Oluwasegun David",
        icon: FaTasks,
        color: "from-emerald-500/20 to-teal-500/10",
        border: "hover:border-emerald-500",
    },
    {
        id: 5,
        title: "Frontend Engineering",
        description: "Learn to build the interactive, visual side of websites and apps with real code.",
        tutor: "Oluwanishola Habeeb",
        icon: FaCode,
        color: "from-amber-500/20 to-orange-500/10",
        border: "hover:border-amber-500",
    },
    {
        id: 6,
        title: "Customer Success & Support Operations",
        description: "Learn to manage customer relationships using CRM tools, helpdesk systems, and AI.",
        tutor: "Dada Oluwasegun David",
        icon: FaHeadset,
        color: "from-cyan-500/20 to-blue-500/10",
        border: "hover:border-cyan-500",
    },
];

const CatalystCourses = () => {
    return (
        <section id="courses" className="bg-white text-black py-16 md:py-24 px-4 md:px-6">
            <div className="max-w-[1440px] mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                    <span className="text-xs md:text-sm font-semibold text-brandPurple uppercase tracking-widest block mb-2">
                        Comprehensive Curriculum
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black tracking-tight mb-4">
                        What You'll Learn
                    </h2>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                        Choose from 6 practical, career-focused courses tailored to help you build real-world capabilities.
                    </p>
                </div>

                {/* Course Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                    {coursesData.map((course, idx) => {
                        const Icon = course.icon;
                        return (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.08 }}
                                className={`bg-white rounded-2xl p-6 md:p-8 border border-gray-200 ${course.border} shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group`}
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="p-3.5 rounded-xl bg-purple-50 text-brandPurple text-2xl group-hover:bg-brandPurple group-hover:text-white transition-colors duration-300">
                                            <Icon />
                                        </div>
                                        
                                    </div>

                                    <h3 className="text-xl md:text-2xl font-semibold text-black mb-3 group-hover:text-brandPurple transition-colors">
                                        {course.title}
                                    </h3>

                                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                                        {course.description}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                                        <FaUserTie className="text-brandPurple" />
                                        <span>Tutor<strong className="text-gray-800 font-medium">{course.tutor}</strong></span>
                                    </div>
                                    <Link
                                        href="/apply"
                                        className="text-xs font-semibold text-brandPurple hover:underline"
                                    >
                                        Enroll →
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CatalystCourses;
