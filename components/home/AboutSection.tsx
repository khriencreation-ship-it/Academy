import Image from "next/image";
import React from "react";

const AboutSection = () => {
    return (
        <div className="bg-black">
            <section className="max-w-360 py-8 sm:py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-12 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl max-w-md font-normal mb-4 sm:mb-6 md:mb-8 text-white tracking-tight leading-tight mx-auto md:mx-0">
                            Education Built With Purpose.
                        </h2>

                    </div>
                    <div className="text-sm sm:text-base md:text-lg lg:text-xl text-white leading-relaxed text-center md:text-left">
                        <p>
                            We focus on clarity over complexity, structure over chaos, and learning that leads to real understanding.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutSection;
