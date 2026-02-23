import React from 'react'
import Image from 'next/image'

const HeroSection = () => {
    return (
        <section className="relative h-screen w-full overflow-hidden">

            <Image
                src="/about-us/image-one.jpg"
                alt="Hero"
                fill
                priority
                className="object-cover"
            />

            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
                <h1 className="text-3xl sm:text-6xl font-normal tracking-tight text-white leading-tight mb-6 md:mb-8">
                    Built to Help You{' '}
                    <span className="text-brandPurple">Grow With Purpose</span>
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
                    Khrien Academy is a future-focused learning institution built to help individuals develop
                    practical, relevant skills for a rapidly evolving world.
                </p>
            </div>
        </section>
    )
}

export default HeroSection