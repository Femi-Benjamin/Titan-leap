"use client";
import { useEffect, useRef } from "react";
import brandingvideo from "../assets/brandingvideo.mp4";

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.25;
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={brandingvideo} type="video/mp4" />
        </video>
      </div>
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-400 via-transparent to-transparent z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-end min-h-screen pb-8 md:pb-16 lg:pb-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-2xl">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl leading-tight mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] font-Achivo font-[800px]">
            <div>Innovate. Elevate.</div>
            <div className="text-6xl md:text-7xl lg:text-8xl">Succeed.</div>
          </h1>

          <p className="text-white text-lg md:text-xl mb-8 leading-relaxed max-w-xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] font-DM Sans">
            Next-level content, ads, and automation — We do the work, while you
            recharge and scale.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-[#FED65E] text-[#4C12BF] hover:bg-[#4C12BF] text-[20px] hover:text-[#FED65E] px-10 py-2 rounded-xl cursor-pointer transition-colors duration-200 shadow-xl font-Achivo">
              {"Let's Talk"}
            </button>
            <button className="border-2 border-[#FED65E] text-[#FED65E] hover:bg-[#FED65E] text-[20px] hover:text-[#4C12BF] hover:border-[#4C12BF] bg-[#4C12BF] bg-opacity-80 px-4 py-2 rounded-xl hover:bg-opacity-100 transition-all duration-200 cursor-pointer shadow-xl font-Achivo">
              See our work
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";
// import { useState } from "react";
// import brandingvideo from "../assets/brandingvideo.mp4";
// import play from "../assets/play.png";

// export default function VideoHero() {
//   const [showVideo, setShowVideo] = useState(false);

//   const handlePlayClick = () => {
//     setShowVideo(true);
//   };

//   return (
//     <div className="relative min-h-screen overflow-hidden">
//       {/* Background with gradient */}
//       <div className="absolute inset-0 bg-gradient-to-t from-[#4C12BF] to-[#FFFFFF]"></div>

//       {/* Vertical lines pattern */}
//       <div className="absolute inset-0">
//         <div className="h-full w-full opacity-20">
//           {Array.from({ length: 20 }).map((_, i) => (
//             <div
//               key={i}
//               className="absolute top-0 bottom-0 w-px bg-white"
//               style={{ left: `${(i + 1) * 5}%` }}
//             ></div>
//           ))}
//         </div>
//       </div>

//       {/* Video overlay */}
//       {showVideo && (
//         <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#4C12BF] to-[#FFFFFF] bg-opacity-75 flex items-center justify-center animate-fade-in">
//           <div className="absolute inset-0">
//             <div className="h-full w-full opacity-20">
//               {Array.from({ length: 20 }).map((_, i) => (
//                 <div
//                   key={i}
//                   className="absolute top-0 bottom-0 w-px bg-white"
//                   style={{ left: `${(i + 1) * 5}%` }}
//                 ></div>
//               ))}
//             </div>
//           </div>
//           <div className="relative w-full max-w-4xl mx-4">
//             <button
//               onClick={() => setShowVideo(false)}
//               aria-label="Close video"
//               className="absolute -top-12 right-0 text-white text-2xl hover:text-orange-500 z-30"
//             >
//               ✕
//             </button>
//             <video
//               className="w-full h-full rounded-lg"
//               controls
//               autoPlay
//               src={brandingvideo}
//             >
//               <source src={brandingvideo} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         </div>
//       )}

//       {/* Play button */}
//       {!showVideo && (
//         <button
//           onClick={handlePlayClick}
//           className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 hover:scale-110 transition-transform duration-200 cursor-pointer"
//         >
//           <img src={play} alt="play" />
//         </button>
//       )}

//       {/* Content */}
//       <div className="relative flex flex-col justify-end-safe min-h-screen pb-8 md:pb-16 lg:pb-24 px-8 md:px-16 lg:px-24">
//         <div className="max-w-2xl">
//           {/* Main heading */}
//           <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
//             <div>Innovate. Elevate.</div>
//             <div className="text-6xl md:text-7xl lg:text-8xl">Succeed.</div>
//           </h1>

//           {/* Subtitle */}
//           <p className="text-white text-lg md:text-xl mb-8 leading-relaxed max-w-xl">
//             Next-level content, ads, and automation — We do the work, while you
//             recharge and scale.
//           </p>

//           {/* Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4">
//             <button className="bg-[#FED65E] text-[#4C12BF] text-[20px] px-10 py-2 rounded-xl font-semibold hover:bg-yellow-300 cursor-pointer transition-colors duration-200">
//               {"Let's Talk"}
//             </button>
//             <button
//               className="border-2 border-[#4C12BF]] text-[#FED65E] text-[20px] bg-[#4C12BF] px-4 py-2 rounded-xl
//             font-semibold transition-colors duration-200 cursor-pointer"
//             >
//               See our work
//             </button>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }

//         .animate-fade-in {
//           animation: fade-in 0.5s ease-in-out;
//         }
//       `}</style>
//     </div>
//   );
// }
