import React, { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import { useLocation } from "react-router-dom";
import Topbar from "../Layouts/Topbar";
import Footer from "../Layouts/Footer";
import strategy from "../assets/strategy.png";
import funnel from "../assets/funnel.png";
import ads from "../assets/ads.png";
import content from "../assets/content.png";
import ChatGPT from "../assets/ChatGPT.png";
import AI from "../assets/AI.png";
import SEO from "../assets/SEO.png";
import sales from "../assets/sales.png";
import email from "../assets/email.png";
import { motion } from "framer-motion";

const servicesData = [
  {
    title: "Strategy and Brand Positioning",
    description:
      "We define how you win in your market before spending a dollar on ads.",
    image: strategy,
    items: [
      "Market & competitor analysis",
      "Customer psychology & pain-point mapping",
      "Clear value proposition & messaging framework",
      "Brand tone, content direction & creative angles",
    ],
  },
  {
    title: "Funnel Design & Conversion Systems",
    description:
      "Traffic is useless without conversion. We design high-converting funnels that turn attention into revenue.",
    image: funnel,
    items: [
      "Landing pages & sales pages",
      "Lead magnets & opt-in systems",
      "VSL funnels & booking funnels",
      "Email automation & follow-up sequences",
    ],
  },
  {
    title: "Paid Advertising (Performance Marketing)",
    description:
      "Ads backed by psychology, not guesswork. We run ads only after strategy and funnels are locked in.",
    image: ads,
    items: [
      "Creative strategy & testing frameworks",
      "Ad copy & thumb-stopping hooks",
      "UGC-style ads, motion ads & static creatives",
      "Daily optimization & ROAS scaling",
    ],
  },
  {
    title: "Content Creation",
    description:
      "Content is the new currency. We mint it daily. This is your brand's visibility engine.",
    image: content,
    items: [
      "Short-form videos (Reels, TikTok, Shorts)",
      "Motion graphics & animated ads",
      "Brand storytelling videos & Social media carousels",
      "YouTube long-form (when needed)",
    ],
  },
  {
    title: "Social Media Management",
    description:
      "Posting with purpose. We don't just post â€” we engineer attention and authority.",
    image: ChatGPT,
    items: [
      "Content calendar & posting strategy",
      "Caption writing & CTA optimization",
      "Platform-specific growth tactics",
      "Engagement optimization",
    ],
  },
  {
    title: "AI Automation & Growth Agents",
    description:
      "Scale without hiring 10 people. We integrate AI systems to automate and accelerate marketing.",
    image: AI,
    items: [
      "Auto-posting systems",
      "Lead qualification & follow-ups",
      "CRM automations",
      "Funnel + ad performance tracking",
    ],
  },
  {
    title: "SEO & Authority Building",
    description:
      "Long-term traffic that compounds. For brands ready to dominate organically.",
    image: SEO,
    items: [
      "SEO content strategy",
      "Keyword research & optimization",
      "Authority content creation",
      "Website performance optimization",
    ],
  },
  {
    title: "Sales System",
    description: "Ensure leads actually turn into revenue.",
    image: sales,
    items: [
      "Sales funnel design",
      "High-converting landing pages",
      "Appointment booking systems",
      "Sales team",
    ],
  },
  {
    title: "Email Marketing Engine",
    description: "Turn leads into customers and customers into repeat buyers.",
    image: email,
    items: [
      "Email list growth strategy",
      "Welcome email sequences",
      "Nurture email campaigns",
      "Automated email flows",
    ],
  },
];

interface ServiceBlockProps {
  service: (typeof servicesData)[0];
  index: number;
  id: string;
}

const ServiceBlock: React.FC<ServiceBlockProps> = ({ service, index, id }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-24 border-b border-white/5 last:border-0 relative"
    >
      {/* Left Column: Image */}
      <div className="lg:col-span-4 flex flex-col justify-start">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-0.5 bg-accent-yellow"></div>
          <span className="text-gray-300 font-bold tracking-wider uppercase text-sm">
            Our Services
          </span>
        </div>

        {/* Stylized Image Container */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative w-48 h-48 md:w-64 md:h-64 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-[0_0_50px_rgba(76,29,149,0.3)] group transition-all duration-500 cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <img
            src={service.image}
            alt={service.title}
            loading="lazy"
            className="w-3/4 h-3/4 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] relative z-10"
          />

          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-accent-yellow/50"></div>
          <div className="absolute bottom-6 left-6 w-2 h-2 rounded-full bg-white/30"></div>
        </motion.div>
      </div>

      {/* Right Column: Content */}
      <div className="lg:col-span-8 flex flex-col justify-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
          {service.title}
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 font-light mb-12 max-w-3xl leading-relaxed">
          {service.description}
        </p>

        <div className="space-y-0">
          {service.items.map((item, idx) => (
            <div key={idx} className="border-b border-white/10">
              <button
                onClick={() => toggleItem(idx)}
                className="w-full py-6 flex items-center justify-between text-left group hover:bg-white/5 px-4 rounded-lg transition-colors"
              >
                <span className="text-lg font-medium text-white group-hover:text-accent-yellow transition-colors">
                  {item}
                </span>
                <div className="text-white/50 group-hover:text-accent-yellow transition-colors">
                  {openIndex === idx ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>

              {/* Accordion Content */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === idx
                    ? "grid-rows-[1fr] opacity-100 pb-6 px-4"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-gray-400 text-sm">
                    Detailed execution plan and deliverables included in the{" "}
                    {item} package, tailored to your business goals.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

interface LocationState {
  scrollTo?: string;
}

const Services: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to section if coming from Expertise with scrollTo state
    const scrollTarget = (location.state as LocationState)?.scrollTo;
    if (scrollTarget) {
      const element = document.getElementById(
        scrollTarget.toLowerCase().replace(/\s+/g, "-").replace(/[&]/g, "and"),
      );
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <Topbar />
      <section className="pt-32 bg-[#1a0b3c] text-white relative min-h-screen">
        {/* Top Gradient Background */}
        <div className="absolute top-0 left-0 right-0 h-[800px] bg-gradient-to-b from-[#4c1d95]/40 via-[#1a0b3c]/80 to-[#1a0b3c] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto md:px-0 px-6 relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold tracking-loose mb-20">
            Services
          </h1>

          <div className="flex flex-col">
            {servicesData.map((service, index) => (
              <ServiceBlock
                key={index}
                service={service}
                index={index}
                id={service.title
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[&]/g, "and")}
              />
            ))}
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Services;
