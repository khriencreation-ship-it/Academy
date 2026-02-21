'use client'

import { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const faqs = [
    {
        q: 'Who is Khrien Academy for?',
        a: 'Khrien Academy is for curious learners, professionals, creators, and builders who want to develop practical, future-facing skills in a structured and supportive environment. Our programs are designed to be accessible to beginners while still valuable for those with some prior experience.',
    },
    {
        q: 'Do I need a technical background to apply?',
        a: 'No. Our courses are designed to meet learners where they are. Concepts are introduced clearly and progressively, with guidance provided throughout the program.',
    },
    {
        q: 'How are the programs delivered?',
        a: 'Programs are delivered online through a combination of pre-recorded lessons you can watch at your own pace, weekly live classes with tutors, and assignments and quizzes to reinforce learning. This structure allows flexibility while maintaining accountability.',
    },
    {
        q: 'What is cohort-based learning?',
        a: 'Cohort-based learning means you learn alongside a group of learners who start and progress through the program together. This creates shared momentum, accountability, and a sense of community throughout the learning experience.',
    },
    {
        q: 'Are the live classes mandatory?',
        a: 'Live classes are highly recommended, as they provide opportunities for interaction, clarification, and deeper understanding. However, recordings will be available for learners who are unable to attend live.',
    },
    {
        q: 'How much time should I commit each week?',
        a: 'On average, learners should expect to dedicate 5–8 hours per week, including lessons, live sessions, and assignments. Time commitment may vary depending on your pace and level of engagement.',
    },
    {
        q: 'Is this program self-paced?',
        a: 'Lessons are self-paced within the structure of the cohort. Content is released on a schedule, but you can complete lessons at your own pace within each learning period.',
    },
    {
        q: 'How many students are in each cohort?',
        a: 'Cohort sizes are intentionally limited to ensure quality learning, meaningful interaction, and adequate tutor support.',
    },
    {
        q: 'What happens after I apply?',
        a: "Once you submit your application, our team reviews it and reaches out with next steps. If accepted, you'll receive onboarding information and access details before the program begins.",
    },
    {
        q: 'Is there an application fee?',
        a: 'No. Applications to Khrien Academy are free.',
    },
    {
        q: 'Do you offer certificates?',
        a: 'Yes. Learners who complete the program and meet the course requirements will receive a certificate of completion from Khrien Academy.',
    },
    {
        q: 'Can I take multiple courses at Khrien Academy?',
        a: 'Yes. As Khrien Academy grows, learners will be able to enroll in multiple programs over time, depending on availability and prerequisites.',
    },
    {
        q: 'How can I contact Khrien Academy for more questions?',
        a: 'You can reach us via the Contact Us page or email us directly. Our team is happy to help clarify any questions you may have.',
    },
]

function FAQItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false)
    return (
        <div className="bg-white border border-gray-200 overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between gap-4 px-7 py-6 text-left hover:bg-white transition-colors duration-200"
            >
                <span className="text-lg font-semibold text-black">{q}</span>
                <span className="text-brandPurple shrink-0 transition-transform duration-200">
                    {open ? <FaChevronUp /> : <FaChevronDown />}
                </span>
            </button>
            {open && (
                <div className="px-7 pb-6 text-gray-700 leading-relaxed text-base border-t border-gray-100 pt-4">
                    {a}
                </div>
            )}
        </div>
    )
}

export default function FAQSection() {
    return (
        <section className="py6 md:py-12 lg:py-16 px-6 md:px-0  max-w-6xl mx-auto">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                <h2 className="text-4xl md:text-5xl font-normal text-black tracking-tight text-left mb-12">
                    Frequently Asked Questions
                </h2>
                <div className="col-span-2 px-12">
                    {faqs.map((item) => (
                        <FAQItem key={item.q} q={item.q} a={item.a} />
                    ))}
                </div>
            </div>
        </section>
    )
}
