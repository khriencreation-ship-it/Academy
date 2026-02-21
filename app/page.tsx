import Hero from '@/components/home/Hero'
import AboutSection from '@/components/home/AboutSection'
import CoursesSection from '@/components/home/CoursesSection'
import TuitionSection from '@/components/home/TuitionSection'
import LearningApproachSection from '@/components/home/LearningApproachSection'
import ClosingCTASection from '@/components/home/ClosingCTASection'

const page = () => {
  return (
    <main>
      <Hero />
      <AboutSection />
      <CoursesSection />
      <TuitionSection />
      <LearningApproachSection />
      {/* <ClosingCTASection /> */}
    </main>
  )
}

export default page