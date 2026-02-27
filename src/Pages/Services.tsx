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
      "Posting with purpose. We don't just post — we engineer attention and authority.",
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
        scrollTarget
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[&]/g, "and")
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

// import React, { useState, useEffect } from "react";
// import { Plus, Minus } from "lucide-react";
// import Topbar from "../Layouts/Topbar";
// import Footer from "../Layouts/Footer";
// import strategy from "../assets/strategy.png";
// import funnel from "../assets/funnel.png";
// import ads from "../assets/ads.png";
// import content from "../assets/content.png";
// import ChatGPT from "../assets/ChatGPT.png";
// import AI from "../assets/AI.png";

// const servicesData = [
//   {
//     title: "Strategy and Brand Positioning",
//     description:
//       "We define how you win in your market before spending a dollar on ads.",
//     image: strategy,
//     items: [
//       "Market & competitor analysis",
//       "Customer psychology & pain-point mapping",
//       "Clear value proposition & messaging framework",
//       "Brand tone, content direction & creative angles",
//     ],
//   },
//   {
//     title: "Funnel Design & Conversion Systems",
//     description:
//       "Traffic is useless without conversion. We design high-converting funnels that turn attention into revenue.",
//     image: funnel,
//     items: [
//       "Landing pages & sales pages",
//       "Lead magnets & opt-in systems",
//       "VSL funnels & booking funnels",
//       "Email automation & follow-up sequences",
//     ],
//   },
//   {
//     title: "Paid Advertising (Performance Marketing)",
//     description:
//       "Ads backed by psychology, not guesswork. We run ads only after strategy and funnels are locked in.",
//     image: ads,
//     items: [
//       "Creative strategy & testing frameworks",
//       "Ad copy & thumb-stopping hooks",
//       "UGC-style ads, motion ads & static creatives",
//       "Daily optimization & ROAS scaling",
//     ],
//   },
//   {
//     title: "Content Creation",
//     description:
//       "Content is the new currency. We mint it daily. This is your brand's visibility engine.",
//     image: content,
//     items: [
//       "Short-form videos (Reels, TikTok, Shorts)",
//       "Motion graphics & animated ads",
//       "Brand storytelling videos & Social media carousels",
//       "YouTube long-form (when needed)",
//     ],
//   },
//   {
//     title: "Social Media Management",
//     description:
//       "Posting with purpose. We don't just post — we engineer attention and authority.",
//     image: ChatGPT,
//     items: [
//       "Content calendar & posting strategy",
//       "Caption writing & CTA optimization",
//       "Platform-specific growth tactics",
//       "Engagement optimization",
//     ],
//   },
//   {
//     title: "AI Automation & Growth Agents",
//     description:
//       "Scale without hiring 10 people. We integrate AI systems to automate and accelerate marketing.",
//     image: AI,
//     items: [
//       "Auto-posting systems",
//       "Lead qualification & follow-ups",
//       "CRM automations",
//       "Funnel + ad performance tracking",
//     ],
//   },
// ];

// const ServiceBlock: React.FC<{
//   service: (typeof servicesData)[0];
//   index: number;
// }> = ({ service }) => {
//   const [openIndex, setOpenIndex] = useState<number | null>(null);

//   const toggleItem = (idx: number) => {
//     setOpenIndex(openIndex === idx ? null : idx);
//   };

//   return (
//     <>
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-24 border-b border-white/5 last:border-0 relative">
//         {/* Left Column: Image */}
//         <div className="lg:col-span-4 flex flex-col justify-start">
//           <div className="flex items-center gap-3 mb-6">
//             <div className="w-8 h-0.5 bg-accent-yellow"></div>
//             <span className="text-gray-300 font-bold tracking-wider uppercase text-sm">
//               Our Services
//             </span>
//           </div>

//           {/* Stylized Image Container */}
//           <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-[0_0_50px_rgba(76,29,149,0.3)] group hover:scale-105 transition-transform duration-500">
//             <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

//             <img
//               src={service.image}
//               alt={service.title}
//               className="w-3/4 h-3/4 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] relative z-10"
//             />

//             {/* Decorative Elements */}
//             <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-accent-yellow/50"></div>
//             <div className="absolute bottom-6 left-6 w-2 h-2 rounded-full bg-white/30"></div>
//           </div>
//         </div>

//         {/* Right Column: Content */}
//         <div className="lg:col-span-8 flex flex-col justify-center">
//           <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
//             {service.title}
//           </h2>
//           <p className="text-xl md:text-2xl text-gray-300 font-light mb-12 max-w-3xl leading-relaxed">
//             {service.description}
//           </p>

