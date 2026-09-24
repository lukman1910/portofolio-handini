import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  MapPin, 
  Send, 
  Check, 
  Copy, 
  MessageCircle, 
  ArrowUpRight,
  User,
  MessageSquare
} from "lucide-react";
import { profileData } from "../data/profile";

export const Contact = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("Perekrutan & HR");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(profileData.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Open mailto with prefilled details
    const subject = encodeURIComponent(`[${selectedTopic}] Kontak dari ${formData.name}`);
    const body = encodeURIComponent(
      `Halo Handini,\n\nNama: ${formData.name}\nEmail: ${formData.email}\nTopik: ${selectedTopic}\n\nPesan:\n${formData.message}`
    );
    window.open(`mailto:${profileData.email}?subject=${subject}&body=${body}`, "_blank");

    setIsSubmitted(true);
  };

  const topics = [
    "Perekrutan & HR",
    "Peluang Kerja",
    "Diskusi Proyek",
    "Pertanyaan Lain"
  ];

  return (
    <section id="contact" className="py-20 sm:py-28 md:py-32 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto text-white relative">
      {/* Background ambient neon lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Glassmorphic Wrapper */}
      <div className="relative rounded-3xl bg-gradient-to-br from-zinc-900/90 via-zinc-950/95 to-zinc-900/90 border border-white/15 p-6 sm:p-10 md:p-14 lg:p-16 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden">
        
        {/* Subtle decorative grid overlay & radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/15 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-purple-500/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 relative z-10 items-start">
          
          {/* ================= LEFT COLUMN: INFO & DIRECT CARDS ================= */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {/* Availability Status Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3 tracking-wide"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                <span>TERBUKA UNTUK PELUANG KARIER BARU</span>
              </motion.div>

              {/* Matching Headline Typography */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight"
              >
                LET'S <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                  CONNECT.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-zinc-400 text-xs sm:text-sm md:text-base mt-3 leading-relaxed"
              >
                Mari diskusikan bagaimana pengalaman lebih dari 10 tahun saya dalam administrasi korporat, payroll, dan kepatuhan BPJS dapat memberikan akselerasi nyata bagi perusahaan Anda.
              </motion.p>
            </div>

            {/* Direct Contact Interactive Channels */}
            <div className="space-y-3 pt-2">
              {/* Email Card */}
              <motion.div
                whileHover={{ y: -3, scale: 1.01 }}
                className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 hover:border-indigo-500/40 transition-all duration-300 group flex items-center justify-between gap-3 shadow-md"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Email Resmi</div>
                    <a 
                      href={`mailto:${profileData.email}`}
                      className="text-xs sm:text-sm font-bold text-white hover:text-indigo-300 transition-colors truncate block"
                    >
                      {profileData.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  title="Salin Email"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors shrink-0"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </motion.div>

              {/* WhatsApp Card */}
              <motion.div
                whileHover={{ y: -3, scale: 1.01 }}
                className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 group flex items-center justify-between gap-3 shadow-md"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">WhatsApp & Telepon</div>
                    <div className="text-xs sm:text-sm font-bold text-white font-mono">
                      {profileData.phone}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={handleCopyPhone}
                    title="Salin Nomor"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                  >
                    {copiedPhone ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  <a
                    href="https://wa.me/628978796232"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Buka WhatsApp"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 text-xs font-semibold transition-colors"
                  >
                    <span>Chat</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>

              {/* Location Card */}
              <motion.div
                whileHover={{ y: -3, scale: 1.01 }}
                className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 hover:border-purple-500/40 transition-all duration-300 group flex items-center gap-3.5 shadow-md"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Lokasi Domisili</div>
                  <div className="text-xs sm:text-sm font-bold text-white">
                    {profileData.location}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">
                    Tersedia untuk Onsite, Hybrid, atau Remote di area Jabodetabek
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: INTERACTIVE CONTACT FORM ================= */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 bg-zinc-900/60 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-xl"
          >
            {/* Topic Pills Selection */}
            <div className="mb-5">
              <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-2">
                Topik Keperluan
              </label>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {topics.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTopic(t)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 ${
                      selectedTopic === t
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-500/25 scale-105 border border-indigo-400/30"
                        : "bg-black/40 text-zinc-400 border border-white/10 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Inputs or Success Message */}
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-10 text-center space-y-3"
                >
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Pesan Siap Terkirim!</h4>
                  <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
                    Aplikasi email Anda telah dibuka dengan draf pesan otomatis. Anda juga dapat menghubungi langsung via WhatsApp.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: "", email: "", message: "" });
                    }}
                    className="mt-3 px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                  >
                    Kirim Pesan Lain
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Input */}
                  <div>
                    <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1.5">
                      Nama Lengkap / Perusahaan
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                        <User className="w-4 h-4" />
                      </div>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Contoh: Bpk. Hendra / PT. Sukses Bersama" 
                        className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-zinc-500 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/30 transition-all"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1.5">
                      Email Anda
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="email.anda@perusahaan.com" 
                        className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-zinc-500 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/30 transition-all"
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1.5">
                      Pesan / Informasi Kebutuhan
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3.5 pointer-events-none text-zinc-500">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <textarea 
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tuliskan pesan Anda, jadwal interview, atau tawaran kerja sama di sini..." 
                        className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-zinc-500 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/30 transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button with Gradient & Glow */}
                  <motion.button 
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(99,102,241,0.35)] hover:shadow-[0_6px_30px_rgba(99,102,241,0.5)] transition-all cursor-pointer mt-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>KIRIM PESAN SEKARANG</span>
                  </motion.button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
