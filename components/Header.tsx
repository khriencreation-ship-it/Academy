"use client";

import Link from "next/link";
import React, { useState } from "react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold tracking-tight">
                    Khrien Academy
                </Link>

                {/* Navigation - Desktop */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link
                        href="/"
                        className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        href="/about"
                        className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
                    >
                        About Us
                    </Link>
                    <Link
                        href="/cohorts"
                        className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
                    >
                        Cohorts & Courses
                    </Link>
                    <Link
                        href="/tuition"
                        className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
                    >
                        Tuition & Dates
                    </Link>
                </nav>

                {/* Actions - Desktop */}
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        href="/apply"
                        className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-2.5 px-6 rounded-full transition-all duration-200 shadow-sm hover:shadow active:scale-95"
                    >
                        Apply Now
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
            {isMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-gray-100 shadow-lg px-6 py-8 flex flex-col gap-6 animate-in slide-in-from-top-2 fade-in duration-200">
                    <nav className="flex flex-col gap-4">
                        <Link
                            href="/"
                            className="text-lg font-medium text-gray-600 hover:text-black transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className="text-lg font-medium text-gray-600 hover:text-black transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About Us
                        </Link>
                        <Link
                            href="/cohorts"
                            className="text-lg font-medium text-gray-600 hover:text-black transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Cohorts & Courses
                        </Link>
                        <Link
                            href="/tuition"
                            className="text-lg font-medium text-gray-600 hover:text-black transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Tuition & Dates
                        </Link>
                    </nav>
                    <div className="flex flex-col gap-4">
                        <Link
                            href="/apply"
                            className="bg-purple-600 hover:bg-purple-700 text-white text-center text-lg font-semibold py-3 px-6 rounded-full transition-all duration-200 shadow-sm"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Apply Now
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
