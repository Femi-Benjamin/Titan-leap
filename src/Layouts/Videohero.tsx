import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import clientcall from "../assets/clientcall.mp4";

interface HeroProps {
  onOpenAudit: () => void;
}

// Detect Safari/iOS to disable heavy parallax (causes jank on iOS WebKit)
const isSafari = () => {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return (
    /^((?!chrome|android).)*safari/i.test(ua) || /iPad|iPhone|iPod/.test(ua)
  );
};

const Hero: React.FC<HeroProps> = ({ onOpenAudit }) => {
  const [scrollY, setScrollY] = useState(0);
  const isSafariBrowser = useRef(false);

  useEffect(() => {
    isSafariBrowser.current = isSafari();
  }, []);

  useEffect(() => {
    // Skip scroll listener entirely on Safari to avoid parallax jank
    if (isSafariBrowser.current) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parallax multiplier: 0 on Safari (no jank), normal on Chrome/Android
  const parallaxMultiplier = isSafariBrowser.current ? 0 : 1;

  const particles = useMemo(() => {
    return [...Array(25)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.1,
    }));
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center bg[#2e1065]  bg-gradient-to-b from-[#FFFFFF] to-[#4C12BF] justify-center pt-32 pb-20 px-6 overflow-hidden"
    >
      {/* Parallax Background Ambience — disabled on Safari for performance */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[#4c1d95] rounded-[100%] blur-[120px] opacity-20 -z-20 will-change-transform transition-transform duration-75 ease-out"
        style={{
          transform: `translate(-50%, ${scrollY * 0.2 * parallaxMultiplier}px)`,
        }}
      ></div>
      <div
        className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600 rounded-full blur-[150px] opacity-10 -z-20 will-change-transform transition-transform duration-75 ease-out"
        style={{
          transform: `translateY(${scrollY * 0.15 * parallaxMultiplier}px)`,
        }}
      ></div>
      <div
        className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full blur-[130px] opacity-10 -z-20 will-change-transform transition-transform duration-75 ease-out"
        style={{
          transform: `translateY(${-scrollY * 0.1 * parallaxMultiplier}px)`,
        }}
      ></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animation: `float ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
              boxShadow: `0 0 ${p.size * 2}px rgba(255, 255, 255, 0.3)`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-4 inline-block"
        >
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-[#4C12BF] font-medium text-xl tracking-wide inline-block"
          >
            Done for you Growth System
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 drop-shadow-2xl"
        >
          <span className="block text-[#4C12BF]">
            Turn Clicks Into Customers.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-[#4C12BF] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Next-level funnels, content, ads, and AI automation We do the work,
          while you recharge and scale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenAudit}
            className="px-10 md:px-60 py-3 bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-[#FED65E] font-bold rounded-full hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all transform border border-white/20"
          >
            Get a Free Funnel Audit
          </motion.button>
        </motion.div>

        {/* Video Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative w-full aspect-video max-w-5xl mx-auto glass-panel rounded-2xl overflow-hidden group border border-white/20 shadow-2xl"
        >
          <video
            autoPlay
            muted
            playsInline
            loop
            controls
            preload="metadata"
            className="w-full h-full object-cover"
          >
            <source src={clientcall} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
