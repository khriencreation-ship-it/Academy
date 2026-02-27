
import HeroSection from '@/components/about/HeroSection';
import MissionAndVision from '@/components/about/MissionAndVision';
import BelieveSection from '@/components/about/BelieveSection';
import TeachingModel from '@/components/about/TeachingModel';
import LMSSection from '@/components/about/LMSSection';

export default function AboutPage() {
    return (
        <>
            <main className="overflow-x-auto">
                <HeroSection />
                <MissionAndVision />
                <BelieveSection />
                <TeachingModel />
                <LMSSection />
            </main>
        </>
    )
}