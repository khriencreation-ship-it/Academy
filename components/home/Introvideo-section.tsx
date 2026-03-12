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

    const handlePlay = async (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (videoRef.current) {
            try {
                const playPromise = videoRef.current.play();
                if (playPromise !== undefined) {
                    await playPromise;
                    setIsPlaying(true);
                }
            } catch (err) {
                console.error("Video play failed:", err);
                // Fallback for mobile: try to play muted
                videoRef.current.muted = true;
                videoRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    return (
        <section className='relative mb-10 md:mb-20'>
            {/* Black background for top half */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-black z-0" />
            {/* White background for bottom half */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white z-0" />

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div 
                    className="relative w-full pb-[56.25%] group cursor-pointer bg-black rounded-xl md:rounded-2xl shadow-xl overflow-hidden"
                    onClick={() => !isPlaying && handlePlay()}
                >
                    {/* The Video Element */}
                    <video 
                        ref={videoRef}
                        className='absolute inset-0 w-full h-full object-cover'
                        preload='metadata'
                        playsInline
                        webkit-playsinline="true"
                        poster='/ChatGPT%20Image%20Mar%2010,%202026,%2004_09_32%20PM.png'
                        controls={isPlaying}
                        onPause={() => setIsPlaying(false)}
                        onPlay={() => setIsPlaying(true)}
                    >
                        <source
                            src="https://res.cloudinary.com/dxykd0g0s/video/upload/v1773315693/0310_cb6ffa.mp4"
                            type="video/mp4"
                        />
                    </video>

                    {/* Overlay UI - Using standard HTML instead of complex motion for initial debug if needed */}
                    <AnimatePresence>
                        {!isPlaying && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/20"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-16 h-16 md:w-28 md:h-28 bg-white text-black rounded-full flex items-center justify-center transition-all shadow-2xl"
                                    onClick={handlePlay}
                                >
                                    <Play fill="currentColor" className="ml-1 w-6 h-6 md:w-10 md:h-10" />
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}

export default Introvideo