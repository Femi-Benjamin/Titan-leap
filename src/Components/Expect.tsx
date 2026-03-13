import { useState } from "react";
import aimarketing from "../assets/aimarketing.png";
import contentconvert from "../assets/contentconvert.png";
import doneforyou from "../assets/doneforyou.png";
import highperformance from "../assets/highperformance.png";
import uniquemarket from "../assets/uniquemarket.png";

const expectCards = [
  {
    title: "Unique Market Positioning",
    description: "We help fix growth leaks in all pages",
    icon: uniquemarket,
  },
  {
    title: "Done for you Execution",
    description: "We help fix growth leaks in all pages",
    icon: doneforyou,
  },
  {
    title: "Content That Actually Converts",
    description: "We help fix growth leaks in all pages",
    icon: contentconvert,
  },
  {
    title: "High performance sales teams",
    description: "We help you attract buyers, not browsers.",
    icon: highperformance,
  },
  {
    title: "AI Marketing Automation",
    description: "We help fix growth leaks in all pages",
    icon: aimarketing,
  },
];

const guarantees = [
  {
    title:
      "You'll have a predictable lead pipeline within 60 days - or we work for free until you do.",
    detail:
      "We monitor weekly performance, remove bottlenecks, and keep optimizing until results are consistent.",
  },
  {
    title:
      "Your brand will produce more high-quality content in 30 days than most companies produce in 6 months -",
    detail:
      "We build a repeatable content engine with clear themes, scripts, and production cadence.",
  },
  {
    title:
      "If we don't improve your growth metrics within the first 90 days, we continue working for free until we do.",
    detail:
      "Clear KPIs, measurable benchmarks, and ongoing experimentation to drive real movement.",
  },
];

const Expect = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-t from-[#160043] via[#3A0F90] to-[#4C12BF] text-white py-16 md:py-24">
      <div className="xl:px-22 md:px-10 px-5">
        <div className="flex items-center gap-4 mb-4">
          <span className="h-[2px] w-10 bg-[#FED65E]" />
          <span className="text-[#FED65E] font-bold tracking-wider uppercase">
            WHAT TO EXPECT
          </span>
        </div>

        <h2 className="text-3xl md:text-5xl xl:text-6xl font-Archivo font-bold max-w-5xl">
          Get this results or we work for free
        </h2>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {expectCards.map((card) => (
            <div
              key={card.title}
              className="group border border-[#FED65E] rounded-2xl bg-[#4C12BF] p-6 flex flex-col items-center text-center min-h-[300px] shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-300 transform-gpu hover:scale-[1.03] hover:bg-[#3A0F90] hover:shadow-[0_18px_45px_rgba(0,0,0,0.35)] hover:border-[#FFE28A] active:scale-[1.03] active:bg-[#3A0F90] active:shadow-[0_18px_45px_rgba(0,0,0,0.35)] active:border-[#FFE28A]"
            >
              <div className="w-24 h-24 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105 group-active:scale-105">
                <img
                  src={card.icon}
                  alt={card.title}
                  loading="lazy"
                  className="w-full h-full object-contain drop-shadow-[0_10px_25px_rgba(255,214,94,0.25)]"
                />
              </div>
              <h3 className="text-lg font-bold leading-snug">{card.title}</h3>
              <p className="text-sm text-purple-100 mt-2 mb-6">
                {card.description}
              </p>
              <button className="mt-auto bg-[#FED65E] text-[#4C12BF] w-full py-2 rounded-md text-sm font-semibold transition-colors group-hover:bg-yellow-300 group-active:bg-yellow-300">
                See more
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <div className="flex items-center justify-between py-6 border-b border-white/20">
            <h3 className="text-xl font-semibold">Guarantees</h3>
            <span className="text-2xl font-light">+</span>
          </div>
          {guarantees.map((item, index) => (
            <div key={item.title} className="border-b border-white/20">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between py-6 text-left"
              >
                <p className="text-purple-100 text-lg">{item.title}</p>
                <span
                  className={`text-2xl font-light transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100 pb-6"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-sm md:text-base text-purple-200">
                    {item.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expect;
