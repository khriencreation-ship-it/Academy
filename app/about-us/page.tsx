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
        <main className="px-4 lg:px-9 max-w-360 mx-auto">
            {/* <DarkVeil
                hueShift={0}
                noiseIntensity={0}
                scanlineIntensity={0}
                speed={0.5}
                scanlineFrequency={0}
                warpAmount={0}
            /> */}
            {/* ── Hero ── */}
            <section className="py-24 px-6 md:px-12 lg:px-24 text-center max-w-4xl mx-auto h-screen mt-20">
                <p className="text-sm font-semibold uppercase tracking-widest text-brandPurple mb-4">
                    About Us
                </p>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black leading-tight mb-8">
                    Built to Help You{' '}
                    <span className="text-brandPurple">Grow With Purpose</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                    Khrien Academy is a future-focused learning institution built to help individuals develop
                    practical, relevant skills for a rapidly evolving world.
                </p>
            </section>

            {/* ── We Believe ── */}
            <section className=" rounded-3xl py-10 px-6 md:px-12 lg:px-10 max-w-360 mx-auto mb-6">
                <div className="mx-auto">
                    <p className="text-sm font-semibold uppercase tracking-widest text-brandPurple mb-4 text-center">
                        Our Beliefs
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight text-center mb-14">
                        We believe learning should be:
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {beliefs.map(({ label, sub, icon }) => {
                            const IconComponent = icon;
                            return (
                                <div
                                    key={label}
                                    className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg hover:border-brandPurple transition-all duration-300"
                                >
                                    <div className="flex items-center gap-2">
                                        <IconComponent className="text-brandPurple text-3xl mb-4" />
                                        <p className="text-2xl font-bold text-black mb-2">{label}</p>
                                    </div>
                                    <p className="text-lg text-gray-500">{sub}</p>
                                </div>
                            );
                        })}
                    </div>
                    <p className="text-center text-lg md:text-xl text-gray-700 mt-12 leading-relaxed max-w-3xl mx-auto">
                        Our goal is to help learners move from understanding concepts to applying skills with
                        confidence and clarity.
                    </p>
                </div>
            </section>

            {/* ── Mission ── */}
            <section className="py-20 px-6 md:px-12 lg:px-24 max-w-360 mx-auto">
                <div className="bg-brandPurple rounded-3xl p-12 md:p-16 text-white text-center max-w-4xl mx-auto">
                    <p className="text-sm font-semibold uppercase tracking-widest opacity-70 mb-4">
                        Our Mission
                    </p>
                    <p className="text-2xl md:text-3xl lg:text-4xl font-bold leading-snug">
                        To provide high-quality, accessible education that empowers learners to grow, adapt,
                        and build confidently in a changing world.
                    </p>
                </div>
            </section>

            {/* ── Teaching Model ── */}
            <section className="py-20 px-6 md:px-12 lg:px-24 max-w-360 mx-auto">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-start">
                        {/* Left: copy */}
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-widest text-brandPurple mb-4">
                                How We Teach
                            </p>
                            <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight mb-6">
                                Our Teaching Model
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-8">
                                At Khrien Academy, learning is designed around real understanding and steady progress.
                            </p>
                            <p className="text-xl md:text-2xl font-bold text-black italic leading-snug">
                                We don't rush learning.
                                <br />
                                <span className="text-brandPurple">We build it deliberately.</span>
                            </p>
                        </div>

                        {/* Right: list */}
                        <div className="space-y-4">
                            <p className="text-base font-semibold text-gray-500 mb-2">Our teaching model includes:</p>
                            {modelItems.map(({ icon: Icon, label, color }) => (
                                <div
                                    key={label}
                                    className="flex items-start gap-4 bg-brandGray rounded-2xl p-5 border border-gray-200 hover:border-brandPurple hover:shadow-md transition-all duration-300"
                                >
                                    <div className={`${color} mt-0.5 shrink-0`}>
                                        <Icon className="text-2xl" />
                                    </div>
                                    <p className="text-black font-medium">{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FAQ (client component) ── */}
            <FAQSection />

            {/* ── Closing CTA ── */}
            <section className="py-10 px-6 md:px-12 lg:px-24 text-center max-w-360 mx-auto mb-10">
                <div className="bg-black rounded-3xl py-20 px-8 max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Ready to Start?
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
                        Join the Genesis Cohort and take the first step toward building skills that matter.
                    </p>
                    <Link
                        href="/apply"
                        className="inline-block bg-brandPurple text-white font-semibold px-10 py-4 rounded-full hover:opacity-90 transition-all duration-300 text-lg shadow-md hover:shadow-lg border border-black border-b-4 border-l-4"
                    >
                        Apply Now
                    </Link>
                </div>
            </section>

        </main>
    )
}