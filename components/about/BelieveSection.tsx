import React from 'react'
import { PiTreeStructure } from "react-icons/pi";
import { MdCoPresent } from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";

const beliefs = [
    { icon: PiTreeStructure, label: 'Structured', sub: 'not overwhelming' },
    { icon: MdCoPresent, label: 'Practical', sub: 'not abstract' },
    { icon: TbTargetArrow, label: 'Purpose-driven', sub: 'not trend-chasing' },
]
const BelieveSection = () => {
    return (
        <section className="py-12 md:py-16 px-4 md:px-6 max-w-360 mx-auto">
            <div className="mx-auto">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-black tracking-tight text-center mb-8 md:mb-10 lg:mb-12">
                    We believe learning should be
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
                    {beliefs.map(({ label, sub, icon }) => {
                        const IconComponent = icon;
                        return (
                            <div
                                key={label}
                                className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 border border-gray-200 hover:shadow-lg hover:border-brandPurple transition-all duration-300"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <IconComponent className="text-brandPurple text-2xl md:text-3xl" />
                                    <p className="text-xl md:text-2xl font-bold text-black">{label}</p>
                                </div>
                                <p className="text-base md:text-lg text-gray-500">{sub}</p>
                            </div>
                        );
                    })}
                </div>
                <p className="text-center text-base md:text-lg lg:text-xl text-white/80 mt-8 md:mt-10 lg:mt-12 leading-relaxed max-w-3xl mx-auto">
                    Our goal is to help learners move from understanding concepts to applying skills with
                    confidence and clarity.
                </p>
            </div>
        </section>
    )
}

export default BelieveSection