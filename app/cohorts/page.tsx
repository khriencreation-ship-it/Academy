
import HeroSection from '@/components/cohorts/HeroSection'
import Cohort from '@/components/cohorts/CohortSection'
import Course from '@/components/cohorts/Course'

export default function CohortsPage() {
    return (
        <>

            {/* Main Content */}
            <main className="">
               <HeroSection  />
               <Cohort />
               <Course />
            </main>
        </>
    )
}
