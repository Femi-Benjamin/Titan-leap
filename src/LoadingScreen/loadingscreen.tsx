"use client";
import { useEffect, useState, useRef } from "react";
import titanwebsiteintro from "../assets/titanwebsiteintro.mp4";

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
}

export default function TitanLeapLoading() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes wave {
        0% { transform: rotate(0deg); }
        10% { transform: rotate(14deg); }
        20% { transform: rotate(-8deg); }
        30% { transform: rotate(14deg); }
        40% { transform: rotate(-4deg); }
        50% { transform: rotate(10deg); }
        60% { transform: rotate(0deg); }
        100% { transform: rotate(0deg); }
      }
      .animate-wave {
        animation: wave 2s infinite;
        display: inline-block;
        transform-origin: 70% 70%;
      }
    `;
    document.head.appendChild(style);

    // 🎬 Slow down video playback
    const handleLoadedData = () => {
      if (videoRef.current) {
        videoRef.current.playbackRate = 0.0;
      }
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("loadeddata", handleLoadedData);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("loadeddata", handleLoadedData);
      }
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  // ✨ Floating particles
  const FloatingParticles = () => {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
      const createParticle = () => {
        if (Math.random() > 0.7) {
          const id = Date.now() + Math.random();
          const newParticle: Particle = {
            id,
            left: Math.random() * 100,
            size: Math.random() * 4 + 2,
            duration: Math.random() * 4 + 4,
          };

          setParticles((prev) => [...prev, newParticle]);
          setTimeout(() => {
            setParticles((prev) => prev.filter((p) => p.id !== id));
          }, newParticle.duration * 1000);
        }
      };

      const interval = setInterval(createParticle, 500);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-blue-400/40 rounded-full animate-ping"
            style={{
              left: `${particle.left}%`,
              top: `${Math.random() * 100}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen max-h-screen w-full font-Achivo flex items-center justify-center relative overflow-hidden">
      {/* 🎬 Responsive Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center"
        >
          <source src={titanwebsiteintro} type="video/mp4" />
        </video>

        {/* Slight dark overlay for visibility */}
        <div className="absolute inset-0 bg-black/20 sm:bg-black/10"></div>
      </div>

      {/* Animated background elements */}
      <FloatingParticles />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 bg-cyan-500/20 rounded-full blur-2xl animate-ping"></div>
      </div>

      {/* Static floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* 📱 Text only visible on mobile */}
      <div className="z-10 text-white text-center px-4 block sm:hidden">
        <h1 className="text-2xl font-semibold drop-shadow-lg">
          Welcome to Titan Leap
        </h1>
        {/* <p className="mt-2 text-sm opacity-80">
          Loading experience in progress...
        </p> */}
      </div>
    </div>
  );
}

// "use client";
// import { useEffect, useState } from "react";
// import websiteintro from "../assets/websiteintro.mp4";

// interface Particle {
//   id: number;
//   left: number;
//   size: number;
//   duration: number;
// }

// export default function TitanLeapLoading() {
//   useEffect(() => {
//     // Add the wave animation CSS to the document
//     const style = document.createElement("style");
//     style.textContent = `
//       @keyframes wave {
//         0% { transform: rotate(0deg); }
//         10% { transform: rotate(14deg); }
//         20% { transform: rotate(-8deg); }
//         30% { transform: rotate(14deg); }
//         40% { transform: rotate(-4deg); }
//         50% { transform: rotate(10deg); }
//         60% { transform: rotate(0deg); }
//         100% { transform: rotate(0deg); }
//       }
//       .animate-wave {
//         animation: wave 2s infinite;
//         display: inline-block;
//         transform-origin: 70% 70%;
//       }
//     `;
//     document.head.appendChild(style);

//     const timer5 = setTimeout(() => setShowPulse(true), 2500);

//     return () => {
//       clearTimeout(timer5);
//       // Clean up the style element
//       if (style.parentNode) {
//         style.parentNode.removeChild(style);
//       }
//     };
//   }, []);

