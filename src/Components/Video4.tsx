import { useState } from "react";

// YouTube video ID and its thumbnail URL
const videoData = {
  id: "zDrMw4qObng",
  src: "https://www.youtube.com/embed/zDrMw4qObng?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&playlist=zDrMw4qObng",
};

export default function Component() {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoData.id}/maxresdefault.jpg`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4C12BF] to-[#160043] relative">
      <div className="absolute inset-0">
        <div className="relative w-full h-screen overflow-hidden group">
          {/* Background Video Container */}
          {isPlaying ? (
            /* YouTube iframe — only loaded after user taps */
            <div className="absolute inset-0 w-full h-full">
              <iframe
                src={videoData.src}
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
                KLOUDAA
              </h2>

              {/* Select Punters Section */}
              <div>
                <div className="flex md:gap-8 gap-3">
                  <div>
                    <div className="text-white md:text-5xl text-xl font-bold mb-2">
                      150%
                    </div>
                    <div className="text-white/80 text-lg">Lead Growth</div>
                  </div>

                  <div>
                    <div className="text-white md:text-5xl text-xl font-bold mb-2">
                      35%
                    </div>
                    <div className="text-white/80 text-lg">Cost Reduction</div>
                  </div>

                  <div>
                    <div className="text-white md:text-5xl text-xl font-bold mb-2">
                      200%
                    </div>
                    <div className="text-white/80 text-lg">ROI</div>
                  </div>

                  <div>
                    <div className="text-white md:text-5xl text-xl font-bold mb-2">
                      4 Mo
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
      </div>
    </div>
  );
}
