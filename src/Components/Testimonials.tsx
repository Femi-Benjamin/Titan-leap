import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      <section className="md:min-h-screen bg-gradient-to-t from-[#4C12BF] to-[#FFFFFF] items-center px-6 md:pt-20 pt-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 xl:px-22 md:px-10 px-5"
        >
          <div className="flex items-center mb-4">
            <div className="w-10 h-1 bg-yellow-400 mr-4"></div>
            <span className="text-[#4C12BF] font-bold text-lg tracking-wider">
              TESTIMONIALS
            </span>
          </div>
          <h1 className="text-xl md:text-5xl xl:text-6xl font-Achivo text-[#4C12BF] mb-8 text-left font-bold">
            What our clients say
          </h1>
        </motion.div>

        <div className="max-w-4xl mx-auto text-center md:pt-20 font-bold">
          <div className="relative h-96 flex flex-col justify-center items-center space-y-8 font-Achivo">
            {/* Previous testimonial (top, faded) */}
            <motion.div
              layout
              className="opacity-20 scale-90 text-purple-500 cursor-pointer"
              onClick={() => handleTestimonialClick(getPreviousIndex())}
            >
              <blockquote className="text-xl md:text-3xl xl:text-4xl font-medium leading-relaxed">
                {testimonials[getPreviousIndex()].text}
              </blockquote>
            </motion.div>

            {/* Current testimonial (center, fully visible) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="text-white z-10"
              >
                <div className="opacity-90">
                  <blockquote className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-relaxed mb-6">
                    {testimonials[currentIndex].text}
                  </blockquote>
                  <cite className="text-yellow-400 text-lg md:text-xl font-medium not-italic">
                    - {testimonials[currentIndex].author}
                  </cite>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Next testimonial (bottom, faded) */}
            <motion.div
              layout
              className="opacity-20 scale-90 text-purple-300 cursor-pointer"
              onClick={() => handleTestimonialClick(getNextIndex())}
            >
              <blockquote className="text-xl md:text-3xl xl:text-4xl font-medium leading-relaxed">
                {testimonials[getNextIndex()].text}
              </blockquote>
            </motion.div>
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
          </div>
        </div>
      </section>
    </>
  );
}
