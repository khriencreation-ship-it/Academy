import Image from "next/image";
import React from "react";

const AboutSection = () => {
    return (
        <section className="max-w-360 py-20 px-6 md:px-12 lg:px-24 mx-auto gap-20 bg-brand Green my-6 z-20 rounded-3xl flex justify-between items-center">
            <div className="w-1/2 max-w-5xl mx-auto text-left">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 text-black tracking-tight uppercase italic">
                    <span className="text-brandPurple">Education</span> Built With <span className="text-brandPurple">Purpose</span>
                </h2>
                <div className="space-y text-lg md:text-xl text-gray-600 leading-relaxed mt-4 max-w-2xl">
                    <p>
                        Khrien Academy was created to bridge the gap between curiosity and capability.
                        We focus on clarity over complexity, structure over chaos, and learning that leads to real understanding.
                        Our programs are carefully designed to help learners not just consume information, but apply knowledge in meaningful ways, at work, in projects, and in everyday problem-solving.
                    </p>
                </div>
            </div>
            <div className="w-1/2">
                <Image src="/random-image.webp" alt="About Image" width={700} height={700} />
            </div>
        </section>
    );
};

export default AboutSection;
