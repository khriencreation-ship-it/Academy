"use client";

import Link from "next/link";
import { MoveRight } from "lucide-react";

export default function ApplyPage() {
  return (
    <main className="px-4 lg:px-9 bg-black min-h-[80vh] flex flex-col items-center justify-center">
      <section className="text-center max-w-3xl mx-auto px-4 md:px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight mb-4 md:mb-6">
          Applications <span className="text-brandPurple">Closed</span>
        </h1>
        <p className="text-base md:text-lg text-white/80 leading-relaxed mx-auto mb-8">
          Thank you for your interest! Applications for the Genesis Cohort have officially closed. 
          We are no longer accepting new applications at this time. Stay tuned for updates on our next cohort.
        </p>
        <div className="flex justify-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 bg-brandPurple text-white px-6 py-3 rounded-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Return to Home
            <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
}
