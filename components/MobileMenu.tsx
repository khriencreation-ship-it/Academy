import Link from 'next/link'
import React from 'react'
import { FaUser } from 'react-icons/fa';

interface MobileMenuProps {
    setIsMenuOpen: (isOpen: boolean) => void;
}

const MobileMenu = ({ setIsMenuOpen }: MobileMenuProps) => {
    return (
        <div className="md:hidden absolute top-20 left-0 right-0 h-[90vh] justify-between bg-white border-b border-gray-100 shadow-lg px-6 py-8 flex flex-col gap-6 animate-in slide-in-from-top-2 fade-in duration-200 z-50">
            <nav className="flex flex-col gap-8">
                <Link
                    href="/"
                    className="text-xl font-medium text-gray-600 hover:text-black transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                >
                    Home
                </Link>
                <Link
                    href="/about-us"
                    className="text-xl font-medium text-gray-600 hover:text-black transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                >
                    About Us
                </Link>
                <Link
                    href="/cohorts"
                    className="text-xl font-medium text-gray-600 hover:text-black transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                >
                    Cohorts & Courses
                </Link>
            </nav>
            <div className="flex flex-col justify-center items-center gap-4">
                <Link
                    href="/apply"
                    className="flex items-center gap-2 text-center rounded-sm text-white bg-brandPurple px-5 py-2 lg:py-2.5 hover:bg-brandPurple/90 hover:text-white transition-all duration-50 ease-in-out"
                    onClick={() => setIsMenuOpen(false)}
                >
                    Apply
                    <FaUser className="text-xl" />
                </Link>
            </div>
        </div>
    )
}

export default MobileMenu