import Hero from '@/components/home/Hero'
import AboutSection from '@/components/home/AboutSection'
import CoursesSection from '@/components/home/CoursesSection'
import TuitionSection from '@/components/home/TuitionSection'
import LearningApproachSection from '@/components/home/LearningApproachSection'
import FAQSection from '@/components/home/FAQSection'
import CohortsSection from '@/components/home/CohortsSection'

const page = () => {
  return (
    <main>
      <Hero />
      <AboutSection />
      <TuitionSection />
      <CoursesSection />
      <CohortsSection />
      <LearningApproachSection />
      <FAQSection />
    </main>
  )
}

export default page