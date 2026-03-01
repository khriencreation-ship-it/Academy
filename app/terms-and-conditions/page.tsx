import React from 'react'
import Link from 'next/link'

export default function TermsAndConditions() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="bg-black pt-24 pb-12 sm:pt-28 sm:pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight mb-4">
                        Terms and <span className="text-brandPurple">Conditions</span>
                    </h1>
                    <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
                        These Terms and Conditions govern your use of our website and participation in our programs.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                <div className="space-y-10">
                    {/* Introduction */}
                    <section>
                        <h2 className="text-xl sm:text-2xl font-semibold text-black mb-4">Introduction</h2>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                            Welcome to Khrien Academy. These Terms and Conditions govern your use of our website and participation
                            in our programs. By using our website or enrolling in our programs, you agree to these terms.
                        </p>
                    </section>

                    {/* Programs and Courses */}
                    <section>
                        <h2 className="text-xl sm:text-2xl font-semibold text-black mb-4">Programs and Courses</h2>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
                            Khrien Academy provides structured learning programs designed to help students build practical skills.
                        </p>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
                            Course materials may include:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-2 ml-2 mb-4">
                            <li>Video lessons</li>
                            <li>Assignments</li>
                            <li>Live sessions</li>
                            <li>Learning resources</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                            Access to course materials is limited to enrolled students.
                        </p>
                    </section>

                    {/* Enrollment */}
                    <section>
                        <h2 className="text-xl sm:text-2xl font-semibold text-black mb-4">Enrollment</h2>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
                            Enrollment is subject to application review and acceptance.
                        </p>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
                            Submitting an application does not guarantee admission.
                        </p>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                            Khrien Academy reserves the right to accept or decline applications.
                        </p>
                    </section>

                    {/* Tuition Fees */}
                    <section>
                        <h2 className="text-xl sm:text-2xl font-semibold text-black mb-4">Tuition Fees</h2>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
                            Tuition fees must be paid according to the payment plan selected.
                        </p>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
                            Access to courses may be restricted if payments are incomplete.
                        </p>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                            All fees are stated on the Tuition & Dates page.
                        </p>
                    </section>

                    {/* Refund Policy */}
                    <section>
                        <h2 className="text-xl sm:text-2xl font-semibold text-black mb-4">Refund Policy</h2>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
                            Tuition fees are generally non-refundable once a program has started.
                        </p>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
                            In exceptional cases, requests may be reviewed individually.
                        </p>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                            Application is free unless otherwise stated.
                        </p>
                    </section>

                    {/* Student Responsibilities */}
                    <section>
                        <h2 className="text-xl sm:text-2xl font-semibold text-black mb-4">Student Responsibilities</h2>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
                            Students are expected to:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-2 ml-2 mb-4">
                            <li>Participate actively</li>
                            <li>Complete assignments</li>
                            <li>Attend scheduled sessions</li>
                            <li>Respect tutors and fellow students</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                            Khrien Academy reserves the right to remove students who violate community standards.
                        </p>
                    </section>

                    {/* Intellectual Property */}
                    <section>
                        <h2 className="text-xl sm:text-2xl font-semibold text-black mb-4">Intellectual Property</h2>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
                            All course materials are owned by Khrien Academy. This includes:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-2 ml-2 mb-4">
                            <li>Videos</li>
                            <li>Documents</li>
                            <li>Designs</li>
                            <li>Systems</li>
                            <li>Learning content</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
                            Students may not:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-2 ml-2 mb-4">
                            <li>Copy materials</li>
                            <li>Share materials</li>
                            <li>Sell materials</li>
                            <li>Redistribute materials</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                            Course access is for personal learning only.
                        </p>
                    </section>

                    {/* Platform Access */}
                    <section>
                        <h2 className="text-xl sm:text-2xl font-semibold text-black mb-4">Platform Access</h2>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
                            Students will receive access to the learning platform during the program period.
                        </p>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
                            Access may be removed after the program ends.
                        </p>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                            Extended access may be granted at Khrien Academy's discretion.
                        </p>
                    </section>

                    {/* Account Security */}
                    <section>
                        <h2 className="text-xl sm:text-2xl font-semibold text-black mb-4">Account Security</h2>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
                            Students are responsible for protecting their login details.
                        </p>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
                            Accounts should not be shared with others.
                        </p>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                            Khrien Academy is not responsible for unauthorized account use.
                        </p>
                    </section>

                    {/* Schedule Changes */}
                    <section>
                        <h2 className="text-xl sm:text-2xl font-semibold text-black mb-4">Schedule Changes</h2>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
                            Khrien Academy may adjust:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-2 ml-2 mb-4">
                            <li>Course schedules</li>
                            <li>Tutors</li>
                            <li>Content</li>
                            <li>Session times</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                            Changes will be communicated in advance where possible.
                        </p>
                    </section>

                    {/* Limitation of Liability */}
                    <section>
                        <h2 className="text-xl sm:text-2xl font-semibold text-black mb-4">Limitation of Liability</h2>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
                            Khrien Academy provides educational services. We do not guarantee:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-2 ml-2 mb-4">
                            <li>Employment</li>
                            <li>Income</li>
                            <li>Business success</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                            Results depend on individual effort and commitment.
                        </p>
                    </section>

                    {/* Termination */}
                    <section>
                        <h2 className="text-xl sm:text-2xl font-semibold text-black mb-4">Termination</h2>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
                            Khrien Academy may suspend or terminate access if:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-2 ml-2 mb-4">
                            <li>Rules are violated</li>
                            <li>Payments are not completed</li>
                            <li>Misuse of the platform occurs</li>
                        </ul>
                    </section>

                    {/* Updates to Terms */}
                    <section>
                        <h2 className="text-xl sm:text-2xl font-semibold text-black mb-4">Updates to Terms</h2>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                            These Terms may be updated from time to time. The latest version will always appear on this page.
                        </p>
                    </section>

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
    )
}
