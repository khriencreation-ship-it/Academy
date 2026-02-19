"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import MobileMenu from "./MobileMenu";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-3xl border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold tracking-tight">
                    <Image src="/academylogo.webp" alt="Academy Logo" width={100} height={100} />
                </Link>

                {/* Navigation - Desktop */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link
                        href="/"
                        className="text-lg font-medium text-black hover:text-brandPurple transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        href="/about-us"
                        className="text-lg font-medium text-black hover:text-brandPurple transition-colors"
                    >
                        About Us
                    </Link>
                    <Link
                        href="/cohorts"
                        className="text-lg font-medium text-black hover:text-brandPurple transition-colors"
                    >
                        Cohorts & Courses
                    </Link>
                    <Link
                        href="/tuition"
                        className="text-lg font-medium text-black hover:text-brandPurple transition-colors"
                    >
                        Tuition & Dates
                    </Link>
                </nav>

                {/* Actions - Desktop */}
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        href="/apply"
                        className="text-center rounded-full text-white font-semibold bg-brandPurple px-10 py-2 lg:py-3 hover:bg-brandPurple hover:text-white transition-all duration-50 ease-in-out"
                    >
                        Apply to Learn
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-gray-600 focus:outline-none"
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
    );
};

export default Header;
