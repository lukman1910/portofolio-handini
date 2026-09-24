import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { 
  FileSpreadsheet, 
  FileText, 
  ShieldCheck, 
  Activity, 
  Users, 
  CreditCard, 
  Database,
  Award,
  HeartPulse,
  BarChart3,
  Compass,
  CheckCircle2,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  SlidersHorizontal
} from "lucide-react";
import { certificationsData } from "../data/skills";

// Extended rich data for all 7 core skills
interface SkillDetail {
  name: string;
  category: "Software" | "Expertise";
  subtitle: string;
  icon: typeof FileSpreadsheet;
  gradient: string;
  glow: string;
  badge: string;
  border: string;
  accent: string;
  level: string;
  experience: string;
  tags: string[];
  description: string;
}

const SKILL_DETAILS: Record<string, SkillDetail> = {
  "Microsoft Excel": {
    name: "Microsoft Excel",
    category: "Software",
    subtitle: "Advanced Formula & Data Modeling",
    icon: FileSpreadsheet,
    gradient: "from-emerald-950/90 via-zinc-900/90 to-emerald-950/40",
    glow: "rgba(16, 185, 129, 0.4)",
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    border: "border-emerald-500/40 hover:border-emerald-400",
    accent: "text-emerald-400",
    level: "Advanced & Formulas",
    experience: "10+ Tahun Intensif",
    tags: ["VLOOKUP / HLOOKUP", "Pivot Table & Charts", "Rekap Gaji & Lembur", "Conditional Formatting"],
    description: "Pemrosesan ribuan baris data karyawan, formula kalkulasi gaji bertingkat, monitoring absensi harian, dan pembuatan laporan keuangan/operasional presisi tinggi.",
  },
  "Microsoft Word": {
    name: "Microsoft Word",
    category: "Software",
    subtitle: "Corporate Legal Drafting & Formatting",
    icon: FileText,
    gradient: "from-blue-950/90 via-zinc-900/90 to-blue-950/40",
    glow: "rgba(59, 130, 246, 0.4)",
    badge: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    border: "border-blue-500/40 hover:border-blue-400",
    accent: "text-blue-400",
    level: "Dokumentasi Resmi & Legal",
    experience: "Standar Korporat",
    tags: ["Kontrak PKWT / PKWTT", "SOP Perusahaan", "Notulensi & Berita Acara", "Mail Merge Surat"],
    description: "Penyusunan dokumen legal ketenagakerjaan, surat keputusan direksi, format evaluasi kerja, serta korespondensi resmi antarinstansi dengan tata bahasa profesional.",
  },
  "SIPP BPJS Ketenagakerjaan": {
    name: "SIPP BPJS Ketenagakerjaan",
    category: "Software",
    subtitle: "Sistem Informasi Pelaporan Peserta",
    icon: ShieldCheck,
    gradient: "from-amber-950/90 via-zinc-900/90 to-amber-950/40",
    glow: "rgba(245, 158, 11, 0.4)",
    badge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    border: "border-amber-500/40 hover:border-amber-400",
    accent: "text-amber-400",
    level: "Sistem Terakreditasi",
    experience: "100% Kepatuhan Regulasi",
    tags: ["Pendaftaran Naker", "Mutasi Tambah/Kurang", "Klaim JKK / JKM / JHT", "Rekonsiliasi Iuran"],
    description: "Pengelolaan kepesertaan jaminan sosial ketenagakerjaan secara end-to-end, memastikan pelaporan upah akurat dan klaim jaminan hak karyawan tepat waktu.",
  },
  "EDABU BPJS Kesehatan": {
    name: "EDABU BPJS Kesehatan",
    category: "Software",
    subtitle: "Elektronik Data Badan Usaha",
    icon: Activity,
    gradient: "from-teal-950/90 via-zinc-900/90 to-teal-950/40",
    glow: "rgba(20, 184, 166, 0.4)",
    badge: "bg-teal-500/15 text-teal-300 border-teal-500/30",
    border: "border-teal-500/40 hover:border-teal-400",
    accent: "text-teal-400",
    level: "Mutasi & Iuran Rutin",
    experience: "Zero-Error Rekonsiliasi",
    tags: ["Validasi NIK Dukcapil", "Data Anggota Keluarga", "Cetak Tagihan Faskes", "Update Virtual Account"],
    description: "Sinkronisasi data kepesertaan jaminan kesehatan badan usaha, verifikasi kelayakan fasilitas kesehatan karyawan & tanggungan, serta penyesuaian iuran bulanan.",
  },
  "Administrasi HR": {
    name: "Administrasi HR",
    category: "Expertise",
    subtitle: "Human Capital & Employee Lifecycle",
    icon: Users,
    gradient: "from-indigo-950/90 via-zinc-900/90 to-indigo-950/40",
    glow: "rgba(99, 102, 241, 0.4)",
    badge: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
    border: "border-indigo-500/40 hover:border-indigo-400",
    accent: "text-indigo-400",
    level: "Manajemen 1.000+ Karyawan",
    experience: "10+ Tahun Dedikasi",
    tags: ["Database Personalia", "Monitoring Cuti & Izin", "Onboarding & Offboarding", "Evaluasi Masa Kerja"],
    description: "Tata kelola data personalia ribuan tenaga kerja, arsip digital & fisik, penerbitan surat peringatan/rekomendasi, dan pemeliharaan hubungan industrial yang kondusif.",
  },
  "Payroll System": {
    name: "Payroll System",
    category: "Expertise",
    subtitle: "Kompensasi, Benefit & Perpajakan",
    icon: CreditCard,
    gradient: "from-purple-950/90 via-zinc-900/90 to-purple-950/40",
    glow: "rgba(168, 85, 247, 0.4)",
    badge: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    border: "border-purple-500/40 hover:border-purple-400",
    accent: "text-purple-400",
    level: "Skala Kantor & Proyek",
    experience: "Tepat Waktu & Akurat",
    tags: ["Perhitungan Gaji Pokok", "Kalkulasi Lembur (Overtime)", "Potongan Iuran & Pajak", "Distribusi Slip Gaji"],
    description: "Kalkulasi sistematis penggajian berbasis kehadiran dan produktivitas, rekonsiliasi potongan pinjaman/BPJS, serta integrasi transfer perbankan tanpa keterlambatan.",
  },
  "Pengelolaan Data": {
    name: "Pengelolaan Data",
    category: "Expertise",
    subtitle: "Arsip Terpusat & Reporting Direksi",
    icon: Database,
    gradient: "from-rose-950/90 via-zinc-900/90 to-rose-950/40",
    glow: "rgba(244, 63, 94, 0.4)",
    badge: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    border: "border-rose-500/40 hover:border-rose-400",
    accent: "text-rose-400",
    level: "Rekapitulasi Presisi",
    experience: "Audit-Ready Quality",
    tags: ["Verifikasi Database", "Audit Kepatuhan Data", "Digital Filing System", "Dashboard Laporan"],
    description: "Standardisasi pencatatan data multi-cabang/divisi, pencegahan duplikasi data karyawan, serta penyajian matriks data yang siap diaudit kapan saja.",
  },
};