//           <div className="space-y-0">
//             {service.items.map((item, idx) => (
//               <div key={idx} className="border-b border-white/10">
//                 <button
//                   onClick={() => toggleItem(idx)}
//                   className="w-full py-6 flex items-center justify-between text-left group hover:bg-white/5 px-4 rounded-lg transition-colors"
//                 >
//                   <span className="text-lg font-medium text-white group-hover:text-accent-yellow transition-colors">
//                     {item}
//                   </span>
//                   <div className="text-white/50 group-hover:text-accent-yellow transition-colors">
//                     {openIndex === idx ? (
//                       <Minus size={20} />
//                     ) : (
//                       <Plus size={20} />
//                     )}
//                   </div>
//                 </button>

//                 {/* Accordion Content */}
//                 <div
//                   className={`grid transition-all duration-300 ease-in-out ${
//                     openIndex === idx
//                       ? "grid-rows-[1fr] opacity-100 pb-6 px-4"
//                       : "grid-rows-[0fr] opacity-0"
//                   }`}
//                 >
//                   <div className="overflow-hidden">
//                     <p className="text-gray-400 text-sm">
//                       Detailed execution plan and deliverables included in the{" "}
//                       {item} package, tailored to your business goals.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// const Services: React.FC = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <>
//       <Topbar />
//       <section className="pt-32 bg-[#1a0b3c] text-white relative min-h-screen">
//         {/* Top Gradient Background */}
//         <div className="absolute top-0 left-0 right-0 h-[800px] bg-gradient-to-b from-[#4c1d95]/40 via-[#1a0b3c]/80 to-[#1a0b3c] pointer-events-none"></div>

//         <div className="max-w-7xl mx-auto px-6 relative z-10">
//           <h1 className="text-6xl md:text-8xl font-bold mb-20 tracking-tight">
//             Services
//           </h1>

//           <div className="flex flex-col">
//             {servicesData.map((service, index) => (
//               <ServiceBlock key={index} service={service} index={index} />
//             ))}
//           </div>
//         </div>
//         <Footer />
//       </section>
//     </>
//   );
// };

// export default Services;

// import Topbar from "../Layouts/Topbar";
// import Footer from "../Layouts/Footer";
// import { Plus } from "lucide-react";
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import strategy from "../assets/strategy.png";
// import funnel from "../assets/funnel.png";
// import ads from "../assets/ads.png";
// import content from "../assets/content.png";
// import ChatGPT from "../assets/ChatGPT.png";
// import AI from "../assets/AI.png";
// // import SEO from "../assets/SEO.png";
// interface ServiceProps {
//   title: string;
//   description: string;
//   image: string;
//   bgClass: string;
//   items: string[];
// }
// const coreServices: ServiceProps[] = [
//   {
//     title: "Strategy and Brand Positioning",
//     description:
//       "We define how you win in your market before spending a dollar on ads.",
//     image: strategy,
//     bgClass: "bg-gradient-to-b from-[#4C12BF] to-[#160043]",
//     items: [
//       "Market & competitor analysis",
//       "Customer psychology & pain-point mapping",
//       "Clear value proposition & messaging framework",
//       "Brand tone, content direction & creative angles",
//     ],
//   },
//   {
//     title: "Funnel Design & Conversion Systems",
//     description:
//       "Traffic is useless without conversion. We design high-converting funnels that turn attention into revenue.",
//     image: funnel,
//     bgClass: "bg-gradient-to-b from-[#4C12BF] to-[#FFFFFF]",
//     items: [
//       "Landing pages & sales pages",
//       "Lead magnets & opt-in systems",
//       "VSL funnels & booking funnels",
//       "Email automation & follow-up sequences",
//     ],
//   },
//   {
//     title: "Paid Advertising (Performance Marketing)",
//     description:
//       "Ads backed by psychology, not guesswork. We run ads only after strategy and funnels are locked in.",
//     image: ads,
//     bgClass: "bg-gradient-to-b from-[#4C12BF] to-[#160043]",
//     items: [
//       "Creative strategy & testing frameworks",
//       "Ad copy & thumb-stopping hooks",
//       "UGC-style ads, motion ads & static creatives",
//       "Daily optimization & ROAS scaling",
//     ],
//   },
//   {
//     title: "Content Creation",
//     description:
//       "Content is the new currency. We mint it daily. This is your brand's visibility engine.",
//     image: content,
//     bgClass: "bg-gradient-to-b from-[#4C12BF] to-[#FFFFFF]",
//     items: [
//       "Short-form videos (Reels, TikTok, Shorts)",
//       "Motion graphics & animated ads",
//       "Brand storytelling videos & Social media carousels",
//       "YouTube long-form (when needed)",
//     ],
//   },
//   {
//     title: "Social Media Management",
//     description:
//       "Posting with purpose. We don't just post — we engineer attention and authority.",
//     image: ChatGPT,
//     bgClass: "bg-gradient-to-b from-[#4C12BF] to-[#160043",
//     items: [
//       "Content calendar & posting strategy",
//       "Caption writing & CTA optimization",
//       "Platform-specific growth tactics",
//       "Engagement optimization",
//     ],
//   },
//   {
//     title: "AI Automation & Growth Agents",
//     description:
//       "Scale without hiring 10 people. We integrate AI systems to automate and accelerate marketing.",
//     image: AI,
//     bgClass: "bg-gradient-to-b from-[#4C12BF] to-[#FFFFFF]",
//     items: [
//       "Auto-posting systems",
//       "Lead qualification & follow-ups",
//       "CRM automations",
//       "Funnel + ad performance tracking",
//     ],
//   },
//   // {
//   //   title: "SEO & Authority Building",
//   //   description:
//   //     "Long-term traffic that compounds. For brands ready to dominate organically.",
//   //   image: SEO,
//   //   bgClass: "bg-gradient-to-b from-[#4C12BF] to-[#160043",
//   //   items: [
//   //     "SEO content strategy",
//   //     "Keyword research & optimization",
//   //     "Authority content creation",
//   //     "Website performance optimization",
//   //   ],
//   // },
// ];

