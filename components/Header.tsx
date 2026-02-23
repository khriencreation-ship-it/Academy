"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";
import { FaUser } from "react-icons/fa";
import { HiLogin } from "react-icons/hi";
import { MdLogin } from "react-icons/md";

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
        <div className="bg-white lg:bg-black">
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-white shadow-md"
                : "bg-white lg:bg-black"
                }`}>
                <div className="max-w-360 mx-auto  h-20 flex items-center px-4 lg:justify-evenly justify-between">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold tracking-tight">
                        <Image src="/academylogo.webp" alt="Academy Logo" width={100} height={100} />
                    </Link>

                    {/* Navigation - Desktop */}
                    <nav className="hidden md:flex items-center justify-evenly w-[40%]">
                        <Link
                            href="/"
                            className={`text-lg font-medium transition-colors ${isScrolled
                                ? "text-black hover:text-brandPurple"
                                : "text-white hover:text-brandPurple"
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/about-us"
                            className={`text-lg font-medium transition-colors ${isScrolled
                                ? "text-black hover:text-brandPurple"
                                : "text-white hover:text-brandPurple"
                                }`}
                        >
                            About Us
                        </Link>
                        <Link
                            href="/cohorts"
                            className={`text-lg font-medium transition-colors ${isScrolled
                                ? "text-black hover:text-brandPurple"
                                : "text-white hover:text-brandPurple"
                                }`}
                        >
                            Cohorts & Courses
                        </Link>
                    </nav>

                    {/* Actions - Desktop */}
                    <div className="hidden md:flex items-center justify-end gap-4">
                        <Link
                            href="/apply"
                            className="flex items-center gap-2 text-center rounded-sm text-white bg-brandPurple px-5 py-2 lg:py-2.5 hover:bg-brandPurple/90 hover:text-white transition-all duration-50 ease-in-out"
                        >
                            Apply Now
                            <FaUser className="text-xl" />
                        </Link>
                        <a
                            href="https://lms.khrien.com"
                            target="blank"
                            className={`flex items-center gap-2 text-center rounded-sm text-brandGreen  ${isScrolled ? "bg-white" : "bg-transparent"} px-5 py-2 lg:py-2 border-2 border-brandGreen hover:bg-brandGreen hover:text-white transition-all duration-200 ease-in-out`}
                        >
                            Login
                            <MdLogin className="text-xl" />
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={`md:hidden p-2 focus:outline-none ${isScrolled ? "text-gray-600" : "text-black lg:text-white"
                            }`}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && <MobileMenu setIsMenuOpen={setIsMenuOpen} />}
            </header>
        </div>
    );
};

export default Header;