// Vibrant themes for certifications
const CERT_THEMES = [
  {
    icon: Award,
    border: "border-amber-500/30 hover:border-amber-400/80",
    glow: "rgba(245, 158, 11, 0.25)",
    tagBg: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    iconBg: "bg-amber-500/20 text-amber-400",
    gradient: "from-amber-950/40 via-zinc-900/80 to-zinc-950",
  },
  {
    icon: HeartPulse,
    border: "border-emerald-500/30 hover:border-emerald-400/80",
    glow: "rgba(16, 185, 129, 0.25)",
    tagBg: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    iconBg: "bg-emerald-500/20 text-emerald-400",
    gradient: "from-emerald-950/40 via-zinc-900/80 to-zinc-950",
  },
  {
    icon: Users,
    border: "border-indigo-500/30 hover:border-indigo-400/80",
    glow: "rgba(99, 102, 241, 0.25)",
    tagBg: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
    iconBg: "bg-indigo-500/20 text-indigo-400",
    gradient: "from-indigo-950/40 via-zinc-900/80 to-zinc-950",
  },
  {
    icon: BarChart3,
    border: "border-cyan-500/30 hover:border-cyan-400/80",
    glow: "rgba(6, 182, 212, 0.25)",
    tagBg: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    iconBg: "bg-cyan-500/20 text-cyan-400",
    gradient: "from-cyan-950/40 via-zinc-900/80 to-zinc-950",
  },
  {
    icon: Compass,
    border: "border-purple-500/30 hover:border-purple-400/80",
    glow: "rgba(168, 85, 247, 0.25)",
    tagBg: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    iconBg: "bg-purple-500/20 text-purple-400",
    gradient: "from-purple-950/40 via-zinc-900/80 to-zinc-950",
  },
];

