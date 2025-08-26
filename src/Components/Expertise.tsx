import { useState } from "react";
import Media from "../assets/Media.png";
import content from "../assets/content.png";
import Frame from "../assets/Frame.png";

const Expertise = () => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(
    "Design"
  );
  const [hoveredCard, setHoveredCard] = useState<string | null>(
    "Content Creation"
  );

  const toggleAccordion = (item: string) => {
    setActiveAccordion(activeAccordion === item ? null : item);
  };

  const handleCardHover = (cardName: string) => {
    setHoveredCard(cardName);
    // Reset accordion to first item when switching cards
    const accordionSets = getAccordionItems(cardName);
    if (accordionSets.length > 0) {
      setActiveAccordion(accordionSets[0].title);
    }
  };

  const handleCardLeave = () => {
    // Keep the last hovered card's accordion visible
  };

  const getAccordionItems = (cardType: string) => {
    switch (cardType) {
      case "Content Creation":
        return [
          {
            title: "Design",
            content:
              "Our design team creates stunning visual identities, logos, and brand materials that capture your unique essence and resonate with your target audience.",
          },
          {
            title: "Video Edits",
            content:
              "Professional video editing services including color correction, audio enhancement, transitions, and effects to create compelling visual stories.",
          },
          {
            title: "Motion Graphics and Explainer Videos",
            content:
              "Dynamic motion graphics and animated explainer videos that simplify complex concepts and engage your audience effectively.",
          },
          {
            title: "3D Product Design and Animation",
            content:
              "Cutting-edge 3D modeling, product visualization, and animation services that bring your products to life in stunning detail.",
          },
        ];

      case "Social Media Management":
        return [
          {
            title: "Content Strategy & Planning",
            content:
              "Comprehensive social media strategies tailored to your brand, including content calendars, posting schedules, and audience engagement tactics.",
          },
          {
            title: "Community Management",
            content:
              "Active community engagement, responding to comments and messages, building relationships with your followers, and fostering brand loyalty.",
          },
          {
            title: "Social Media Analytics",
            content:
              "In-depth performance tracking, audience insights, engagement metrics analysis, and monthly reporting to optimize your social presence.",
          },
          {
            title: "Influencer Partnerships",
            content:
              "Strategic influencer collaborations, partnership management, and campaign coordination to expand your reach and credibility.",
          },
        ];

      case "Ads & Search Engine":
        return [
          {
            title: "Google Ads Management",
            content:
              "Strategic Google Ads campaigns including search, display, and shopping ads optimized for maximum ROI and conversion rates.",
          },
          {
            title: "Search Engine Optimization",
            content:
              "Comprehensive SEO strategies including keyword research, on-page optimization, technical SEO, and link building to improve organic rankings.",
          },
          {
            title: "Social Media Advertising",
            content:
              "Targeted advertising campaigns across Facebook, Instagram, LinkedIn, and other platforms to reach your ideal customers effectively.",
          },
          {
            title: "Performance Analytics & Reporting",
            content:
              "Detailed campaign performance tracking, A/B testing, conversion optimization, and comprehensive reporting for data-driven decisions.",
          },
        ];

      case "AI Automation":
        return [
          {
            title: "Chatbot Development",
            content:
              "Intelligent chatbots for customer service, lead generation, and sales support that provide 24/7 automated assistance to your customers.",
          },
          {
            title: "Email Marketing Automation",
            content:
              "Smart email sequences, drip campaigns, and automated nurturing workflows that convert leads into customers while you sleep.",
          },
          {
            title: "CRM Integration & Automation",
            content:
              "Seamless CRM integration with automated lead scoring, data entry, follow-up sequences, and customer journey optimization.",
          },
          {
            title: "AI-Powered Analytics",
            content:
              "Advanced analytics using machine learning to predict customer behavior, optimize campaigns, and provide actionable business insights.",
          },
        ];

      default:
        return [];
    }
  };

  const currentAccordionItems = getAccordionItems(
    hoveredCard || "Content Creation"
  );

  return (
    <div className="md:min-h-screen bg-gradient-to-t from-[#160043] to-[#4C12BF] py-8">
      <div className="xl:px-22 md:px-10 px-5">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <div className="h-1 bg-[#FED65E] w-10 mr-4"></div>
            <span className="text-yellow-400 font-semibold text-lg tracking-wider uppercase">
              OUR EXPERTISE
            </span>
          </div>
          <h1 className="text-white text-xl md:text-5xl xl:text-6xl leading-tight font-Achivo">
            Comprehensive marketing solutions for growth
          </h1>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:gap-16 gap-6 mb-16">
          {/* Content Creation Card */}
          <div
            className="group bg-gradient-to-t from-purple-900 to-[#FFFFFF] p-0.5 rounded-2xl hover:bg-gradient-to-t 
          hover:from-[#FED65E] hover:to-[#FED65E] transition-all"
            onMouseEnter={() => handleCardHover("Content Creation")}
            onMouseLeave={handleCardLeave}
          >
            <div className="rounded-2xl p-6 text-center relative h-full bg-[#4C12BF]">
              {/* Default State */}
              <div className="group-hover:opacity-0 transition-opacity duration-700">
                <div className="flex justify-center mb-6">
                  <img className="" src={content} alt="Frame" />
                </div>
                <h3 className="text-white text-xl font-bold mb24">
                  Content Creation
                </h3>
              </div>

              {/* Hover State */}
              <div
                className="absolute inset-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 
              hover:bg-gradient-to-t hover:from-[#160043] hover:to-[#4C12BF] rounded-2xl"
              >
                <div className="flex justify-center mb-6">
                  <img className="" src={Media} alt="Media" />
                </div>
                <h3 className="text-white text-xl font-bold mb-3">
                  Content Creation
                </h3>
                <p className="text-white text-left text-sm mb-6 leading-relaxed">
                  Engaging content that converts, we create content that
                  resonates with your audience.
                </p>
                <button className="w-full bg-[#FED65E] text-purple-900 font-semibold py-3 px-6 rounded-lg cursor-pointer transition-colors">
                  Let's Talk
                </button>
              </div>
            </div>
          </div>

          {/* Social Media Management Card */}
          <div
            className="group bg-gradient-to-t from-purple-900 to-[#FFFFFF] p-0.5 rounded-2xl hover:bg-gradient-to-t 
          hover:from-[#FED65E] hover:to-[#FED65E] transition-all"
            onMouseEnter={() => handleCardHover("Social Media Management")}
            onMouseLeave={handleCardLeave}
          >
            <div className="rounded-2xl p-6 text-center relative h-full bg-[#4C12BF]">
              {/* Default State */}
              <div className="group-hover:opacity-0 transition-opacity duration-700">
                <div className="flex justify-center mb-6">
                  <img className="" src={Frame} alt="Frame" />
                </div>
                <h3 className="text-white text-xl font-bold pb-3">
                  Social Media
                </h3>
                <p className="text-white text-xl font-bold mb24">management</p>
              </div>

              {/* Hover State */}
              <div
                className="absolute inset-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 
              hover:bg-gradient-to-t hover:from-[#160043] hover:to-[#4C12BF] rounded-2xl"
              >
                <div className="flex justify-center mb-6">
                  <img className="" src={Media} alt="Frame" />
                </div>
                <h3 className="text-white text-xl font-bold mb-3">
                  Social Media management
                </h3>
                <p className="text-white text-left text-sm mb-6 leading-relaxed">
                  Strategic social media management that builds communities,
                  drives engagement across all platforms.
                </p>
                <button className="w-full bg-[#FED65E] text-purple-900 font-semibold py-3 px-6 rounded-lg cursor-pointer transition-colors">
                  Let's Talk
                </button>
              </div>
            </div>
          </div>

          {/* Ads & Search Engine Card */}
          <div
            className="group bg-gradient-to-t from-purple-900 to-[#FFFFFF] p-0.5 rounded-2xl hover:bg-gradient-to-t 
          hover:from-[#FED65E] hover:to-[#FED65E] transition-all"
            onMouseEnter={() => handleCardHover("Ads & Search Engine")}
            onMouseLeave={handleCardLeave}
          >
            <div className="rounded-2xl p-6 text-center relative h-full bg-[#4C12BF]">
              {/* Default State */}
              <div className="group-hover:opacity-0 transition-opacity duration-700">
                <div className="flex justify-center mb-6">
                  <img className="" src={Frame} alt="Frame" />
                </div>
                <h3 className="text-white text-xl font-bold pb-3">
                  Ads & Search
                </h3>
                <p className="text-white text-xl font-bold mb24">Engine</p>
              </div>

              {/* Hover State */}
              <div
                className="absolute inset-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 
              hover:bg-gradient-to-t hover:from-[#160043] hover:to-[#4C12BF] rounded-2xl"
              >
                <div className="flex justify-center mb-6">
                  <img className="" src={Media} alt="Frame" />
                </div>
                <h3 className="text-white text-xl font-bold mb-3">
                  Ads & Search Engine
                </h3>
                <p className="text-white text-left text-sm mb-6 leading-relaxed">
                  Data-driven advertising and SEO strategies that maximize your
                  online visibility and ROI.
                </p>
                <button className="w-full bg-[#FED65E] text-purple-900 font-semibold py-3 px-6 rounded-lg cursor-pointer transition-colors">
                  Let's Talk
                </button>
              </div>
            </div>
          </div>

          {/* AI Automation Card */}
          <div
            className="group bg-gradient-to-t from-purple-900 to-[#FFFFFF] p-0.5 rounded-2xl hover:bg-gradient-to-t 
          hover:from-[#FED65E] hover:to-[#FED65E] transition-all"
            onMouseEnter={() => handleCardHover("AI Automation")}
            onMouseLeave={handleCardLeave}
          >
            <div className="rounded-2xl p-6 text-center relative h-full bg-[#4C12BF]">
              {/* Default State */}
              <div className="group-hover:opacity-0 transition-opacity duration-700">
                <div className="flex justify-center mb-6">
                  <img className="" src={Frame} alt="Frame" />
                </div>
                <h3 className="text-white text-xl font-bold mb-24">
                  AI Automation
                </h3>
              </div>

              {/* Hover State */}
              <div
                className="absolute inset-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 
              hover:bg-gradient-to-t hover:from-[#160043] hover:to-[#4C12BF] rounded-2xl"
              >
                <div className="flex justify-center mb-6">
                  <img className="" src={Media} alt="Frame" />
                </div>
                <h3 className="text-white text-xl font-bold mb-3">
                  AI Automation
                </h3>
                <p className="text-white text-left text-sm mb-6 leading-relaxed">
                  Smart automation solutions that streamline your processes and
                  enhance customer experiences.
                </p>
                <button className="w-full bg-[#FED65E] text-purple-900 font-semibold py-3 px-6 rounded-lg cursor-pointer transition-colors">
                  Let's Talk
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Accordion Section */}
        <div className="mx-auto">
          <div className="mb-6">
            {/* <h2 className="text-white text-2xl font-bold">
              {hoveredCard || "Content Creation"} Services
            </h2> */}
          </div>
          {currentAccordionItems.map((item) => (
            <div
              key={item.title}
              className="border-b border-purple-400 last:border-b"
            >
              <button
                onClick={() => toggleAccordion(item.title)}
                className="w-full flex justify-between items-center py-6 text-left hover:text-yellow-400 transition-colors"
              >
                <span
                  className={`text-xl font-medium ${
                    activeAccordion === item.title
                      ? "text-white"
                      : "text-purple-200"
                  }`}
                >
                  {item.title}
                </span>
                <div
                  className={`transform transition-transform duration-300 ${
                    activeAccordion === item.title ? "rotate-45" : ""
                  }`}
                >
                  <svg
                    className="w-6 h-6 text-white"
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
              </button>
              {activeAccordion === item.title && (
                <div className="pb-6 pr-8">
                  <p className="text-purple-200 text-lg leading-relaxed">
                    {item.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Expertise;
