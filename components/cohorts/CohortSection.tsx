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
    <section className="py-12 md:py-16 px-4 md:px-6 bg-black">
      <div className="max-w-360 mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto flex justify-between items-center text-white"
        >
          <motion.div variants={item} className="text-center">
            <h3 className="text-5xl">Date</h3>
            <p className="text-base text-white/70">April 5 - June 4</p>
          </motion.div>

          <motion.div variants={item} className="text-center">
            <h3 className="text-5xl">Format</h3>
            <p className="text-base text-white/70">
              Online • Cohort-based • Live weekly classes
            </p>
          </motion.div>

          <motion.div variants={item} className="text-center">
            <h3 className="text-5xl">Tuition</h3>
            <p className="text-base text-white/70">Scholarship Based</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
// added transitions to components/cohorts/CohortSection.tsx basd on what is already implemented

// like the three sections drop one after the other

export default Cohort;
