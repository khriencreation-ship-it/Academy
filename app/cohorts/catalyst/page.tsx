import CatalystHero from '@/components/cohorts/catalyst/CatalystHero';
import CatalystDetails from '@/components/cohorts/catalyst/CatalystDetails';
import CatalystCourses from '@/components/cohorts/catalyst/CatalystCourses';
import CatalystTutors from '@/components/cohorts/catalyst/CatalystTutors';
import CatalystPricing from '@/components/cohorts/catalyst/CatalystPricing';
import CatalystHowToApply from '@/components/cohorts/catalyst/CatalystHowToApply';
import Introvideo from '@/components/home/Introvideo-section';

export const metadata = {
    title: 'The Catalyst Cohort | Khrien Academy',
    description: '6 courses. Real skills. Built for where you are headed. Explore AI Foundations, UI/UX Design, WordPress Development, Product Management, Frontend Engineering, and Customer Success.',
};

export default function CatalystCohortPage() {
    return (
        <main className="bg-black min-h-screen">
            <CatalystHero />
            <CatalystDetails />
            <Introvideo />
            <CatalystCourses />
            <CatalystPricing />
            <CatalystHowToApply />
            <CatalystTutors />
        </main>
    );
}
