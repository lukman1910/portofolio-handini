import { motion } from "framer-motion";
import { educationData } from "../data/education";

export const Education = () => {
  return (
    <section id="education" className="py-16 sm:py-20 md:py-24 px-5 sm:px-8 md:px-12 max-w-6xl mx-auto text-white">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-3xl sm:text-4xl md:text-6xl font-bold mb-8 md:mb-14"
      >
        EDUCATION.
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
        {educationData.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-colors duration-300"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-1.5 sm:mb-2">{edu.degree}</h3>
            <h4 className="text-base sm:text-xl text-indigo-400 mb-3 sm:mb-4">{edu.institution}</h4>
            <div className="flex justify-between items-center text-gray-400 text-xs sm:text-sm">
              <span className="truncate pr-2">{edu.major}</span>
              <span className="font-medium bg-white/10 px-2.5 py-1 rounded-full shrink-0">
                {edu.year}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
