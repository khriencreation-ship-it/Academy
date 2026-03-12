"use client"
import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play } from 'lucide-react'

// Animation variants
const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
};

const Introvideo = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handlePlay = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <section className='relative mb-10 md:mb-20'>
            {/* Black background for top half */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-black z-0" />
            {/* White background for bottom half */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white z-0" />

            <div className="max-w-360 mx-auto h-80 sm:h-96 md:h-125 lg:h-150 relative z-10 px-4 md:px-0">
                <motion.div
                    className="max-w-6xl mx-auto relative h-full group cursor-pointer"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={scaleIn}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    onClick={() => !isPlaying && handlePlay()}
                >
                    <video 
                        ref={videoRef}
                        controls={isPlaying}
                        className='absolute top-0 left-0 w-full h-full object-cover z-0 rounded-xl md:rounded-2xl'
                        preload='auto'
                        playsInline
                        webkit-playsinline="true"
                        poster='/ChatGPT Image Mar 10, 2026, 04_09_32 PM.png'
                        onPause={() => setIsPlaying(false)}
                        onPlay={() => setIsPlaying(true)}
                    >
                        <source
                            src="https://res.cloudinary.com/dxykd0g0s/video/upload/v1773315693/0310_cb6ffa.mp4"
                            type="video/mp4"
                        />
                    </video>

                    <AnimatePresence>
                        {!isPlaying && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/30 z-20 rounded-xl md:rounded-2xl flex items-center justify-center"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-20 h-20 md:w-28 md:h-28 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white transition-colors hover:bg-white/30"
                                    onClick={handlePlay}
                                >
                                    <Play size={40} fill="currentColor" className="ml-1" />
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    )
}

export default Introvideo