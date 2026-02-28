import Hero from '@/components/home/Hero'
import AboutSection from '@/components/home/AboutSection'
import CoursesSection from '@/components/home/CoursesSection'
import TuitionSection from '@/components/home/TuitionSection'
import LearningApproachSection from '@/components/home/LearningApproachSection'
import FAQSection from '@/components/home/FAQSection'
import CohortsSection from '@/components/home/CohortsSection'
import Introvideo from '@/components/home/Introvideo-section'

const page = () => {
  return (
    <main className='max-w-screen overflow-x-hidden'>
      <Hero />
      <AboutSection />
      <Introvideo />
      <TuitionSection />
      <CoursesSection />
      <CohortsSection />
      <LearningApproachSection />
      <FAQSection />
    </main>
  )
}

export default page