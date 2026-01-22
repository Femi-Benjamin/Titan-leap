import { useState } from "react";

export default function Component() {
  const videos = [
    "https://www.youtube.com/embed/ibJtpgC4oRM?autoplay=1&mute=1",
    "https://www.youtube.com/embed/1yyK7TC5ddM?si=KqaMPajlveyRynW8&autoplay=1&mute=1",
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleNext = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const handlePrev = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <div className="md:min-h-screen bg-gradient-to-t from-[#000000] to-[#4C12BF] pb-10 pt-20 md:pt-36">
      <div className="max-w-7xl mx-auto xl:px-22 md:px-10 px-5">
        {/* Main Content Container */}
        <div className="relative mb-8 flex justify-center xl:px-4 group">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 z-10 bg-[#4C12BF] md:bg-white/10 hover:bg-white/20 backdrop-blur-sm p-2 rounded-full transition-all text-white border border-white/20"
            aria-label="Previous video"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <div className="relative rounded-3xl w-full aspect-[21/12] md:aspect-[16/9] mb-8 overflow-hidden z-0">
            {/* Gradient Border */}
            <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-t from-[#4C12BF] to-[#FFFFFF]">
              <div className="w-full h-full bg-black rounded-3xl overflow-hidden">
                {/* Video Content */}
                <iframe
                  key={videos[currentVideoIndex]} // Force re-render on change
                  width="100%"
                  height="100%"
                  src={videos[currentVideoIndex]}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 z-10 bg-[#4C12BF] md:bg-white/10 hover:bg-white/20 backdrop-blur-sm p-2 rounded-full transition-all text-white border border-white/20"
            aria-label="Next video"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>

        {/* Select Punters Section */}
        <div className="mb-16">
          <h2 className="text-white text-base md:text-5xl font-bold mb-8">
            XEBIT PROJECT
          </h2>

          <div className="grid grid-cols-2 gap-y-8 gap-x-4 md:flex md:gap-8">
            <div>
              <div className="text-white md:text-5xl text-3xl font-bold mb-2">
                320%
              </div>
              <div className="text-white/80 text-lg">Lead Growth</div>
            </div>

            <div>
              <div className="text-white md:text-5xl text-3xl font-bold mb-2">
                58%
              </div>
              <div className="text-white/80 text-lg">Cost Reduction</div>
            </div>

            <div>
              <div className="text-white md:text-5xl text-3xl font-bold mb-2">
                320%
              </div>
              <div className="text-white/80 text-lg">ROI</div>
            </div>

            <div>
              <div className="text-white md:text-5xl text-3xl font-bold mb-2">
                2 Mo
              </div>
              <div className="text-white/80 xl:text-lg text-lg">Timeline</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
