"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Sparkles, ArrowDown } from "lucide-react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

// HlsPlayer handles Bunny Stream HLS playing natively or via dynamically loaded Hls.js
function HlsPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else if (typeof window !== "undefined") {
      const scriptId = "hls-script";
      let script = document.getElementById(scriptId) as HTMLScriptElement;

      const initHls = () => {
        // @ts-ignore
        if (window.Hls && window.Hls.isSupported()) {
          // @ts-ignore
          const hls = new window.Hls();
          hls.loadSource(src);
          hls.attachMedia(video);
        }
      };

      if (!script) {
        script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://cdn.jsdelivr.net/npm/hls.js@1";
        script.async = true;
        script.onload = initHls;
        document.body.appendChild(script);
      } else {
        // @ts-ignore
        if (window.Hls) {
          initHls();
        } else {
          script.addEventListener("load", initHls);
        }
      }

      return () => {
        if (script) {
          script.removeEventListener("load", initHls);
        }
      };
    }
  }, [src]);

  return (
    <div className="relative w-full aspect-video rounded-md overflow-hidden bg-black shadow-inner">
      <video
        ref={videoRef}
        controls
        playsInline
        autoPlay
        muted
        loop
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default function AnimateAfricaPage() {
  const learnRef = useRef<HTMLDivElement>(null);

  // Smooth scroll
  const scrollTo = (elementRef: React.RefObject<HTMLDivElement | null>) => {
    elementRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-[#fafafa] text-neutral-900 min-h-screen antialiased selection:bg-neutral-800 selection:text-white">
      
      {/* --- DYNAMIC VIDEO HERO SECTION (FULL WIDTH) --- */}
      <section 
        className="relative min-h-screen flex flex-col justify-between border-b border-neutral-200 overflow-hidden select-none w-full"
      >
        {/* Background YouTube Video Embed */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
          <iframe
            className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 scale-[1.1]"
            src="https://www.youtube.com/embed/wePT7aKdgPM?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=wePT7aKdgPM&playsinline=1&enablejsapi=1"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          {/* Cinematic dark overlay to ensure maximum readability of white Bricolage typography */}
          <div className="absolute inset-0 bg-neutral-950/65" />
        </div>

        {/* --- NAV / HEADER (Floating, Transparent, Over Video) --- */}
        <header className="w-full z-50 relative">
          <div className="px-6 lg:px-12 h-24 flex items-center justify-between">
            {/* Left Side Brand Logo */}
            <div className="flex items-center gap-2 text-white">
              <Image 
                src="/LOGOGOGOGOG.png" 
                alt="Academy Logo" 
                width={280} 
                height={90} 
                className="w-auto brightness-0 invert" 
                style={{ height: "72px" }}
                priority
              />
            </div>
            
            {/* Right Side Pill Button */}
            <div>
              <a 
                href="https://selar.com/khrienanimateafrica"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-neutral-100 text-black text-xs uppercase tracking-wider font-semibold rounded-full px-6 py-3 transition-all duration-200 cursor-pointer shadow-sm inline-block"
              >
                Apply Now
              </a>
            </div>
          </div>
        </header>

        {/* Hero Content - Centered */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs sm:text-sm font-semibold backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-white/80" />
            In Partnership With Animate Africa (by MagicLab Academy)
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal italic text-white tracking-tight leading-[1.05] drop-shadow-sm">
            Learn 3D Animation. 100% Free.
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg text-neutral-200 max-w-2xl mx-auto leading-relaxed font-medium">
            Khrien Academy has partnered with Animate Africa to give you free access to their studio-level 3D animation program — training 5,000 young Africans in real animation skills, at no cost.
          </p>
          
          <div className="pt-4">
            <a 
              href="https://selar.com/khrienanimateafrica"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-neutral-100 text-black px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer shadow-md inline-block"
            >
              Gain Access Now &rarr;
            </a>
          </div>
        </div>

        {/* Bottom helper arrow link */}
        <div className="pb-8 text-center relative z-10">
          <button 
            onClick={() => scrollTo(learnRef)}
            className="inline-flex flex-col items-center justify-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-neutral-400 hover:text-white transition-colors"
          >
            <span>See what you'll learn</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>
        
      </section>

      {/* --- CONTENT CONTAINER WITH LIGHT GRID BORDERS --- */}
      <div className="max-w-[1440px] mx-auto bg-white border-x border-neutral-200 min-h-screen relative">

        {/* --- ABOUT THE PROGRAM (Texts Left, Image Right) --- */}
        <section id="exists" ref={learnRef} className="py-16 md:py-24 px-6 lg:px-12 border-b border-neutral-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">About The Program</span>
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-black leading-tight">
                  What You're Getting Access To
                </h2>
              </div>
              <div className="space-y-4 text-neutral-600 text-base sm:text-lg leading-relaxed">
                <p>
                  Animate Africa is a free, self-paced 3D animation course built by MagicLab Academy, taking you from complete beginner to studio-ready skills covering the fundamentals of 3D animation, character mechanics, and practical hands-on projects. It runs over 3 months and fits around your schedule, whether you're a student or working full-time.
                </p>
                <p>
                  Khrien Academy is helping bring this opportunity to more people as an official partner no experience needed, no fees, just a willingness to learn.
                </p>
              </div>
              <div className="pt-2">
                <a 
                  href="https://selar.com/khrienanimateafrica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer shadow-md inline-block"
                >
                  Gain Access Now &rarr;
                </a>
              </div>
            </div>
            <div className="lg:col-span-5 relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-neutral-200 bg-neutral-50 shadow-sm">
              <Image 
                src="/IMG-20240729-WA0096.jpg" 
                alt="3D Animation Artistry" 
                fill
                className="object-cover"
                sizes="(max-w-7xl) 100vw, 40vw"
              />
            </div>
          </div>
        </section>

        {/* --- HOW IT WORKS & EMBEDDED VIDEO --- */}
        <section id="apply" className="py-16 md:py-24 px-6 lg:px-12 border-b border-neutral-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Steps Left Panel */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Getting Started Is Simple</span>
                <h2 className="text-3xl font-semibold tracking-tight text-black">
                  How It Works
                </h2>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  Start your training pipeline in a few minutes. Follow these three steps.
                </p>
              </div>

              {/* Helicode style vertical steps with clean lines */}
              <div className="space-y-6 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-[1px] before:bg-neutral-200">
                <div className="flex gap-4 relative">
                  <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center font-semibold text-sm shrink-0 z-10 border border-neutral-200">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-base pt-1">Apply</h3>
                    <p className="text-neutral-500 text-sm">Navigate to the registration page.</p>
                  </div>
                </div>

                <div className="flex gap-4 relative">
                  <div className="w-10 h-10 rounded-full bg-white text-neutral-700 flex items-center justify-center font-semibold text-sm shrink-0 z-10 border border-neutral-200">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-base pt-1">Get Access</h3>
                    <p className="text-neutral-500 text-sm">Secure your spot and receive the onboarding portal link.</p>
                  </div>
                </div>

                <div className="flex gap-4 relative">
                  <div className="w-10 h-10 rounded-full bg-white text-neutral-700 flex items-center justify-center font-semibold text-sm shrink-0 z-10 border border-neutral-200">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-base pt-1">Start Learning</h3>
                    <p className="text-neutral-500 text-sm">Begin the self-paced course immediately.</p>
                  </div>
                </div>
              </div>

              {/* GAIN ACCESS BUTTON */}
              <div className="pt-4">
                <a 
                  href="https://selar.com/khrienanimateafrica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer shadow-md inline-block"
                >
                  Gain Access Now &rarr;
                </a>
              </div>
            </div>

            {/* Video Right Panel */}
            <div className="lg:col-span-7 w-full">
              <div className="bg-white border border-neutral-200 rounded-lg p-2 sm:p-4 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
                <HlsPlayer src="https://vz-7b7bf1b9-131.b-cdn.net/c7e157b5-380b-4796-a3c3-eaef4722fde9/playlist.m3u8" />
              </div>
            </div>

          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="border-t border-neutral-200 bg-white py-12 px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <p className="text-sm font-semibold text-black">Khrien Academy</p>
              <p className="text-xs text-neutral-500 leading-relaxed max-w-xl">
                Brought to you by Khrien Academy, in partnership with Animate Africa (MagicLab Academy).
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-3">
              <div className="flex items-center gap-4">
                <a href="#" className="text-neutral-400 hover:text-black transition-colors">
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a href="#" className="text-neutral-400 hover:text-black transition-colors">
                  <FaTwitter className="w-4 h-4" />
                </a>
                <a href="#" className="text-neutral-400 hover:text-black transition-colors">
                  <FaYoutube className="w-4 h-4" />
                </a>
              </div>
              <p className="text-xs text-neutral-400">
                Contact: <a href="mailto:hello@khrien.com" className="text-neutral-600 hover:underline">hello@khrien.com</a>
              </p>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
