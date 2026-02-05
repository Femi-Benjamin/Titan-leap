import { useState } from "react";

export default function Component() {
  const videos = [
    "https://www.youtube.com/embed/ibJtpgC4oRM?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&playlist=ibJtpgC4oRM",
    "https://www.youtube.com/embed/1yyK7TC5ddM?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&playlist=1yyK7TC5ddM",
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const handleNext = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };
  const handlePrev = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4C12BF] to-[#160043] pb-0 pt-0 relative">
      <div className="absolute inset-0">
        {/* Full Screen Video Container */}
        <div className="relative w-full h-full flex justify-center items-center group">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-2 md:left-12 top-1/2 -translate-y-1/2 z-30 bg-[#4C12BF] md:bg-white/10 hover:bg-white/20 backdrop-blur-sm p-2 rounded-full transition-all text-white border border-white/20"
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

          <div className="relative w-full h-screen overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0 w-full h-full">
              <iframe
                key={videos[currentVideoIndex]}
                src={videos[currentVideoIndex]}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] pointer-events-none"
              ></iframe>
            </div>

            {/* Dark Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40 z-10"></div>

            {/* Bottom Left Overlay Content */}
            <div className="absolute bottom-0 -left-0 md:-left-10  z-20 p-8 md:p-12 bg-gradient-to-t from-black/80 to-transparent w-full">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-white text-base md:text-5xl font-bold mb-8 z-10 font-Achivo">
                  XEBIT PROJECT
                </h2>

                {/* Select Punters Section */}
                <div>
                  <div className="flex md:gap-8 gap-3">
                    <div>
                      <div className="text-white md:text-5xl text-xl font-bold mb-2">
                        320%
                      </div>
                      <div className="text-white/80 text-lg">Lead Growth</div>
                    </div>

                    <div>
                      <div className="text-white md:text-5xl text-xl font-bold mb-2">
                        58%
                      </div>
                      <div className="text-white/80 text-lg">
                        Cost Reduction
                      </div>
                    </div>

                    <div>
                      <div className="text-white md:text-5xl text-xl font-bold mb-2">
                        320%
                      </div>
                      <div className="text-white/80 text-lg">ROI</div>
                    </div>

                    <div>
                      <div className="text-white md:text-5xl text-xl font-bold mb-2">
                        2 Mo
                      </div>
                      <div className="text-white/80 xl:text-lg text-lg">
                        Timeline
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-2 md:right-12 top-1/2 -translate-y-1/2 z-30 bg-[#4C12BF] md:bg-white/10 hover:bg-white/20 backdrop-blur-sm p-2 rounded-full transition-all text-white border border-white/20"
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
      </div>
    </div>
  );
}
