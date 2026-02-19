import React from 'react'
import Link from 'next/link'
import {
    FaCalendarAlt,
    FaLaptop,
    FaUsers,
    FaChalkboardTeacher,
    FaGraduationCap,
    FaBrain,
    FaLightbulb,
    FaCheckCircle,
    FaBook,
    FaClock,
    FaHandshake,
    FaRocket,
} from 'react-icons/fa'
import { MdGroups, MdSchedule } from 'react-icons/md'
import { HiAcademicCap } from 'react-icons/hi'
import DarkVeil from '@/components/DarkVeil'

const cohortBenefits = [
    { icon: MdSchedule, label: 'A clear start and end date', color: 'text-brandPurple' },
    { icon: FaCalendarAlt, label: 'A shared learning schedule', color: 'text-brandGreen' },
    { icon: FaChalkboardTeacher, label: 'Live tutor-led sessions', color: 'text-brandYellow' },
    { icon: FaHandshake, label: 'Accountability and peer support', color: 'text-brandPurple' },
]

const courseBenefits = [
    { icon: FaBook, label: 'Structured curriculum', color: 'text-brandGreen' },
    { icon: FaCheckCircle, label: 'Clear learning outcomes', color: 'text-brandPurple' },
    { icon: FaLightbulb, label: 'Practical assignments and assessments', color: 'text-brandYellow' },
]

const targetAudience = [
    { icon: FaRocket, label: 'Beginners exploring new skills' },
    { icon: HiAcademicCap, label: 'Professionals building confidence with modern tools' },
    { icon: FaBrain, label: 'Creators and builders looking to apply technology practically' },
    { icon: MdGroups, label: 'Curious learners ready to commit to structured growth' },
]

const courseTopics = [
    'Core AI concepts and terminology',
    'Generative AI and modern workflows',
    'Large Language Models (LLMs)',
    'Practical AI tools for work and creativity',
    'AI for builders, creators, and modern problem-solving',
    'No-code and low-code AI platforms',
]

