import Slide from "../assets/Slide.png";
import left from "../assets/left.png";
import right from "../assets/right.png";

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-[#160043] to-[#4C12BF] px-6 py-12">
      <div className="max-w6xl  xl:px-22 md:px-10 px-5 px-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-1 bg-[#FED65E]"></div>
            <span className="text-[#FED65E] font-semibold text-lg tracking-wider">
              Proof & Portfolio
            </span>
          </div>
          <h1 className="text-xl md:text-5xl xl:text-6xl font-bold text-[#FFFFFF] leading-tight">
            Real results. Real brands. Real growth
          </h1>
        </div>

        {/* Main Content Container */}
        <div className="relative mb-8 justify-centerflex xl:px-4">
          <div className="border-2 border-white/20 rounded-3xl h-[396px] xl:w[1600px] mb-8 relative overflow-hidden">
            {/* Content area - currently empty as in the image */}
            <div className="w-full h-full bg-gradient-to-b from-purple-600/20 to-purple-800/20"></div>
          </div>

          {/* Navigation Arrows */}
          <button className="absolute xl:-left-16 -left-10 top-1/2 -translate-y-1/2 text-yellow-400 hover:text-yellow-300 transition-colors">
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

          <button className="absolute xl:-right-16 -right-10 top-1/2 -translate-y-1/2 text-yellow-400 hover:text-yellow-300 transition-colors">
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
              <div className="text-white md:text-5xl font-bold mb-2">320%</div>
              <div className="text-white/80 text-lg">Lead Growth</div>
            </div>

            <div>
              <div className="text-white md:text-5xl font-bold mb-2">58%</div>
              <div className="text-white/80 text-lg">Cost Reduction</div>
            </div>

            <div>
              <div className="text-white md:text-5xl font-bold mb-2">320%</div>
              <div className="text-white/80 text-lg">ROI</div>
            </div>

            <div>
              <div className="text-white md:text-5xl font-bold mb-2">2 Mo</div>
              <div className="text-white/80 text-lg">Timeline</div>
            </div>
          </div>
        </div>

        {/* Brand Logos */}
        <div className="flex items-center justify-center gap-12 md:gap-16 flex-wrap opacity-60">
          <div className="text-white text-2xl font-bold flex items-center gap-2">
            <img className="" src={Slide} alt="Slide" />
          </div>
        </div>
      </div>
    </div>
  );
}
