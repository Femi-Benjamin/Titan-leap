"use client";
import { useState } from "react";
import Medias from "../assets/Medias.png";

const SignatureProcess = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const processSteps = [
    {
      title: "Concept",
      description:
        "We dive deep into your brand's goals, audience, and market to generate bold, strategic ideas that spark attention and align with your vision.",
    },
    {
      title: "Create",
      description:
        "Our team of expert designers, editors, and strategists brings those ideas to life with high-quality visuals, videos, and messaging that engages and inspires.",
    },
    {
      title: "Connect",
      description:
        "We deploy your content across the right channels — ads, socials, email, and more — to reach the right audience at the right time.",
    },
    {
      title: "Convert",
      description:
        "We track performance, optimize continuously, and use real-time data to scale what works — so you see more signups, sales, and success.",
    },
  ];

  const accordionItems = [
    {
      title: "Social Media Manager",
      content:
        "Our social media management service includes content creation, posting schedules, community engagement, analytics tracking, and strategic planning to grow your online presence across all major platforms.",
    },
  ];

  // Explicitly type index as number
  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="relative md:min-h-screen bg-gradient-to-t from-[#5A25C4] to-[#FFFFFF] overflow-hidden">
      {/* Vertical lines pattern */}
      {/* <div className="absolute inset-0">
        <div className="h-full w-full opacity-20">
          {Array.from({ length: 20 }).map((_, i: number) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-px bg-white"
              style={{ left: `${(i + 1) * 5}%` }}
            ></div>
          ))}
        </div>
      </div> */}

      <div className="relative z-10 containe xl:px-22 md:px-10 px-5 mx-auto py-16">
        {/* Header Section */}
        <div className="mb-16">
          <div className="flex items-center mb-4">
            <div className="w-10 h-1 bg-yellow-400 mr-4"></div>
            <span className="text-[#4C12BF] font-bold text-lg tracking-wider">
              OUR PROCESS
            </span>
          </div>
          <h1 className="text-xl md:text-5xl xl:text-6xl text-[#4C12BF] mb-8 font-Achivo">
            Our Signature Process
          </h1>
        </div>

        {/* Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {processSteps.map((step, index: number) => (
            <div
              key={index}
              className="bg-gradient-to-t from-[#4C12BF] to-[#FFFFFF] rounded-2xl p-8 border border-white"
            >
              {/* Icon placeholder */}
              <div className="flex items-center justify-center mb-6">
                <img className="" src={Medias} alt="Medias" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                {step.title}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Accordion Section */}
        <div className="max-w4xl mx-auto">
          {accordionItems.map((item, index: number) => (
            <div
              key={index}
              className="border-b border-white/20 firstborder-b first:border-b-4"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between py-6 text-left transition-colors duration-200"
              >
                <span className="text-xl font-medium text-white/80">
                  {item.title}
                </span>
                <div className="ml-4">
                  <div
                    className={`w-6 h-6 flex items-center justify-center transition-transform duration-200 ${
                      openAccordion === index ? "rotate-45" : ""
                    }`}
                  >
                    <svg
                      className="text-white/60"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openAccordion === index ? "max-h-96 pb-6" : "max-h-0"
                }`}
              >
                <p className="text-white/70 text-md leading-relaxed pl-0">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignatureProcess;
