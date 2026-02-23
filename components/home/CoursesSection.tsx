"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

interface CourseType {
    category: string;
    title: string;
    image: string;
    button: string;
}

const CoursesSection = () => {
    const courses: CourseType[] = [
        {
            category: "genesis-cohort",
            title: 'AI Foundations & Applied Intelligence.',
            image: '/home/imageOne.jpg',
            button: 'Apply Now'
        }
    ];

    const [filterItems, setFilterItems] = useState<CourseType[]>(courses)

    const [selectedItemCategory, setSelectedItemCategory] = useState<string>("all");

    const handleSelectItem = (category: string) => {
        setSelectedItemCategory(category)
        setFilterItems(courses.filter((item) => item.category === category))
    }
    return (
        <section className="bg-white py-12 md:py-16 lg:py-20 px-4 md:px-8">
            <div className="max-w-360 mx-auto">
                {/* Header */}
                <motion.div
                    className="text-center mb-10 md:mb-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-4 text-black tracking-tight">
                        What You'll Learn
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
                        Our courses are built to meet learners where they are and guide them forward through a balanced mix of theory, practice, and guided instruction.
                    </p>
                </motion.div>

                <motion.div
                    className="mt-6 mb-8 border border-brandGray/90 rounded-full px-5 py-3 flex w-fit mx-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                >
                    <p className="text-black">filter by :</p>
                    <div className="flex gap-5 ml-4">
                        {/* <button className={`${selectedItemCategory === "all" ? "text-black" : "text-black/50"} `} onClick={() => {
                            setFilterItems(courses)
                            setSelectedItemCategory("all")
                        }}>All</button> */}
                        <button className={`${selectedItemCategory === "genesis-cohort" ? "text-black" : "text-black/50"} `} onClick={() => handleSelectItem("genesis-cohort")}>Genesis Cohort</button>
                    </div>
                </motion.div>

                {/* Course Cards Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                >
                    {courses.map((course, index) => {
                        return (
                            <motion.div
                                key={index}
                                className="bg-white shadow-md border duration-300 rounded-2xl border-brandPurple/40 transition-colors overflow-hidden flex flex-col"
                                variants={fadeInUp}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            >
                                {/* Image at top */}
                                <div className="relative w-full h-48 md:h-56">
                                    <Image
                                        src={course.image}
                                        alt={course.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Content below */}
                                <div className="p-6 md:p-8 text-center flex flex-col grow">
                                    <h3 className="text-xl sm:text-2xl md:text-2xl font-normal mb-4 text-brandPurple">
                                        {course.title}
                                    </h3>

                                    <p className="text-sm md:text-base text-gray-700 mb-6 leading-relaxed grow">
                                        A comprehensive beginner-to-intermediate program designed to help learners understand Artificial Intelligence from the ground up, covering concepts, tools, real-world applications, and modern workflows.
                                    </p>

                                    <Link
                                        href="/apply"
                                        className="inline-block bg-brandPurple text-white font-semibold px-6 md:px-8 py-2.5 md:py-3 rounded-full hover:opacity-90 transition-all duration-300 text-sm md:text-base shadow-md hover:shadow-lg"
                                    >
                                        {course.button}
                                    </Link>
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default CoursesSection;
