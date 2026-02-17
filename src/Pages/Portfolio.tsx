import React, { useState, useEffect, useRef } from "react";
import Footer from "../Layouts/Footer";
import Topbar from "../Layouts/Topbar";

// Helper hook for animating numeric values smoothly
const useAnimatedValue = (target: number) => {
  const [displayValue, setDisplayValue] = useState(target);
  const valueRef = useRef(target);
  const targetRef = useRef(target);

  useEffect(() => {
    targetRef.current = target;
    let animationFrame: number;

    const animate = () => {
      const diff = targetRef.current - valueRef.current;

      if (Math.abs(diff) < 0.05) {
        valueRef.current = targetRef.current;
        setDisplayValue(targetRef.current);
        return;
      }

      valueRef.current += diff * 0.15;
      setDisplayValue(valueRef.current);
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target]);

  return displayValue;
};

// Stat Component
const StatItem = ({
  item,
}: {
  item: { value: number; unit: string; label: string; description: string };
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const targetValue = isHovered ? item.value * 1.1 : item.value;
  const animatedValue = useAnimatedValue(targetValue);

  const formattedValue =
    Number.isInteger(item.value) && Number.isInteger(targetValue)
      ? Math.round(animatedValue)
      : parseFloat(animatedValue.toFixed(1));

  return (
    <div
      className="pl-2 relative group/stat cursor-help"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-3xl md:text-4xl font-extrabold mb-1 transition-colors duration-300 text-white tabular-nums">
        {formattedValue}
        {item.unit}
      </div>
      <div className="text-xs text-gray-400 font-semibold tracking-wide">
        {item.label}
      </div>

      {/* Tooltip */}
      <div
        className={`absolute bottom-full left-0 mb-3 w-64 p-4 bg-[#2e1065]/95 border border-accent-yellow/30 rounded-xl shadow-2xl text-xs text-gray-200 pointer-events-none transition-all duration-300 z-20 backdrop-blur-xl ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
      >
        <div className="font-bold text-accent-yellow mb-1 text-sm">
          {item.label}
        </div>
        <p className="leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
};

const cases = [
  {
    client: "Kloudaa",
    videoId: "zDrMw4qObng",
    stats: [
      {
        value: 320,
        unit: "%",
        label: "Lead Growth",
        description:
          "Significant increase in qualified leads generated month-over-month.",
      },
      {
        value: 58,
        unit: "%",
        label: "Cost Reduction",
        description:
          "Optimization of ad spend resulting in lower Cost Per Acquisition (CPA).",
      },
      {
        value: 320,
        unit: "%",
        label: "ROI",
        description:
          "Total Return on Investment achieved across all active campaigns.",
      },
      {
        value: 2,
        unit: " Mo",
        label: "Timeline",
        description:
          "Time taken from initial strategy to achieving these key results.",
      },
    ],
  },
  {
    client: "Ship bubble",
    videoId: "3IHXNbRLZRo",
    stats: [
      {
        value: 32,
        unit: "%",
        label: "Lead Growth",
        description:
          "Steady growth in new user signups through targeted outreach.",
      },
      {
        value: 8,
        unit: "%",
        label: "Cost Reduction",
        description:
          "Marginal efficiency gains in operational marketing costs.",
      },
      {
        value: 120,
        unit: "%",
        label: "ROI",
        description: "Positive return on ad spend within the first quarter.",
      },
      {
        value: 3,
        unit: " Mo",
        label: "Timeline",
        description: "Duration of the market penetration campaign.",
      },
    ],
  },
  {
    client: "Ibom Air",
    videoId: "yIQd2Ya0ZKI",
    stats: [
      {
        value: 12,
        unit: "%",
        label: "Lead Growth",
        description:
          "Increase in booking inquiries directly attributed to digital channels.",
      },
      {
        value: 58,
        unit: "%",
        label: "Cost Reduction",
        description:
          "Drastic reduction in wasted ad spend via audience targeting.",
      },
      {
        value: 320,
        unit: "%",
        label: "ROI",
        description:
          "High yield returns from optimized flight booking campaigns.",
      },
      {
        value: 2,
        unit: " Mo",
        label: "Timeline",
        description: "Rapid deployment and optimization period.",
      },
    ],
  },
  {
    client: "Xebit",
    videoId: "ibJtpgC4oRM",
    stats: [
      {
        value: 320,
        unit: "%",
        label: "Lead Growth",
        description:
          "Explosive growth in B2B leads generated for the SaaS platform.",
      },
      {
        value: 58,
        unit: "%",
        label: "Cost Reduction",
        description: "Efficiency improvements in the sales funnel.",
      },
      {
        value: 320,
        unit: "%",
        label: "ROI",
        description: "Exceptional return on marketing investment.",
      },
      {
        value: 2,
        unit: " Mo",
        label: "Timeline",
        description: "Short-term sprint to validate the new market strategy.",
      },
    ],
  },
  {
    client: "Idea sprint",
    videoId: "AkhGAeLBSkg",
    stats: [
      {
        value: 320,
        unit: "%",
        label: "Lead Growth",
        description: "Maximum lead generation capacity reached.",
      },
      {
        value: 58,
        unit: "%",
        label: "Cost Reduction",
        description: "Reduced overheads through automated marketing flows.",
      },
      {
        value: 320,
        unit: "%",
        label: "ROI",
        description: "Substantial revenue generated vs spend.",
      },
      {
        value: 2,
        unit: " Mo",
        label: "Timeline",
        description: "Project completion time.",
      },
    ],
  },
];

const logoItems = [
  {
    component: (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center font-serif text-[10px] text-gray-400">
          IT
        </div>
        <span className="font-bold tracking-tight text-gray-300">DALE</span>
      </div>
    ),
  },
  {
    component: (
      <div className="flex items-center gap-2">
        <span className="font-bold italic text-xl text-gray-400">||</span>{" "}
        <span className="font-bold text-gray-300 text-lg">make</span>
      </div>
    ),
  },
  {
    component: (
      <div className="flex items-center gap-2">
        <span className="text-2xl text-gray-400 font-black">A</span>{" "}
        <span className="font-bold text-gray-300 text-lg">Adobe</span>
      </div>
    ),
  },
  {
    component: (
      <div className="flex items-center gap-2">
        <span className="font-bold italic text-xl text-gray-400">||</span>{" "}
        <span className="font-bold text-gray-300 text-lg">make</span>
      </div>
    ),
  },
  {
    component: (
      <div className="flex items-center gap-2">
        <span className="text-2xl text-gray-400 font-black">A</span>{" "}
        <span className="font-bold text-gray-300 text-lg">Adobe</span>
      </div>
    ),
  },
];

const LogoStrip = () => (
  <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_64px,_black_calc(100%-64px),transparent_100%)] md:[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] py-8 md:py-12 border-b border-white/5">
    <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 md:[&_li]:mx-16 animate-marquee shrink-0">
      {logoItems.map((item, index) => (
        <li
          key={index}
          className="flex items-center gap-2 transition-all duration-300 opacity-60 hover:opacity-100"
        >
          {item.component}
        </li>
      ))}
    </ul>
    <ul
      className="flex items-center justify-center md:justify-start [&_li]:mx-8 md:[&_li]:mx-16 animate-marquee shrink-0"
      aria-hidden="true"
    >
      {logoItems.map((item, index) => (
        <li
          key={`clone-${index}`}
          className="flex items-center gap-2 transition-all duration-300 opacity-60 hover:opacity-100"
        >
          {item.component}
        </li>
      ))}
    </ul>
  </div>
);

const Portfolio: React.FC = () => {
  return (
    <>
      <Topbar />
      <section
        id="work"
        className="pt-32 bg-[#1a0b3c] text-white relative min-h-screen"
      >
        {/* Top Gradient Background */}
        <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-[#7c3aed]/30 via-[#1a0b3c]/50 to-[#1a0b3c] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className="text-6xl md:text-8xl font-bold mb-12 tracking-loose">
            Portfolio
          </h2>

          <LogoStrip />

          <div className="space-y-40 mt-20">
            {cases.map((item, index) => (
              <div key={index} className="group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-0.5 bg-accent-yellow"></div>
                  <span className="text-white font-bold tracking-wide text-sm">
                    Proof & Portfolio
                  </span>
                </div>
                <h3 className="text-5xl md:text-6xl font-bold mb-10">
                  {item.client}
                </h3>

                {/* Big Box - Video Embed */}
                <div className="w-full aspect-video bg-[#1a0b3c] rounded-2xl border border-[#4c1d95] mb-12 relative overflow-hidden shadow-2xl group-hover:border-accent-yellow/30 transition-colors">
                  {/* Inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2e1065]/50 to-transparent pointer-events-none z-10"></div>

                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${item.videoId}?rel=0&modestbranding=1`}
                    title={item.client}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 z-0"
                  ></iframe>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                  {item.stats.map((stat, i) => (
                    <StatItem key={i} item={stat} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="md:mt-40 mt-10 md:mb-20 mb-10">
            <LogoStrip />
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Portfolio;

// import Topbar from "../Layouts/Topbar";
// import Footer from "../Layouts/Footer";
// import Video1 from "../Components/Video1";
// import Video2 from "../Components/Video2";
// import Video3 from "../Components/Video3";
// import Video4 from "../Components/Video4";
// import Video5 from "../Components/Video5";
// import Video6 from "../Components/Video6";

// const OurWork = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-t from-[#000000] to-[#4C12BF] text-white">
//       <Topbar />
//       <main className="mx-auto">
//         {/* Page Title Section */}
//         <div className="bg-gradient-to-t from-[#4C12BF] to-[#ffffff] lg:min-h-screen py-12 md:py-20 flex flex-col justify-end">
//           <div className="max-w-7xl mdpb-28 px-6 md:px-16 md:py-0 py-24">
//             <h1 className="text-7xl md:text-[200px] xl:text-[300px] font-medium md:text-left text-center tracking-loose align-text-bottom text-white leading-tight fontAchivo">
//               Portfolio
//             </h1>
//           </div>
//         </div>
//         {/* Video Stack */}
//         <div className="flex flex-col gap-1">
//           <Video2 />
//           <Video5 />
//           <Video6 />
//           <Video1 />
//           <Video3 />
//           <Video4 />
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default OurWork;
