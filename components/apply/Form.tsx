"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Script from "next/script";
import { motion } from "framer-motion";
import * as zod from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaInstagram } from "react-icons/fa";
import { Loader2 } from "lucide-react";

const validationSchema = zod.object({
  fullName: zod.string().min(1, "Full name is required"),
  email: zod.string().email("Invalid email address"),
  phone: zod.string().min(1, "Phone number is required"),
  motivation: zod.string().min(1, "Motivation is required"),
  goals: zod.string().min(1, "Goals are required"),
  experience: zod.enum(["None", "Beginner", "Some experience"],
    {
      message: "Experience is required",
    }),
  referral: zod.string().optional(),
  website: zod.string().optional(), // Honeypot field
  turnstileToken: zod.string().optional(),
  loadTime: zod.number().optional(),
})

type FormData = zod.infer<typeof validationSchema>

const Form = () => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      motivation: "",
      goals: "",
      experience: "None",
      referral: "",
      website: "",
      turnstileToken: "",
      loadTime: Date.now(),
    },
  })
  const experience = watch("experience");

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const formLoadTime = useRef<number>(Date.now());

  // Turnstile callback
  const onTurnstileVerify = (token: string) => {
    setTurnstileToken(token);
  };

  const formSubmit = async (data: FormData) => {
    // Log the apply click
    fetch('/api/analytics/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event_type: 'apply_click' })
    }).catch(console.error);

    setIsSubmitting(true);
    try {
      // Add submission duration check
      const submissionDuration = Date.now() - formLoadTime.current;
      
      // Add a small delay to ensure the loading state is visible (UX improvement)
      await Promise.all([
        axios.post('/api/contact', {
          ...data,
          turnstileToken,
          submissionDuration
        }),
        new Promise(resolve => setTimeout(resolve, 1500))
      ]);
      reset();
      setSubmitted(true);
    } catch (error) {
      toast.error('Form submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    if (submitted) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [submitted]);
  if (submitted) {
    return (
      <main className="px-4 lg:px-9 bg-black min-h-screen max-w-screen overflow-x-hidden flex items-center justify-center">
        <section className="min-h-[70vh] bg-black flex items-center justify-center py-16 md:py-24 px-4 md:px-6">
          <div className=" mx-auto text-center">
            {/* <div className="text-5xl md:text-6xl mb-4 md:mb-6">🎉</div> */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-4 tracking-tight">
              Application Submitted Successfully!
            </h1>
            <p className="max-w-2xl mx-auto text-base md:text-lg text-white/80 leading-relaxed mb-6 md:mb-8">
              Application received! Please check your email and spam folder for the scholarship test and next steps. Also, ensure you follow us on Instagram—it's required to qualify.
            </p>
            <motion.div
              className="flex justify-center mt-6"
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <a
                href="https://www.instagram.com/thisis_khrien?igsh=MWJocjI5ZWdsbHF5Zw=="
                target="_blank"
                onClick={() => {
                  fetch('/api/analytics/log', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ event_type: 'instagram_click' })
                  }).catch(console.error);
                }}
                className="relative overflow-hidden rounded-sm bg-brandPurple px-6 md:px-8 lg:px-10 py-2.5 md:py-3 text-sm md:text-base lg:text-lg font-semibold group"
              >
                {/* Default Text */}
                <span className="flex w-full space-x-4  items-center text-white transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0">
                  <span>Instagram</span> <FaInstagram className="text-2xl" />
                </span>

                {/* Hover Text */}
                <span className="flex w-full items-center justify-center space-x-4 absolute inset-0 text-brandPurple bg-white transition-all duration-300 translate-y-full group-hover:translate-y-0">
                  <span>Instagram</span> <FaInstagram className="text-2xl" />
                </span>
              </a>
            </motion.div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="px-4 lg:px-9 bg-black">
      {/* ── Hero ── */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-4 md:px-6 text-center max-w-4xl mx-auto bg-black">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-4 md:mb-6">
          Apply to <span className="text-brandPurple">Khrien Academy</span>
        </h1>
        <p className="text-base md:text-lg text-white/80 leading-relaxed mx-auto">
          Applying to Khrien Academy is the first step toward a structured and
          intentional learning experience.
        </p>
      </section>

      {/* ── Form ── */}
      <section className="min-h-screen flex justify-between items-start px-3 py-6 gap-10 max-w-360">
        <form onSubmit={handleSubmit(formSubmit)} className="space-y-6 md:space-y-8 flex-1">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm md:text-base font-semibold text-white mb-2"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Enter your legal name"
              {...register('fullName')}
              className="w-full rounded-xl border border-gray-300 px-4 md:px-5 py-3 md:py-4 text-sm md:text-base text-white placeholder:text-white/60 focus:outline-none focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/20 transition-all duration-200 bg-transparent"
            />
            {errors.fullName?.message && <p className="text-red-500 mt-2 font-semibold text-sm">* {errors.fullName?.message}</p>}
          </div>

          {/* Honeypot field - Invisible to humans */}
          <div style={{ display: 'none' }} aria-hidden="true">
            <input
              type="text"
              {...register('website')}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm md:text-base font-semibold text-white mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="We'll use this to communicate important updates"
              {...register('email')}
              className="w-full rounded-xl border border-gray-300 px-4 md:px-5 py-3 md:py-4 text-sm md:text-base text-white placeholder:text-white/60 focus:outline-none focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/20 transition-all duration-200 bg-transparent"
            />
            {errors.email?.message && <p className="text-red-500 mt-2 font-semibold text-sm">* {errors.email?.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm md:text-base font-semibold text-white mb-2"
            >
              Whatsapp Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Enter your whatsapp number"
              {...register('phone')}
              className="w-full rounded-xl border border-gray-300 px-4 md:px-5 py-3 md:py-4 text-sm md:text-base text-white placeholder:text-white/60 focus:outline-none focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/20 transition-all duration-200 bg-transparent"
            />
            {errors.phone?.message && <p className="text-red-500 mt-2 font-semibold text-sm">* {errors.phone?.message}</p>}
          </div>

          {/* Motivation */}
          <div>
            <label
              htmlFor="motivation"
              className="block text-sm md:text-base font-semibold text-white mb-2"
            >
              Why do you want to join Khrien Academy?
            </label>
            <textarea
              id="motivation"
              rows={4}
              placeholder="Tell us briefly what motivated you to apply"
              {...register('motivation')}
              className="w-full rounded-xl border border-gray-300 px-4 md:px-5 py-3 md:py-4 text-sm md:text-base text-white placeholder:text-white/60 focus:outline-none focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/20 transition-all duration-200 resize-none bg-transparent"
            />
            {errors.motivation?.message && <p className="text-red-500 mt-2 font-semibold text-sm">* {errors.motivation?.message}</p>}
          </div>

          {/* Goals */}
          <div>
            <label
              htmlFor="goals"
              className="block text-sm md:text-base font-semibold text-white mb-2"
            >
              What do you hope to gain from this program?
            </label>
            <textarea
              id="goals"
              rows={4}
              placeholder="Skills, clarity, career growth, personal development, etc."
              {...register('goals')}
              className="w-full rounded-xl border border-gray-300 px-4 md:px-5 py-3 md:py-4 text-sm md:text-base text-white placeholder:text-white/60 focus:outline-none focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/20 transition-all duration-200 resize-none bg-transparent"
            />
            {errors.goals?.message && <p className="text-red-500 mt-2 font-semibold text-sm">* {errors.goals?.message}</p>}
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm md:text-base font-semibold text-white mb-3">
              Do you have any prior experience with this subject?
            </label>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              {["None", "Beginner", "Some experience"].map((option) => (
                <label
                  key={option}
                  className={`flex-1 cursor-pointer rounded-xl border-2 px-4 md:px-5 py-3 md:py-4 text-center font-medium transition-all duration-200 text-sm md:text-base ${experience === option
                    ? "border-brandPurple bg-brandPurple/20 text-white"
                    : "border-gray-300 text-white/60 hover:border-gray-400"
                    }`}
                >
                  <input
                    type="radio"
                    {...register('experience')}
                    value={option}
                    className="sr-only"
                  />
                  {option}
                </label>
              ))}
            </div>
            {errors.experience?.message && <p className="text-red-500 mt-2 font-semibold text-sm">* {errors.experience?.message}</p>}
          </div>

          {/* Referral */}
          <div>
            <label
              htmlFor="referral"
              className="block text-sm md:text-base font-semibold text-white mb-2"
            >
              How did you hear about Khrien Academy?
              <span className="text-white/60 font-normal ml-2 text-xs md:text-sm">
                Optional
              </span>
            </label>
            <div className="relative">
              <select
                id="referral"
                {...register('referral')}
                className="w-full rounded-xl border border-gray-300 px-4 md:px-5 py-3 md:py-4 text-sm md:text-base text-white focus:outline-none focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/20 transition-all duration-200 bg-black cursor-pointer appearance-none"
              >
                <option value="" disabled>Select an option</option>
                <option value="PSA">PSA</option>
                <option value="BAMS">BAMS</option>
                <option value="OAUPGSA">OAUPGSA</option>
                <option value="LSUDS">LSUDS</option>
                <option value="Rotaract club">Rotaract club</option>
                <option value="Friend">Friend</option>
                <option value="Instagram">Instagram</option>
                <option value="Facebook">Facebook</option>
                <option value="Other">Other</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Cloudflare Turnstile Widget */}
          <div className="flex justify-center flex-col items-center gap-2 pb-4">
            <Script
              src="https://challenges.cloudflare.com/turnstile/v0/api.js"
              async
              defer
            />
            <div 
              className="cf-turnstile" 
              data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
              data-callback="onTurnstileVerify"
              data-theme="dark"
            />
            {/* Global function for Turnstile callback */}
            <Script id="turnstile-callback" strategy="afterInteractive">
              {`
                window.onTurnstileVerify = function(token) {
                  const event = new CustomEvent('turnstile-verify', { detail: token });
                  window.dispatchEvent(event);
                };
              `}
            </Script>
          </div>
          
          <TurnstileListener onVerify={onTurnstileVerify} />

          {/* Submit */}
          <div className="flex justify-center pt-2 md:pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-brandPurple text-white font-bold py-2.5 md:py-3 px-8 md:px-10 rounded-sm text-base md:text-lg hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[200px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </form>
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative w-full hidden lg:block lg:w-1/2 min-h-100 lg:h-225 overflow-hidden"
        >
          <Image src="/form/form-image.jpg" priority alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </section>
    </main>
  );
};

// Helper component to handle the custom event from the global callback
const TurnstileListener = ({ onVerify }: { onVerify: (token: string) => void }) => {
  useEffect(() => {
    const handleVerify = (e: any) => onVerify(e.detail);
    window.addEventListener('turnstile-verify', handleVerify);
    return () => window.removeEventListener('turnstile-verify', handleVerify);
  }, [onVerify]);
  return null;
};

export default Form;
