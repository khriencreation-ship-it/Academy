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
import HeroSection from '@/components/cohorts/HeroSection'
import Cohort from '@/components/cohorts/CohortSection'
import Course from '@/components/cohorts/Course'

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


export default function CohortsPage() {
    return (
        <>

            {/* Main Content */}
            <main className="">
               <HeroSection  />
               <Course />
               <Cohort />
            </main>
        </>
    )
}
