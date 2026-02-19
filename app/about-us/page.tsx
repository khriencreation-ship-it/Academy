import React from 'react'
import Link from 'next/link'
import {
    FaBookOpen,
    FaChalkboardTeacher,
    FaPencilAlt,
    FaClipboardCheck,
    FaUsers,
} from 'react-icons/fa'
import FAQSection from '@/components/about/FAQSection'
import { PiTreeStructure } from "react-icons/pi";
import { MdCoPresent } from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";
import DarkVeil from '@/components/DarkVeil';


const beliefs = [
    { icon: PiTreeStructure, label: 'Structured', sub: 'not overwhelming' },
    { icon: MdCoPresent, label: 'Practical', sub: 'not abstract' },
    { icon: TbTargetArrow, label: 'Purpose-driven', sub: 'not trend-chasing' },
]

const modelItems = [
    { icon: FaBookOpen, label: 'Carefully structured curriculum', color: 'text-brandPurple' },
    { icon: FaUsers, label: 'Cohort-based learning for accountability and community', color: 'text-brandGreen' },
    { icon: FaChalkboardTeacher, label: 'Live tutor-led sessions for clarity and interaction', color: 'text-brandYellow' },
    { icon: FaPencilAlt, label: 'Practical assignments and assessments', color: 'text-brandPurple' },
    { icon: FaClipboardCheck, label: 'Continuous guidance throughout the program', color: 'text-brandGreen' },
]

export default function AboutPage() {
    return (
        <>
            {/* Fixed Background Layer */}
            <div className="fixed inset-0 w-full h-full -z-10">
                <DarkVeil
                    hueShift={180}
                    noiseIntensity={0.02}
                    scanlineIntensity={0.1}
                    speed={0.3}
                    scanlineFrequency={0.5}
                    warpAmount={0.2}
                />
            </div>

            {/* Main Content */}
            <main className="relative px-4 lg:px-9 max-w-360 mx-auto">
                {/* ── Hero ── */}
            <section className="pt-32 md:pt-40 pb-16 md:pb-20 px-4 md:px-8 text-center max-w-4xl mx-auto">
                <p className="text-xs md:text-sm font-semibold uppercase tracking-widest text-brandPurple mb-3 md:mb-4">
                    About Us
                </p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-tight mb-6 md:mb-8">
                    Built to Help You{' '}
                    <span className="text-brandPurple">Grow With Purpose</span>
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
                    Khrien Academy is a future-focused learning institution built to help individuals develop
                    practical, relevant skills for a rapidly evolving world.
                </p>
            </section>

            {/* ── We Believe ── */}
            <section className="py-12 md:py-16 px-4 md:px-6 max-w-360 mx-auto">
                <div className="mx-auto">
                    <p className="text-xs md:text-sm font-semibold uppercase tracking-widest text-brandPurple mb-3 md:mb-4 text-center">
                        Our Beliefs
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight text-center mb-8 md:mb-10 lg:mb-12">
                        We believe learning should be:
                    </h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
                        {beliefs.map(({ label, sub, icon }) => {
                            const IconComponent = icon;
                            return (
                                <div
                                    key={label}
                                    className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 border border-gray-200 hover:shadow-lg hover:border-brandPurple transition-all duration-300"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <IconComponent className="text-brandPurple text-2xl md:text-3xl" />
                                        <p className="text-xl md:text-2xl font-bold text-black">{label}</p>
                                    </div>
                                    <p className="text-base md:text-lg text-gray-500">{sub}</p>
                                </div>
                            );
                        })}
                    </div>
                    <p className="text-center text-base md:text-lg lg:text-xl text-white/80 mt-8 md:mt-10 lg:mt-12 leading-relaxed max-w-3xl mx-auto">
                        Our goal is to help learners move from understanding concepts to applying skills with
                        confidence and clarity.
                    </p>
                </div>
            </section>

            {/* ── Mission ── */}
            <section className="py-12 md:py-16 px-4 md:px-6 max-w-360 mx-auto">
                <div className="bg-brandPurple rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 text-white text-center max-w-5xl mx-auto">
                    <p className="text-xs md:text-sm font-semibold uppercase tracking-widest opacity-70 mb-3 md:mb-4">
                        Our Mission
                    </p>
                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-snug">
                        To provide high-quality, accessible education that empowers learners to grow, adapt,
                        and build confidently in a changing world.
                    </p>
                </div>
            </section>

            {/* ── Teaching Model ── */}
            <section className="py-12 md:py-16 px-4 md:px-6 max-w-360 mx-auto">
                <div className="mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-start">
                        {/* Left: copy */}
                        <div>
                            <p className="text-xs md:text-sm font-semibold uppercase tracking-widest text-brandPurple mb-3 md:mb-4">
                                How We Teach
                            </p>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 md:mb-6">
                                Our Teaching Model
                            </h2>
                            <p className="text-base md:text-lg text-white/80 leading-relaxed mb-6 md:mb-8">
                                At Khrien Academy, learning is designed around real understanding and steady progress.
                            </p>
                            <p className="text-lg md:text-xl lg:text-2xl font-bold text-white/80 italic leading-snug">
                                We don't rush learning.
                                <br />
                                <span className="text-brandPurple">We build it deliberately.</span>
                            </p>
                        </div>

                        {/* Right: list */}
                        <div className="space-y-3 md:space-y-4">
                            <p className="text-sm md:text-base font-semibold text-white/80 mb-2">Our teaching model includes:</p>
                            {modelItems.map(({ icon: Icon, label, color }) => (
                                <div
                                    key={label}
                                    className="flex items-start gap-3 md:gap-4 bg-brandGray rounded-xl md:rounded-2xl p-4 md:p-5 border border-gray-200 hover:border-brandPurple hover:shadow-md transition-all duration-300"
                                >
                                    <div className={`${color} mt-0.5 shrink-0`}>
                                        <Icon className="text-xl md:text-2xl" />
                                    </div>
                                    <p className="text-black font-medium text-sm md:text-base">{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FAQ (client component) ── */}
            <FAQSection />

            {/* ── Closing CTA ── */}
            <section className="py-8 md:py-10 px-4 md:px-6 text-center max-w-360 mx-auto mb-8 md:mb-10">
                <div className="bg-brandPurple rounded-2xl md:rounded-3xl py-12 md:py-16 lg:py-20 px-6 md:px-8 max-w-5xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tight">
                        Ready to Start?
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-6 md:mb-8 lg:mb-10 leading-relaxed max-w-2xl mx-auto">
                        Join the Genesis Cohort and take the first step toward building skills that matter.
                    </p>
                    <Link
                        href="/apply"
                        className="inline-block bg-brandYellow text-white font-semibold px-8 md:px-10 py-2.5 md:py-3 rounded-full hover:opacity-90 transition-all duration-300 text-base md:text-lg shadow-md hover:shadow-lg"
                    >
                        Apply Now
                    </Link>
                </div>
            </section>

            </main>
        </>
    )
}