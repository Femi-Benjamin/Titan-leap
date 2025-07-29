import Slide from "../assets/Slide.png";

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-[#160043] to-[#4C12BF] px-6 py-12">
      <div className="max-w6xl  xl:px-22 md:px-10 px-5 mx-auto">
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
        <div className="relative mb-16">
          <div className="border-2 border-white/20 rounded-3xl h-80 md:h-96 flex items-center justify-center relative overflow-hidden">
            {/* Left Arrow */}
            <button className="absolute left-6 top-1/2 transform -translate-y-1/2 text-yellow-400 hover:text-yellow-300 transition-colors">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Right Arrow */}
            <button className="absolute right-6 top-1/2 transform -translate-y-1/2 text-yellow-400 hover:text-yellow-300 transition-colors">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Select Punters Section */}
        <div className="mb-16">
          <h2 className="text-white text-2xl font-bold mb-8">Select Punters</h2>

          <div className="flex md:gap-8 gap-3">
            <div>
              <div className="text-white md:text-5xl font-bold mb-2">
                320%
              </div>
              <div className="text-white/80 text-lg">Lead Growth</div>
            </div>

            <div>
              <div className="text-white md:text-5xl font-bold mb-2">
                58%
              </div>
              <div className="text-white/80 text-lg">Cost Reduction</div>
            </div>

            <div>
              <div className="text-white md:text-5xl font-bold mb-2">
                320%
              </div>
              <div className="text-white/80 text-lg">ROI</div>
            </div>

            <div>
              <div className="text-white md:text-5xl font-bold mb-2">
                2 Mo
              </div>
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
