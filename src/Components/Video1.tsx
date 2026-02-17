import { useState } from "react";

// YouTube video IDs and their thumbnail URLs
const videoData = [
  {
    id: "ibJtpgC4oRM",
    src: "https://www.youtube.com/embed/ibJtpgC4oRM?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&playlist=ibJtpgC4oRM",
  },
  {
    id: "1yyK7TC5ddM",
    src: "https://www.youtube.com/embed/1yyK7TC5ddM?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&playlist=1yyK7TC5ddM",
  },
];

export default function Component() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleNext = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videoData.length);
    setIsPlaying(false);
  };
  const handlePrev = () => {
    setCurrentVideoIndex(
      (prev) => (prev - 1 + videoData.length) % videoData.length,
    );
    setIsPlaying(false);
  };

  const currentVideo = videoData[currentVideoIndex];
  const thumbnailUrl = `https://img.youtube.com/vi/${currentVideo.id}/maxresdefault.jpg`;

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
            {isPlaying ? (
              /* YouTube iframe — only loaded after user taps */
              <div className="absolute inset-0 w-full h-full">
                <iframe
                  key={currentVideo.src}
                  src={currentVideo.src}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh]"
                ></iframe>
              </div>
            ) : (
              /* Thumbnail + play button — iOS-friendly */
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 w-full h-full cursor-pointer group/play border-0 bg-transparent p-0"
                aria-label="Play video"
              >
                <img
                  src={thumbnailUrl}
                  alt="Video thumbnail"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover/play:bg-white/30 transition-all duration-300 border border-white/30">
                    <svg
                      viewBox="0 0 24 24"
                      fill="white"
                      className="w-10 h-10 ml-1"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </button>
            )}

            {/* Dark Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>

            {/* Bottom Left Overlay Content */}
            <div className="absolute bottom-0 -left-3 md:-left-10 z-20 p-8 md:p-12 w-full">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-white text-base md:text-5xl font-bold mb-8 z-10 font-Achivo">
                  XEBIT PROJECT
                </h2>

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
