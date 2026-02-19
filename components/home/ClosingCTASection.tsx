import React from "react";
import Link from "next/link";

const ClosingCTASection = () => {
    return (
        <section className="bg-brandGreen text-white py-16 md:py-20 lg:py-24 px-4 md:px-8 rounded-2xl md:rounded-3xl my-6">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 tracking-tight leading-tight">
                    Start With Intention
                </h2>
                <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 mb-8 md:mb-10 leading-relaxed max-w-3xl mx-auto">
                    Whether you're beginning something new or building on what you already know, Khrien Academy offers a clear and supportive path forward.
                </p>
                <Link
                    href="/apply"
                    className="inline-block bg-brandPurple text-white font-semibold px-8 md:px-10 py-2.5 md:py-3 rounded-full hover:opacity-90 transition-all duration-300 text-base md:text-lg shadow-md hover:shadow-lg"
                >
                    Secure Your Spot
                </Link>
            </div>
        </section>
    );
};

export default ClosingCTASection;