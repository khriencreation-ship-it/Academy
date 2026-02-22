import React from "react";
import Link from "next/link";

import Image from "next/image";
const TuitionSection = () => {
    return (
        <section className="bg-white py-12 relative ">
            <div className="max-w-360 mx-auto h-96 relative">
                <div className="absolute top-0 left-1/2 bg-red-400 -translate-x-1/2 -z-10 pointer-events-none">
                    <Image
                        src="/lines/bg-line-center.webp"
                        alt="Background lines"
                        width={900}
                        height={900}
                        className="opacity-100"
                    />
                </div>
                <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-8">
                        <Image src="/home/imageOne.jpg" alt="Quiz" width={500} height={500} className="border border-brandGreen rounded-lg" />
                        <Image src="/home/live-class.png" alt="Live Class" width={400} height={400} className="shadow-2xl rounded-lg" />
                    </div>
                    <div className="flex flex-col gap-8 justify-end items-center">
                        <Image src="/home/quiz.png" alt="Quiz" width={400} height={400} className='shadow-2xl rounded-lg' />
                        <Image src="/home/imageTwo.jpg" alt="Quiz" width={250} height={300} className="border border-brandPurple object-cover rounded-lg" />

                    </div>
                </div>
            </div>
        </section>
    );
};

export default TuitionSection;
