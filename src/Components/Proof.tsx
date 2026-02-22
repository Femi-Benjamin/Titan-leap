import { useState } from "react";
// import left from "../assets/left.png";
// import right from "../assets/right.png";
import website1 from "../assets/website1.mp4";
import { motion } from "framer-motion";

export default function Component() {
  // Dummy video data
  const videos = [
    {
      id: 1,
      title: "Brand Campaign Success",
      description: "E-commerce transformation resulting in 450% lead growth",
      // videoUrl:
      //   "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    },
    {
      id: 2,
      title: "Digital Marketing Revolution",
      description: "Social media strategy delivering 60% cost reduction",
      // videoUrl:
      //   "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    },
    {
      id: 3,
      title: "ROI Optimization Project",
      description: "Complete brand overhaul achieving 400% ROI in 2 months",
      // videoUrl:
      //   "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    },
  ];

  const [currentVideoIndex] = useState(0);

  // const goToPrevious = () => {
  //   setCurrentVideoIndex((prevIndex) =>
  //     prevIndex === 0 ? videos.length - 1 : prevIndex - 1,
  //   );
  // };

  // const goToNext = () => {
  //   setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  // };

  const currentVideo = videos[currentVideoIndex];

  return (
    <div className="md:min-h-screen bg-gradient-to-t from-[#160043] to-[#4C12BF] py-12">
      <div className="mx-auto xl:px-22 md:px-10 px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-1 bg-[#FED65E]"></div>
            <span className="text-[#FED65E] font-bold text-lg tracking-wider uppercase">
              Proof & Portfolio
            </span>
          </div>
          <h1 className="text-xl md:text-5xl xl:text-6xl font-Achivo text-[#FFFFFF] leading-tight font-bold">
            Real results. Real brands. Real growth
          </h1>
        </motion.div>

        {/* Main Content Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mb-8 flex justify-center"
        >
          <div className="relative rounded-3xl md:h-[570px] h-[400px] xl:h-[670px] xl:w-[1700px] w-full mb-8 overflow-hidden">
            {/* Gradient Border */}
            <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-t from-[#4C12BF] to-[#FFFFFF]">
              <div className="w-full h-full bg-black rounded-3xl overflow-hidden">
                {/* Video Content */}
                <div className="w-full h-full relative">
                  <video
                    key={currentVideo.id}
                    className="w-full h-full object-cover rounded-3xl"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    preload="none"
                    poster=""
                  >
                    {/* <source src={currentVideo.videoUrl} type="video/mp4" /> */}
                    <source src={website1} type="video/mp4" />
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
                  {/* <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-white text-sm font-medium">
                      {currentVideoIndex + 1} / {videos.length}
                    </span>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          {/* <button
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
          </button> */}
        </motion.div>

        {/* Marquee Logo Strip */}
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] py-8 mb-8">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-12 animate-marquee shrink-0">
            <li className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-all">
              <div className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center font-serif text-[10px] text-gray-400">
                IT
              </div>
              <span className="font-bold tracking-tight text-gray-300">
                DALE
              </span>
            </li>
            <li className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-all">
              <span className="font-bold italic text-xl text-gray-400">||</span>
              <span className="font-bold text-gray-300 text-lg">make</span>
            </li>
            <li className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-all">
              <span className="text-2xl text-gray-400 font-black">A</span>
              <span className="font-bold text-gray-300 text-lg">Adobe</span>
            </li>
            <li className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-all">
              <span className="font-bold italic text-xl text-gray-400">||</span>
              <span className="font-bold text-gray-300 text-lg">make</span>
            </li>
            <li className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-all">
              <span className="text-2xl text-gray-400 font-black">A</span>
              <span className="font-bold text-gray-300 text-lg">Adobe</span>
            </li>
          </ul>
          <ul
            className="flex items-center justify-center md:justify-start [&_li]:mx-12 animate-marquee shrink-0"
            aria-hidden="true"
          >
            <li className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-all">
              <div className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center font-serif text-[10px] text-gray-400">
                IT
              </div>
              <span className="font-bold tracking-tight text-gray-300">
                DALE
              </span>
            </li>
            <li className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-all">
              <span className="font-bold italic text-xl text-gray-400">||</span>
              <span className="font-bold text-gray-300 text-lg">make</span>
            </li>
            <li className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-all">
              <span className="text-2xl text-gray-400 font-black">A</span>
              <span className="font-bold text-gray-300 text-lg">Adobe</span>
            </li>
            <li className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-all">
              <span className="font-bold italic text-xl text-gray-400">||</span>
              <span className="font-bold text-gray-300 text-lg">make</span>
            </li>
            <li className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-all">
              <span className="text-2xl text-gray-400 font-black">A</span>
              <span className="font-bold text-gray-300 text-lg">Adobe</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
