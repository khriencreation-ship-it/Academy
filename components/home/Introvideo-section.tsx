"use client"
import React from 'react'
import { motion } from 'framer-motion'

// Animation variants
const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
};

const Introvideo = () => {
    return (
        <section className='relative mb-10 md:mb-20'>
            {/* Black background for top half */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-black z-0" />
            {/* White background for bottom half */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white z-0" />

            <div className="max-w-360 mx-auto h-80 sm:h-96 md:h-125 lg:h-150 relative z-10 px-4 md:px-0">
                <motion.div
                    className="max-w-6xl mx-auto relative h-full"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={scaleIn}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <video autoPlay muted loop playsInline
                        className='absolute top-0 left-0 w-full h-full object-cover z-0 rounded-xl md:rounded-2xl'
                        preload='metadata'
                        poster='https://res.cloudinary.com/dluhzoptp/image/upload/f_auto,q_auto,w_1920/landingPage-poster_nlsczt'>
                        <source
                            src="https://res.cloudinary.com/dluhzoptp/video/upload/f_auto,q_auto,w_1920,h_1080,c_fill/landingPage-video_dsx4r1"
                            type="video/mp4"
                        />
                    </video>
                    <div className="absolute inset-0 bg-black/20 z-10 rounded-xl md:rounded-2xl" />
                </motion.div>
            </div>
        </section>
    )
}

export default Introvideo