// Horizontal Running Card for Stream Mode
const StreamSkillCard = ({ skill }: { skill: SkillDetail }) => {
  const Icon = skill.icon;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      className={`w-[280px] sm:w-[320px] p-5 rounded-2xl bg-gradient-to-br ${skill.gradient} border ${skill.border} shadow-[0_12px_30px_rgba(0,0,0,0.6)] flex-shrink-0 cursor-pointer relative overflow-hidden group select-none transition-all duration-300`}
    >
      <div 
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none -z-10"
        style={{ background: skill.glow }}
      />

      <div className="flex items-center justify-between mb-3 z-10 relative">
        <div className={`w-10 h-10 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center ${skill.accent} group-hover:scale-110 transition-transform duration-300 shadow-md`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${skill.badge}`}>
          {skill.category}
        </span>
      </div>

      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mb-0.5 z-10 relative">
        {skill.name}
      </h3>
      <p className="text-xs text-zinc-400 font-medium mb-3 z-10 relative truncate">
        {skill.subtitle}
      </p>

      {/* Mini Feature Badges */}
      <div className="flex flex-wrap gap-1.5 mb-3 z-10 relative">
        {skill.tags.slice(0, 2).map((tag, i) => (
          <span key={i} className="text-[10px] bg-black/40 text-zinc-300 px-2 py-0.5 rounded border border-white/5 font-mono">
            {tag}
          </span>
        ))}
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-xs text-zinc-400 pt-2.5 border-t border-white/10 z-10 relative">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className={`w-3.5 h-3.5 ${skill.accent}`} />
          <span className="text-[11px] font-medium text-zinc-300">{skill.level}</span>
        </div>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};

// Interactive 3D Certification Card Component
const InteractiveCertCard = ({ cert, index }: { cert: typeof certificationsData[0]; index: number }) => {
  const theme = CERT_THEMES[index % CERT_THEMES.length];
  const Icon = theme.icon;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-60, 60], [5, -5]);
  const rotateY = useTransform(x, [-60, 60], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ perspective: 800 }}
      className="w-full"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ y: -5, scale: 1.015 }}
        whileTap={{ scale: 0.98 }}
        className={`relative group p-5 sm:p-6 rounded-2xl bg-gradient-to-br ${theme.gradient} border ${theme.border} shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden cursor-pointer select-none`}
      >
        <div 
          className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none -z-10"
          style={{ background: theme.glow }}
        />

        <div className="flex items-start gap-4">
          <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl shrink-0 flex items-center justify-center ${theme.iconBg} border border-white/10 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${theme.tagBg}`}>
                {cert.issuer}
              </span>

              {cert.year !== "N/A" && (
                <span className="text-[10px] font-mono font-semibold text-zinc-400 bg-white/5 px-2.5 py-0.5 rounded-md border border-white/10">
                  {cert.year}
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-zinc-100 transition-colors leading-snug">
              {cert.title}
            </h3>

            <div className="flex items-center gap-1.5 mt-3 text-[11px] text-zinc-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
              <span>Official Certification Credential</span>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
};

export const Skills = () => {
  // Mode selection: "orbit" (Rotasi 3D) or "stream" (Conveyor Berjalan)
  const [displayMode, setDisplayMode] = useState<"orbit" | "stream">("orbit");
  
  // 3D Orbital Carousel State
  const skillsList = Object.values(SKILL_DETAILS);
  const totalSkills = skillsList.length; // 7
  const angleStep = 360 / totalSkills; // ~51.43 deg

  const [activeRotation, setActiveRotation] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  
  // Responsive radius & mobile state
  const [cylinderRadius, setCylinderRadius] = useState(360);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setCylinderRadius(190);
      } else if (window.innerWidth < 1024) {
        setCylinderRadius(280);
      } else {
        setCylinderRadius(360);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-rotation handling:
  // - On Mobile: Stepped auto-advance every 3.2s with smooth 3D spring transition
  // - On Desktop: Continuous silky smooth 3D cylinder rotation
  useEffect(() => {
    if (!isAutoRotating || isHovered || displayMode !== "orbit") return;

    if (isMobile) {
      const timer = setInterval(() => {
        handleNext();
      }, 3200);
      return () => clearInterval(timer);
    } else {
      const interval = setInterval(() => {
        setActiveRotation((prev) => prev - 0.30);
      }, 20);
      return () => clearInterval(interval);
    }
  }, [isAutoRotating, isHovered, displayMode, isMobile, angleStep]);

  // Determine which skill is currently facing front
  const normalizedRotation = ((-activeRotation % 360) + 360) % 360;
  const activeIndex = Math.round(normalizedRotation / angleStep) % totalSkills;
  const currentSkill = skillsList[activeIndex] || skillsList[0];

  // Rotate to specific skill index and snap
  const rotateToIndex = (index: number) => {
    const targetAngle = -index * angleStep;
    setActiveRotation(targetAngle);
  };

  // Step rotation with clean snapping
  const handlePrev = () => {
    setActiveRotation((prev) => Math.round(prev / angleStep) * angleStep + angleStep);
  };

  const handleNext = () => {
    setActiveRotation((prev) => Math.round(prev / angleStep) * angleStep - angleStep);
  };

  // Drag handling for desktop orbital cylinder
  const dragDistanceX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
    dragDistanceX.current = 0;
    setIsAutoRotating(false);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (dragStartX === null) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - dragStartX;
    dragDistanceX.current += diff;
    setActiveRotation((prev) => prev + diff * 0.4);
    setDragStartX(clientX);
  };

  const handleTouchEnd = () => {
    if (dragStartX !== null) {
      setActiveRotation((prev) => Math.round(prev / angleStep) * angleStep);
    }
    setDragStartX(null);
  };

  // Double list for seamless dual stream loop
  const streamSoftware = [
    SKILL_DETAILS["Microsoft Excel"],
    SKILL_DETAILS["Microsoft Word"],
    SKILL_DETAILS["SIPP BPJS Ketenagakerjaan"],
    SKILL_DETAILS["EDABU BPJS Kesehatan"],
    SKILL_DETAILS["Microsoft Excel"],
    SKILL_DETAILS["Microsoft Word"],
    SKILL_DETAILS["SIPP BPJS Ketenagakerjaan"],
    SKILL_DETAILS["EDABU BPJS Kesehatan"],
  ];

  const streamExpertise = [
    SKILL_DETAILS["Administrasi HR"],
    SKILL_DETAILS["Payroll System"],
    SKILL_DETAILS["Pengelolaan Data"],
    SKILL_DETAILS["SIPP BPJS Ketenagakerjaan"],
    SKILL_DETAILS["Administrasi HR"],
    SKILL_DETAILS["Payroll System"],
    SKILL_DETAILS["Pengelolaan Data"],
    SKILL_DETAILS["EDABU BPJS Kesehatan"],
  ];

  return (
    <section id="skills" className="py-16 sm:py-24 md:py-32 overflow-hidden bg-black text-white relative">
      {/* Background ambient neon lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[180px] pointer-events-none" />

      {/* ================= PART 1: CORE SKILLS (ROTASI 3D & CONVEYOR) ================= */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 mb-20 sm:mb-28">
        
        {/* Header & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
            >
              CORE <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">SKILLS.</span>
            </motion.h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-2 max-w-xl">
              Keahlian inti, platform legalitas, dan perangkat lunak terverifikasi yang ditampilkan secara dinamis dan interaktif.
            </p>
          </div>

          {/* Mode Switcher Pill Tabs (Rotasi 3D vs Stream Berjalan) */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center p-1 rounded-xl bg-zinc-900/90 border border-white/10 shadow-lg backdrop-blur-md">
              <button
                onClick={() => setDisplayMode("orbit")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                  displayMode === "orbit"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/20"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Rotasi 3D Orbit</span>
              </button>

              <button
                onClick={() => setDisplayMode("stream")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                  displayMode === "stream"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/20"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Stream Berjalan</span>
              </button>
            </div>

            {/* In Orbit Mode: Play/Pause and Arrow Controls */}
            {displayMode === "orbit" && (
              <div className="flex items-center gap-1.5 bg-zinc-900/80 border border-white/10 p-1 rounded-xl">
                <button
                  onClick={handlePrev}
                  title="Putar ke Kiri"
                  className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsAutoRotating(!isAutoRotating)}
                  title={isAutoRotating ? "Jeda Rotasi" : "Mulai Rotasi"}
                  className="px-2.5 py-1 rounded-lg text-xs flex items-center gap-1.5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                >
                  {isAutoRotating ? (
                    <>
                      <Pause className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                      <span className="hidden sm:inline text-[11px]">Jeda</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                      <span className="hidden sm:inline text-[11px]">Putar</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleNext}
                  title="Putar ke Kanan"
                  className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ================= VIEW 1: 3D ORBITAL ROTATION ================= */}
        {displayMode === "orbit" && (
          <div className="space-y-8">
            {/* 3D Perspective Stage */}
            {isMobile ? (
              /* ================= MOBILE 3D COVERFLOW ORBIT ================= */
              <div 
                className="relative w-full h-[320px] flex flex-col items-center justify-center select-none overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onTouchStart={() => setIsHovered(true)}
                onTouchEnd={() => setIsHovered(false)}
              >
                {/* Side Fade Vignette for Clean Screen Edges */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none z-30" />
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none z-30" />

                {/* Ambient Orbital Rings Behind Mobile Cards */}
                <div 
                  className="absolute w-[290px] h-[290px] rounded-full border border-emerald-500/15 pointer-events-none -z-10"
                  style={{ transform: "rotateX(72deg) translateY(35px)" }}
                />
                <div 
                  className="absolute w-[210px] h-[210px] rounded-full border border-teal-500/20 pointer-events-none -z-10 animate-spin"
                  style={{ animationDuration: "35s", transform: "rotateX(72deg) translateY(35px)" }}
                />
                <div className="absolute w-44 h-44 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none -z-10" />

                {/* Swipeable 3D Coverflow Carousel */}
                <motion.div
                  className="relative w-full h-[270px] flex items-center justify-center touch-pan-y cursor-grab active:cursor-grabbing"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.22}
                  onDragStart={() => setIsHovered(true)}
                  onDragEnd={(_, info) => {
                    setIsHovered(false);
                    if (info.offset.x < -30 || info.velocity.x < -200) {
                      handleNext();
                    } else if (info.offset.x > 30 || info.velocity.x > 200) {
                      handlePrev();
                    }
                  }}
                  style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
                >
                  {skillsList.map((skill, index) => {
                    let diff = (index - activeIndex) % totalSkills;
                    if (diff > totalSkills / 2) diff -= totalSkills;
                    if (diff < -totalSkills / 2) diff += totalSkills;

                    const isCenter = diff === 0;
                    const isImmediate = Math.abs(diff) === 1;
                    const isVisible = Math.abs(diff) <= 1;

                    // 3D positioning along curved mobile orbit
                    const xPos = diff === 0 ? 0 : diff === 1 ? 128 : diff === -1 ? -128 : diff > 0 ? 230 : -230;
                    const rotateYDeg = diff === 0 ? 0 : diff === 1 ? -22 : diff === -1 ? 22 : diff > 0 ? -35 : 35;
                    const zPos = diff === 0 ? 40 : isImmediate ? -25 : -90;
                    const scaleVal = diff === 0 ? 1.05 : isImmediate ? 0.82 : 0.65;
                    const opacityVal = diff === 0 ? 1 : isImmediate ? 0.48 : 0;
                    const zIndexVal = diff === 0 ? 30 : isImmediate ? 20 : 10;

                    const Icon = skill.icon;

                    return (
                      <motion.div
                        key={skill.name}
                        onClick={() => rotateToIndex(index)}
                        initial={false}
                        animate={{
                          x: xPos,
                          rotateY: rotateYDeg,
                          z: zPos,
                          scale: scaleVal,
                          opacity: opacityVal,
                          zIndex: zIndexVal,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 280,
                          damping: 28,
                          mass: 0.85,
                        }}
                        style={{
                          transformStyle: "preserve-3d",
                          pointerEvents: isVisible ? "auto" : "none",
                        }}
                        className="absolute w-[220px] rounded-2xl cursor-pointer"
                      >
                        <div
                          className={`p-4 rounded-2xl bg-gradient-to-br ${skill.gradient} border ${
                            isCenter 
                              ? "border-emerald-400 shadow-[0_0_35px_rgba(16,185,129,0.45)] ring-1 ring-emerald-400/40" 
                              : skill.border
                          } shadow-[0_12px_30px_rgba(0,0,0,0.7)] backdrop-blur-md relative overflow-hidden group select-none transition-shadow duration-300`}
                        >
                          {/* Glow for Active Card */}
                          {isCenter && (
                            <div 
                              className="absolute -inset-1 rounded-2xl opacity-100 blur-xl pointer-events-none -z-10"
                              style={{ background: skill.glow }}
                            />
                          )}

                          {/* Top Row: Icon & Category */}
                          <div className="flex items-center justify-between mb-2">
                            <div className={`w-8 h-8 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center ${skill.accent} shadow-md`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${skill.badge}`}>
                              {skill.category}
                            </span>
                          </div>

                          {/* Title & Subtitle */}
                          <h3 className="text-sm font-bold text-white tracking-tight mb-0.5 truncate">
                            {skill.name}
                          </h3>
                          <p className="text-[10px] text-zinc-400 font-medium mb-2.5 truncate">
                            {skill.subtitle}
                          </p>

                          {/* Tags Preview */}
                          <div className="flex flex-wrap gap-1 mb-2.5">
                            {skill.tags.slice(0, 2).map((tag, i) => (
                              <span key={i} className="text-[8.5px] bg-black/50 text-zinc-300 px-1.5 py-0.5 rounded border border-white/5 font-mono truncate max-w-full">
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Level badge */}
                          <div className="flex items-center justify-between text-xs text-zinc-400 pt-1.5 border-t border-white/10">
                            <div className="flex items-center gap-1 min-w-0">
                              <CheckCircle2 className={`w-3 h-3 ${skill.accent} shrink-0`} />
                              <span className="text-[10px] font-medium text-zinc-300 truncate">{skill.level}</span>
                            </div>
                            {isCenter ? (
                              <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/20 px-1.5 py-0.5 rounded-full border border-emerald-500/30 shrink-0">
                                Active
                              </span>
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 shrink-0" />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            ) : (
              /* ================= DESKTOP 3D CYLINDER ORBIT ================= */
              <div 
                className="relative w-full h-[420px] md:h-[460px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing touch-pan-y"
                style={{ perspective: "1100px" }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                  setIsHovered(false);
                  handleTouchEnd();
                }}
                onMouseDown={handleTouchStart}
                onMouseMove={handleTouchMove}
                onMouseUp={handleTouchEnd}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Subtle Orbital Ring on the Floor */}
                <div 
                  className="absolute w-[650px] md:w-[750px] h-[650px] md:h-[750px] rounded-full border border-emerald-500/10 pointer-events-none -z-10"
                  style={{
                    transform: "rotateX(78deg) translateZ(-40px)",
                  }}
                />
                <div 
                  className="absolute w-[480px] md:w-[580px] h-[480px] md:h-[580px] rounded-full border border-teal-500/15 pointer-events-none -z-10 animate-spin"
                  style={{
                    animationDuration: "50s",
                    transform: "rotateX(78deg) translateZ(-40px)",
                  }}
                />

                {/* The Rotating 3D Cylinder Container */}
                <div
                  className="relative w-0 h-0 preserve-3d transition-transform ease-out"
                  style={{
                    transform: `rotateY(${activeRotation}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {skillsList.map((skill, index) => {
                    const itemAngle = index * angleStep;
                    const totalAngle = (activeRotation + itemAngle) % 360;
                    const normalized = ((totalAngle % 360) + 360) % 360;
                    
                    const diffAngle = Math.abs(((totalAngle + 180) % 360) - 180);
                    const rad = (normalized * Math.PI) / 180;
                    const isFront = Math.cos(rad);
                    const isCenterFocused = index === activeIndex;
                    const centerFactor = Math.max(0, Math.cos((diffAngle * Math.PI) / 90));

                    const scale = 0.82 + (Math.max(0, isFront) * 0.12) + (centerFactor * 0.24);
                    const zOffset = centerFactor * 36;
                    const opacity = Math.max(0.28, (isFront + 1) / 2);

                    const Icon = skill.icon;

                    return (
                      <div
                        key={skill.name}
                        onClick={() => rotateToIndex(index)}
                        className="absolute -left-[150px] -top-[160px] w-[300px] rounded-2xl cursor-pointer transition-all duration-300"
                        style={{
                          transform: `rotateY(${itemAngle}deg) translateZ(${cylinderRadius + zOffset}px) scale(${scale})`,
                          opacity,
                          zIndex: Math.round((isFront + 1) * 100 + (centerFactor * 100)),
                          transformStyle: "preserve-3d",
                        }}
                      >
                        <div
                          className={`p-5 rounded-2xl bg-gradient-to-br ${skill.gradient} border ${
                            isCenterFocused 
                              ? "border-emerald-400 shadow-[0_0_35px_rgba(16,185,129,0.45)] ring-1 ring-emerald-400/40" 
                              : skill.border
                          } shadow-[0_12px_30px_rgba(0,0,0,0.7)] backdrop-blur-md relative overflow-hidden group select-none transition-shadow duration-300`}
                        >
                          {/* Glow for Active Card */}
                          {isCenterFocused && (
                            <div 
                              className="absolute -inset-1 rounded-2xl opacity-100 blur-xl pointer-events-none -z-10"
                              style={{ background: skill.glow }}
                            />
                          )}

                          {/* Top Row: Icon & Status */}
                          <div className="flex items-center justify-between mb-2">
                            <div className={`w-10 h-10 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center ${skill.accent} shadow-md`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${skill.badge}`}>
                              {skill.category}
                            </span>
                          </div>

                          {/* Title & Subtitle */}
                          <h3 className="text-lg font-bold text-white tracking-tight mb-0.5 truncate">
                            {skill.name}
                          </h3>
                          <p className="text-xs text-zinc-400 font-medium mb-2 truncate">
                            {skill.subtitle}
                          </p>

                          {/* Tags Preview */}
                          <div className="flex flex-wrap gap-1 mb-2">
                            {skill.tags.slice(0, 2).map((tag, i) => (
                              <span key={i} className="text-[10px] bg-black/50 text-zinc-300 px-1.5 py-0.5 rounded border border-white/5 font-mono truncate max-w-full">
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Level badge */}
                          <div className="flex items-center justify-between text-xs text-zinc-400 pt-1.5 border-t border-white/10">
                            <div className="flex items-center gap-1 min-w-0">
                              <CheckCircle2 className={`w-3.5 h-3.5 ${skill.accent} shrink-0`} />
                              <span className="text-[11px] font-medium text-zinc-300 truncate">{skill.level}</span>
                            </div>
                            {isCenterFocused ? (
                              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/20 px-1.5 py-0.5 rounded-full border border-emerald-500/30 shrink-0">
                                Active
                              </span>
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Mobile Navigation Indicator Bar & Swipe Hint */}
            {isMobile && (
              <div className="flex flex-col items-center justify-center gap-2 -mt-2 mb-1">
                <div className="flex items-center gap-2">
                  {skillsList.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => rotateToIndex(dotIdx)}
                      aria-label={`Skill ${dotIdx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        dotIdx === activeIndex
                          ? "w-6 bg-gradient-to-r from-emerald-400 to-teal-400 shadow-[0_0_8px_#34d399]"
                          : "w-1.5 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-zinc-400 font-medium">
                  Geser layar atau tap kartu untuk eksplorasi
                </span>
              </div>
            )}

            {/* Quick Skill Selector Pills */}
            <div className="flex flex-wrap justify-center items-center gap-2 pt-2">
              {skillsList.map((skill, index) => {
                const isActive = index === activeIndex;
                const Icon = skill.icon;
                return (
                  <button
                    key={skill.name}
                    onClick={() => rotateToIndex(index)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 ${
                      isActive
                        ? "bg-white/15 text-white border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] scale-105"
                        : "bg-zinc-900/60 text-zinc-400 border-white/10 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-emerald-400" : "text-zinc-500"}`} />
                    <span className="truncate max-w-[120px] sm:max-w-none">{skill.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Skill Detailed Spotlight Panel */}
            <motion.div
              key={currentSkill.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className={`p-6 sm:p-7 rounded-2xl bg-gradient-to-br ${currentSkill.gradient} border ${currentSkill.border} shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl relative overflow-hidden`}
            >
              <div 
                className="absolute -inset-1 rounded-2xl opacity-60 blur-2xl pointer-events-none -z-10"
                style={{ background: currentSkill.glow }}
              />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${currentSkill.badge}`}>
                      {currentSkill.category}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-3">
                    {currentSkill.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-3xl">
                    {currentSkill.description}
                  </p>
                </div>

                {/* Capability Badges */}
                <div className="md:w-80 flex flex-wrap content-center gap-1.5 bg-black/40 p-3.5 rounded-xl border border-white/10 shrink-0">
                  {currentSkill.tags.map((tag, idx) => (
                    <span key={idx} className="text-[11px] bg-white/5 hover:bg-white/10 text-zinc-200 px-2.5 py-1 rounded-md border border-white/10 font-mono transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* ================= VIEW 2: DUAL-LANE CONVEYOR STREAM ================= */}
        {displayMode === "stream" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs text-zinc-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Dual-Track Conveyor • Gerakan otomatis kontinu
              </span>
              <span className="text-xs text-zinc-400">
                Arahkan kursor untuk menjeda
              </span>
            </div>

            {/* Track 1: Moving Left (Software & Platform) */}
            <div className="relative w-full overflow-hidden py-2" style={{ perspective: "1000px" }}>
              <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />

              <div className="animate-marquee flex gap-5 px-4">
                {streamSoftware.map((skill, index) => (
                  <StreamSkillCard key={`track1-${index}`} skill={skill} />
                ))}
              </div>
            </div>

            {/* Track 2: Moving Right (Expertise & Management) */}
            <div className="relative w-full overflow-hidden py-2" style={{ perspective: "1000px" }}>
              <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />

              <div className="animate-marquee-reverse flex gap-5 px-4">
                {streamExpertise.map((skill, index) => (
                  <StreamSkillCard key={`track2-${index}`} skill={skill} />
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ================= PART 2: PROFESSIONAL CERTIFICATIONS ================= */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            PROFESSIONAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-indigo-400">CERTIFICATIONS.</span>
          </motion.h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-2 max-w-xl">
            Sertifikasi BNSP, Pembinaan K3, dan pengembangan kompetensi manajemen SDM profesional.
          </p>
        </div>

        {/* 2-Column Responsive Grid for Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {certificationsData.map((cert, index) => (
            <InteractiveCertCard key={index} cert={cert} index={index} />
          ))}
        </div>
      </div>

    </section>
  );
};