export default function CohortsPage() {
    return (
        <>
            {/* Fixed Background Layer */}
            <div className="fixed inset-0 w-full h-full -z-10 bg-brandPurple">
                <DarkVeil
                    hueShift={285}
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
                <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-4 md:px-8 text-center max-w-4xl mx-auto">
                    <p className="text-xs md:text-sm font-semibold uppercase tracking-widest text-brandPurple mb-3">
                        Cohorts & Courses
                    </p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-4 md:mb-6">
                        Programs Designed for{' '}
                        <span className="text-brandPurple">Real Growth</span>
                    </h1>
                    <p className="text-base md:text-lg lg:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto mb-6 md:mb-8">
                        Explore our courses and the cohorts currently open for application.
                    </p>
                    <div className="flex flex-col items-center gap-3">
                        <Link
                            href="/apply"
                            className="inline-block bg-brandPurple text-white font-semibold px-8 md:px-10 py-2.5 md:py-3 rounded-full hover:opacity-90 transition-all duration-300 text-base md:text-lg shadow-md hover:shadow-lg"
                        >
                            Apply to Learn
                        </Link>
                        <p className="text-xs md:text-sm text-white/60">
                            Limited cohort size • Structured learning experience
                        </p>
                    </div>
                </section>

                {/* ── Current & Upcoming Cohorts ── */}
                <section className="py-12 md:py-16 px-4 md:px-6 max-w-360 mx-auto">
                    <div className="mx-auto">
                        <p className="text-xs md:text-sm font-semibold uppercase tracking-widest text-brandPurple mb-3 text-center">
                            Current & Upcoming
                        </p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight text-center mb-4">
                            Open Cohorts
                        </h2>
                        <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-3xl mx-auto text-center mb-8 md:mb-10">
                            Cohorts define when your learning journey begins. Each cohort follows a structured
                            schedule and offers guided learning alongside a community of peers.
                        </p>

                        {/* Cohort Card */}
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 border border-gray-200 hover:shadow-xl hover:border-brandPurple transition-all duration-300">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5 md:mb-6">
                                    <FaGraduationCap className="text-brandPurple text-2xl md:text-3xl shrink-0" />
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
                                        The Genesis Cohort
                                    </h3>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4 md:gap-5 mb-6">
                                    <div className="flex items-start gap-3">
                                        <FaCalendarAlt className="text-brandPurple text-lg md:text-xl mt-1 shrink-0" />
                                        <div>
                                            <p className="font-semibold text-black mb-1 text-sm md:text-base">Dates</p>
                                            <p className="text-gray-600 text-sm md:text-base">April 5 – June 27</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <FaLaptop className="text-brandGreen text-lg md:text-xl mt-1 shrink-0" />
                                        <div>
                                            <p className="font-semibold text-black mb-1 text-sm md:text-base">Format</p>
                                            <p className="text-gray-600 text-sm md:text-base">
                                                Online • Cohort-based • Live weekly classes
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <FaClock className="text-brandYellow text-lg md:text-xl mt-1 shrink-0" />
                                        <div>
                                            <p className="font-semibold text-black mb-1 text-sm md:text-base">Tuition</p>
                                            <p className="text-gray-600 text-sm md:text-base">₦200,000 • Application free</p>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
                                    The Genesis Cohort marks the beginning of Khrien Academy — a focused,
                                    intentional learning experience designed to build strong foundations and real
                                    confidence.
                                </p>

                                <Link
                                    href="/apply"
                                    className="inline-block bg-brandPurple text-white font-semibold px-6 md:px-8 py-2.5 md:py-3 rounded-full hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg text-sm md:text-base"
                                >
                                    Apply to This Cohort
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Our Courses ── */}
                <section className="py-12 md:py-16 px-4 md:px-6 max-w-360 mx-auto">
                    <div className="mx-auto">
                        <p className="text-xs md:text-sm font-semibold uppercase tracking-widest text-brandPurple mb-3 text-center">
                            Our Programs
                        </p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight text-center mb-4">
                            Courses You'll Take
                        </h2>
                        <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-3xl mx-auto text-center mb-8 md:mb-10">
                            Each cohort includes one or more structured courses designed to build understanding
                            first, then practical application.
                        </p>

                        {/* Course Card */}
                        <div className="max-w-5xl mx-auto">
                            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 border border-gray-200 hover:shadow-xl hover:border-brandPurple transition-all duration-300">
                                <div className="flex flex-col sm:flex-row items-start gap-3 mb-5">
                                    <FaBrain className="text-brandPurple text-2xl md:text-3xl shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2">
                                            AI Foundations & Applied Intelligence
                                        </h3>
                                        <p className="text-brandGreen font-semibold text-sm md:text-base">
                                            Beginner → Intermediate
                                        </p>
                                    </div>
                                </div>

                                <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
                                    A comprehensive program designed to help learners understand Artificial
                                    Intelligence from the ground up — covering core concepts, modern tools, and
                                    real-world use cases.
                                </p>

                                <div className="bg-brandLightGray rounded-xl md:rounded-2xl p-5 md:p-6 mb-6">
                                    <p className="font-semibold text-black mb-3 md:mb-4 text-base md:text-lg">
                                        What's Covered:
                                    </p>
                                    <ul className="space-y-2 md:space-y-3">
                                        {courseTopics.map((topic) => (
                                            <li key={topic} className="flex items-start gap-2 md:gap-3">
                                                <FaCheckCircle className="text-brandPurple text-base md:text-lg mt-1 shrink-0" />
                                                <span className="text-gray-700 text-sm md:text-base">{topic}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Link
                                    href="/apply"
                                    className="inline-block bg-brandPurple text-white font-semibold px-6 md:px-8 py-2.5 md:py-3 rounded-full hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg text-sm md:text-base"
                                >
                                    Explore Course
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── How Courses & Cohorts Work Together ── */}
                <section className="py-12 md:py-16 px-4 md:px-6 max-w-360 mx-auto">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start">
                            {/* Left: Intro */}
                            <div>
                                <p className="text-xs md:text-sm font-semibold uppercase tracking-widest text-brandPurple mb-3">
                                    The Structure
                                </p>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4 md:mb-5">
                                    How It Works
                                </h2>
                                <p className="text-base md:text-lg text-white/80 leading-relaxed mb-4 md:mb-5">
                                    At Khrien Academy, you don't enroll in courses alone — you join a cohort.
                                </p>
                                <p className="text-lg md:text-xl lg:text-2xl font-bold text-white/90 italic leading-snug">
                                    Together, they create a{' '}
                                    <span className="text-brandPurple">
                                        guided and supportive learning experience.
                                    </span>
                                </p>
                            </div>

                            {/* Right: Lists */}
                            <div className="space-y-5 md:space-y-6">
                                {/* Cohorts Provide */}
                                <div className="bg-brandGray rounded-xl md:rounded-2xl p-5 md:p-6">
                                    <div className="flex items-center gap-2 mb-3 md:mb-4">
                                        <FaUsers className="text-brandPurple text-xl md:text-2xl" />
                                        <h3 className="text-lg md:text-xl font-bold text-black">Cohorts provide:</h3>
                                    </div>
                                    <div className="space-y-2 md:space-y-3">
                                        {cohortBenefits.map(({ icon: Icon, label, color }) => (
                                            <div key={label} className="flex items-start gap-2 md:gap-3">
                                                <div className={`${color} mt-0.5 shrink-0`}>
                                                    <Icon className="text-base md:text-lg" />
                                                </div>
                                                <p className="text-gray-700 font-medium text-sm md:text-base">{label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Courses Provide */}
                                <div className="bg-brandGray rounded-xl md:rounded-2xl p-5 md:p-6">
                                    <div className="flex items-center gap-2 mb-3 md:mb-4">
                                        <FaBook className="text-brandGreen text-xl md:text-2xl" />
                                        <h3 className="text-lg md:text-xl font-bold text-black">Courses provide:</h3>
                                    </div>
                                    <div className="space-y-2 md:space-y-3">
                                        {courseBenefits.map(({ icon: Icon, label, color }) => (
                                            <div key={label} className="flex items-start gap-2 md:gap-3">
                                                <div className={`${color} mt-0.5 shrink-0`}>
                                                    <Icon className="text-base md:text-lg" />
                                                </div>
                                                <p className="text-gray-700 font-medium text-sm md:text-base">{label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Who This Is For ── */}
                <section className="py-12 md:py-16 px-4 md:px-6 max-w-360 mx-auto">
                    <div className="max-w-4xl mx-auto">
                        <p className="text-xs md:text-sm font-semibold uppercase tracking-widest text-brandPurple mb-3 text-center">
                            Target Audience
                        </p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight text-center mb-4">
                            Is This Right for You?
                        </h2>
                        <p className="text-base md:text-lg text-white/80 leading-relaxed text-center mb-8">
                            Khrien Academy programs are designed for:
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4 md:gap-5 mb-6 md:mb-8">
                            {targetAudience.map(({ icon: Icon, label }) => (
                                <div
                                    key={label}
                                    className="bg-white rounded-xl md:rounded-2xl p-5 md:p-6 border border-gray-200 hover:shadow-lg hover:border-brandPurple transition-all duration-300"
                                >
                                    <div className="flex items-start gap-3 md:gap-4">
                                        <Icon className="text-brandPurple text-2xl md:text-3xl mt-0.5 shrink-0" />
                                        <p className="text-base md:text-lg font-semibold text-black">{label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p className="text-center text-lg md:text-xl font-semibold text-white/90 italic">
                            No prior technical background is required.
                        </p>
                    </div>
                </section>

                {/* ── Closing CTA ── */}
                <section className="py-8 md:py-10 px-4 md:px-6 text-center max-w-360 mx-auto mb-8 md:mb-10">
                    <div className="bg-brandPurple rounded-2xl md:rounded-3xl py-12 md:py-16 lg:py-20 px-6 md:px-8 max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tight">
                            Begin With the Right Cohort
                        </h2>
                        <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto">
                            Applications reviewed on a rolling basis • Limited spots available.
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
