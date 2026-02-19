import Image from "next/image";
import React from "react";

const AboutSection = () => {
    return (
        <section className="max-w-360 py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-12 mx-auto bg-brandGreen my-6 z-20 rounded-2xl md:rounded-3xl">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="text-left">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8 text-black tracking-tight uppercase italic leading-tight">
                        <span className="text-brandPurple">Education</span> Built With <span className="text-brandPurple">Purpose</span>
                    </h2>
                    <div className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                        <p>
                            Khrien Academy was created to bridge the gap between curiosity and capability.
                            We focus on clarity over complexity, structure over chaos, and learning that leads to real understanding.
                            Our programs are carefully designed to help learners not just consume information, but apply knowledge in meaningful ways, at work, in projects, and in everyday problem-solving.
                        </p>
                    </div>
                </div>
                <div className="w-full">
                    <Image src="/random-image.webp" alt="About Image" width={700} height={700} className="w-full h-auto rounded-xl md:rounded-2xl" />
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
