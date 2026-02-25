"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaPhone, FaWhatsapp, FaClock, FaMapMarkerAlt } from 'react-icons/fa'
import Image from 'next/image';

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const contactInfo = [
    {
        icon: FaEnvelope,
        title: 'Email Us',
        details: 'support@khrien.com',
        link: 'mailto:support@khrien.com',
        color: 'text-brandPurple',
        bgColor: 'bg-brandPurple/10',
        description: 'Send us an email anytime'
    },
    {
        icon: FaPhone,
        title: 'Call Us',
        details: '+234 813 595 2169',
        link: 'tel:+2348135952169',
        color: 'text-brandGreen',
        bgColor: 'bg-brandGreen/10',
        description: 'Mon-Fri from 9am to 6pm'
    },
    {
        icon: FaWhatsapp,
        title: 'WhatsApp',
        details: '+234 813 595 2169',
        link: 'https://wa.me/2348135952169',
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
        description: 'Chat with us instantly'
    },
]

const ContactInfo = () => {
    return (
        <section className="bg-black relative h-screen w-screen flex items-center justify-center p-3 pt-32 md:pt-0">
            <div className="max-w-360 mx-auto">
                {/* Header */}
                <motion.div
                    className="text-center mb-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white tracking-tight mb-3 sm:mb-4">
                        Contact Information
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto">
                        Choose the most convenient way to reach us. We're here to help!
                    </p>
                </motion.div>

                {/* Contact Cards */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                >
                    {contactInfo.map((contact, index) => {
                        const IconComponent = contact.icon;
                        return (
                            <motion.a
                                key={index}
                                href={contact.link}
                                target={contact.link.startsWith('https') ? '_blank' : undefined}
                                rel={contact.link.startsWith('https') ? 'noopener noreferrer' : undefined}
                                className="group bg-white/5 border border-white/10 hover:bg-white/10 transition-colors rounded-2xl p-6 sm:p-8 hover:border-brandPurple hover:shadow-xl duration-300 text-center"
                                variants={fadeInUp}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            >
                                <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full ${contact.bgColor} flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <IconComponent className={`text-2xl sm:text-3xl ${contact.color}`} />
                                </div>
                                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2">
                                    {contact.title}
                                </h3>
                                <p className="text-base sm:text-lg text-brandPurple font-medium mb-2">
                                    {contact.details}
                                </p>
                                <p className="text-sm text-white/80">
                                    {contact.description}
                                </p>
                            </motion.a>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    )
}

export default ContactInfo
