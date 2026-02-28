import React from 'react'
import { FaShieldAlt, FaUser, FaDatabase, FaPhone, FaLock, FaShareAlt, FaClock, FaCookieBite, FaPen, FaEnvelope } from 'react-icons/fa'

export default function PrivacyPolicy() {
    return (
        <div className="bg-white">
            {/* Header Section */}
            <div className="bg-black pt-24 pb-12">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-medium text-white">
                        Privacy <span className="text-brandPurple">Policy</span>
                    </h1>
                    <p className="mt-4 text-white/70">
                        How we collect, use, and protect your information.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="bg-white text-black">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                    <div className="space-y-12">

                        {/* Introduction */}
                        <section className="space-y-4">
                            <h2 className="text-xl sm:text-2xl font-semibold">
                                Introduction
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                At Khrien Academy, we respect your privacy and are committed to protecting your personal information.
                                This Privacy Policy explains how we collect, use, and protect your information when you use our website,
                                apply for our programs, or participate in our courses. By using our website or services, you agree to the terms of this Privacy Policy.
                            </p>
                        </section>

                        {/* Information We Collect */}
                        <section className="space-y-6">
                            <h2 className="text-xl sm:text-2xl font-semibold">
                                Information We Collect
                            </h2>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <h3 className="text-base sm:text-lg font-semibold">
                                        Personal Information
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                        When you apply or register, we may collect:
                                    </p>
                                    <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-1">
                                        <li>Full Name</li>
                                        <li>Email Address</li>
                                        <li>Phone Number</li>
                                        <li>Educational or Professional Background</li>
                                        <li>Application Responses</li>
                                    </ul>
                                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                        This information helps us review applications and deliver our programs.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-base sm:text-lg font-semibold">
                                        Account Information
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                        When you become a student, we may collect:
                                    </p>
                                    <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-1">
                                        <li>Login details</li>
                                        <li>Course activity</li>
                                        <li>Assignment submissions</li>
                                        <li>Progress records</li>
                                    </ul>
                                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                        This helps us provide your learning experience.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-base sm:text-lg font-semibold">
                                        Technical Information
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                        When you visit our website, we may automatically collect:
                                    </p>
                                    <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-1">
                                        <li>Browser type</li>
                                        <li>Device type</li>
                                        <li>IP address</li>
                                        <li>Pages visited</li>
                                    </ul>
                                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                        This helps us improve our website and services.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* How We Use Your Information */}
                        <section className="space-y-4">
                            <h2 className="text-xl sm:text-2xl font-semibold">
                                How We Use Your Information
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                We use your information to:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-2">
                                <li>Review your application</li>
                                <li>Communicate with you</li>
                                <li>Provide courses and learning materials</li>
                                <li>Track learning progress</li>
                                <li>Improve our programs</li>
                                <li>Send updates and important announcements</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                We only collect information that helps us deliver a better learning experience.
                            </p>
                        </section>

                        {/* Communication */}
                        <section className="space-y-4">
                            <h2 className="text-xl sm:text-2xl font-semibold">
                                Communication
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                By applying to Khrien Academy, you agree that we may contact you through:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-2">
                                <li>Email</li>
                                <li>Phone</li>
                                <li>SMS</li>
                                <li>Official social media channels</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                These communications may include: Application updates, Program information, Important notices
                            </p>
                        </section>

                        {/* Data Protection */}
                        <section className="space-y-4">
                            <h2 className="text-xl sm:text-2xl font-semibold">
                                Data Protection
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                We take reasonable steps to protect your information. Your data is stored securely and only accessible
                                to authorized team members. We use modern technologies and security practices to protect your information.
                            </p>
                        </section>

                        {/* Data Sharing */}
                        <section className="space-y-4">
                            <h2 className="text-xl sm:text-2xl font-semibold">
                                Data Sharing
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                We do not sell or rent your personal information. We may share limited information with trusted
                                service providers who help us operate our platform, such as:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-2">
                                <li>Hosting providers</li>
                                <li>Payment processors</li>
                                <li>Communication tools</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                These partners are required to protect your information.
                            </p>
                        </section>

                        {/* Data Retention */}
                        <section className="space-y-4">
                            <h2 className="text-xl sm:text-2xl font-semibold">
                                Data Retention
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                We keep your information for as long as necessary to:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-2">
                                <li>Provide our services</li>
                                <li>Maintain records</li>
                                <li>Improve our programs</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                You may request deletion of your data at any time.
                            </p>
                        </section>

                        {/* Your Rights */}
                        <section className="space-y-4">
                            <h2 className="text-xl sm:text-2xl font-semibold">
                                Your Rights
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                You may request to:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-2">
                                <li>Access your data</li>
                                <li>Correct your information</li>
                                <li>Delete your information</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                Requests can be made through our contact page.
                            </p>
                        </section>

                        {/* Cookies */}
                        <section className="space-y-4">
                            <h2 className="text-xl sm:text-2xl font-semibold">
                                Cookies
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                Our website may use cookies to improve user experience. Cookies help us:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-2">
                                <li>Remember preferences</li>
                                <li>Improve performance</li>
                                <li>Understand usage</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                You may disable cookies in your browser settings.
                            </p>
                        </section>

                        {/* Changes to This Policy */}
                        <section className="space-y-4">
                            <h2 className="text-xl sm:text-2xl font-semibold">
                                Changes to This Policy
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                We may update this Privacy Policy from time to time. Updates will be posted on this page.
                            </p>
                        </section>

                        {/* Contact Us */}
                        <section className="space-y-4 pt-6 border-t">
                            <h2 className="text-xl sm:text-2xl font-semibold">
                                Contact Us
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                If you have questions about this Privacy Policy, you may contact us through the <a href="/contact-us" className="text-brandPurple underline hover:text-brandPurple/80">Contact page</a>.
                            </p>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    )
}
