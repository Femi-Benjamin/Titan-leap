"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
}

const SpotifyTestimonials = () => {
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
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );
  const duration = 4000; // 4 seconds per testimonial

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
  };

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    setProgress(0);

    // Progress animation
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 100 / (duration / 50);
      });
    }, 50);

    // Slide change
    intervalRef.current = setInterval(() => {
      if (isPlaying && !isHovered) {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setProgress(0);
      }
    }, duration);
  }, [isPlaying, isHovered, testimonials.length, duration]);

  useEffect(() => {
    if (isPlaying && !isHovered) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    return () => stopAutoPlay();
  }, [isPlaying, isHovered, startAutoPlay]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setProgress(0);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const getSlideClass = (index: number) => {
    const baseClass =
      "absolute w-full px-5 transition-all duration-700 ease-out";

    if (index === currentIndex) {
      return `${baseClass} opacity-100 transform translate-y-0`;
    } else if (
      index ===
      (currentIndex - 1 + testimonials.length) % testimonials.length
    ) {
      return `${baseClass} opacity-30 transform -translate-y-16`;
    } else if (index === (currentIndex + 1) % testimonials.length) {
      return `${baseClass} opacity-30 transform translate-y-16`;
    } else {
      return `${baseClass} opacity-0 transform translate-y-24`;
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
        <div className="relativ h-[32rem] flex flexcol justify-center pt-24">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`${getSlideClass(
                index
              )} max-w-7xl mx-auto text-center`}
            >
              <div className="text-white text-md md:text-3xl xl:text-4xl xl:font-semibold leading-loose mb-12 drop-shadow-lg">
                {testimonial.text}
              </div>
              <div className="text-[#FED65E] md:text-xl font-medium">
                – {testimonial.author}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-3 mb-8">
          {testimonials.map((_, index: number) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-yellow-400 scale-125"
                  : "bg-white bg-opacity-30 hover:bg-opacity-50"
              }`}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={prevSlide}
            className="w-5 h-5 rounded-full border-2 border-white border-opacity-30 bg-opacity-10 backdrop-blur-md text-white hover:bg-opacity-20 hover:border-opacity-50 hover:scale-110 transition-all duration-300 flex items-center justify-center"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={togglePlayPause}
            className="w-5 h-5 rounded-full border-2 border-white border-opacity-30 bg-opacity-10 backdrop-blur-md text-white hover:bg-opacity-20 hover:border-opacity-50 hover:scale-110 transition-all duration-300 flex items-center justify-center"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>

          <button
            onClick={nextSlide}
            className="w-5 h-5 rounded-full border-2 border-white border-opacity-30 bg-opacity-10 backdrop-blur-md text-white hover:bg-opacity-20 hover:border-opacity-50 hover:scale-110 transition-all duration-300 flex items-center justify-center"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-48 h-1 bg-white bg-opacity-20 rounded-full mx-auto overflow-hidden">
          <div
            className="h-full bg-yellow-400 rounded-full transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SpotifyTestimonials;
