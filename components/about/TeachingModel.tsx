"use client"
import React from 'react'
import { FaBookOpen, FaUsers, FaChalkboardTeacher, FaPencilAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'

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

const TeachingModel = () => {

    const modelItems = [
        { icon: FaBookOpen, label: 'Carefully structured curriculum', color: 'text-brandPurple' },
        { icon: FaUsers, label: 'Cohort-based learning for accountability and community', color: 'text-brandGreen' },
        { icon: FaChalkboardTeacher, label: 'Live tutor-led sessions for clarity and interaction', color: 'text-brandYellow' },
        { icon: FaPencilAlt, label: 'Practical assignments and assessments', color: 'text-brandPurple' },
    ]
    return (
        <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 max-w-360 mx-auto">
            <div className="mx-auto">
                <motion.h2
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-black tracking-tight text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    Our Teaching Model
                </motion.h2>
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                >
                    {modelItems.map(({ label, icon, color }) => {
                        const IconComponent = icon;

                        return (
                            <motion.div
                                key={label}
                                className="bg-white rounded-xl md:rounded-2xl p-5 sm:p-6 md:p-8 border border-gray-200 hover:shadow-lg hover:border-brandPurple transition-all duration-300"
                                variants={fadeInUp}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            >
                                <div className="flex flex-col sm:flex-row md:flex-col items-start gap-3 sm:gap-4">

                                    {/* Icon */}
                                    <div className="shrink-0">
                                        <IconComponent className={`${color} text-2xl md:text-3xl`} />
                                    </div>

                                    {/* Text */}
                                    <p className="text-sm sm:text-base md:text-lg font-medium text-gray-800 leading-relaxed">
                                        {label}
                                    </p>

                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    )
}

export default TeachingModel
