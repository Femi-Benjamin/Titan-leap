import { useState } from "react";
import Media from "../assets/Media.png";
import Frame from "../assets/Frame.png";

const Expertise = () => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(
    "Design"
  );

  const toggleAccordion = (item: string) => {
    setActiveAccordion(activeAccordion === item ? null : item);
  };

  const accordionItems = [
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

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#160043] to-[#4C12BF] py-8">
      <div className="xl:px-22 md:px-10 px-5">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <div className="h-1 bg-[#FED65E] w-10 mr-4"></div>
            <span className="text-yellow-400 font-semibold text-lg tracking-wider uppercase">
              OUR EXPERTISE
            </span>
          </div>
          <h1 className="text-white text-xl md:text-5xl xl:text-6xl font-bold leading-tight">
            Comprehensive marketing solutions for growth
          </h1>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Content Creation Card */}
          <div
            className="group bg-gradient-to-t from-purple-900 to-[#FFFFFF] p-0.5 rounded-2xl hover:bg-gradient-to-t 
          hover:from-[#FED65E] hover:to-[#FED65E] transition-all"
          >
            <div className="rounded-2xl p-6 text-center relative h-full bg-[#4C12BF]">
              {/* Default State */}
              <div className="group-hover:opacity-0 transition-opacity duration-700">
                <div className="flex justify-center mb-6">
                  <img className="" src={Frame} alt="Frame" />
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
                  Engaging content that converts, we create content that
                  resonates with your audience.
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
                  Engaging content that converts, we create content that
                  resonates with your audience.
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
                  Engaging content that converts, we create content that
                  resonates with your audience.
                </p>
                <button className="w-full bg-[#FED65E] text-purple-900 font-semibold py-3 px-6 rounded-lg cursor-pointer transition-colors">
                  Let's Talk
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion Section */}
        <div className="mx-auto">
          {accordionItems.map((item) => (
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
                  className={`transform transition-transform duration-200 ${
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
