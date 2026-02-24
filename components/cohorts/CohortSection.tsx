import Link from 'next/link'
import React from 'react'
import {
    FaCalendarAlt,
    FaLaptop,
    FaGraduationCap,
    FaClock,
} from 'react-icons/fa'

const Cohort = () => {
  return (
    <section className="py-12 md:py-16 px-4 md:px-6 max-w-360 mx-auto">
                    <div className="mx-auto">
                        <p className="text-xs md:text-sm font-semibold uppercase tracking-widest text-brandPurple mb-3 text-center">
                            Current & Upcoming
                        </p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black tracking-tight text-center mb-4">
                            Open Cohorts
                        </h2>
                        <p className="text-base md:text-lg text-black leading-relaxed max-w-3xl mx-auto text-center mb-8 md:mb-10">
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
                                            <p className="text-gray-600 text-sm md:text-base">April 5 – June 4</p>
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
                                            <p className="text-gray-600 text-sm md:text-base">Scholarship based</p>
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
  )
}

export default Cohort