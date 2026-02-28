"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as zod from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaInstagram } from "react-icons/fa";

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
    },
  })
  const experience = watch("experience");

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const [submitted, setSubmitted] = useState(false);

  const formSubmit = async (data: FormData) => {
    try {
      await axios.post('/api/contact', data);
      reset();
      setSubmitted(true);
    } catch (error) {
      toast.error('Form submission failed');
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
              Thank you for applying to Khrien Academy. Your application has been received and is currently under review. Please make sure you are following our Instagram page, as this is required for your application to be considered. Also, keep an eye on your email and our social media pages for important updates about your application.
            </p>
            <motion.div
              className="flex justify-center mt-6"
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <a
                href="https://www.instagram.com/thisis_khrien?igsh=MWJocjI5ZWdsbHF5Zw=="
                target="_blank"
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
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="WhatsApp-enabled preferred"
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
            <input
              id="referral"
              type="text"
              placeholder="e.g. Social media, a friend, search engine..."
              {...register('referral')}
              className="w-full rounded-xl border border-gray-300 px-4 md:px-5 py-3 md:py-4 text-sm md:text-base text-white placeholder:text-white/60 focus:outline-none focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/20 transition-all duration-200 bg-transparent"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center pt-2 md:pt-4">
            <button
              type="submit"
              className="bg-brandPurple text-white font-bold py-2.5 md:py-3 px-8 md:px-10 rounded-sm text-base md:text-lg hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
            >
              Submit Application
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

export default Form;
