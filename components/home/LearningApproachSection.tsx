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
        <section className="bg-white py-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10 max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 text-black tracking-tight">
                        How Learning Works at <span className="text-brandPurple">Khrien Academy</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
                        Our programs are cohort-based and designed to combine flexibility with accountability.
                    </p>
                </div>
                <h1 className="text-4xl md:text-6xl uppercase font-black italic text-brandYellow mb-6">You'll experience:</h1>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg hover:border-brandPurple transition-all duration-300"
                            >
                                <div className={`text-${feature.color} mb-4`}>
                                    <IconComponent className="text-3xl" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-black">{feature.title}</h3>
                                <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Message */}
                <div className="text-center">
                    <p className="text-xl md:text-2xl font-semibold text-black">
                        We focus on understanding first — then confident application.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default LearningApproachSection;
