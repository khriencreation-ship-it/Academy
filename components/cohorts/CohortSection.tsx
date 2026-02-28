"use client";

import { Variants, motion } from "framer-motion";
const Cohort = () => {
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.25, // delay between each drop
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: -40 },
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
    <section className="py-8 md:py-12 px-4 md:px-6 bg-black">
      <div className="max-w-360 mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="
        flex flex-col md:flex-row 
        gap-8 md:gap-0 
        md:justify-between 
        items-center 
        text-white
      "
        >
          <motion.div variants={item} className="text-center">
            <h3 className="text-3xl md:text-5xl font-semibold">Application date</h3>
            <p className="text-sm md:text-base text-white/70 mt-2">
              April 1 - April 15
            </p>
          </motion.div>
          <motion.div variants={item} className="text-center">
            <h3 className="text-3xl md:text-5xl font-semibold">Cohort Starts</h3>
            <p className="text-sm md:text-base text-white/70 mt-2">
              May 4 - July 3
            </p>
          </motion.div>

          <motion.div variants={item} className="text-center">
            <h3 className="text-3xl md:text-5xl font-semibold">Format</h3>
            <p className="text-base text-white/70 mt-2">
              Online • Cohort-based • Live weekly classes
            </p>
          </motion.div>

          <motion.div variants={item} className="text-center">
            <h3 className="text-3xl md:text-5xl font-semibold">Tuition</h3>
            <p className="text-base text-white/70 mt-2">
              Scholarship Based
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>

  );
};

export default Cohort;
