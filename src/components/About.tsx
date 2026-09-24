import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Award, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Check, 
  Copy, 
  FileSpreadsheet, 
  HeartHandshake, 
  Zap,
  ArrowRight
} from "lucide-react";
import { profileData } from "../data/profile";

const STATS = [
  {
    value: "10+",
    label: "Tahun Pengalaman",
    desc: "Administrasi & HR profesional",
    icon: Award,
    color: "from-blue-500/20 to-indigo-500/20",
    border: "group-hover:border-blue-500/50",
    text: "text-blue-400",
  },
  {
    value: "1000+",
    label: "Karyawan Dikelola",
    desc: "Administrasi & payroll rutin",
    icon: Users,
    color: "from-indigo-500/20 to-purple-500/20",
    border: "group-hover:border-indigo-500/50",
    text: "text-indigo-400",
  },
  {
    value: "25%",
    label: "Peningkatan Efisiensi",
    desc: "Optimasi sistem dokumen kerja",
    icon: TrendingUp,
    color: "from-purple-500/20 to-pink-500/20",
    border: "group-hover:border-purple-500/50",
    text: "text-purple-400",
  },
  {
    value: "100%",
    label: "Kepatuhan Regulasi",
    desc: "SIPP & EDABU BPJS aktif",
    icon: ShieldCheck,
    color: "from-cyan-500/20 to-blue-500/20",
    border: "group-hover:border-cyan-500/50",
    text: "text-cyan-400",
  },
];

const TABS = [
  { id: "summary", label: "Ringkasan Profil" },
  { id: "strengths", label: "Pilar Keahlian" },
  { id: "values", label: "Prinsip Kerja" },
];

export const About = () => {
  const [activeTab, setActiveTab] = useState("summary");
  const [copied, setCopied] = useState(false);
  const [selectedStat, setSelectedStat] = useState<number | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="py-16 sm:py-24 md:py-32 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto bg-black text-white relative">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="mb-10 sm:mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
        >
          ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">ME.</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Left Column: Interactive Tabbed Narrative */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full">
          {/* Tabs Selector */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-zinc-900/80 border border-white/10 rounded-2xl mb-6 backdrop-blur-md">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all ${
                  activeTab === tab.id ? "text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="aboutTabPill"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-md -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className="min-h-[220px] sm:min-h-[200px] mb-8">
            <AnimatePresence mode="wait">
              {activeTab === "summary" && (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed"
                >
                  <p>
                    {profileData.summary}
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-cyan-300 font-medium">
                      📍 {profileData.location}
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-indigo-300 font-medium">
                      💼 10+ Tahun Pengalaman
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-emerald-300 font-medium">
                      🟢 Terbuka untuk Peluang Kerja
                    </span>
                  </div>
                </motion.div>
              )}

              {activeTab === "strengths" && (
                <motion.div
                  key="strengths"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid sm:grid-cols-2 gap-3"
                >
                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/5">
                    <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs sm:text-sm mb-1">
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>Payroll & Data Processing</span>
                    </div>
                    <p className="text-xs text-zinc-400">Penggajian 500+ karyawan, rekap absensi, dan laporan administrasi mutakhir.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/5">
                    <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs sm:text-sm mb-1">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Kepatuhan BPJS & DPLK</span>
                    </div>
                    <p className="text-xs text-zinc-400">Ahli operasional sistem SIPP Ketenagakerjaan dan EDABU BPJS Kesehatan.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/5">
                    <div className="flex items-center gap-2 text-purple-400 font-bold text-xs sm:text-sm mb-1">
                      <Zap className="w-4 h-4" />
                      <span>Efisiensi Operasional</span>
                    </div>
                    <p className="text-xs text-zinc-400">Optimalisasi biaya bulanan hingga 15% dan reduksi downtime aset hingga 20%.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/5">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs sm:text-sm mb-1">
                      <HeartHandshake className="w-4 h-4" />
                      <span>Pelayanan & Tata Usaha</span>
                    </div>
                    <p className="text-xs text-zinc-400">Rekonsiliasi kas harian, manajemen stok ATK, dan penanganan perizinan.</p>
                  </div>
                </motion.div>
              )}

              {activeTab === "values" && (
                <motion.div
                  key="values"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/5">
                    <span className="text-cyan-400 font-bold text-sm">01.</span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">Ketelitian & Presisi Data</h4>
                      <p className="text-xs text-zinc-400 mt-0.5">Memastikan tidak ada celah kekeliruan dalam kalkulasi gaji, kas harian, dan mutasi BPJS.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/5">
                    <span className="text-indigo-400 font-bold text-sm">02.</span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">Integritas & Kerahasiaan</h4>
                      <p className="text-xs text-zinc-400 mt-0.5">Menjaga privasi data personalia dan arsip finansial perusahaan dengan standar etika tertinggi.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/5">
                    <span className="text-purple-400 font-bold text-sm">03.</span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">Komunikasi Responsif</h4>
                      <p className="text-xs text-zinc-400 mt-0.5">Menjembatani kebutuhan administrasi karyawan dan arahan manajemen dengan diplomatis.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Interactive Fast Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-medium transition-all active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold">Email Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-zinc-400" />
                  <span>Salin Email ({profileData.email})</span>
                </>
              )}
            </button>

            <a
              href="#contact"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-semibold transition-all active:scale-95"
            >
              <span>Kirim Pesan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right Column: 4 Interactive Stats Cards (2x2 Grid) */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3.5 sm:gap-4">
          {STATS.map((stat, index) => {
            const Icon = stat.icon;
            const isSelected = selectedStat === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedStat(isSelected ? null : index)}
                className={`relative group p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border border-white/10 ${stat.border} shadow-lg transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[150px] sm:min-h-[170px] select-none`}
              >
                {/* Background Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                {/* Top Icon & Pill */}
                <div className="flex items-center justify-between z-10">
                  <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${stat.text}`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">
                    0{index + 1}
                  </span>
                </div>

                {/* Value & Label */}
                <div className="z-10 mt-3">
                  <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-black text-white group-hover:${stat.text} tracking-tight transition-colors`}>
                    {stat.value}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-zinc-200 mt-0.5 line-clamp-1">
                    {stat.label}
                  </p>
                  <p className="text-[10px] sm:text-xs text-zinc-400 mt-1 leading-tight line-clamp-2">
                    {stat.desc}
                  </p>
                </div>

                {/* Active indicator dot */}
                <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-indigo-400 transition-colors" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
