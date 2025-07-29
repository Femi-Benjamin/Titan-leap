import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

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
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const current = testimonials[currentIndex];

  return (
    <div className="max-w-md mx-auto bg-[#F7F7F9] p-8 rounded-3xl h-[671px]">
      <div className="space-y-6">
        <p className="text-xl font-semibold leading-relaxed">{current.text}</p>
        <div className="flex items-center space-x-4">
          <img
            src={current.avatar}
            alt="Profile picture"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold">{current.name}</h3>
            <p className="text-sm text-gray-600">{current.position}</p>
          </div>
        </div>
        <div className="pt-4">
          <p className="text-orange-500 font-semibold uppercase tracking-wider">
            {current.company}
          </p>
        </div>
      </div>
      <div className="flex justify-end space-x-2 mt-6">
        <button
          onClick={prevTestimonial}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <button
          onClick={nextTestimonial}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ArrowRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      <div className="flex justify-center space-x-2 mt-4">
        {testimonials.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-orange-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
