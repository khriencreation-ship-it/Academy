import React from "react";
import Hero from "@/components/home/Hero";
import CohortSection from "@/components/home/CohortSection";
import CourseSection from "@/components/home/CourseSection";
import HowItWorks from "@/components/home/HowItWorks";
import WhoIsThisFor from "@/components/home/WhoIsThisFor";
import CallToAction from "@/components/home/CallToAction";

const Home = () => {
    return (
        <main className="min-h-screen bg-white pt-20">
            <Hero />
            <CohortSection />
            <CourseSection />
            <HowItWorks />
            <WhoIsThisFor />
            <CallToAction />
        </main>
    );
};

export default Home;
