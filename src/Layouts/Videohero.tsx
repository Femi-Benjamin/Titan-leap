"use client";
import { useRef } from "react";
import website1 from "../assets/website1.mp4";

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

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
          <source src={website1} type="video/mp4" />
        </video>
      </div>
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-end min-h-screen pb-8 md:pb-10 px-8 md:px-16 lg:px-24">
        <div className="max-w-2xl">
          {/* <h1 className="text-white text-3xl md:text-4xl lg:text-5xl leading-tight mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] font-Achivo font-[800px]">
            <div>Innovate. Elevate.</div>
            <div className="text-6xl md:text-7xl lg:text-8xl">Succeed.</div>
          </h1> */}

          {/* <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-[#FED65E] text-[#4C12BF] hover:bg-[#4C12BF] text-[20px] hover:text-[#FED65E] px-10 py-2 rounded-xl cursor-pointer transition-colors duration-200 shadow-xl font-Achivo">
            {"Let's Talk"}
            </button>
            <button className="border-2 border-[#FED65E] text-[#FED65E] hover:bg-[#FED65E] text-[20px] hover:text-[#4C12BF] hover:border-[#4C12BF] bg-[#4C12BF] bg-opacity-80 px-4 py-2 rounded-xl hover:bg-opacity-100 transition-all duration-200 cursor-pointer shadow-xl font-Achivo">
            See our work
            </button>
            </div> */}
          <p className="text-white text-lg md:text-xl mb-8 leading-relaxed max-w-xl font-DM Sans">
            Next-level content, ads, and automation — We do the work, while you
            recharge and scale.
          </p>
        </div>
      </div>
    </div>
  );
}
