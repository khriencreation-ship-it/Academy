"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";

const tutors = [
    {
        name: "Keji-Ayodeji Eniibukun",
        role: "Founder & CEO of Khrien",
        courses: "AI Foundations, UI/UX Design, WordPress Development",
        bio: "Eniibukun built Khrien from the ground up and has spent almost 10 years across tech and creative work. He's teaching AI Foundations, UI/UX, and WordPress this cohort, skills he uses to build products every day.",
        tag: "Lead Instructor",
        image: "/DSC08186.jpg",
    },
    {
        name: "Dada Oluwasegun David",
        role: "Sales & Customer Success Lead",
        courses: "Product Management, Customer Success & Support Operations",
        bio: "Oluwasegun David Dada is a Sales and Customer Success professional with 5+ years of experience in SaaS, fintech, and technology. He helps aspiring professionals build practical skills in sales, customer success, client management, and growth.",
        tag: "Domain Expert",
        image: "/segzy.jpeg",
    },
    {
        name: "Oluwanishola Habeeb",
        role: "Frontend Engineering Lead",
        courses: "Frontend Engineering",
        bio: "Habeeb is a Full-Stack Developer with 3+ years of experience building production web apps. I mainly work with TypeScript and the MERN stack, and I’ve built real-time systems, AI-powered tools, and scalable platforms.",
        tag: "Tech Instructor",
        image: "/habeeb.jpeg",
    },
];

const CatalystTutors = () => {
    return (
        <section className="py-16 md:py-24 px-4 md:px-6 bg-neutral-950 text-white border-y border-neutral-900">
            <div className="max-w-[1440px] mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                    <span className="text-xs md:text-sm font-semibold text-brandPurple uppercase tracking-widest block mb-2">
                        Expert Mentorship
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight mb-4">
                        Who's Teaching You
                    </h2>
                    <p className="text-base md:text-lg text-white/70 leading-relaxed">
                        Learn directly from experienced practitioners, founders, and industry instructors dedicated to your growth.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {tutors.map((tutor, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 flex flex-col justify-between hover:border-brandPurple/50 transition-all duration-300 group overflow-hidden"
                        >
                            <div>
                                {/* Tutor Image Header */}
                                <div className="relative w-full h-72 rounded-2xl overflow-hidden mb-6 border border-neutral-800">
                                    <Image
                                        src={tutor.image}
                                        alt={tutor.name}
                                        fill
                                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-60" />
                                    {/* <span className="absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full bg-brandPurple text-white shadow-md">
                                        {tutor.tag}
                                    </span> */}
                                </div>

                                <h3 className="text-2xl font-semibold text-white mb-1">
                                    {tutor.name}
                                </h3>
                                <p className="text-sm text-brandPurple font-medium mb-4">
                                    {tutor.role}
                                </p>

                                <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                                    {tutor.bio}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-neutral-800">
                                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
                                    Teaching:
                                </span>
                                <p className="text-xs text-white/90 font-medium">
                                    {tutor.courses}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CatalystTutors;
