import { useState } from "react";
import left from "../assets/left.png";
import right from "../assets/right.png";

export default function Component() {
  // Dummy video data
  const videos = [
    {
      id: 1,
      title: "Brand Campaign Success",
      description: "E-commerce transformation resulting in 320% lead growth",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    },
    {
      id: 2,
      title: "Digital Marketing Revolution",
      description: "Social media strategy delivering 58% cost reduction",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    },
    {
      id: 3,
      title: "ROI Optimization Project",
      description: "Complete brand overhaul achieving 320% ROI in 2 months",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    },
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const currentVideo = videos[currentVideoIndex];

  return (
    <div className="md:min-h-screen bg-gradient-to-t from-[#160043] to-[#4C12BF] md:px-0 px-6 py-12">
      <div className="mx-auto xl:px-22 md:px-10 px-5">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-1 bg-[#FED65E]"></div>
            <span className="text-[#FED65E] font-semibold text-lg tracking-wider">
              Proof & Portfolio
            </span>
          </div>
          <h1 className="text-xl md:text-5xl xl:text-6xl font-Achivo text-[#FFFFFF] leading-tight">
            Real results. Real brands. Real growth
          </h1>
        </div>

        {/* Main Content Container */}
        <div className="relative mb-8 flex justify-center xl:px-4">
          <div className="relative rounded-3xl h-[400px] xl:h-[500px] xl:w-[1700px] w-full mb-8 overflow-hidden">
            {/* Gradient Border */}
            <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-t from-[#4C12BF] to-[#FFFFFF]">
              <div className="w-full h-full bg-black rounded-3xl overflow-hidden">
                {/* Video Content */}
                <div className="w-full h-full relative">
                  <video
                    key={currentVideo.id}
                    className="w-full h-full object-cover rounded-3xl"
                    controls
                    poster=""
                  >
                    <source src={currentVideo.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Video Info Overlay */}
                  {/* <div className="absolute bottom-4 left-4 right-4 rounded-lg p-4">
                    <h3 className="text-white font-bold text-lg mb-1">
                      {currentVideo.title}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {currentVideo.description}
                    </p>
                  </div> */}

                  {/* Video Counter */}
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-white text-sm font-medium">
                      {currentVideoIndex + 1} / {videos.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            className="absolute xl:-left-16 -left-10 top-1/2 xl:top-80 -translate-y-1/2 text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer"
            onClick={goToPrevious}
          >
            <svg
              className="block xl:hidden"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="xl:block hidden">
              <img className="" src={left} alt="" />
            </div>
          </button>

          <button
            className="absolute xl:-right-16 -right-10 top-1/2 xl:top-80 -translate-y-1/2 text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer"
            onClick={goToNext}
          >
            <svg
              className="block xl:hidden"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="xl:block hidden">
              <img className="" src={right} alt="" />
            </div>
          </button>
        </div>

        {/* Select Punters Section */}
        <div className="mb-16">
          <h2 className="text-white text-2xl font-bold mb-8">Select Punters</h2>

          <div className="flex md:gap-8 gap-3">
            <div>
              <div className="text-white md:text-5xl text-2xl font-bold mb-2">
                320%
              </div>
              <div className="text-white/80 text-lg">Lead Growth</div>
            </div>

            <div>
              <div className="text-white md:text-5xl text-2xl font-bold mb-2">
                58%
              </div>
              <div className="text-white/80 text-lg">Cost Reduction</div>
            </div>

            <div>
              <div className="text-white md:text-5xl text-2xl font-bold mb-2">
                320%
              </div>
              <div className="text-white/80 text-lg">ROI</div>
            </div>

            <div>
              <div className="text-white md:text-5xl text-xl font-bold mb-2">
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
