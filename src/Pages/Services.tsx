import Topbar from "../Layouts/Topbar";
import Footer from "../Layouts/Footer";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import strategy from "../assets/strategy.png";
import funnel from "../assets/funnel.png";
import ads from "../assets/ads.png";
import content from "../assets/content.png";
import ChatGPT from "../assets/ChatGPT.png";
import SEO from "../assets/SEO.png";
import AI from "../assets/AI.png";
interface ServiceProps {
  title: string;
  description: string;
  image: string;
  bgClass: string;
  items: string[];
}

const coreServices: ServiceProps[] = [
  {
    title: "Strategy and Brand Positioning",
    description:
      "We define how you win in your market before spending a dollar on ads.",
    image: strategy,
    bgClass: "bg-gradient-to-b from-[#4C12BF] to-[#160043]",
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
    bgClass: "bg-gradient-to-b from-[#4C12BF] to-[#FFFFFF]",
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
    bgClass: "bg-gradient-to-b from-[#4C12BF] to-[#160043]",
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
    bgClass: "bg-gradient-to-b from-[#4C12BF] to-[#FFFFFF]",
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
    bgClass: "bg-gradient-to-b from-[#4C12BF] to-[#160043",
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
    bgClass: "bg-gradient-to-b from-[#4C12BF] to-[#FFFFFF]",
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
    bgClass: "bg-gradient-to-b from-[#4C12BF] to-[#160043",
    items: [
      "SEO content strategy",
      "Keyword research & optimization",
      "Authority content creation",
      "Website performance optimization",
    ],
  },
];

const allServices = [...coreServices];

const ServiceItem = ({ service }: { service: ServiceProps }) => (
  <div className="group">
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
      {/* Image Section */}
      <div className="relative font-Achivo">
        <div className="flex items-center gap-3 text-md tracking-wider text-[#FED65E]">
          <div className="w-8 h-[2px] bg-[#FED65E]"></div>
          OUR SERVICES
        </div>
        <div className="relative z-10 w-full aspect-square max-w-[500px] mx-auto lg:mx-0">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>
        {/* Glow effect behind image */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-purple-900/30 blur-[100px] rounded-full -z-0" />
      </div>

      {/* Content Section */}
      <div className="space-y-6 font-Achivo">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
          {service.title}
        </h2>
        <p className="text-base md:text-xl text-white/80">
          {service.description}
        </p>
      </div>
    </div>

    {/* List Items / Accordions Section (Below and Full Width) */}
    <div className="w-full mt-12 pt-8 border-t border-white/10">
      <div className="grid gap-4">
        {service.items.map((item, idx) => (
          <div key={idx} className="group/item">
            <div className="flex items-center justify-between py-4 border-b border-white/20 group-hover/item:border-white/40 transition-colors cursor-pointer">
              <span className="text-base md:text-lg font-medium">{item}</span>
              <Plus className="w-5 h-5 text-purple-400 group-hover/item:text-white transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Services = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to service section if navigated from Expertise
    if (location.state?.scrollTo) {
      const targetTitle = location.state.scrollTo;
      const serviceElements = document.querySelectorAll("h2");

      for (const element of serviceElements) {
        if (element.textContent === targetTitle) {
          // Small delay to ensure page is fully rendered
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
          break;
        }
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen text-white bg-[#160043]">
      <Topbar />
      {/* Page Title Section */}
      <div className="bg-gradient-to-t from-[#4C12BF] to-[#ffffff] min-h-screen  flex flex-col justify-end">
        <div className="max-w-7xl pb-16 px-6">
          <h1 className="text-5xl md:text-7xl tracking-loose align-text-bottom text-white leading-tight font-Achivo">
            Services
          </h1>
        </div>
      </div>

      {/* All Services Sections */}
      {allServices.map((service, index) => (
        <div key={index} className={`${service.bgClass} py-24 w-full`}>
          <div className="max-w-7xl mx-auto px-6">
            <ServiceItem service={service} />
          </div>
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default Services;
