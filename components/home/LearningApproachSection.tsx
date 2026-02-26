"use client"
import React from "react";
import { FaBookOpen, FaChalkboardTeacher, FaPencilAlt, FaClipboardCheck, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const LearningApproachSection = () => {
    const features = [
        {
            icon: FaBookOpen,
            title: "Self-Paced Lessons",
            description: "Structured, pre-recorded lessons you can learn from at your own pace",
            color: "text-brandPurple"
        },
        {
            icon: FaChalkboardTeacher,
            title: "Weekly Live Classes",
            description: "Weekly live classes led by experienced tutors",
            color: "text-brandPurple"
        },
        {
            icon: FaPencilAlt,
            title: "Practical Assignments",
            description: "Practical assignments to apply what you've learned",
            color: "text-brandPurple"
        },
        {
            icon: FaClipboardCheck,
            title: "Knowledge Reinforcement",
            description: "Quizzes to reinforce understanding",
            color: "text-brandPurple"
        },
        {
            icon: FaUsers,
            title: "Supportive Community",
            description: "A supportive learning environment with peers on the same journey",
            color: "text-brandPurple"
        }
    ];

    return (
        <section className="bg-white py-12 md:py-16 lg:py-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    className="text-center mb-8 md:mb-10 max-w-5xl mx-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6 text-black tracking-tight leading-tight">
                        How Learning Works at <span className="text-brandPurple">Khrien Academy</span>
                    </h2>
                    <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto">
                        Our programs are cohort-based and designed to combine flexibility with accountability.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8 mb-10 md:mb-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                >
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 border border-gray-200 hover:shadow-lg hover:border-brandPurple transition-all duration-300"
                                variants={fadeInUp}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            >
                                <div className={`${feature.color} mb-3 md:mb-4`}>
                                    <IconComponent className="text-2xl md:text-3xl" />
                                </div>
                                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-black">{feature.title}</h3>
                                <p className="text-sm md:text-base text-gray-700 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default LearningApproachSection;
