"use client";

import { motion } from "framer-motion";

export default function DecorativeLamps() {
  return (
    <div className="fixed top-0 left-0 w-full h-0 z-0 pointer-events-none overflow-visible">
      
      {/* --- LEFT LAMP --- */}
      <div className="absolute left-6 -top-10 md:left-20">
        <Lamp size="lg" delay={0} />
      </div>

      {/* --- RIGHT LAMP (Smaller, hanging lower) --- */}
      <div className="absolute right-6 -top-4 md:right-20">
        <Lamp size="sm" delay={1.5} />
      </div>

    </div>
  );
}

// Reusable Lamp SVG
function Lamp({ size, delay }: { size: "sm" | "lg"; delay: number }) {
  const width = size === "lg" ? 80 : 60;
  const height = size === "lg" ? 300 : 220; // Longer chain for large

  return (
    <motion.div
      initial={{ rotate: -2 }}
      animate={{ rotate: 2 }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay: delay,
      }}
      style={{ transformOrigin: "top center" }} // Swings from the ceiling
      className="relative flex flex-col items-center"
    >
      {/* 1. The Wire/Chain */}
      <div className="w-0.5 bg-gradient-to-b from-yellow-600 to-yellow-400 h-20 md:h-32 opacity-80" />

      {/* 2. The Lantern SVG */}
      <div className="relative z-10">
        {/* Glow Effect behind the lamp */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-yellow-500/20 blur-[50px] rounded-full" />
        
        <svg
          width={width}
          viewBox="0 0 54 86"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]"
        >
          {/* Lantern Top */}
          <path d="M27 0L35 10H19L27 0Z" fill="#ca8a04" />
          
          {/* Lantern Body Outer */}
          <path
            d="M14 10H40L48 35H6L14 10Z"
            fill="url(#goldGradient)"
            stroke="#a16207"
            strokeWidth="0.5"
          />
          
          {/* Lantern Glass (Window) */}
          <path
            d="M18 14H36L42 31H12L18 14Z"
            fill="#fef08a"
            fillOpacity="0.8"
          />
          
          {/* Internal Light Bulb/Flame */}
          <circle cx="27" cy="24" r="4" fill="#fef9c3" className="animate-pulse" />

          {/* Lantern Bottom */}
          <path d="M6 35H48L27 55L6 35Z" fill="#ca8a04" />
          
          {/* Decorative Drop at bottom */}
          <circle cx="27" cy="60" r="3" fill="#eab308" />
          
          {/* Gradients */}
          <defs>
            <linearGradient id="goldGradient" x1="27" y1="10" x2="27" y2="55" gradientUnits="userSpaceOnUse">
              <stop stopColor="#eab308" />
              <stop offset="1" stopColor="#a16207" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* 3. Light Beam (Cone of light downwards) */}
      <div className="w-[100px] h-[200px] bg-gradient-to-b from-yellow-500/10 to-transparent blur-2xl -mt-10 clip-path-triangle" />

    </motion.div>
  );
}