import Image from "next/image";
import React from "react";

const AboutSection = () => {
    return ( 
        <section className="max-w-360 py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-12 mx-auto bg-black my-6 z-20">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="text-left">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-3xl font-normal mb-6 md:mb-8 text-white tracking-tight uppercase italic leading-tight">
                        <span className="text-brandPurple">Education</span> Built With <span className="text-brandPurple">Purpose</span>
                    </h2>
                    
                </div>
                <div className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                        <p>
                            We focus on clarity over complexity, structure over chaos, and learning that leads to real understanding.
                        </p>
                    </div>
            </div>
        </section>
    );
};

export default AboutSection;
