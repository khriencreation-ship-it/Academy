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
import { Loader2, Mail, CheckCircle2, Flame, Calendar, Tag } from "lucide-react";
import { checkIsEarlyBird, CATALYST_COHORT_CONFIG } from "@/lib/cohort-config";

const courseOptions = [
  "AI Foundations and Practical Intelligence",
  "UI/UX Design",
  "WordPress Development",
  "Product Management",
  "Frontend Engineering",
  "Customer Success and Support Operations",
] as const;

const validationSchema = zod.object({
  fullName: zod.string().min(1, "Full name is required"),
  email: zod.string().email("Invalid email address"),
  phone: zod.string().min(1, "WhatsApp number is required"),
  location: zod.string().min(1, "Location (state and country) is required"),
  dob: zod.string().min(1, "Date of birth is required"),
  currentStatus: zod.enum(
    ["Student", "Employed", "Freelancer", "Business owner", "Job seeker", "Other"],
    { message: "Current status is required" }
  ),
  courseType: zod.enum(["Single course", "2-course bundle (save ₦2,000)"]),
  singleCourse: zod.string().optional(),
  bundleCourses: zod.array(zod.string()).optional(),
  techExperience: zod.enum(
    ["Complete beginner", "Some exposure", "Intermediate", "Advanced"],
    { message: "Tech experience is required" }
  ),
  motivation: zod.string().min(1, "Motivation is required"),
  referral: zod.enum(
    ["Khrien community", "WhatsApp", "Instagram", "A friend", "Other"],
    { message: "Please select how you heard about the Catalyst Cohort" }
  ),
  termFee: zod.boolean().refine(val => val === true, "You must accept the application fee term"),
  termEarlyBird: zod.boolean().optional(),
  termPlacement: zod.boolean().refine(val => val === true, "You must accept the placement check term"),
  website: zod.string().optional(), // Honeypot field
  turnstileToken: zod.string().optional(),
  loadTime: zod.number().optional(),
}).superRefine((data, ctx) => {
  if (data.courseType === "Single course" && !data.singleCourse) {
    ctx.addIssue({
      code: zod.ZodIssueCode.custom,
      message: "Please select a course",
      path: ["singleCourse"],
    });
  }
  if (data.courseType === "2-course bundle (save ₦2,000)") {
    if (!data.bundleCourses || data.bundleCourses.length !== 2) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        message: "Please select exactly 2 courses for the bundle",
        path: ["bundleCourses"],
      });
    }
  }
});

type FormData = zod.infer<typeof validationSchema>;

declare global {
  interface Window {
    FlutterwaveCheckout: (options: any) => void;
  }
}

