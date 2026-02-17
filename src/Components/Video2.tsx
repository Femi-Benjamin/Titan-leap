import ibomAirVideo from "../assets/ibomAir.mp4";

export default function Component() {
  return (
    <div className="min-h-screen w-full relative">
      <div className="absolute inset-0">
        <div className="relative w-full h-screen overflow-hidden">
          {/* Background Video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            poster=""
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={ibomAirVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20 z-10"></div>

          {/* Bottom Left Overlay Content */}
          <div className="absolute bottom-0 -left-3 md:-left-10 z-20 p-8 md:p-12 w-full">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-white text-base md:text-5xl font-bold mb-8 z-10 font-Achivo">
                IBOM AIR TECH WEEK
              </h2>

              {/* Select Punters Section */}
              <div>
                <div className="flex md:gap-8 gap-3">
                  <div>
                    <div className="text-white md:text-5xl text-xl font-bold mb-2">
                      180%
                    </div>
                    <div className="text-white/80 text-lg">Lead Growth</div>
                  </div>

                  <div>
                    <div className="text-white md:text-5xl text-xl font-bold mb-2">
                      42%
                    </div>
                    <div className="text-white/80 text-lg">Cost Reduction</div>
                  </div>

                  <div>
                    <div className="text-white md:text-5xl text-xl font-bold mb-2">
                      250%
                    </div>
                    <div className="text-white/80 text-lg">ROI</div>
                  </div>

                  <div>
                    <div className="text-white md:text-5xl text-xl font-bold mb-2">
                      3 Mo
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
