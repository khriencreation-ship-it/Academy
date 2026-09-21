"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";
import { FaUser, FaChevronDown, FaBuilding, FaRobot } from "react-icons/fa";
import { HiLogin } from "react-icons/hi";
import { MdLogin } from "react-icons/md";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Navlinks from "./Navlinks";
import { usePathname } from "next/navigation";

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
    const [isOrgOpen, setIsOrgOpen] = useState(false);
    const pathname = usePathname();

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

    const isOrgActive = pathname?.startsWith("/corporate-training") || pathname?.startsWith("/ai-training-for-organizations");

    return (
        <div className="bg-white lg:bg-black">
            <motion.header
                className={`max-w-screen fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-white shadow-md"
                    : "bg-white lg:bg-black"
                    }`}
                initial="hidden"
                animate="visible"
                variants={navVariants}
            >
                <div className="max-w-[1440px] mx-auto h-20 flex items-center px-4 lg:justify-evenly justify-between">
                    {/* Logo */}
                    <motion.div
                        variants={linkVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.1 }}
                    >
                        <Link href="/" className="text-2xl font-bold tracking-tight">
                            {/* logo-blackbg.png */}
                            <Image src={isScrolled ? "/academylogo.webp" : "/logo-blackbg.png"} className="hidden lg:block" priority alt="Academy Logo" width={100} height={100} />
                            <Image src="/academylogo.webp" priority alt="Academy Logo" className="block lg:hidden" width={100} height={100} />
                        </Link>
                    </motion.div>

                    {/* Navigation - Desktop */}
                    <nav className="hidden md:flex items-center justify-evenly w-[60%] lg:w-[55%]">
                        <motion.div
                            variants={linkVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.2 }}
                        >
                            <Navlinks href="/" isScrolled={isScrolled}>
                                Home
                            </Navlinks>
                        </motion.div>

                        <motion.div
                            variants={linkVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.3 }}
                        >
                            <Navlinks href="/about-us" isScrolled={isScrolled}>
                                About Us
                            </Navlinks>
                        </motion.div>

                        <motion.div
                            variants={linkVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.4 }}
                        >
                            <Navlinks href="/cohorts" isScrolled={isScrolled}>
                                Cohorts & Courses
                            </Navlinks>
                        </motion.div>

                        {/* Dropdown Menu for Organization */}
                        <motion.div
                            variants={linkVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.45 }}
                            className="relative"
                            onMouseEnter={() => setIsOrgOpen(true)}
                            onMouseLeave={() => setIsOrgOpen(false)}
                        >
                            <button
                                onClick={() => setIsOrgOpen(!isOrgOpen)}
                                className={`text-lg font-medium transition-colors duration-200 flex items-center gap-1.5 py-2 ${
                                    isOrgActive
                                        ? "text-brandPurple"
                                        : isScrolled
                                            ? "text-black hover:text-brandPurple"
                                            : "text-black lg:text-white hover:text-brandPurple"
                                }`}
                                aria-expanded={isOrgOpen}
                            >
                                For Organization
                                <FaChevronDown className={`text-xs transition-transform duration-200 ${isOrgOpen ? "rotate-180 text-brandPurple" : ""}`} />
                            </button>

                            <AnimatePresence>
                                {isOrgOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.18, ease: "easeOut" }}
                                        className={`absolute left-0 mt-1 w-72 rounded-xl p-2 shadow-2xl border ${
                                            isScrolled
                                                ? "bg-white border-gray-100 text-gray-900"
                                                : "bg-neutral-900 border-neutral-800 text-white"
                                        }`}
                                    >
                                        <Link
                                            href="/corporate-training"
                                            onClick={() => setIsOrgOpen(false)}
                                            className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-200 ${
                                                isScrolled
                                                    ? "hover:bg-purple-50 group"
                                                    : "hover:bg-neutral-800 group"
                                            }`}
                                        >
                                            <div className="p-2.5 rounded-lg bg-brandPurple/10 text-brandPurple group-hover:bg-brandPurple group-hover:text-white transition-colors duration-200 mt-0.5">
                                                <FaBuilding className="text-lg" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-sm group-hover:text-brandPurple transition-colors flex items-center gap-1.5">
                                                    AI Training
                                                    <span className="text-[10px] font-bold tracking-wide uppercase px-1.5 py-0.5 rounded bg-brandPurple/15 text-brandPurple">Teams</span>
                                                </div>
                                                <p className={`text-xs mt-0.5 leading-snug ${
                                                    isScrolled ? "text-gray-500" : "text-neutral-400"
                                                }`}>
                                                    Practical AI training for staff & corporate teams
                                                </p>
                                            </div>
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <motion.div
                            variants={linkVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.5 }}
                        >
                            <Navlinks href="/contact-us" isScrolled={isScrolled}>
                                Contact
                            </Navlinks>
                        </motion.div>
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
