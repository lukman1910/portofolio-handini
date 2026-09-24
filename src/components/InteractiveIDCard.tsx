import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useAnimationFrame, animate } from "framer-motion";
import { profileData } from "../data/profile";

interface InteractiveIDCardProps {
  containerWidth?: number;
}

export const InteractiveIDCard = ({}: InteractiveIDCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const strapStitchRef = useRef<SVGPathElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Motion values for physical positioning
  // Initial starting offset: swung slightly to the right and lifted along pendulum arc
  const x = useMotionValue(90);
  const y = useMotionValue(-12);

  // Pendulum rotation based on X position
  // When card swings right (x > 0), lanyard tilts clockwise, so card tilts positive Z
  const rotateZ = useTransform(x, [-160, 0, 160], [-14, 0, 14]);
  // 3D perspective tilt
  const rotateY = useTransform(x, [-160, 0, 160], [-10, 0, 10]);
  const rotateX = useTransform(y, [-160, 0, 160], [8, 0, -8]);

  const isDraggingRef = useRef(false);
  const swayXAnimRef = useRef<ReturnType<typeof animate> | null>(null);
  const swayYAnimRef = useRef<ReturnType<typeof animate> | null>(null);

  // Standby swaying animation: continuous gentle pendulum oscillation
  const startStandbySway = () => {
    if (isDraggingRef.current) return;

    // Stop any existing sway animations
    swayXAnimRef.current?.stop();
    swayYAnimRef.current?.stop();

    // Gentle natural pendulum swaying: +/- 10px on x
    swayXAnimRef.current = animate(x, [-10, 10, -10], {
      repeat: Infinity,
      duration: 3.8,
      ease: "easeInOut",
    });

    // Slight vertical arc lift at the swing edges (+/- 2px on y)
    swayYAnimRef.current = animate(y, [-2, 0, -2], {
      repeat: Infinity,
      duration: 1.9,
      ease: "easeInOut",
    });
  };

  const stopStandbySway = () => {
    swayXAnimRef.current?.stop();
    swayYAnimRef.current?.stop();
  };

  // Initial gentle swing animation on page open that settles and smoothly enters standby sway
  useEffect(() => {
    const timer = setTimeout(() => {
      const animX = animate(x, 0, {
        type: "spring",
        stiffness: 16,
        damping: 3.5,
        mass: 2.2,
        restDelta: 0.1,
        onComplete: () => {
          startStandbySway();
        },
      });

      const animY = animate(y, 0, {
        type: "spring",
        stiffness: 30,
        damping: 7,
        mass: 1.6,
        restDelta: 0.1,
      });

      return () => {
        animX.stop();
        animY.stop();
        stopStandbySway();
      };
    }, 200);

    return () => {
      clearTimeout(timer);
      stopStandbySway();
    };
  }, [x, y]);

  // Handle drag start: pause standby sway
  const handleDragStart = () => {
    isDraggingRef.current = true;
    stopStandbySway();
  };

  // Handle drag release: return to center with spring physics, then resume standby sway
  const handleDragEnd = () => {
    isDraggingRef.current = false;
    animate(x, 0, {
      type: "spring",
      stiffness: 24,
      damping: 5.5,
      mass: 1.8,
      restDelta: 0.1,
      onComplete: () => {
        startStandbySway();
      },
    });
    animate(y, 0, {
      type: "spring",
      stiffness: 35,
      damping: 8,
      mass: 1.5,
      restDelta: 0.1,
    });
  };

  // High-performance 60fps lanyard strap tracking
  useAnimationFrame(() => {
    if (!containerRef.current || !cardRef.current || !pathRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const cardRect = cardRef.current.getBoundingClientRect();

    // Anchor point: top center of the card's slot column
    const anchorX = cardRect.left + cardRect.width / 2 - containerRect.left;
    const anchorY = 0;

    // Card attachment point: top center of the connector clip
    const cardTopX = cardRect.left + cardRect.width / 2 - containerRect.left;
    const cardTopY = cardRect.top - containerRect.top - 10;

    // Curvature for physical lanyard slack
    const midX = (anchorX + cardTopX) / 2;
    const midY = (anchorY + cardTopY) / 2;

    const d = `M ${anchorX} ${anchorY} Q ${midX} ${midY + 6} ${cardTopX} ${cardTopY}`;
    pathRef.current.setAttribute("d", d);
    if (strapStitchRef.current) strapStitchRef.current.setAttribute("d", d);
  });

  return (
    <div ref={containerRef} className="w-full h-full relative pointer-events-none select-none">
      {/* Fabric Lanyard Strap SVG */}
      <svg className="absolute inset-0 w-full h-full" style={{ filter: "drop-shadow(0px 8px 16px rgba(0,0,0,0.7))" }}>
        <defs>
          <linearGradient id="strapGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#09090b" />
            <stop offset="50%" stopColor="#18181b" />
            <stop offset="100%" stopColor="#09090b" />
          </linearGradient>
        </defs>

        {/* Thick fabric strap ribbon */}
        <path
          id="lanyard-ribbon"
          ref={pathRef}
          stroke="url(#strapGradient)"
          strokeWidth="20"
          fill="none"
          strokeLinecap="square"
        />

        {/* Stitched edge lines */}
        <path
          ref={strapStitchRef}
          stroke="#4f46e5"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          fill="none"
          opacity="0.6"
        />

        {/* Repeating text along the lanyard ribbon */}
        <text fill="#a1a1aa" fontSize="8" fontWeight="bold" letterSpacing="2.5" opacity="0.85">
          <textPath ref={textPathRef} href="#lanyard-ribbon" startOffset="15%">
            HANDINI • OFFICIAL ID • HR & ADMIN •
          </textPath>
        </text>
      </svg>

      {/* ID Card Wrapper - Scaled cleanly on mobile */}
      <div className="absolute top-[8%] sm:top-[12%] lg:top-[14%] left-1/2 -translate-x-1/2 w-[280px] h-[450px] scale-[0.88] sm:scale-95 lg:scale-100 origin-top">
        <motion.div
          ref={cardRef}
          style={{
            x,
            y,
            rotateZ,
            rotateY,
            rotateX,
            transformOrigin: "50% 0px", // Pivots at the top connector
            z: 100,
          }}
          drag={isMobile ? "x" : true}
          dragConstraints={isMobile ? { left: -100, right: 100 } : undefined}
          dragElastic={0.5}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          whileDrag={{ scale: 1.03, cursor: "grabbing" }}
          whileHover={{ scale: 1.015 }}
          className="w-full h-full pointer-events-auto cursor-grab relative touch-pan-y"
        >
          {/* Metallic Clip / Buckle Connector */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-14 h-7 z-30 flex flex-col items-center">
            {/* Metal Swivel Clasp */}
            <div className="w-10 h-3.5 bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-500 rounded-t-sm shadow-md border-t border-x border-white/40 flex justify-center items-center">
              <div className="w-6 h-1 bg-zinc-800 rounded-full" />
            </div>
            {/* Plastic/Metal Loop Grip */}
            <div className="w-12 h-3.5 bg-gradient-to-b from-zinc-800 to-black rounded-b-md border border-zinc-700 flex justify-center items-center shadow-lg">
              <div className="w-4 h-1.5 bg-zinc-900 rounded-full border border-zinc-600 shadow-inner" />
            </div>
          </div>

          {/* ID Card Body (Stylized Holographic Executive Card) */}
          <div className="w-full h-full bg-gradient-to-b from-zinc-900/95 via-zinc-900/90 to-black/95 backdrop-blur-2xl rounded-2xl border border-blue-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(37,99,235,0.2)] overflow-hidden flex flex-col relative z-10 before:absolute before:inset-0 before:bg-gradient-to-tr before:from-transparent before:via-white/10 before:to-transparent before:pointer-events-none">
            
            {/* Ambient Blue/Cyan Underglow */}
            <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-10 -left-10 w-36 h-36 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Top Bar: Chip & Verified Badge */}
            <div className="px-5 pt-3.5 pb-1 flex items-center justify-between z-20">
              {/* EMV Smart Chip */}
              <div className="w-8 h-6 rounded-md bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-600 p-0.5 shadow-md border border-yellow-200/40 relative overflow-hidden flex flex-col justify-between">
                <div className="w-full h-[1px] bg-amber-800/40 mt-1" />
                <div className="w-full h-[1px] bg-amber-800/40 mb-1" />
                <div className="absolute inset-y-0 left-1/2 w-[1px] -translate-x-1/2 bg-amber-800/40" />
              </div>

              {/* Status / ID Number */}
              <div className="text-right">
                <div className="flex items-center gap-1.5 justify-end">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_6px_#60a5fa]" />
                  <span className="text-[9px] font-bold text-blue-300 uppercase tracking-widest">OFFICIAL ID</span>
                </div>
                <span className="text-[9px] font-mono text-zinc-500 tracking-wider">#2026-HDN</span>
              </div>
            </div>

            {/* Photo Container - Compact, Neat & object-contain */}
            <div className="mx-auto my-1.5 w-[125px] h-[195px] rounded-xl relative p-0.5 bg-gradient-to-b from-blue-400/40 via-white/15 to-indigo-500/40 border border-white/20 shadow-[0_6px_16px_rgba(0,0,0,0.6)] flex items-center justify-center overflow-hidden group z-20">
              <div className="w-full h-full rounded-[10px] bg-zinc-950 overflow-hidden flex items-center justify-center relative">
                <img
                  src="/profile.jpg"
                  alt={profileData.name}
                  className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextElementSibling?.classList.remove("hidden");
                  }}
                />
                <div className="hidden flex-col items-center justify-center text-center p-2">
                  <span className="text-2xl text-zinc-600 font-black">HD</span>
                  <span className="text-[9px] text-zinc-400 mt-1">{profileData.name}</span>
                </div>
              </div>
            </div>

            {/* Stylized Signature / Name Area */}
            <div className="px-5 pt-1.5 pb-1 text-center z-20">
              <div className="relative inline-block">
                <h3 className="text-xl font-serif italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-indigo-200 tracking-wide drop-shadow-sm">
                  {profileData.name}
                </h3>
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent mt-0.5" />
              </div>

              <p className="text-[10px] font-medium text-blue-300/90 tracking-wider uppercase mt-0.5">
                {profileData.title}
              </p>
            </div>

            {/* Compact Details Strip */}
            <div className="px-5 py-1 z-20">
              <div className="grid grid-cols-2 gap-1.5 text-center bg-black/40 px-2.5 py-1.5 rounded-lg border border-white/5">
                <div>
                  <div className="text-[8px] text-zinc-400 uppercase tracking-wider">Pengalaman</div>
                  <div className="text-[10px] font-semibold text-white">10+ Tahun</div>
                </div>
                <div>
                  <div className="text-[8px] text-zinc-400 uppercase tracking-wider">Spesialisasi</div>
                  <div className="text-[10px] font-semibold text-blue-300 truncate">BPJS & Payroll</div>
                </div>
              </div>
            </div>

            {/* Card Footer: Barcode & Security Hologram */}
            <div className="mt-auto px-5 py-2.5 border-t border-white/10 bg-black/50 flex items-center justify-between z-20">
              {/* Barcode */}
              <div className="flex gap-0.5 items-center opacity-45">
                {[3, 1, 4, 1, 6, 2, 1, 5, 2, 4, 1, 6, 3, 1, 4, 2, 5, 1, 3].map((w, i) => (
                  <div key={i} className="h-4 bg-white rounded-xs" style={{ width: `${w}px` }} />
                ))}
              </div>

              {/* Holographic Seal */}
              <div className="flex items-center gap-1.5">
                <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">VERIFIED</span>
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 opacity-80 flex items-center justify-center shadow-[0_0_8px_rgba(6,182,212,0.6)]">
                  <div className="w-1 h-1 rounded-full bg-white" />
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};
