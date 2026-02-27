"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";
import { FaUser } from "react-icons/fa";
import { HiLogin } from "react-icons/hi";
import { MdLogin } from "react-icons/md";
import { motion, AnimatePresence, Variants } from "framer-motion";

// Animation variants with proper typing
const navVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

const linkVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    }
};

const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    }
};

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="bg-white  lg:bg-black">
            <motion.header
                className={`max-w-screen fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-white shadow-md"
                    : "bg-white lg:bg-black"
                    }`}
                initial="hidden"
                animate="visible"
                variants={navVariants}
            >
                <div className="max-w-360 mx-auto h-20 flex items-center px-4 lg:justify-evenly justify-between">
                    {/* Logo */}
                    <motion.div
                        variants={linkVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.1 }}
                    >
                        <Link href="/" className="text-2xl font-bold tracking-tight">
                            {/* logo-blackbg.png */}
                            <Image src={isScrolled ? "/academylogo.webp" : "/logo-blackbg.png"} className="hidden md:block" priority alt="Academy Logo" width={100} height={100} />
                            <Image src="/academylogo.webp" priority alt="Academy Logo" className="block md:hidden" width={100} height={100} />
                        </Link>
                    </motion.div>

                    {/* Navigation - Desktop */}
                    <nav className="hidden md:flex items-center justify-evenly w-[50%]">
                        {[
                            { href: "/", label: "Home" },
                            { href: "/about-us", label: "About Us" },
                            { href: "/cohorts", label: "Cohorts & Courses" },
                            { href: "/contact-us", label: "Contact" }
                        ].map((link, i) => (
                            <motion.div
                                key={link.href}
                                variants={linkVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 0.2 + i * 0.1 }}
                            >
                                <Link
                                    href={link.href}
                                    className={`text-lg font-medium transition-colors ${isScrolled
                                        ? "text-black hover:text-brandPurple"
                                        : "text-white hover:text-brandPurple"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    {/* Actions - Desktop */}
                    <div className="hidden md:flex items-center justify-end gap-4">
                        <motion.div
                            variants={buttonVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.4 }}
                        >
                            <Link
                                href="/apply"
                                className="flex items-center gap-2 text-center rounded-sm text-white bg-brandPurple px-5 py-2 lg:py-2.5 hover:bg-brandPurple/90 hover:text-white transition-all duration-50 ease-in-out"
                            >
                                Apply Now
                                <FaUser className="text-xl" />
                            </Link>
                        </motion.div>
                        <motion.div
                            variants={buttonVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.5 }}
                        >
                            <a
                                href="https://lms.khrien.com"
                                target="blank"
                                className={`flex items-center gap-2 text-center rounded-sm text-brandPurple  ${isScrolled ? "bg-white" : "bg-transparent"} px-5 py-2 lg:py-2 border-2 border-brandPurple hover:bg-brandPurple hover:text-white transition-all duration-200 ease-in-out`}
                            >
                                Login
                                <MdLogin className="text-xl" />
                            </a>
                        </motion.div>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className={`md:hidden p-2 focus:outline-none ${isScrolled ? "text-gray-600" : "text-black lg:text-white"
                            }`}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        variants={buttonVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.3 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <AnimatePresence mode="wait">
                            {isMenuOpen ? (
                                <motion.svg
                                    key="close"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </motion.svg>
                            ) : (
                                <motion.svg
                                    key="menu"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    />
                                </motion.svg>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {isMenuOpen && <MobileMenu setIsMenuOpen={setIsMenuOpen} />}
                </AnimatePresence>
            </motion.header>
        </div>
    );
};

export default Header;
