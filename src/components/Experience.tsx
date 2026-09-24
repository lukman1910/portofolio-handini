import { useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Building2, 
  CheckCircle2, 
  ChevronRight, 
  ChevronUp, 
  Sparkles
} from "lucide-react";
import { experienceData } from "../data/experience";

// Compact Abstract Wave Mesh SVG Component (matching reference image)
const AbstractWaveMesh = ({ 
  waveColor, 
  waveAccent 
}: { 
  waveColor: string; 
  waveAccent: string;
}) => {
  const bundleA = Array.from({ length: 12 }).map((_, i) => {
    const cp1y = 60 + i * 8;
    const cp2y = 260 - i * 5;
    const cp3y = 80 + i * 7;
    const cp4y = 230 - i * 5;
    const y0 = 150 + i * 4;
    const yEnd = 120 + i * 5;
    return `M 0 ${y0} C 120 ${cp1y}, 240 ${cp2y}, 380 ${160 + i * 3} C 480 ${cp3y}, 600 ${cp4y}, 720 ${yEnd}`;
  });

  const bundleB = Array.from({ length: 12 }).map((_, i) => {
    const cp1y = 250 - i * 7;
    const cp2y = 70 + i * 6;
    const cp3y = 270 - i * 5;
    const cp4y = 90 + i * 8;
    const y0 = 200 - i * 3;
    const yEnd = 210 - i * 4;
    return `M 0 ${y0} C 140 ${cp1y}, 260 ${cp2y}, 400 ${180 - i * 3} C 500 ${cp3y}, 620 ${cp4y}, 720 ${yEnd}`;
  });

  const gradId = `wave-grad-${waveAccent.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <div className="absolute right-0 top-0 bottom-0 w-[55%] sm:w-[48%] pointer-events-none overflow-hidden select-none -z-0">
      <svg
        viewBox="0 0 720 340"
        preserveAspectRatio="none"
        className="w-full h-full opacity-75 transition-transform duration-700 group-hover:scale-105"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={waveColor} stopOpacity="0.15" />
            <stop offset="50%" stopColor={waveAccent} stopOpacity="0.8" />
            <stop offset="100%" stopColor={waveColor} stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {bundleA.map((d, idx) => (
          <path
            key={`a-${idx}`}
            d={d}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth={idx % 3 === 0 ? "1.4" : "1.0"}
            opacity={0.3 + (idx / 12) * 0.45}
          />
        ))}

        {bundleB.map((d, idx) => (
          <path
            key={`b-${idx}`}
            d={d}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth={idx % 4 === 0 ? "1.3" : "0.9"}
            opacity={0.25 + (idx / 12) * 0.4}
          />
        ))}
      </svg>
    </div>
  );
};

// Vibrant themes matching the 4 reference cards + harmonious fifth
interface ExperienceTheme {
  gradient: string;
  glow: string;
  waveColor: string;
  waveAccent: string;
  badge: string;
  badgeText: string;
  periodBadge: string;
  buttonBorder: string;
  buttonHover: string;
  metricBadge: {
    value: string;
    label: string;
  };
  summary: string;
  tags: string[];
}

const THEMES: Record<number, ExperienceTheme> = {
  // 1. Blue Card (Oceanic Royal Blue to Navy - Reference Card 1)
  0: {
    gradient: "from-blue-600 via-blue-800 to-indigo-950",
    glow: "rgba(37, 99, 235, 0.35)",
    waveColor: "rgba(147, 197, 253, 0.4)",
    waveAccent: "rgba(56, 189, 248, 0.8)",
    badge: "bg-blue-400/20 text-blue-200 border-blue-400/40",
    badgeText: "Featured Role",
    periodBadge: "bg-black/40 text-blue-200 border-white/10",
    buttonBorder: "border-white/40 text-white hover:bg-white hover:text-blue-900",
    buttonHover: "hover:border-white shadow-[0_4px_15px_rgba(37,99,235,0.3)]",
    metricBadge: {
      value: "-20%",
      label: "Downtime Aset",
    },
    summary: "Optimalisasi operasional bulanan 15% serta tata kelola terpadu kepatuhan BPJS & DPLK dengan sistem payroll.",
    tags: ["Efisiensi Aset -20%", "Optimasi Biaya 15%", "Integrasi BPJS & Payroll"],
  },
  // 2. Orange / Gold Card (Sunset Amber to Stone - Reference Card 2)
  1: {
    gradient: "from-orange-600 via-amber-600 to-stone-950",
    glow: "rgba(234, 88, 12, 0.35)",
    waveColor: "rgba(254, 215, 170, 0.4)",
    waveAccent: "rgba(251, 191, 36, 0.8)",
    badge: "bg-amber-400/20 text-amber-200 border-amber-400/40",
    badgeText: "8.5 Thn Dedikasi",
    periodBadge: "bg-black/40 text-amber-200 border-white/10",
    buttonBorder: "border-white/40 text-white hover:bg-white hover:text-amber-950",
    buttonHover: "hover:border-white shadow-[0_4px_15px_rgba(234,88,12,0.3)]",
    metricBadge: {
      value: "8.5 Thn",
      label: "Welfare Lead",
    },
    summary: "Dedikasi 8.5+ tahun memimpin administrasi kesejahteraan, menaikkan efisiensi tim 25%, dan meminimalisir error kas 20%.",
    tags: ["Efisiensi Tim +25%", "Error Kas -20%", "Kepatuhan BPJS & DPLK"],
  },
  // 3. Magenta / Violet Card (Electric Pink to Deep Purple - Reference Card 3)
  2: {
    gradient: "from-fuchsia-600 via-purple-700 to-zinc-950",
    glow: "rgba(192, 38, 211, 0.35)",
    waveColor: "rgba(244, 114, 182, 0.4)",
    waveAccent: "rgba(232, 121, 249, 0.8)",
    badge: "bg-fuchsia-400/20 text-fuchsia-200 border-fuchsia-400/40",
    badgeText: "Payroll Skala Besar",
    periodBadge: "bg-black/40 text-fuchsia-200 border-white/10",
    buttonBorder: "border-white/40 text-white hover:bg-white hover:text-purple-950",
    buttonHover: "hover:border-white shadow-[0_4px_15px_rgba(192,38,211,0.3)]",
    metricBadge: {
      value: "500+",
      label: "Payroll Karyawan",
    },
    summary: "Memproses penggajian rutin 500+ karyawan pusat & proyek, kontrol stok kantor turun 30%, serta konsolidasi 50+ data kompleks.",
    tags: ["Payroll 500+ Karyawan", "Stok Kantor -30%", "Konsolidasi 50+ Data"],
  },
  // 4. Emerald / Mint Card (Mint Green to Deep Teal - Reference Card 4)
  3: {
    gradient: "from-emerald-500 via-teal-700 to-slate-950",
    glow: "rgba(16, 185, 129, 0.35)",
    waveColor: "rgba(167, 243, 208, 0.4)",
    waveAccent: "rgba(52, 211, 153, 0.8)",
    badge: "bg-emerald-400/20 text-emerald-200 border-emerald-400/40",
    badgeText: "CSAT 95%",
    periodBadge: "bg-black/40 text-emerald-200 border-white/10",
    buttonBorder: "border-white/40 text-white hover:bg-white hover:text-emerald-950",
    buttonHover: "hover:border-white shadow-[0_4px_15px_rgba(16,185,129,0.3)]",
    metricBadge: {
      value: "95%",
      label: "Customer CSAT",
    },
    summary: "Meningkatkan kepuasan pelanggan dari 85% ke 95%, akurasi data inventaris 98%, serta kecepatan sistem check-in otomatis.",
    tags: ["Kepuasan 95%", "Akurasi Stok 98%", "Check-in Otomatis +15%"],
  },
  // 5. Electric Indigo / Violet Card (Harmonious Fifth Variant)
  4: {
    gradient: "from-violet-600 via-indigo-800 to-zinc-950",
    glow: "rgba(99, 102, 241, 0.35)",
    waveColor: "rgba(199, 210, 254, 0.4)",
    waveAccent: "rgba(165, 180, 252, 0.8)",
    badge: "bg-indigo-400/20 text-indigo-200 border-indigo-400/40",
    badgeText: "Brand & Perizinan",
    periodBadge: "bg-black/40 text-indigo-200 border-white/10",
    buttonBorder: "border-white/40 text-white hover:bg-white hover:text-indigo-950",
    buttonHover: "hover:border-white shadow-[0_4px_15px_rgba(99,102,241,0.3)]",
    metricBadge: {
      value: "90%",
      label: "Brand Awareness",
    },
    summary: "Implementasi strategi komunikasi terarah yang mendongkrak brand awareness 90% serta kepatuhan administrasi pajak reklame.",
    tags: ["Brand Awareness 90%", "Pajak Reklame", "Koordinasi Instansi"],
  },
};

interface CardProps {
  exp: (typeof experienceData)[0];
  index: number;
}

const CompactAbstractCard = ({ exp, index }: CardProps) => {
  const theme = THEMES[index] || THEMES[0];
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt with cursor motion
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-80, 80], [4, -4]);
  const rotateY = useTransform(x, [-120, 120], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ perspective: 900 }}
      className="w-full"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{ y: -4, scale: 1.01 }}
        className={`relative group rounded-2xl bg-gradient-to-br ${theme.gradient} border border-white/20 p-5 sm:p-6 shadow-[0_12px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.7)] transition-all duration-300 overflow-hidden cursor-default`}
      >
        {/* Ambient Glow Aura */}
        <div
          className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none -z-10"
          style={{ background: theme.glow }}
        />

        {/* Compact Wave Mesh SVG */}
        <AbstractWaveMesh 
          waveColor={theme.waveColor} 
          waveAccent={theme.waveAccent} 
        />

        {/* Floating KPI Metric Pill */}
        <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/15 shadow-md group-hover:scale-105 transition-transform duration-300">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
          <div className="text-right">
            <div className="text-xs sm:text-sm font-black text-white font-mono leading-none">
              {theme.metricBadge.value}
            </div>
            <div className="text-[9px] text-zinc-300 font-medium tracking-tight mt-0.5">
              {theme.metricBadge.label}
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-[85%] sm:max-w-[78%]">
          {/* Top Bar: Role Tag & Period */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2.5">
            <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${theme.badge}`}>
              {theme.badgeText}
            </span>

            <div className={`inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${theme.periodBadge} backdrop-blur-sm`}>
              <Calendar className="w-2.5 h-2.5 opacity-80" />
              <span>{exp.period}</span>
            </div>
          </div>

          {/* Job Title */}
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug mb-1">
            {exp.title}
          </h3>

          {/* Company Name */}
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-white/80 font-medium mb-2.5">
            <Building2 className="w-3 h-3 opacity-75 shrink-0" />
            <span className="truncate">{exp.company}</span>
          </div>

          {/* Short Summary */}
          <p className="text-[11px] sm:text-xs text-white/90 leading-relaxed mb-3 font-normal line-clamp-2">
            {theme.summary}
          </p>

          {/* Key Metric Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {theme.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[9px] sm:text-[10px] bg-black/30 hover:bg-black/50 text-white/95 px-2 py-0.5 rounded-md border border-white/10 font-mono backdrop-blur-sm transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Compact Outline Pill Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-[11px] sm:text-xs font-semibold transition-all duration-300 backdrop-blur-sm cursor-pointer ${theme.buttonBorder} ${theme.buttonHover}`}
          >
            <span>{isExpanded ? "Tutup Detail" : "Lihat Pencapaian"}</span>
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            )}
          </button>
        </div>

        {/* Expandable Responsibility & Achievement Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="mt-4 pt-4 border-t border-white/15 relative z-10"
            >
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-white/90 mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-white/80" />
                <span>Pencapaian & Tanggung Jawab Resmi:</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {exp.descriptions.map((desc, dIdx) => (
                  <div
                    key={dIdx}
                    className="p-2.5 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-zinc-200 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle Glass Sheen on Hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
      </motion.div>
    </motion.div>
  );
};

export const Experience = () => {
  return (
    <section id="experience" className="py-14 sm:py-20 md:py-24 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto text-white relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="mb-8 sm:mb-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-2"
        >
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_#60a5fa]" />
          <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-blue-400">
            CAREER TRACK RECORD • 10+ YEARS
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
        >
          WORK <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-amber-400 to-fuchsia-400">EXPERIENCE.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-zinc-400 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed"
        >
          Rekam jejak profesional lebih dari 10 tahun dalam tata kelola administrasi korporat, manajemen payroll ratusan karyawan, dan efisiensi operasional teruji.
        </motion.p>
      </div>

      {/* Compact 2-Column Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {experienceData.map((exp, index) => (
          <CompactAbstractCard key={index} exp={exp} index={index} />
        ))}
      </div>
    </section>
  );
};
