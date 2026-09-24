import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, MessageCircle } from "lucide-react";
import { profileData } from "../data/profile";
import { InteractiveIDCard } from "./InteractiveIDCard";
import { Hero3DEnvironment } from "./Hero3DEnvironment";

// Continuous Typewriter Animation for Name (Only HANDINI without title)
const TypewriterName = () => {
  const targetWord = "HANDINI";
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      // Typing phase: type letter by letter
      if (currentText.length < targetWord.length) {
        timer = setTimeout(() => {
          setCurrentText(targetWord.slice(0, currentText.length + 1));
        }, 130);
      } else {
        // Full word typed: pause before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2400);
      }
    } else {
      // Deleting phase: backspace smoothly
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(targetWord.slice(0, currentText.length - 1));
        }, 65);
      } else {
        // Finished deleting: pause briefly, then repeat typing
        setIsDeleting(false);
        timer = setTimeout(() => {}, 400);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting]);

  return (
    <span className="inline-flex items-center whitespace-nowrap">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">
        {currentText}
      </span>
      <span className="inline-block w-[2.5px] sm:w-[3.5px] h-[0.8em] ml-1 bg-gradient-to-b from-cyan-400 to-indigo-400 animate-pulse align-middle rounded-sm shadow-[0_0_8px_#22d3ee]" />
    </span>
  );
};

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-24 sm:pt-28 lg:pt-0">
      {/* 3D Background */}
      <Hero3DEnvironment />

      {/* Main Container - Mobile Friendly Layout */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 w-full min-h-[calc(100vh-80px)] flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 z-20 relative py-6 sm:py-10 lg:py-0">
        
        {/* Intro & Content Column */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-left">
          {/* Heading with Scaled Desktop Typewriter Name Animation */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.15rem] font-extrabold tracking-tight text-white mb-2.5 sm:mb-3 leading-tight flex flex-wrap items-baseline gap-x-2 sm:gap-x-3"
          >
            <span className="shrink-0 text-white">Hi, I'm</span>
            <TypewriterName />
          </motion.h1>

          {/* Subtitle / Role */}
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-xl md:text-2xl font-bold text-cyan-400 mb-4 sm:mb-6 tracking-wide"
          >
            {profileData.title}
          </motion.h2>

          {/* Bio Description */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-zinc-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mb-6 sm:mb-8"
          >
            Administrasi Umum dan HR profesional dengan pengalaman lebih dari 10 tahun dalam pengelolaan data, sistem payroll, dan kepatuhan BPJS (SIPP & EDABU). Berkomitmen menghadirkan efisiensi operasional, akurasi tinggi, dan kepatuhan regulasi terdepan.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
          >
            {/* View / Download CV Button */}
            <a
              href="#about"
              className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(99,102,241,0.7)] active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Lihat Profil CV</span>
            </a>

            <div className="flex items-center gap-3">
              {/* Contact Via WhatsApp */}
              <a
                href={`https://wa.me/62${profileData.phone.replace(/[^0-9]/g, "").replace(/^0/, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 text-white text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </a>

              {/* Contact Via Email */}
              <a
                href={`mailto:${profileData.email}`}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/40 text-white text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 active:scale-95"
              >
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>Email</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Physical Hanging ID Card */}
        <div className="w-full lg:w-1/2 h-[420px] sm:h-[480px] lg:h-[620px] relative flex items-center justify-center">
          <InteractiveIDCard />
        </div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-30 pointer-events-none"
      >
        <span className="text-[9px] tracking-[0.3em] text-zinc-500 uppercase font-medium">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown className="text-zinc-400 w-3.5 h-3.5" />
        </motion.div>
      </motion.div>
    </section>
  );
};
