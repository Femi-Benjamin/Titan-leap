import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function CardMany() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      text: "Titan Leap provided us with the talented engineers necessary to achieve our ambitious objectives. Their account manager was proactive in addressing any concerns, ensuring our expectations were consistently met.",
      name: "Sir Manny",
      position: "CEO, Futurelabs",
      company: "Futurelabs",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    {
      text: "Working with Titan Leap has been transformative for our development process. Their team seamlessly integrated with ours and delivered exceptional results ahead of schedule. The quality of their work exceeded all expectations.",
      name: "Sarah Chen",
      position: "CTO, TechVision",
      company: "TechVision",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
    {
      text: "The expertise and dedication of Titan Leap's engineers helped us scale our platform to handle millions of users. Their innovative solutions and attention to detail made all the difference in our success.",
      name: "Marcus Rodriguez",
      position: "VP of Engineering, DataFlow",
      company: "DataFlow",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      text: "Titan Leap's team brought fresh perspectives and cutting-edge technical skills to our project. Their collaborative approach and commitment to excellence made them feel like an extension of our own team.",
      name: "Emily Thompson",
      position: "Product Director, InnovateCorp",
      company: "InnovateCorp",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const current = testimonials[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="lg:col-span-2 bg-white text-black rounded-[30px] p-8 md:p-10 flex flex-col max-w-md justify-between relative overflow-hidden min-h-[700px] shadow-2xl"
    >
      <div className="relative z-10">
        <p className="text-lg font-medium leading-relaxed mb-8">
          {current.text}
        </p>
      </div>

      <div className="relative z-10 mt-auto">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={current.avatar}
            alt={current.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
          />
          <div>
            <div className="font-bold text-sm">{current.name}</div>
            <div className="text-xs text-gray-500">{current.position}</div>
            <div className="text-[10px] font-bold text-orange-500 mt-1 uppercase tracking-wide">
              {current.company}
            </div>
          </div>
        </div>

        {/* Dot Indicators */}
        {/* <div className="flex gap-2 mb-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-orange-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div> */}

        {/* Navigation Buttons */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={prevTestimonial}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={nextTestimonial}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