//   // Floating particles component
//   const FloatingParticles = () => {
//     const [particles, setParticles] = useState<Particle[]>([]);

//     useEffect(() => {
//       const createParticle = () => {
//         if (Math.random() > 0.7) {
//           const id = Date.now() + Math.random();
//           const newParticle: Particle = {
//             id,
//             left: Math.random() * 100,
//             size: Math.random() * 4 + 2,
//             duration: Math.random() * 4 + 4,
//           };

//           setParticles((prev) => [...prev, newParticle]);

//           setTimeout(() => {
//             setParticles((prev) => prev.filter((p) => p.id !== id));
//           }, newParticle.duration * 1000);
//         }
//       };

//       const interval = setInterval(createParticle, 500);
//       return () => clearInterval(interval);
//     }, []);

//     return (
//       <div className="absolute inset-0 pointer-events-none">
//         {particles.map((particle) => (
//           <div
//             key={particle.id}
//             className="absolute bg-blue-400/40 rounded-full animate-ping"
//             style={{
//               left: `${particle.left}%`,
//               top: `${Math.random() * 100}%`,
//               width: `${particle.size}px`,
//               height: `${particle.size}px`,
//               animationDuration: `${particle.duration}s`,
//             }}
//           />
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen font-Achivo flex items-center justify-center relative overflow-hidden">
//       {/* Video Background */}
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute inset-0 w-full h-full object-cover"
//       >
//         <source src={websiteintro} type="video/mp4" />
//       </video>

//       {/* Animated background elements */}
//       <FloatingParticles />
//       <div className="absolute inset-0">
//         <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl animate-ping"></div>
//       </div>

//       {/* Static floating particles */}
//       <div className="absolute inset-0 pointer-events-none">
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-ping"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 3}s`,
//               animationDuration: `${2 + Math.random() * 2}s`,
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";

// interface Particle {
//   id: number;
//   left: number;
//   size: number;
//   duration: number;
// }

// export default function TitanLeapLoading() {
//   const [showWelcome, setShowWelcome] = useState(false);
//   const [showTo, setShowTo] = useState(false);
//   const [showTitan, setShowTitan] = useState(false);
//   const [showLeap, setShowLeap] = useState(false);
//   const [showPulse, setShowPulse] = useState(false);

//   useEffect(() => {
//     // Add the wave animation CSS to the document
//     const style = document.createElement("style");
//     style.textContent = `
//       @keyframes wave {
//         0% { transform: rotate(0deg); }
//         10% { transform: rotate(14deg); }
//         20% { transform: rotate(-8deg); }
//         30% { transform: rotate(14deg); }
//         40% { transform: rotate(-4deg); }
//         50% { transform: rotate(10deg); }
//         60% { transform: rotate(0deg); }
//         100% { transform: rotate(0deg); }
//       }
//       .animate-wave {
//         animation: wave 2s infinite;
//         display: inline-block;
//         transform-origin: 70% 70%;
//       }
//     `;
//     document.head.appendChild(style);

//     const timer1 = setTimeout(() => setShowWelcome(true), 300);
//     const timer2 = setTimeout(() => setShowTo(true), 800);
//     const timer3 = setTimeout(() => setShowTitan(true), 1300);
//     const timer4 = setTimeout(() => setShowLeap(true), 1800);
//     const timer5 = setTimeout(() => setShowPulse(true), 2500);

//     return () => {
//       clearTimeout(timer1);
//       clearTimeout(timer2);
//       clearTimeout(timer3);
//       clearTimeout(timer4);
//       clearTimeout(timer5);
//       // Clean up the style element
//       if (style.parentNode) {
//         style.parentNode.removeChild(style);
//       }
//     };
//   }, []);

//   // Floating particles component
//   const FloatingParticles = () => {
//     const [particles, setParticles] = useState<Particle[]>([]);

