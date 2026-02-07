"use client";
import { useState, useEffect } from "react";

const testimonials = [
  {
    text: "People are complimenting your team work, I'm happy I have you on the project",
    author: "Obinna Aso (Select Punters)",
  },
  {
    text: "Pulling this amount of work is so much easier with your team",
    author: "Sarah Johnson (Tech Innovations)",
  },
  {
    text: "The quality of work delivered exceeded our expectations completely",
    author: "Michael Chen (Digital Solutions)",
  },
  {
    text: "Your team's dedication and expertise made all the difference",
    author: "Emma Rodriguez (Creative Agency)",
  },
  {
    text: "Working with you has been an absolute game-changer for our business",
    author: "David Thompson (Growth Partners)",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000); // Change testimonial every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  const handleTestimonialClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoScrolling(false);

    // Resume auto-scrolling after 10 seconds of inactivity
    setTimeout(() => {
      setIsAutoScrolling(true);
    }, 10000);
  };

  const getPreviousIndex = () =>
    (currentIndex - 1 + testimonials.length) % testimonials.length;
  const getNextIndex = () => (currentIndex + 1) % testimonials.length;

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide {
          animation: slideUp 0.6s ease-out;
        }
      `}</style>

      <section className="md:min-h-screen bg-gradient-to-t from-[#4C12BF] to-[#FFFFFF] items-center px-6 md:pt-20 pt-14">
        {/* Header */}
        <div className="mb-16 xl:px-22 md:px-10 px-5">
          <div className="flex items-center mb-4">
            <div className="w-10 h-1 bg-yellow-400 mr-4"></div>
            <span className="text-[#4C12BF] font-bold text-lg tracking-wider">
              TESTIMONIALS
            </span>
          </div>
          <h1 className="text-xl md:text-5xl xl:text-6xl font-Achivo text-[#4C12BF] mb-8 text-left font-bold">
            What our clients say
          </h1>
        </div>

        <div className="max-w-4xl mx-auto text-center md:pt-20 font-bold">
          <div className="relative h-96 flex flex-col justify-center items-center space-y-8 font-Achivo">
            {/* Previous testimonial (top, faded) */}
            <div
              className="opacity-20 scale-90 text-purple-500 cursor-pointer transition-all duration-1000 ease-in-out"
              onClick={() => handleTestimonialClick(getPreviousIndex())}
            >
              <blockquote className="text-xl md:text-3xl xl:text-4xl font-medium leading-relaxed">
                {testimonials[getPreviousIndex()].text}
              </blockquote>
            </div>

            {/* Current testimonial (center, fully visible) */}
            <div
              key={currentIndex}
              className="opacity-90 scale-100 text-white transition-all duration-1000 ease-in-out animate-slide"
            >
              <blockquote className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-relaxed mb-6">
                {testimonials[currentIndex].text}
              </blockquote>
              <cite className="text-yellow-400 text-lg md:text-xl font-medium not-italic">
                - {testimonials[currentIndex].author}
              </cite>
            </div>

            {/* Next testimonial (bottom, faded) */}
            <div
              className="opacity-20 scale-90 text-purple-300 cursor-pointer transition-all duration-1000 ease-in-out"
              onClick={() => handleTestimonialClick(getNextIndex())}
            >
              <blockquote className="text-xl md:text-3xl xl:text-4xl font-medium leading-relaxed">
                {testimonials[getNextIndex()].text}
              </blockquote>
            </div>
          </div>

          <div className="font-Achivo md:py-36 py-10">
            {/* Progress Indicators */}
            <div className="flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-yellow-400 w-8"
                      : "bg-purple-400 hover:bg-purple-300"
                  }`}
                  onClick={() => handleTestimonialClick(index)}
                />
              ))}
            </div>

            {/* Auto-scroll indicator */}
            {/* <div className="text-purple-300 text-sm">
              {isAutoScrolling ? (
                <span className="flex items-center justify-center gap-2">
          
                  Auto-scrolling
                </span>
              ) : (
                <span>Click any testimonial to navigate manually</span>
              )}
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
}
