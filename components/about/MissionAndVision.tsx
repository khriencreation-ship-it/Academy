import React from 'react'
import Image from 'next/image'

const MissionAndVision = () => {
    return (
        <div className="bg-white py-16">
            <section className="max-w-360 mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Text Column */}
                    <div className="text-black space-y-6">
                        <h2 className="text-3xl md:text-4xl font-semibold">
                            Our Mission
                        </h2>

                        <p className="text-lg text-black/80 leading-relaxed max-w-lg">
                            To provide high-quality, accessible education that empowers learners
                            to grow, adapt, and build confidently in a changing world.
                        </p>
                    </div>

                    {/* Image Column */}
                    <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden">
                        <Image
                            src="/about-us/image-one.jpg"
                            alt="Mission"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="order-2 md:order-1 relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden">
                        <Image
                            src="/about-us/image-two.jpg"
                            alt="Vision"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="order-1 md:order-2 text-black space-y-6">
                        <h2 className="text-3xl md:text-4xl font-semibold">
                            Our Vision
                        </h2>

                        <p className="text-lg text-black/80 leading-relaxed max-w-lg">
                            To be a trusted institution that cultivates innovation, confidence, and excellence in every learner.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default MissionAndVision
