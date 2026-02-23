import Hero from '@/components/home/Hero'
import AboutSection from '@/components/home/AboutSection'
import CoursesSection from '@/components/home/CoursesSection'
import TuitionSection from '@/components/home/TuitionSection'
import LearningApproachSection from '@/components/home/LearningApproachSection'
import FAQSection from '@/components/home/FAQSection'
import Introvideo from '@/components/home/Introvideo-section'
import WhatsApp from '@/components/Whatsapp'

const page = () => {
  return (
    <main>
      <WhatsApp />
      <Hero />
      <AboutSection />
      <Introvideo />
      <TuitionSection />
      <CoursesSection />
      <FAQSection />
      <LearningApproachSection />
    </main>
  )
}

export default page