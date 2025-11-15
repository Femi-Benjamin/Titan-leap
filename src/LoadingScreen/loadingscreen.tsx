"use client";
import { useRef } from "react";
import websiteintronew from "../assets/websiteintronew.mp4";

export default function TitanLeapLoading() {
  const videoRef = useRef<HTMLVideoElement>(null);

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
          <source src={websiteintronew} type="video/mp4" />
        </video>

        {/* Slight dark overlay for visibility */}
        <div className="absolute inset-0 bg-black/20 sm:bg-black/10"></div>
      </div>

      {/* 📱 Text only visible on mobile */}
      <div className="z-10 text-white text-center px-4 block sm:hidden">
        <h1 className="text-2xl font-semibold drop-shadow-lg">
          Welcome to Titan Leap
        </h1>
      </div>
    </div>
  );
}
