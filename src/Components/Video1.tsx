import { useState } from "react";

export default function Component() {
  const videos = [
    "https://www.youtube.com/embed/ibJtpgC4oRM?autoplay=1&mute=1&rel=0&modestbranding=1&end=30",
    "https://www.youtube.com/embed/1yyK7TC5ddM?si=KqaMPajlveyRynW8&autoplay=1&mute=1&rel=0&modestbranding=1&end=30",
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
            className="absolute left-2 md:left-12 top-1/2 -translate-y-1/2 z-10 bg-[#4C12BF] md:bg-white/10 hover:bg-white/20 backdrop-blur-sm p-2 rounded-full transition-all text-white border border-white/20"
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
            {/* Video Content */}
            <iframe
              key={videos[currentVideoIndex]}
              width="100%"
              height="100%"
              src={videos[currentVideoIndex]}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full absolute inset-0"
            ></iframe>

            {/* Bottom Left Overlay Content */}
            <div className="absolute bottom-0 left-0 z-20 p-8 md:p-12 bg-gradient-to-t from-black/80 to-transparent w-full">
              <div className="max-w-7xl mx-auto">
             
                <h2 className="text-white text-base md:text-5xl font-bold mb-8 z-10 font-Achivo">
                  XEBIT PROJECT
                </h2>

                {/* Select Punters Section */}
                <div className="mb-4">
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
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-2 md:right-12 top-1/2 -translate-y-1/2 z-10 bg-[#4C12BF] md:bg-white/10 hover:bg-white/20 backdrop-blur-sm p-2 rounded-full transition-all text-white border border-white/20"
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
