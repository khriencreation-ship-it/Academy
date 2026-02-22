import React from 'react'

const Introvideo = () => {
    return (
        <section className='relative mb-20'>
            {/* Black background for top half */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-black z-0" />
            {/* White background for bottom half */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white z-0" />

            <div className="max-w-360 mx-auto h-150 relative z-10">
                <div className="max-w-6xl mx-auto relative h-150">
                    <video autoPlay muted loop playsInline
                        className='absolute top-0 left-0 inset-1 w-full h-full object-cover z-0 rounded-2xl'
                        preload='metadata'
                        poster='https://res.cloudinary.com/dluhzoptp/image/upload/f_auto,q_auto,w_1920/landingPage-poster_nlsczt'>
                        <source
                            src="https://res.cloudinary.com/dluhzoptp/video/upload/f_auto,q_auto,w_1920,h_1080,c_fill/landingPage-video_dsx4r1"
                            type="video/mp4"
                        />
                    </video>
                    <div className="absolute inset-0 bg-black/20 z-10 rounded-2xl" />
                </div>
            </div>
        </section>
    )
}

export default Introvideo