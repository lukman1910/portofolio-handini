import { motion } from "framer-motion";

export const Loading = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2, ease: "easeInOut" }}
      onAnimationComplete={() => document.getElementById("loader")?.remove()}
      id="loader"
      className="fixed inset-0 z-[10000] flex flex-col justify-center items-center bg-black text-white pointer-events-none"
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "200px" }}
        transition={{ duration: 1.5, ease: "circInOut" }}
        className="h-1 bg-white mb-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-indigo-500 origin-left scale-x-0 animate-pulse" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xs tracking-[0.3em] font-medium text-gray-400"
      >
        ENTERING PORTFOLIO
      </motion.div>
    </motion.div>
  );
};
