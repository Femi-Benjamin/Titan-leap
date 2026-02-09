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

// "use client";
// import { useRef } from "react";
// import website1 from "../assets/website1.mp4";

// export default function VideoHero() {
//   const videoRef = useRef<HTMLVideoElement>(null);

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-[#000000]">
//       {/* Video Background */}
//       <div className="absolute inset-0 z-0">
//         <video
//           ref={videoRef}
//           className="w-full h-full object-cover"
//           autoPlay
//           muted
//           loop
//           playsInline
//         >
//           <source src={website1} type="video/mp4" />
//         </video>
//       </div>
//       {/* Dark overlay for better text readability */}
//       <div className="absolute inset-0 z-10"></div>

//       {/* Content */}
//       <div className="relative z-20 flex flex-col justify-end min-h-screen pb-8 md:pb-10 px-8 md:px-16 lg:px-24">
//         <div className="max-w-2xl">
//           {/* <h1 className="text-white text-3xl md:text-4xl lg:text-5xl leading-tight mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] font-Achivo font-[800px]">
//             <div>Innovate. Elevate.</div>
//             <div className="text-6xl md:text-7xl lg:text-8xl">Succeed.</div>
//           </h1> */}

//           {/* <div className="flex flex-col sm:flex-row gap-4">
//             <button className="bg-[#FED65E] text-[#4C12BF] hover:bg-[#4C12BF] text-[20px] hover:text-[#FED65E] px-10 py-2 rounded-xl cursor-pointer transition-colors duration-200 shadow-xl font-Achivo">
//             {"Let's Talk"}
//             </button>
//             <button className="border-2 border-[#FED65E] text-[#FED65E] hover:bg-[#FED65E] text-[20px] hover:text-[#4C12BF] hover:border-[#4C12BF] bg-[#4C12BF] bg-opacity-80 px-4 py-2 rounded-xl hover:bg-opacity-100 transition-all duration-200 cursor-pointer shadow-xl font-Achivo">
//             See our work
//             </button>
//             </div> */}
//           <p className="text-white text-lg md:text-2xl mb-8 leading-relaxed max-w-xl font-DM Sans">
//             Next-level content, ads, and automation — We do the work, while you
//             recharge and scale.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
