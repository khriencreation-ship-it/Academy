"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

const MissionAndVision = () => {
  return (
    <div className="bg-white py-8 sm:py-12 md:py-16">
      <section className="max-w-360 mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Mission */}
          <motion.div
            className="bg-white shadow-md border duration-300 rounded-2xl border-brandPurple/40 transition-colors overflow-hidden flex flex-col"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInLeft}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="relative w-full h-48 md:h-56">
              <Image
                src="/about-us/image-one.jpg"
                alt="mission image"
                fill
                className="object-cover"
              />
            </div>

            <div
              className="order-1 md:order-2 text-black space-y-3 text-center md:text-left px-4 py-6">
              <h2 className="text-2xl sm:text-3xl font-semibold">
                Our Mission
              </h2>

              <p className="text-base text-black/80 leading-relaxed max-w-lg mx-auto md:mx-0">
                To provide high-quality, accessible education that empowers
                learners to grow, adapt, and build confidently in a changing
                world.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-white shadow-md border duration-300 rounded-2xl border-brandPurple/40 transition-colors overflow-hidden flex flex-col"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInRight}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Image at top */}
            <div className="relative w-full h-48 md:h-56">
              <Image
                src="/about-us/image-two.jpg"
                alt="mission image"
                fill
                className="object-cover"
              />
            </div>

            {/* Content below */}
            <div
              className="order-1 md:order-2 text-black space-y-3 text-center md:text-left px-4 py-6">
              <h2 className="text-2xl sm:text-3xl font-semibold">
                Our Vision
              </h2>

              <p className="text-base text-black/80 leading-relaxed max-w-lg mx-auto md:mx-0">
                To be a trusted institution that cultivates innovation,
                confidence, and excellence in every learner.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MissionAndVision;
