import { motion } from "framer-motion";
import { GraduationCap, Building2, Calendar, Award } from "lucide-react";
import { educationData } from "../data/education";

export const Education = () => {
  return (
    <section id="education" className="py-16 sm:py-20 md:py-28 px-5 sm:px-8 md:px-12 max-w-6xl mx-auto text-white relative">
      {/* Background subtle ambient glow */}
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="mb-10 sm:mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
        >
          EDUCATION <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">HISTORY.</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {educationData.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="group relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-zinc-900/90 via-zinc-900/60 to-zinc-950/90 border border-white/10 hover:border-indigo-500/40 shadow-xl backdrop-blur-xl transition-all duration-300 overflow-hidden"
          >
            {/* Ambient hover glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none -z-10" />

            {/* Top row: Degree icon & Year tag */}
            <div className="flex items-center justify-between gap-3 mb-5">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-md group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm font-mono text-zinc-300 backdrop-blur-sm">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                <span>{edu.year}</span>
              </div>
            </div>

            {/* Degree Title */}
            <h3 className="text-lg sm:text-2xl font-bold text-white mb-2 leading-snug group-hover:text-indigo-200 transition-colors">
              {edu.degree}
            </h3>

            {/* Institution */}
            <div className="flex items-center gap-2 text-sm sm:text-base text-indigo-400 font-semibold mb-3">
              <Building2 className="w-4 h-4 shrink-0" />
              <span>{edu.institution}</span>
            </div>

            {/* Major / Concentration */}
            <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-xs sm:text-sm text-zinc-400">
              <Award className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{edu.major}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
