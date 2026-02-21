import React from "react";
import { FaBookOpen, FaChalkboardTeacher, FaPencilAlt, FaClipboardCheck, FaUsers } from "react-icons/fa";

const LearningApproachSection = () => {
    const features = [
        {
            icon: FaBookOpen,
            title: "Self-Paced Lessons",
            description: "Structured, pre-recorded lessons you can learn from at your own pace",
            color: "brandPurple"
        },
        {
            icon: FaChalkboardTeacher,
            title: "Weekly Live Classes",
            description: "Weekly live classes led by experienced tutors",
            color: "brandGreen"
        },
        {
            icon: FaPencilAlt,
            title: "Practical Assignments",
            description: "Practical assignments to apply what you've learned",
            color: "brandYellow"
        },
        {
            icon: FaClipboardCheck,
            title: "Knowledge Reinforcement",
            description: "Quizzes to reinforce understanding",
            color: "brandPurple"
        },
        {
            icon: FaUsers,
            title: "Supportive Community",
            description: "A supportive learning environment with peers on the same journey",
            color: "brandGreen"
        }
    ];

    return (
        <section className="bg-white py-12 md:py-16 lg:py-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 md:mb-10 max-w-5xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6 text-black tracking-tight leading-tight">
                        How Learning Works at <span className="text-brandPurple">Khrien Academy</span>
                    </h2>
                    <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto">
                        Our programs are cohort-based and designed to combine flexibility with accountability.
                    </p>
                </div>
                {/* Features Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8 mb-10 md:mb-12">
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 border border-gray-200 hover:shadow-lg hover:border-brandPurple transition-all duration-300"
                            >
                                <div className={`text-${feature.color} mb-3 md:mb-4`}>
                                    <IconComponent className="text-2xl md:text-3xl" />
                                </div>
                                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-black">{feature.title}</h3>
                                <p className="text-sm md:text-base text-gray-700 leading-relaxed">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default LearningApproachSection;