// const allServices = [...coreServices];

// const ServiceItem = ({ service }: { service: ServiceProps }) => {
//   const getAccordionBorderColor = (serviceTitle: string) => {
//     const yellowBorder = [
//       "Strategy and Brand Positioning",
//       "Paid Advertising (Performance Marketing)",
//       "Social Media Management",
//       "SEO & Authority Building",
//     ];
//     return yellowBorder.includes(serviceTitle) ? "#FED65E" : "#4C12BF";
//   };

//   const getAccordionTextColor = (serviceTitle: string) => {
//     const purpleTextServices = [
//       "Funnel Design & Conversion Systems",
//       "Content Creation",
//       "AI Automation & Growth Agents",
//     ];
//     return purpleTextServices.includes(serviceTitle) ? "text-[#4C12BF]" : "";
//   };

//   const borderColor = getAccordionBorderColor(service.title);
//   const textColorClass = getAccordionTextColor(service.title);

//   return (
//     <div className="group">
//       <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
//         {/* Image Section */}
//         <div className="relative font-Achivo">
//           <div className="flex items-center gap-3 text-md tracking-wider text-[#FED65E]">
//             <div className="w-8 h-[2px] bg-[#FED65E]"></div>
//             OUR SERVICES
//           </div>
//           <div className="relative z-10 w-full aspect-square max-w-[500px] mx-auto lg:mx-0">
//             <img
//               src={service.image}
//               alt={service.title}
//               className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
//             />
//           </div>
//           {/* Glow effect behind image */}
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-purple-900/30 blur-[100px] rounded-full -z-0" />
//         </div>

//         {/* Content Section */}
//         <div className="space-y-6 font-Achivo">
//           <h2 className="text-3xl md:text-4xl font-bold leading-tight">
//             {service.title}
//           </h2>
//           <p className="text-base md:text-xl text-white/80">
//             {service.description}
//           </p>
//         </div>
//       </div>

//       {/* List Items / Accordions Section (Below and Full Width) */}
//       <div className="w-full mt-12 pt-8 border-t border-white/10">
//         <div className="grid gap-4">
//           {service.items.map((item, idx) => (
//             <div key={idx} className="group/item">
//               <div
//                 className="flex items-center justify-between py-4 border-b transition-colors cursor-pointer"
//                 style={{
//                   borderBottomColor: borderColor,
//                 }}
//               >
//                 <span
//                   className={`text-base md:text-lg font-medium ${textColorClass}`}
//                 >
//                   {item}
//                 </span>
//                 <Plus className="w-5 h-5 text-purple-400 group-hover/item:text-white transition-colors" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const Services = () => {
//   const location = useLocation();

//   useEffect(() => {
//     // Scroll to service section if navigated from Expertise
//     if (location.state?.scrollTo) {
//       const targetTitle = location.state.scrollTo;
//       const serviceElements = document.querySelectorAll("h2");

//       for (const element of serviceElements) {
//         if (element.textContent === targetTitle) {
//           // Small delay to ensure page is fully rendered
//           setTimeout(() => {
//             element.scrollIntoView({ behavior: "smooth", block: "start" });
//           }, 100);
//           break;
//         }
//       }
//     }
//   }, [location]);

//   return (
//     <div className="min-h-screen text-white bg-[#160043]">
//       <Topbar />
//       {/* Page Title Section */}
//       <div className="bg-gradient-to-t from-[#4C12BF] to-[#ffffff] lg:min-h-screen py-12 md:py-20 flex flex-col justify-end">
//         <div className="max-w-7xl mdpb-28 px-6 md:px-16 md:py-0 py-24">
//           <h1 className="text-7xl md:text-[200px] xl:text-[300px] md:text-left text-center tracking-loose align-text-bottom text-white leading-tight font-medium">
//             Services
//           </h1>
//         </div>
//       </div>

//       {/* All Services Sections */}
//       {allServices.map((service, index) => (
//         <div key={index} className={`${service.bgClass} py-24 w-full`}>
//           <div className="max-w-7xl mx-auto px-6">
//             <ServiceItem service={service} />
//           </div>
//         </div>
//       ))}
//       <Footer />
//     </div>
//   );
// };

// export default Services;
