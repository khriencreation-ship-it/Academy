
import HeroSection from '@/components/about/HeroSection';
import Introvideo from '@/components/home/Introvideo-section';
import MissionAndVision from '@/components/about/MissionAndVision';
import BelieveSection from '@/components/about/BelieveSection';
import TeachingModel from '@/components/about/TeachingModel';

export default function AboutPage() {
    return (
        <>
            <main className="">
                <HeroSection />
                <Introvideo />
                <MissionAndVision />
                <BelieveSection />
                <TeachingModel />
            </main>
        </>
    )
}