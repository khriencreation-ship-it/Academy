import React from 'react'
import { FaBookOpen, FaUsers, FaChalkboardTeacher, FaPencilAlt } from 'react-icons/fa'

const TeachingModel = () => {

    const modelItems = [
        { icon: FaBookOpen, label: 'Carefully structured curriculum', color: 'text-brandPurple' },
        { icon: FaUsers, label: 'Cohort-based learning for accountability and community', color: 'text-brandGreen' },
        { icon: FaChalkboardTeacher, label: 'Live tutor-led sessions for clarity and interaction', color: 'text-brandYellow' },
        { icon: FaPencilAlt, label: 'Practical assignments and assessments', color: 'text-brandPurple' },
        // { icon: FaClipboardCheck, label: 'Continuous guidance throughout the program', color: 'text-brandGreen' },
    ]
    return (
        <section className="py-12 md:py-16 px-4 md:px-6 max-w-360 mx-auto">
            <div className="mx-auto">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-black tracking-tight text-center mb-8 md:mb-10 lg:mb-12">
                    Our Teaching Model
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                    {modelItems.map(({ label, icon }) => {
                        const IconComponent = icon;

                        return (
                            <div
                                key={label}
                                className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 hover:shadow-md transition-all duration-300"
                            >
                                <div className="flex items-start gap-4">

                                    {/* Icon */}
                                    <div className="shrink-0">
                                        <IconComponent className="text-brandPurple text-2xl md:text-3xl" />
                                    </div>

                                    {/* Text */}
                                    <p className="text-base md:text-lg font-medium text-gray-800 leading-relaxed">
                                        {label}
                                    </p>

                                </div>
                            </div>
                        );
                    })}
                </div>
                <p className="text-center text-base md:text-lg lg:text-xl text-black/80 mt-8 md:mt-10 lg:mt-12 leading-relaxed max-w-3xl mx-auto">
                    Our goal is to help learners move from understanding concepts to applying skills with
                    confidence and clarity.
                </p>
            </div>
        </section>
    )
}

export default TeachingModel