//     useEffect(() => {
//       const createParticle = () => {
//         if (Math.random() > 0.7) {
//           const id = Date.now() + Math.random();
//           const newParticle: Particle = {
//             id,
//             left: Math.random() * 100,
//             size: Math.random() * 4 + 2,
//             duration: Math.random() * 4 + 4,
//           };

//           setParticles((prev) => [...prev, newParticle]);

//           setTimeout(() => {
//             setParticles((prev) => prev.filter((p) => p.id !== id));
//           }, newParticle.duration * 1000);
//         }
//       };

//       const interval = setInterval(createParticle, 500);
//       return () => clearInterval(interval);
//     }, []);

//     return (
//       <div className="absolute inset-0 pointer-events-none">
//         {particles.map((particle) => (
//           <div
//             key={particle.id}
//             className="absolute bg-blue-400/40 rounded-full animate-ping"
//             style={{
//               left: `${particle.left}%`,
//               top: `${Math.random() * 100}%`,
//               width: `${particle.size}px`,
//               height: `${particle.size}px`,
//               animationDuration: `${particle.duration}s`,
//             }}
//           />
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 viablue-900 to-slate-800 font-Achivo flex items-center justify-center relative overflow-hidden">
//       {/* Animated background elements */}
//       <FloatingParticles />
//       <div className="absolute inset-0">
//         <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl animate-ping"></div>
//       </div>

//       {/* Main content */}
//       <div className="text-center z-10 px-4 font-Achivo">
//         {/* Welcome text - slides from left */}
//         <div className="mb-8 space-y-2">
//           <div
//             className={`transition-all duration-1000 ease-out animate-pulse ${
//               showWelcome
//                 ? "opacity-100 translate-x-0"
//                 : "opacity-0 -translate-x-20"
//             }`}
//           >
//             <div>
//               <span className="text-2xl md:text-5xl font-light text-gray-300 tracking-wider">
//                 HI <span className="animate-wave">👋</span> WELCOME
//               </span>
//             </div>
//           </div>

//           {/* TO text - slides from right */}
//           <div
//             className={`transition-all duration-1000 delay-300 ease-out ${
//               showTo ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
//             }`}
//           >
//             <span className="text-xl md:text-2xl font-light text-gray-400 tracking-widest">
//               TO
//             </span>
//           </div>
//         </div>

//         {/* Titan Leap text */}
//         <div className="space-y-4 font-Achivo">
//           {/* TITAN text - slides from left with scale */}
//           <div
//             className={`transition-all duration-1200 delay-500 ease-out ${
//               showTitan
//                 ? "opacity-100 translate-x-0 scale-100"
//                 : "opacity-0 -translate-x-32 scale-95"
//             }`}
//           >
//             <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent tracking-loose transform hover:scale-105 transition-transform duration-300 font-Achivo">
//               TITAN
//             </h1>
//           </div>

//           {/* LEAP text - slides from right with scale */}
//           <div
//             className={`transition-all duration-1200 delay-700 ease-out ${
//               showLeap
//                 ? "opacity-100 translate-x-0 scale-100"
//                 : "opacity-0 translate-x-32 scale-95"
//             }`}
//           >
//             <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-loose transform hover:scale-105 transition-transform duration-300 font-Achivo">
//               LEAP
//             </h1>
//           </div>
//         </div>

//         {/* Loading indicator - fades in from bottom */}
//         <div
//           className={`mt-12 transition-all duration-1000 ease-out ${
//             showPulse ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
//           }`}
//         >
//           <div className="flex justify-center space-x-2">
//             <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
//             <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-100"></div>
//             <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>
//           </div>
//           <p className="text-gray-400 text-sm mt-4 tracking-wider animate-pulse">
//             Loading your experience...
//           </p>
//         </div>
//       </div>

//       {/* Static floating particles */}
//       <div className="absolute inset-0 pointer-events-none">
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-ping"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 3}s`,
//               animationDuration: `${2 + Math.random() * 2}s`,
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
