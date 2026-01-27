export default function Component() {
  return (
    <div className="md:min-h-screen bg-gradient-to-b from-[#4C12BF] to-[#160043] pb-10 pt-20 md:pt-36">
      <div className="max-w-7xl mx-auto xl:px-0 px-3">
        {/* Main Content Container */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-1 bg-[#FED65E]"></div>
            <span className="text-[#FED65E] font-bold text-lg tracking-wider uppercase">
              Proof & Portfolio
            </span>
          </div>
          <h2 className="text-white text-base md:text-5xl font-bold mb-8 z-10 font-Achivo">
            SUCKIE EXHANGE
          </h2>
        </div>
        <div className="relative mb-8 flex justify-center xl:px-4">
          <div className="relative rounded-3xl w-full aspect-[21/12] md:aspect-[16/9] mb-8 overflow-hidden">
            {/* Gradient Border */}
            <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-t from-[#4C12BF] to-[#FFFFFF]">
              <div className="w-full h-full bg-black rounded-3xl overflow-hidden">
                {/* Video Content */}
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/BeamF14MKTE?si=1ZMTQHN7ko9l8Imz&autoplay=1&mute=1"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Select Punters Section */}
        <div className="mb-16">
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
              <div className="text-white/80 text-lg">Cost Reduction</div>
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
              <div className="text-white/80 xl:text-lg text-lg">Timeline</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
