"use client";

import React from "react";
import Link from "next/link";
import { FaBolt, FaCheckCircle, FaRobot, FaCogs, FaProjectDiagram } from "react-icons/fa";
import { motion } from "framer-motion";

const CatalystCurriculum = () => {
    const courses = [
        {
            title: "Advanced Prompting & Context Architecture",
            level: "Intermediate → Advanced",
            icon: FaBolt,
            description: "Master multi-step reasoning, context window optimization, custom system prompts, and structured output formatting across major LLMs like Claude, OpenAI, and Gemini.",
            topics: [
                "System prompt engineering & persona design",
                "Few-shot prompting & chain-of-thought techniques",
                "JSON / Structured outputs & schema validation",
                "Context window management & token efficiency"
            ]
        },
        {
            title: "AI Workflows & Automation Engineering",
            level: "Practical Intelligence",
            icon: FaCogs,
            description: "Learn to build automated, end-to-end workflows connecting AI models to your daily workplace tools using automation platforms like n8n, Make, and Zapier.",
            topics: [
                "Building zero-code & low-code AI automations",
                "Integrating LLM APIs with Google Workspace, Slack & CRM",
                "Automated document processing & email auto-responders",
                "Scheduled AI monitoring & reporting workflows"
            ]
        },
        {
            title: "Custom AI Agents & Domain Assistants",
            level: "Advanced Execution",
            icon: FaRobot,
            description: "Design autonomous AI agents and domain-specific knowledge assistants that perform multi-step tasks, research, and data extraction independently.",
            topics: [
                "Creating custom GPTs & specialized knowledge bots",
                "Retrieval-Augmented Generation (RAG) fundamentals",
                "Connecting external knowledge sources & PDFs to AI",
                "Agent tool use, Web Browsing & Code Execution"
            ]
        },
        {
            title: "Multi-Modal AI & Enterprise Production",
            level: "Full Stack Mastery",
            icon: FaProjectDiagram,
            description: "Combine AI video generation, image design, dynamic presentation tools, and audio synthesis into cohesive production pipelines.",
            topics: [
                "Generative AI video creation with Midjourney, Sora & Veo",
                "Brand voice synthesis & automated visual assets",
                "Enterprise security, data privacy & responsible AI deployment",
                "Capstone project: End-to-end AI system deployment"
            ]
        }
    ];

    return (
        <section id="curriculum" className="bg-white text-black py-16 md:py-24 px-4 md:px-6">
            <div className="max-w-[1440px] mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                    <span className="text-xs md:text-sm font-semibold text-brandPurple uppercase tracking-widest block mb-2">
                        Curriculum Breakdown
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black tracking-tight mb-4">
                        What You Will Master in Catalyst
                    </h2>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                        The Catalyst Cohort is structured around hands-on, high-leverage AI skills designed for immediate implementation in high-growth roles and modern organizations.
                    </p>
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {courses.map((course, idx) => {
                        const Icon = course.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 hover:shadow-xl hover:border-brandPurple transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-3 rounded-xl bg-purple-50 text-brandPurple text-xl">
                                            <Icon />
                                        </div>
                                        <div>
                                            <span className="text-xs font-semibold text-brandPurple uppercase tracking-wider block">
                                                {course.level}
                                            </span>
                                            <h3 className="text-xl md:text-2xl font-semibold text-black">
                                                {course.title}
                                            </h3>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                                        {course.description}
                                    </p>

                                    <div className="bg-neutral-50 rounded-xl p-4 md:p-5 mb-6">
                                        <p className="font-semibold text-black text-sm md:text-base mb-3">
                                            Key Modules:
                                        </p>
                                        <ul className="space-y-2">
                                            {course.topics.map((topic, tIdx) => (
                                                <li key={tIdx} className="flex items-start gap-2 text-xs md:text-sm text-gray-700">
                                                    <FaCheckCircle className="text-brandPurple text-sm mt-0.5 shrink-0" />
                                                    <span>{topic}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div>
                                    <Link
                                        href="/apply"
                                        className="inline-flex items-center justify-center w-full bg-black hover:bg-brandPurple text-white font-medium px-5 py-2.5 rounded-xl transition-colors duration-200 text-sm"
                                    >
                                        Apply for this Cohort
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

export default CatalystCurriculum;
