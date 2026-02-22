import React from "react";
import Link from "next/link";

import Image from "next/image";
const TuitionSection = () => {
  return (
    <section className="bg-white py-12 relative overflow-hidden">
      <div className="max-w-360 mx-auto relative z-50">
        {/* Background lines */}
        <div className="absolute top-0 bottom-20  left-1/2 -translate-x-1/2 z-0  pointer-events-none">
          <Image
            src="/lines/bg-line-center.webp"
            className="opacity-50"
            alt="Background lines"
            width={1000}
            height={1000}
          />
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {" "}
          <div className="flex flex-col gap-10 items-end">
            {" "}
            <div className="relative w-75 h-75">
              <Image
                src="/home/imageTwo.jpg"
                alt="Quiz"
                fill
                className="border border-brandGreen rounded-lg object-cover shadow-[0_0_1px_#22c55e,0_0_5px_#22c55e]"
                />{" "}
            </div>
            <div className="relative w-87.5 h-17.5 mr-12">
              <Image
                src="/home/live-class.png"
                alt="Quiz"
                fill
                className="shadow-lg rounded-lg object-cover "
              />
            </div>
          </div>{" "}
          <div className="flex flex-col gap-10 justify-end items-start">
            {" "}
            <div className="relative w-87.5 h-17.5">
              <Image
                src="/home/quiz.png"
                alt="Quiz"
                fill
                className="shadow-lg rounded-lg"
              />
            </div>
            <div className="relative w-62.5 h-62.5 mx-6">
              <Image
                src="/home/imageOne.jpg"
                alt="Quiz"
                fill
                className="object-cover border border-brandPurple rounded-lg shadow-[0_0_1px_#934ab3,0_0_5px_#934ab3]"
              />{" "}
            </div>
          </div>{" "}
        </div>
      </div>
    </section>
  );
};

export default TuitionSection;
