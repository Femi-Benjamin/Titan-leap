"use client";
import { useRef, useEffect, useState } from "react";
import websiteintronew from "../assets/websiteintronew.mp4";
import websiteintro2phone from "../assets/websiteintro2phone.mp4";

export default function TitanLeapLoading() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video plays on mobile
    const playVideo = async () => {
      try {
        await video.play();
      } catch (err) {
        console.log("Autoplay prevented:", err);
      }
    };

    const handleLoadedData = () => {
      setIsLoaded(true);
      playVideo();
    };

    video.addEventListener("loadeddata", handleLoadedData);

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
    };
  }, [isMobile]);

  return (
    <div className="fixed inset-0 w-full h-full font-Achivo flex items-center justify-center overflow-hidden bg-black">
      {/* 🎬 Optimized Responsive Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          webkit-playsinline="true"
          x5-playsinline="true"
          key={isMobile ? "mobile" : "desktop"}
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          onLoadedMetadata={(e) => {
            const video = e.currentTarget;
            video.playbackRate = 0.75;
          }}
        >
          <source
            src={isMobile ? websiteintro2phone : websiteintronew}
            type="video/mp4"
          />
        </video>
      </div>

      {/* Loading indicator while video loads */}
      {/* {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )} */}
    </div>
  );
}
