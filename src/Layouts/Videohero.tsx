import React, { useEffect, useState, useMemo } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

interface HeroProps {
  onOpenAudit: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenAudit }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {/* Parallax Background Ambience */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[#4c1d95] rounded-[100%] blur-[120px] opacity-20 -z-20 will-change-transform transition-transform duration-75 ease-out"
        style={{ transform: `translate(-50%, ${scrollY * 0.2}px)` }}
      ></div>
      <div
        className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600 rounded-full blur-[150px] opacity-10 -z-20 will-change-transform transition-transform duration-75 ease-out"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      ></div>
      <div
        className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full blur-[130px] opacity-10 -z-20 will-change-transform transition-transform duration-75 ease-out"
        style={{ transform: `translateY(${-scrollY * 0.1}px)` }}
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
            Done for your Growth System
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
          className="relative w-full aspect-video max-w-5xl mx-auto glass-panel rounded-2xl overflow-hidden group cursor-pointer border border-white/20 shadow-2xl"
        >
          <div className="absolute inset-0 bg-backdrop-blur-3xl opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

          {/* Animated Background Mesh in Video */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-700 rounded-full blur-[100px] animate-float"></div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-20 h-20  bg-accent-yellow flex items-center justify-center transform transition-transform duration-300"
            >
              <Play className="fill-[#FED65E] text-[#FED65E] ml-1" size={50} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
