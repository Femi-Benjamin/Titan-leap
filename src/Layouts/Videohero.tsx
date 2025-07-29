"use client";
import { useState } from "react";
import brandingvideo from "../assets/brandingvideo.mp4";
import play from "../assets/play.png";

export default function VideoHero() {
  const [showVideo, setShowVideo] = useState(false);

  const handlePlayClick = () => {
    setShowVideo(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#4C12BF] to-[#FFFFFF]"></div>

      {/* Vertical lines pattern */}
      <div className="absolute inset-0">
        <div className="h-full w-full opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-px bg-white"
              style={{ left: `${(i + 1) * 5}%` }}
            ></div>
          ))}
        </div>
      </div>

      {/* Video overlay */}
      {showVideo && (
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#4C12BF] to-[#FFFFFF] bg-opacity-75 flex items-center justify-center animate-fade-in">
          <div className="absolute inset-0">
            <div className="h-full w-full opacity-20">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 bottom-0 w-px bg-white"
                  style={{ left: `${(i + 1) * 5}%` }}
                ></div>
              ))}
            </div>
          </div>
          <div className="relative w-full max-w-4xl mx-4">
            <button
              onClick={() => setShowVideo(false)}
              aria-label="Close video"
              className="absolute -top-12 right-0 text-white text-2xl hover:text-orange-500 z-30"
            >
              ✕
            </button>
            <video
              className="w-full h-full rounded-lg"
              controls
              autoPlay
              src={brandingvideo}
            >
              <source src={brandingvideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {/* Play button */}
      {!showVideo && (
        <button
          onClick={handlePlayClick}
          className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 hover:scale-110 transition-transform duration-200 cursor-pointer"
        >
          <img src={play} alt="play" />
        </button>
      )}

      {/* Content */}
      <div className="relative flex flex-col justify-end-safe min-h-screen pb-8 md:pb-16 lg:pb-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-2xl">
          {/* Main heading */}
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            <div>Innovate. Elevate.</div>
            <div className="text-6xl md:text-7xl lg:text-8xl">Succeed.</div>
          </h1>

          {/* Subtitle */}
          <p className="text-white text-lg md:text-xl mb-8 leading-relaxed max-w-xl">
            Next-level content, ads, and automation — We do the work, while you
            recharge and scale.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-[#FED65E] text-[#4C12BF] text-[20px] px-10 py-2 rounded-xl font-semibold hover:bg-yellow-300 cursor-pointer transition-colors duration-200">
              {"Let's Talk"}
            </button>
            <button
              className="border-2 border-[#4C12BF]] text-[#FED65E] text-[20px] bg-[#4C12BF] px-4 py-2 rounded-xl
            font-semibold transition-colors duration-200 cursor-pointer"
            >
              See our work
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
