"use client";
import { useState } from "react";
import Media from "../assets/Media.png";
// import content from "../assets/content.png";
// import Frame from "../assets/Frame.png";

const Expertise = () => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(
    "Design"
  );
  const [hoveredCard, setHoveredCard] = useState<string | null>(
    "Content Creation"
  );
  const [clickedCard, setClickedCard] = useState<string | null>(null);

  const cards = [
    {
      id: "Strategy & Brand Positioning",
      title: "Strategy & Brand Positioning",
      description:
        "We define how you win in your market before spending a dollar on ads.",
      icon: Media,
    },
    {
      id: "Funnel Design & Conversion Systems",
      title: "Funnel Design & Conversion Systems",
      description:
        "We design high-converting funnels that turn attention into revenue.",
      icon: Media,
    },
    {
      id: "Paid Advertising",
      title: "Paid Advertising (Performance marketing)",
      description: "We run ads only after strategy and funnels are locked in.",
      icon: Media,
    },
    {
      id: "Content Creation",
      title: "Content Creation",
      description: "Content is the new currency. We mint it daily.",
      icon: Media,
    },
    {
      id: "Social Media Management",
      title: "Social Media Management",
      description:
        "We design high-converting funnels that turn attention into revenue.",
      icon: Media,
    },
    {
      id: "AI Automation",
      title: "AI Automation & Growth Agents",
      description: "We run ads only after strategy and funnels are locked in.",
      icon: Media,
    },
  ];

  const toggleAccordion = (item: string) => {
    setActiveAccordion(activeAccordion === item ? null : item);
  };

  const handleCardHover = (cardName: string) => {
    setHoveredCard(cardName);
    const accordionSets = getAccordionItems(cardName);
    if (accordionSets.length > 0) {
      setActiveAccordion(accordionSets[0].title);
    }
  };

  const handleCardClick = (cardName: string) => {
    if (clickedCard === cardName) {
      setClickedCard(null);
    } else {
      setClickedCard(cardName);
      setHoveredCard(cardName);
      const accordionSets = getAccordionItems(cardName);
      if (accordionSets.length > 0) {
        setActiveAccordion(accordionSets[0].title);
      }
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
            title: "Outcome",
            content:
              "A brand that looks premium, modern, and impossible to ignore.",
          },

        ];

      case "Social Media Management":
        return [
          {
            title: "Outcome",
            content:
              "Comprehensive social media strategies tailored to your brand, including content calendars, posting schedules, and audience engagement tactics.",
          },

        ];

      case "Paid Advertising":
      case "Ads & Search Engine":
        return [
          {
            title: "Outcome",
            content:
              "Consistent, scalable ad performance — not random spikes.",
          },

        ];

      case "AI Automation":
        return [
          {
            title: "Outcome",
            content:
              "Intelligent chatbots for customer service, lead generation, and sales support that provide 24/7 automated assistance to your customers.",
          },
        ];

      case "Strategy & Brand Positioning":
        return [
          {
            title: "Outcome",
            content:
              "A brand that knows what to say, who to say it to, and how to dominate attention.",
          },
        ];

      case "Funnel Design & Conversion Systems":
        return [
          {
            title: "Outcome",
            content:
              "A predictable system that converts visitors into leads, bookings, and sales.",
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`group relative rounded-2xl p-[1px] transition-all duration-300 ${clickedCard === card.id
                ? "bg-[#FED65E]"
                : "bg-gradient-to-t from-purple-900 to-white hover:bg-[#FED65E]"
                }`}
              onMouseEnter={() => handleCardHover(card.id)}
              onMouseLeave={handleCardLeave}
              onClick={() => handleCardClick(card.id)}
            >
              <div className="bg-[#4C12BF] rounded-2xl p-6 h-full flex flex-col relative">
                <div className="flex flex-row gap-4 mb-6">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      src={card.icon || "/placeholder.svg"}
                      alt={card.title}
                      className="object-contain pt-12"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-white text-lg font-bold leading-tight mb-2">
                      {card.title}
                    </h3>
                    <p className="text-purple-100 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end mt-auto">
                  <button className="bg-[#FED65E] text-[#4C12BF] py-2.5 px-6 rounded-lg hover:bg-yellow-300 transition-colors text-sm w-[calc(83%-2rem)] font-Achivo">
                    Let's Talk
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Accordion Section */}
        <div className="mx-auto">
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
                  className={`text-xl font-medium ${activeAccordion === item.title
                    ? "text-white"
                    : "text-purple-200"
                    }`}
                >
                  {item.title}
                </span>
                <div
                  className={`transform transition-transform duration-300 ${activeAccordion === item.title ? "rotate-45" : ""
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