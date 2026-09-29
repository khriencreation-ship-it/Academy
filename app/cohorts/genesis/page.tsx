import HeroSection from '@/components/cohorts/HeroSection'
import Cohort from '@/components/cohorts/CohortSection'
import Course from '@/components/cohorts/Course'
import Introvideo from '@/components/home/Introvideo-section'

export const metadata = {
    title: 'Genesis Cohort | Khrien Academy',
    description: 'The Genesis Cohort marks the beginning of Khrien Academy, a focused and intentional learning experience crafted to build strong AI foundations.',
}

export default function GenesisCohortPage() {
    return (
        <main className="bg-black min-h-screen">
            <HeroSection />
            <Cohort />
            <Introvideo />
            <Course />
        </main>
    )
}