const Form = () => {
  const [isEarlyBird, setIsEarlyBird] = useState(true);

  useEffect(() => {
    setIsEarlyBird(checkIsEarlyBird());
  }, []);

  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      dob: "",
      currentStatus: undefined,
      courseType: "Single course",
      singleCourse: "",
      bundleCourses: [],
      techExperience: undefined,
      motivation: "",
      referral: undefined,
      termFee: false,
      termEarlyBird: false,
      termPlacement: false,
      website: "",
      turnstileToken: "",
      loadTime: Date.now(),
    },
  });

  const courseType = watch("courseType");
  const selectedBundleCourses = watch("bundleCourses") || [];
  const currentStatus = watch("currentStatus");
  const techExperience = watch("techExperience");
  const referral = watch("referral");

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdAppId, setCreatedAppId] = useState<string | null>(null);
  const [feePaid, setFeePaid] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const formLoadTime = useRef<number>(Date.now());

  const onTurnstileVerify = (token: string) => {
    setTurnstileToken(token);
  };

  const toggleBundleCourse = (course: string) => {
    let updated = [...selectedBundleCourses];
    if (updated.includes(course)) {
      updated = updated.filter(c => c !== course);
    } else {
      if (updated.length < 2) {
        updated.push(course);
      } else {
        toast.info("You can select a maximum of 2 courses for the bundle");
        return;
      }
    }
    setValue("bundleCourses", updated, { shouldValidate: true });
  };

  const [applicantDetails, setApplicantDetails] = useState<{ email: string; name: string; phone: string } | null>(null);

  const openFlutterwaveModal = (appId: string, email?: string, name?: string, phone?: string) => {
    const targetEmail = email || applicantDetails?.email || '';
    const targetName = name || applicantDetails?.name || '';
    const targetPhone = phone || applicantDetails?.phone || '';

    const rawKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || process.env.FLUTTERWAVE_PUBLIC_KEY || '';
    const publicKey = rawKey.trim().replace(/^["']|["']$/g, '');
    const txRef = `APPFEE-${appId}-${Date.now().toString(36)}`;

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://academy.khrien.com';

    if (typeof window !== 'undefined' && window.FlutterwaveCheckout) {
      window.FlutterwaveCheckout({
        public_key: publicKey,
        tx_ref: txRef,
        amount: 2000,
        currency: 'NGN',
        payment_options: 'card,banktransfer,ussd',
        redirect_url: `${baseUrl}/payment-success`,
        customer_email: targetEmail,
        customer: {
          email: targetEmail,
          phone_number: targetPhone,
          name: targetName,
        },
        customizations: {
          title: 'Khrien Academy Application Fee',
          description: `₦2,000 Non-refundable Application Fee (${appId})`,
          logo: 'https://academy.khrien.com/icon.png',
        },
        meta: {
          application_id: appId,
          payment_type: 'app_fee',
        },
        callback: async function (data: any) {
          console.log('Flutterwave Fee Payment Callback:', data);
          if (data.status === 'successful') {
            toast.success('Application Fee Paid Successfully!');
            setFeePaid(true);

            fetch('/api/flutterwave/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                transaction_id: data.transaction_id,
                tx_ref: txRef,
                applicationId: appId,
                type: 'app_fee',
              }),
            }).catch(console.error);
          }
        },
        onclose: function () {
          console.log('Flutterwave Modal Closed');
          // Send safety net email if fee not yet confirmed paid
          fetch('/api/emails/send-safetynet', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              applicationId: appId,
              email: targetEmail,
              fullName: targetName,
            }),
          }).catch(console.error);
        },
      });
    } else {
      toast.error('Payment gateway unavailable. You can resume fee payment anytime using your Application ID.');
    }
  };

  const formSubmit = async (data: FormData) => {
    const activePricingTier = isEarlyBird ? 'early_bird' : 'standard';

    if (isEarlyBird && !data.termEarlyBird) {
      toast.error("Please accept the early-bird pricing term to proceed.");
      return;
    }

    fetch('/api/analytics/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event_type: 'apply_click' })
    }).catch(console.error);

    setIsSubmitting(true);
    try {
      const submissionDuration = Date.now() - formLoadTime.current;
      
      const courseSelectionSummary = data.courseType === "Single course" 
        ? data.singleCourse 
        : `Bundle: ${data.bundleCourses?.join(" + ")}`;

      const res = await axios.post('/api/contact', {
        ...data,
        courseSelection: courseSelectionSummary,
        pricingTier: activePricingTier,
        turnstileToken,
        submissionDuration
      });

      const appId = res.data?.applicationId || `KHA-${Date.now().toString(36).toUpperCase()}`;
      setCreatedAppId(appId);
      setApplicantDetails({ email: data.email, name: data.fullName, phone: data.phone });
      setSubmitted(true);
      reset();

      // Launch Flutterwave Modal for Application Fee
      setTimeout(() => {
        openFlutterwaveModal(appId, data.email, data.fullName, data.phone);
      }, 500);

    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Form submission failed';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (submitted) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [submitted]);

  const APPLICATIONS_CLOSED = false;

  if (APPLICATIONS_CLOSED) {
    return (
      <main className="px-4 lg:px-9 bg-black min-h-screen flex items-center justify-center">
        <section className="min-h-[70vh] bg-black flex items-center justify-center py-16 md:py-24 px-4 md:px-6">
          <div className="mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-4 tracking-tight">
              Applications Closed
            </h1>
            <p className="max-w-2xl mx-auto text-base md:text-lg text-white/80 leading-relaxed mb-6 md:mb-8">
              Thank you for your interest in Khrien Academy!
            </p>
            <motion.div className="flex justify-center mt-6" variants={fadeInUp} initial="hidden" animate="visible">
              <a href="/" className="rounded-sm bg-brandPurple px-8 py-3 text-white font-semibold">
                Return Home
              </a>
            </motion.div>
          </div>
        </section>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="px-4 lg:px-9 bg-black min-h-screen flex items-center justify-center py-20">
        <Script src="https://checkout.flutterwave.com/v3.js" strategy="afterInteractive" />
        <section className="bg-black flex items-center justify-center py-12 px-4 md:px-6">
          <div className="mx-auto text-center max-w-2xl bg-neutral-950 border border-neutral-850 p-8 sm:p-12 rounded-3xl shadow-2xl">
            <div className="w-16 h-16 bg-brandPurple/20 text-brandPurple rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            
            <span className="text-xs font-bold uppercase tracking-widest text-brandPurple bg-brandPurple/10 border border-brandPurple/30 px-3 py-1 rounded-full inline-block mb-3">
              Application Created
            </span>

            <h1 className="text-3xl sm:text-4xl font-semibold text-white mb-3 tracking-tight">
              Application Details Saved!
            </h1>

            <div className="my-6 p-4 rounded-2xl bg-purple-950/40 border border-brandPurple/40 text-center">
              <p className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Your Application ID</p>
              <p className="text-2xl font-extrabold text-brandPurple tracking-widest mt-1">{createdAppId}</p>
            </div>

            <p className="text-base text-neutral-300 leading-relaxed mb-8">
              {feePaid
                ? "Your ₦2,000 application fee is confirmed! Click below to select your tuition payment options."
                : "Your application is saved! Complete your ₦2,000 non-refundable application fee now or anytime via your unique link."}
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              {feePaid ? (
                <a
                  href={`/tuition?ref=${createdAppId}`}
                  className="w-full sm:w-auto bg-brandPurple text-white px-8 py-3.5 rounded-full font-bold hover:bg-brandPurple/90 transition-all shadow-xl shadow-purple-950/40"
                >
                  Proceed to Tuition Payment →
                </a>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => openFlutterwaveModal(createdAppId || '')}
                    className="w-full sm:w-auto bg-brandPurple text-white px-8 py-3.5 rounded-full font-bold hover:bg-brandPurple/90 transition-all shadow-xl shadow-purple-950/40 cursor-pointer"
                  >
                    Pay Application Fee Now (₦2,000)
                  </button>

                  <a
                    href={`/continue?ref=${createdAppId}`}
                    className="w-full sm:w-auto bg-neutral-900 border border-neutral-800 text-neutral-300 px-6 py-3.5 rounded-full font-semibold hover:border-neutral-700 transition-all text-sm"
                  >
                    Resume Later
                  </a>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="px-4 lg:px-9 bg-black min-h-screen pb-20">
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-8 md:pb-12 px-4 md:px-6 text-center max-w-4xl mx-auto">
        <span className="text-xs md:text-sm font-semibold uppercase tracking-widest text-brandPurple bg-brandPurple/10 border border-brandPurple/30 px-3.5 py-1 rounded-full inline-block mb-4">
          Catalyst Cohort Application
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight mb-4">
          Apply to <span className="text-brandPurple">Khrien Academy</span>
        </h1>
        <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
          6 courses. Real skills. Built for where you're headed. Fill out the application form below to get started.
        </p>
      </section>

      {/* Form Container */}
      <section className="flex justify-between items-start px-3 py-6 gap-10 max-w-[1440px] mx-auto">
        <form onSubmit={handleSubmit(formSubmit)} className="space-y-6 md:space-y-8 flex-1 bg-neutral-950 p-6 sm:p-8 md:p-10 rounded-3xl border border-neutral-900 shadow-2xl">
          
          {/* Active Period Indicator Banner */}
          <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
            isEarlyBird
              ? "bg-purple-950/40 border-brandPurple/60 text-white"
              : "bg-neutral-900 border-neutral-800 text-white"
          }`}>
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${isEarlyBird ? "bg-brandPurple text-white" : "bg-neutral-800 text-neutral-300"} text-lg shrink-0`}>
                {isEarlyBird ? <Flame className="w-5 h-5" /> : <Tag className="w-5 h-5" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brandPurple">
                    Active Application Period
                  </span>
                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                    isEarlyBird ? "bg-brandPurple text-white" : "bg-neutral-800 text-neutral-300"
                  }`}>
                    {isEarlyBird ? "Early-Bird Rate" : "Standard Rate"}
                  </span>
                </div>
                <p className="text-sm font-semibold text-white mt-0.5">
                  {isEarlyBird
                    ? "Early-bird Period (Oct 1 – Oct 8): ₦8,000 Single | ₦15,000 Bundle"
                    : "Standard Period (Oct 9 Onward): ₦10,000 Single | ₦18,000 Bundle"}
                </p>
              </div>
            </div>
            <div className="text-xs text-neutral-400 font-medium sm:text-right">
              {isEarlyBird
                ? "⚡ Full payment required at tuition"
                : "💳 Split payment option available at tuition"}
            </div>
          </div>

          {/* 1. Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm md:text-base font-semibold text-white mb-2">
              Full Name <span className="text-brandPurple">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Enter your legal full name"
              {...register('fullName')}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 md:px-5 py-3 md:py-4 text-sm md:text-base text-white placeholder:text-neutral-500 focus:outline-none focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/20 transition-all"
            />
            {errors.fullName?.message && <p className="text-red-400 mt-2 text-xs md:text-sm font-medium">* {errors.fullName?.message}</p>}
          </div>

          {/* Honeypot */}
          <div style={{ display: 'none' }} aria-hidden="true">
            <input type="text" {...register('website')} tabIndex={-1} autoComplete="off" />
          </div>

          {/* 2. Email Address */}
          <div>
            <label htmlFor="email" className="block text-sm md:text-base font-semibold text-white mb-2">
              Email Address <span className="text-brandPurple">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="We'll use this for all official updates"
              {...register('email')}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 md:px-5 py-3 md:py-4 text-sm md:text-base text-white placeholder:text-neutral-500 focus:outline-none focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/20 transition-all"
            />
            {errors.email?.message && <p className="text-red-400 mt-2 text-xs md:text-sm font-medium">* {errors.email?.message}</p>}
          </div>

          {/* 3. WhatsApp Number */}
          <div>
            <label htmlFor="phone" className="block text-sm md:text-base font-semibold text-white mb-2">
              WhatsApp Number <span className="text-brandPurple">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="e.g. +234 801 234 5678"
              {...register('phone')}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 md:px-5 py-3 md:py-4 text-sm md:text-base text-white placeholder:text-neutral-500 focus:outline-none focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/20 transition-all"
            />
            {errors.phone?.message && <p className="text-red-400 mt-2 text-xs md:text-sm font-medium">* {errors.phone?.message}</p>}
          </div>

          {/* 4. Location — State and Country */}
          <div>
            <label htmlFor="location" className="block text-sm md:text-base font-semibold text-white mb-2">
              Location — State and Country <span className="text-brandPurple">*</span>
            </label>
            <input
              id="location"
              type="text"
              placeholder="e.g. Lagos, Nigeria or Accra, Ghana"
              {...register('location')}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 md:px-5 py-3 md:py-4 text-sm md:text-base text-white placeholder:text-neutral-500 focus:outline-none focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/20 transition-all"
            />
            {errors.location?.message && <p className="text-red-400 mt-2 text-xs md:text-sm font-medium">* {errors.location?.message}</p>}
          </div>

          {/* 5. Date of Birth */}
          <div>
            <label htmlFor="dob" className="block text-sm md:text-base font-semibold text-white mb-2">
              Date of Birth <span className="text-brandPurple">*</span>
            </label>
            <input
              id="dob"
              type="date"
              {...register('dob')}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 md:px-5 py-3 md:py-4 text-sm md:text-base text-white focus:outline-none focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/20 transition-all cursor-pointer"
            />
            {errors.dob?.message && <p className="text-red-400 mt-2 text-xs md:text-sm font-medium">* {errors.dob?.message}</p>}
          </div>

          {/* 6. Current Status */}
          <div>
            <label className="block text-sm md:text-base font-semibold text-white mb-3">
              Current Status <span className="text-brandPurple">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {["Student", "Employed", "Freelancer", "Business owner", "Job seeker", "Other"].map((statusOption) => (
                <label
                  key={statusOption}
                  className={`cursor-pointer rounded-xl border px-3 py-3 text-center text-xs md:text-sm font-medium transition-all ${
                    currentStatus === statusOption
                      ? "border-brandPurple bg-brandPurple/20 text-white font-semibold"
                      : "border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-neutral-700"
                  }`}
                >
                  <input
                    type="radio"
                    {...register('currentStatus')}
                    value={statusOption}
                    className="sr-only"
                  />
                  {statusOption}
                </label>
              ))}
            </div>
            {errors.currentStatus?.message && <p className="text-red-400 mt-2 text-xs md:text-sm font-medium">* {errors.currentStatus?.message}</p>}
          </div>

          {/* 7. Course Selection */}
          <div className="bg-neutral-900/60 border border-neutral-850 p-5 rounded-2xl">
            <label className="block text-sm md:text-base font-semibold text-white mb-3">
              Course Selection <span className="text-brandPurple">*</span>
            </label>

            {/* Toggle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              {[
                { type: "Single course", label: isEarlyBird ? "Single course (₦8,000)" : "Single course (₦10,000)" },
                { type: "2-course bundle (save ₦2,000)", label: isEarlyBird ? "2-course bundle (₦15,000)" : "2-course bundle (₦18,000)" }
              ].map((item) => (
                <button
                  type="button"
                  key={item.type}
                  onClick={() => setValue("courseType", item.type as any, { shouldValidate: true })}
                  className={`py-3 px-4 rounded-xl text-xs md:text-sm font-semibold border transition-all ${
                    courseType === item.type
                      ? "bg-brandPurple text-white border-brandPurple shadow-md"
                      : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* If Single Course */}
            {courseType === "Single course" && (
              <div>
                <span className="block text-xs font-semibold text-neutral-400 mb-2">Select 1 course:</span>
                <div className="space-y-2">
                  {courseOptions.map((c) => (
                    <label
                      key={c}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        watch("singleCourse") === c
                          ? "border-brandPurple bg-brandPurple/15 text-white"
                          : "border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-neutral-700"
                      }`}
                    >
                      <input
                        type="radio"
                        {...register("singleCourse")}
                        value={c}
                        className="accent-brandPurple w-4 h-4"
                      />
                      <span className="text-xs md:text-sm font-medium">{c}</span>
                    </label>
                  ))}
                </div>
                {errors.singleCourse?.message && <p className="text-red-400 mt-2 text-xs md:text-sm font-medium">* {errors.singleCourse?.message}</p>}
              </div>
            )}

            {/* If 2-Course Bundle */}
            {courseType === "2-course bundle (save ₦2,000)" && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold text-neutral-300">Select exactly 2 courses:</span>
                  <span className="text-xs font-bold text-brandPurple bg-brandPurple/20 px-2.5 py-0.5 rounded-full border border-brandPurple/30">
                    {selectedBundleCourses.length} / 2 selected
                  </span>
                </div>

                <div className="space-y-2">
                  {courseOptions.map((c) => {
                    const isChecked = selectedBundleCourses.includes(c);
                    return (
                      <div
                        key={c}
                        onClick={() => toggleBundleCourse(c)}
                        className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isChecked
                            ? "border-brandPurple bg-brandPurple/20 text-white font-semibold"
                            : "border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-neutral-700"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // Handled by div onClick
                          className="accent-brandPurple w-4 h-4 rounded"
                        />
                        <span className="text-xs md:text-sm">{c}</span>
                      </div>
                    );
                  })}
                </div>
                {errors.bundleCourses?.message && <p className="text-red-400 mt-2 text-xs md:text-sm font-medium">* {errors.bundleCourses?.message}</p>}
              </div>
            )}
          </div>

          {/* 8. Tech Experience */}
          <div>
            <label className="block text-sm md:text-base font-semibold text-white mb-3">
              Tech Experience <span className="text-brandPurple">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {["Complete beginner", "Some exposure", "Intermediate", "Advanced"].map((exp) => (
                <label
                  key={exp}
                  className={`cursor-pointer rounded-xl border px-3 py-3 text-center text-xs md:text-sm font-medium transition-all ${
                    techExperience === exp
                      ? "border-brandPurple bg-brandPurple/20 text-white font-semibold"
                      : "border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-neutral-700"
                  }`}
                >
                  <input
                    type="radio"
                    {...register('techExperience')}
                    value={exp}
                    className="sr-only"
                  />
                  {exp}
                </label>
              ))}
            </div>
            {errors.techExperience?.message && <p className="text-red-400 mt-2 text-xs md:text-sm font-medium">* {errors.techExperience?.message}</p>}
          </div>

          {/* 9. Motivation */}
          <div>
            <label htmlFor="motivation" className="block text-sm md:text-base font-semibold text-white mb-2">
              Why do you want to take this course? <span className="text-brandPurple">*</span>
            </label>
            <textarea
              id="motivation"
              rows={3}
              placeholder="Tell us briefly what you hope to achieve or build"
              {...register('motivation')}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 md:px-5 py-3 md:py-4 text-sm md:text-base text-white placeholder:text-neutral-500 focus:outline-none focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/20 transition-all resize-none"
            />
            {errors.motivation?.message && <p className="text-red-400 mt-2 text-xs md:text-sm font-medium">* {errors.motivation?.message}</p>}
          </div>

          {/* 10. How they heard about Catalyst Cohort */}
          <div>
            <label htmlFor="referral" className="block text-sm md:text-base font-semibold text-white mb-2">
              How did you hear about the Catalyst Cohort? <span className="text-brandPurple">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {["Khrien community", "WhatsApp", "Instagram", "A friend", "Other"].map((source) => (
                <label
                  key={source}
                  className={`cursor-pointer rounded-xl border px-3 py-3 text-center text-xs md:text-sm font-medium transition-all ${
                    referral === source
                      ? "border-brandPurple bg-brandPurple/20 text-white font-semibold"
                      : "border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-neutral-700"
                  }`}
                >
                  <input
                    type="radio"
                    {...register('referral')}
                    value={source}
                    className="sr-only"
                  />
                  {source}
                </label>
              ))}
            </div>
            {errors.referral?.message && <p className="text-red-400 mt-2 text-xs md:text-sm font-medium">* {errors.referral?.message}</p>}
          </div>

          {/* 11. Terms Checkboxes (All required) */}
          <div className="bg-neutral-900/80 border border-neutral-800 p-5 rounded-2xl space-y-4">
            <span className="block text-xs font-bold uppercase tracking-wider text-brandPurple">
              Terms & Conditions Agreement
            </span>

            {/* Term 1 */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                {...register("termFee")}
                className="accent-brandPurple w-4 h-4 rounded mt-0.5 shrink-0"
              />
              <span className="text-xs md:text-sm text-neutral-300 leading-snug">
                I understand the <strong>₦2,000 application fee</strong> is non-refundable. <span className="text-brandPurple">*</span>
              </span>
            </label>
            {errors.termFee?.message && <p className="text-red-400 text-xs font-medium pl-7">* {errors.termFee?.message}</p>}

            {/* Term 2 (Early bird window only) */}
            {isEarlyBird && (
              <>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("termEarlyBird")}
                    className="accent-brandPurple w-4 h-4 rounded mt-0.5 shrink-0"
                  />
                  <span className="text-xs md:text-sm text-neutral-300 leading-snug">
                    I understand that early-bird pricing requires full payment and is not eligible for split payment. <span className="text-brandPurple">*</span>
                  </span>
                </label>
                {errors.termEarlyBird?.message && <p className="text-red-400 text-xs font-medium pl-7">* {errors.termEarlyBird?.message}</p>}
              </>
            )}

            {/* Term 3 */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                {...register("termPlacement")}
                className="accent-brandPurple w-4 h-4 rounded mt-0.5 shrink-0"
              />
              <span className="text-xs md:text-sm text-neutral-300 leading-snug">
                I understand that after my tuition is paid, I'll be asked to complete a short placement check. <span className="text-brandPurple">*</span>
              </span>
            </label>
            {errors.termPlacement?.message && <p className="text-red-400 text-xs font-medium pl-7">* {errors.termPlacement?.message}</p>}
          </div>

          {/* Turnstile Verification */}
          <div className="flex justify-center flex-col items-center gap-2 pt-2">
            <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
            <div
              className="cf-turnstile"
              data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
              data-callback="onTurnstileVerify"
              data-theme="dark"
            />
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
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-brandPurple text-white font-bold py-3.5 px-10 rounded-full text-base md:text-lg hover:bg-brandPurple/90 transition-all duration-300 shadow-xl shadow-purple-950/40 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[220px]"
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

        {/* Side Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full hidden lg:block lg:w-1/3 h-[650px] overflow-hidden rounded-3xl shadow-2xl sticky top-28 border border-neutral-800"
        >
          <Image src="/form/form-image.jpg" priority alt="Khrien Academy Application" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </motion.div>
      </section>
    </main>
  );
};

const TurnstileListener = ({ onVerify }: { onVerify: (token: string) => void }) => {
  useEffect(() => {
    const handleVerify = (e: any) => onVerify(e.detail);
    window.addEventListener('turnstile-verify', handleVerify);
    return () => window.removeEventListener('turnstile-verify', handleVerify);
  }, [onVerify]);
  return null;
};

export default Form;
