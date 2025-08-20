"use client";
import { useState, useEffect, useRef, useCallback } from "react";

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
}

const Testimonials = () => {
  const testimonials = [
    {
      text: "People are complimenting your team work, I'm happy I have you on the project",
      author: "Obinna Aso (Select Punters)",
    },
    {
      text: "Pulling this amount of work is so much easier with your team",
      author: "Sarah Mitchell (Tech Innovations)",
    },
    {
      text: "The quality and speed of delivery exceeded all our expectations completely",
      author: "David Chen (Digital Solutions)",
    },
    {
      text: "Working with this team has transformed how we approach our projects",
      author: "Maria Rodriguez (Creative Agency)",
    },
    {
      text: "Professional, reliable, and incredibly talented - exactly what we needed",
      author: "James Thompson (Startup Hub)",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const duration = 4000; // 4 seconds per testimonial

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    intervalRef.current = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }
    }, duration);
  }, [isHovered, testimonials.length]);

  useEffect(() => {
    if (!isHovered) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    return () => stopAutoPlay();
  }, [isHovered, startAutoPlay]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getSlideClass = (index: number) => {
    const baseClass =
      "absolute w-full px-5 transition-all duration-700 ease-out pointer-events-none";

    if (index === currentIndex) {
      return `${baseClass} opacity-100 transform translate-y-0 scale-100 z-20 pointer-events-auto`;
    } else if (
      index ===
      (currentIndex - 1 + testimonials.length) % testimonials.length
    ) {
      return `${baseClass} opacity-20 transform -translate-y-20 scale-95 z-10`;
    } else if (index === (currentIndex + 1) % testimonials.length) {
      return `${baseClass} opacity-20 transform translate-y-20 scale-95 z-10`;
    } else {
      return `${baseClass} opacity-0 transform translate-y-32 scale-90 z-0`;
    }
  };

  // Floating particles component
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
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-white bg-opacity-10 rounded-full animate-pulse"
            style={{
              left: `${particle.left}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `float ${particle.duration}s linear infinite`,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#4C12BF] to-[#FFFFFF] flex items-center justify-center relative overflow-hidden font-Achivo">
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

      <FloatingParticles />

      <div
        className="w-full min-h-screen px-10 py-16 text-center relative z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Header */}
        <div className="mb-16 xl:px-22 md:px-10 px-5">
          <div className="flex items-center mb-4">
            <div className="w-10 h-1 bg-[#FED65E] mr-4"></div>
            <span className="text-[#4C12BF] font-semibold text-lg tracking-wider">
              Testimonials
            </span>
          </div>
          <h1 className="text-xl md:text-5xl xl:text-6xl font-Achivo text-[#4C12BF] mb-8 text-left">
            What Our Clients Say
          </h1>
        </div>

        {/* Testimonials Container */}
        <div className="relative h-[32rem] flex justify-center md:pt-32 pt-24">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`${getSlideClass(
                index
              )} max-w-6xl mx-auto text-center`}
            >
              <div className="bg-blend-saturation bg-opacity-10 rounded-2xl p-8 md:p-12 mx-4 shadow2xl">
                <div className="text-white text-lg md:text-3xl xl:text-4xl font-extrabold leading-relaxed mb-8 drop-shadow-2xl">
                  "{testimonial.text}"
                </div>
                <div className="text-[#FED65E] md:text-xl font-semibold">
                  – {testimonial.author}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-4 mb-8 mt-16">
          {testimonials.map((_, index: number) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 shadow-lg ${
                index === currentIndex
                  ? "bg-[#FED65E] scale-125 shadow-yellow-400"
                  : "bg-white bg-opacity-40 hover:bg-opacity-70 hover:scale-110"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
