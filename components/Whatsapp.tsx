import React from 'react'

const WhatsApp = () => {
    const message = "Hello, I would like assistance from Khrien Academy. Kindly guide me on admissions, programs, or technical support."
    return (
        <section className='fixed bottom-6 lg:bottom-12 right-6 lg:right-12 z-50'>
            <a href={`https://wa.me/2349061593966?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer">
                <img src="/whatsapp.webp" alt="WhatsApp" className='w-16 h-16 rounded-full' />
            </a>
        </section>
    )
}

export default WhatsApp