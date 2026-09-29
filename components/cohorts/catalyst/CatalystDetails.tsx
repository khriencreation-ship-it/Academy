"use client";

import React from "react";
import { Variants, motion } from "framer-motion";

const CatalystDetails = () => {
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: -30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  } as Variants;

  return (
    <section className="py-8 md:py-12 px-4 md:px-6 bg-black border-b border-neutral-900">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="
            grid grid-cols-2 md:grid-cols-5 
            gap-6 md:gap-4 
            items-center 
            text-white text-center
          "
        >
          <motion.div variants={item} className="col-span-1">
            <h3 className="text-2xl md:text-4xl font-semibold">Application Date</h3>
            <p className="text-xs md:text-sm text-white/70 mt-2">
              October 1 - October 24
            </p>
          </motion.div>

          <motion.div variants={item} className="col-span-1">
            <h3 className="text-2xl md:text-4xl font-semibold">Cohort Starts</h3>
            <p className="text-xs md:text-sm text-white/70 mt-2">
              November 1 - November 30
            </p>
          </motion.div>

          <motion.div variants={item} className="col-span-1">
            <h3 className="text-2xl md:text-4xl font-semibold">Courses Available</h3>
            <p className="text-xs md:text-sm text-white/70 mt-2 font-medium text-brandPurple">
              6 Courses
            </p>
          </motion.div>

          <motion.div variants={item} className="col-span-1">
            <h3 className="text-2xl md:text-4xl font-semibold">Format</h3>
            <p className="text-xs md:text-sm text-white/70 mt-2">
              Virtual • Live Weekly Classes
            </p>
          </motion.div>

          <motion.div variants={item} className="col-span-2 md:col-span-1">
            <h3 className="text-2xl md:text-4xl font-semibold">Tuition</h3>
            <div className="text-xs md:text-sm text-white/70 mt-2 flex items-center justify-center gap-2">
              <span>Paid</span>
              <a
                href="#pricing"
                className="inline-block px-2.5 py-1 rounded bg-brandPurple/20 text-brandPurple border border-brandPurple/30 text-xs font-semibold hover:bg-brandPurple hover:text-white transition-all duration-200"
              >
                View Pricing →
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CatalystDetails;
