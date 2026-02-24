import Link from 'next/link'
import React from 'react'
import { FaBrain, FaCheckCircle } from 'react-icons/fa'

const Course = () => {

const courseTopics = [
    'Core AI concepts and terminology',
    'Generative AI and modern workflows',
    'Large Language Models (LLMs)',
    'Practical AI tools for work and creativity',
    'AI for builders, creators, and modern problem-solving',
    'No-code and low-code AI platforms',
]
  return (
    <section className="py-12 md:py-16 px-4 md:px-6 max-w-360 mx-auto">
                    <div className="mx-auto">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-black tracking-tight text-center mb-4">
                            Courses You'll Take
                        </h2>
                        <p className="text-base md:text-lg text-black leading-relaxed max-w-3xl mx-auto text-center mb-8 md:mb-10">
                            Each cohort includes one or more structured courses designed to build understanding
                            first, then practical application.
                        </p>

                        {/* Course Card */}
                        <div className="max-w-5xl mx-auto">
                            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 border border-gray-200 hover:shadow-xl hover:border-brandPurple transition-all duration-300">
                                <div className="flex flex-col sm:flex-row items-start gap-3 mb-5">
                                    <FaBrain className="text-brandPurple text-2xl md:text-3xl shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-black mb-2">
                                            AI Foundations & Applied Intelligence
                                        </h3>
                                        <p className="text-brandGreen font-light text-sm md:text-base">
                                            Beginner → Intermediate
                                        </p>
                                    </div>
                                </div>

                                <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
                                    A comprehensive program designed to help learners understand Artificial
                                    Intelligence from the ground up, covering core concepts, modern tools, and
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
                                    Apply Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
  )
}

export default Course