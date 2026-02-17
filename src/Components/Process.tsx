"use client";
import { useState } from "react";
import Medias from "../assets/Medias.png";
import { motion } from "framer-motion";

const SignatureProcess = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

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

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const toggleCard = (index: number) => {
    setActiveCard(activeCard === index ? null : index);
  };

  return (
    <div className="relative md:min-h-screen bg-gradient-to-b from-[#1a0b3c] via-[#2e1065] to-[#4C12BF] overflow-hidden">
      {/* Background glow specific to this section */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 containe xl:px-22 md:px-10 px-5 mx-auto py-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center mb-4">
            <div className="w-10 h-1 bg-yellow-400 mr-4"></div>
            <span className="text-[#FED65E] font-bold text-lg tracking-wider">
              OUR PROCESS
            </span>
          </div>
          <h1 className="text-xl md:text-5xl xl:text-6xl text-[#FFFFFF] mb-8 font-Achivo font-bold">
            Our Signature Process
          </h1>
        </motion.div>

        {/* Process Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {processSteps.map((step, index: number) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              onClick={() => toggleCard(index)}
              className={`group relative bg-transparent rounded-2xl p-8 border border-[#FFFFFF]/10 transition-all duration-500 cursor-pointer
                ${activeCard === index ? "border-[#FFD646]/30" : "md:hover:border-[#FFD646]/30"}
              `}
            >
              {/* Hover Gradient Border Effect - more obvious yellow */}
              <div
                className={`absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-500 pointer-events-none
                ${activeCard === index ? "border-[#FFD646]/10" : "md:group-hover:border-[#FFD646]/10"}
              `}
              ></div>
              <div
                className={`absolute -inset-1 bg-gradient-to-r from-[#FFD646]/0 via-[#FFD646]/10 to-[#FFD646]/0 blur-xl transition-opacity duration-500
                ${activeCard === index ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"}
              `}
              ></div>
              <div
                className={`absolute inset-0 bg-[#FFD646]/5 rounded-2xl transition-opacity duration-500
                ${activeCard === index ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"}
              `}
              ></div>

              {/* Icon with hover effect */}
              <div className="relative flex items-center justify-center mb-6">
                <img
                  className={`transition-all duration-500
                    ${activeCard === index ? "scale-110 drop-shadow-[0_0_15px_rgba(254,214,94,0.5)]" : "md:group-hover:scale-110 md:group-hover:drop-shadow-[0_0_15px_rgba(254,214,94,0.5)]"}
                  `}
                  src={Medias}
                  alt="Medias"
                  loading="lazy"
                />
              </div>

              <h3 className="relative text-2xl font-bold text-white mb-4">
                {step.title}
              </h3>
              <p className="relative text-white/80 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Accordion Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w4xl mx-auto"
        >
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
        </motion.div>
      </div>
    </div>
  );
};

export default SignatureProcess;
