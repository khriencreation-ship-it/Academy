import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type NavlinksType = {
    href: string;
    children: React.ReactNode;
    isScrolled: boolean
}

const Navlinks = ({ href, children, isScrolled }: NavlinksType) => {
    const pathName = usePathname()
    const isActive = pathName === href

    const baseStyles = "text-lg font-medium transition-colors duration-200"

    const colorStyles = isActive
        ? "text-brandPurple"
        : isScrolled
            ? "text-black hover:text-brandPurple"
            : "text-black lg:text-white hover:text-brandPurple"

    return (
        <Link
            href={href}
            className={`${baseStyles} ${colorStyles}`}
        >
            {children}
        </Link>
    )
}

export default Navlinks