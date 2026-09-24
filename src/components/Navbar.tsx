import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine active section
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 150) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/10 py-4 shadow-2xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#home");
          }}
          className="group flex items-center gap-2"
        >
          <span className="text-xl md:text-2xl font-black tracking-tight text-white group-hover:text-indigo-400 transition-colors">
            Handini<span className="text-indigo-500">.</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className={`relative px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded-full transition-all duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-indigo-600/80 rounded-full -z-10 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => scrollTo("#contact")}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-indigo-600 border border-white/15 hover:border-indigo-500 text-white px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
          >
            <span>Hubungi</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-zinc-300 hover:text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer & Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop: Clicking anywhere outside closes the menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-[73px] bg-black/70 backdrop-blur-md z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden relative z-50 bg-zinc-950/95 border-b border-white/10 backdrop-blur-2xl px-6 py-6 shadow-2xl"
            >
              <div className="flex flex-col gap-2.5">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollTo(link.href)}
                    className={`text-left px-4 py-3 text-sm uppercase tracking-wider font-semibold rounded-xl transition-all ${
                      activeSection === link.href.substring(1)
                        ? "bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                        : "text-zinc-300 hover:bg-white/5 active:bg-white/10"
                    }`}
                  >
                    {link.name}
                  </button>
                ))}
                <button
                  onClick={() => scrollTo("#contact")}
                  className="mt-3 w-full text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-indigo-600/30 active:scale-95 transition-transform"
                >
                  Hubungi Saya
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
