'use client'

import Link from "next/link"
import { useState } from "react"



const Form = () => {
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        phone: '',
        motivation: '',
        goals: '',
        experience: '',
        referral: '',
    })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: send form data to backend
        setSubmitted(true)
    }

      
    if (submitted) {
        return (
            <main className="px-4 lg:px-9">
                <section className="min-h-[70vh] flex items-center justify-center py-24 px-6">
                    <div className="max-w-lg mx-auto text-center">
                        <div className="text-6xl mb-6">🎉</div>
                        <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 tracking-tight">
                            Application Received!
                        </h1>
                        <p className="text-lg text-gray-700 leading-relaxed mb-8">
                            Thank you for applying to Khrien Academy. Our team will review your application
                            and reach out with next steps.
                        </p>
                        <Link
                            href="/"
                            className="inline-block bg-brandPurple text-white font-semibold px-10 py-4 rounded-full hover:opacity-90 transition-all duration-300 text-lg"
                        >
                            Back to Home
                        </Link>
                    </div>
                </section>
            </main>
        )
    }


  return (
    <main className="px-4 lg:px-9">

            {/* ── Hero ── */}
            <section className="py-24 my-20 px-6 md:px-0 text-center max-w-4xl mx-auto">
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight mb-4">
                    Apply to <span className="text-brandPurple">Khrien Academy</span>
                </h1>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
                    Applying to Khrien Academy is the first step toward a structured and intentional learning experience.
                    This application helps us understand your background, goals, and expectations so we can create the
                    best possible learning environment for each cohort.
                </p>
            </section>

            {/* ── Form ── */}
            <section className="pb-24 px-6 md:px-0 max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Full Name */}
                    <div>
                        <label htmlFor="fullName" className="block text-base font-semibold text-white mb-2">
                            Full Name
                        </label>
                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            required
                            placeholder="Enter your legal name"
                            value={form.fullName}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-5 py-4 text-base text-white placeholder:text-white/80 focus:outline-none focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/20 transition-all duration-200"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-base font-semibold text-white mb-2">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="We'll use this to communicate important updates"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-5 py-4 text-base text-white placeholder:text-white/80 focus:outline-none focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/20 transition-all duration-200"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label htmlFor="phone" className="block text-base font-semibold text-white mb-2">
                            Phone Number
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            placeholder="WhatsApp-enabled preferred"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-5 py-4 text-base text-white placeholder:text-white/80 focus:outline-none focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/20 transition-all duration-200"
                        />
                    </div>

                    {/* Motivation */}
                    <div>
                        <label htmlFor="motivation" className="block text-base font-semibold text-white mb-2">
                            Why do you want to join Khrien Academy?
                        </label>
                        <textarea
                            id="motivation"
                            name="motivation"
                            required
                            rows={4}
                            placeholder="Tell us briefly what motivated you to apply"
                            value={form.motivation}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-5 py-4 text-base text-white placeholder:text-white/80 focus:outline-none focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/20 transition-all duration-200 resize-none"
                        />
                    </div>

                    {/* Goals */}
                    <div>
                        <label htmlFor="goals" className="block text-base font-semibold text-white mb-2">
                            What do you hope to gain from this program?
                        </label>
                        <textarea
                            id="goals"
                            name="goals"
                            required
                            rows={4}
                            placeholder="Skills, clarity, career growth, personal development, etc."
                            value={form.goals}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-5 py-4 text-base text-white placeholder:text-white/80 focus:outline-none focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/20 transition-all duration-200 resize-none"
                        />
                    </div>

                    {/* Experience */}
                    <div>
                        <label className="block text-base font-semibold text-white mb-3">
                            Do you have any prior experience with this subject?
                        </label>
                        <div className="flex flex-col sm:flex-row gap-4">
                            {['None', 'Beginner', 'Some experience'].map((option) => (
                                <label
                                    key={option}
                                    className={`flex-1 cursor-pointer rounded-xl border-2 px-5 py-4 text-center font-medium transition-all duration-200 ${form.experience === option
                                            ? 'border-brandPurple bg-brandPurple/20 text-white'
                                            : 'border-gray-200 text-white/60 hover:border-gray-300'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="experience"
                                        value={option}
                                        checked={form.experience === option}
                                        onChange={handleChange}
                                        className="sr-only"
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Referral */}
                    <div>
                        <label htmlFor="referral" className="block text-base font-semibold text-white mb-2">
                            How did you hear about Khrien Academy?
                            <span className="text-white/60 font-normal ml-2">Optional</span>
                        </label>
                        <input
                            id="referral"
                            name="referral"
                            type="text"
                            placeholder="e.g. Social media, a friend, search engine..."
                            value={form.referral}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-5 py-4 text-base text-white placeholder:text-white/80 focus:outline-none focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/20 transition-all duration-200"
                        />
                    </div>

                    {/* Submit */}
                    <div className=" flex justify-center">
                    <button
                        type="submit"
                        className=" bg-brandPurple text-white font-bold py-3 px-6 rounded-full text-lg hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg mt-4 cursor-pointer"
                    >
                        Submit Application
                    </button>
                    </div>

                    <p className="text-center text-sm text-white/80">
                        No application fee • Applications reviewed within 48 hours
                    </p>
                </form>
            </section>

        </main>
  )
}

export default Form