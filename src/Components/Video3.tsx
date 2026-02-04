export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4C12BF] to-[#160043] relative">
      <div className="absolute inset-0">
        <div className="relative w-full h-screen overflow-hidden">
          {/* Background Video */}
          <div className="absolute inset-0 w-full h-full">
            <iframe
              src="https://www.youtube.com/embed/BeamF14MKTE?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&playlist=BeamF14MKTE"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] pointer-events-none"
            ></iframe>
          </div>

          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40 z-10"></div>

          {/* Bottom Left Overlay Content */}
          <div className="absolute bottom-0 left-0 z-20 p-8 md:p-12 bg-gradient-to-t from-black/80 to-transparent w-full">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-white text-base md:text-5xl font-bold mb-8 z-10 font-Achivo">
                SUCKIE EXCHANGE
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
