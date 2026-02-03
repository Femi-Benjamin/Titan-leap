export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4C12BF] to-[#160043] relative">
      <div className="absolute inset-0">
        <div className="relative w-full h-screen overflow-hidden">
          {/* Video Content */}
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/zDrMw4qObng?si=WGT-CQy8XlcC-Miv&autoplay=1&mute=1&rel=0&modestbranding=1&end=30"
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
                KLOUDAA
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
