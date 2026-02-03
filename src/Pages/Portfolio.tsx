import Topbar from "../Layouts/Topbar";
import Footer from "../Layouts/Footer";
import Video1 from "../Components/Video1";
import Video2 from "../Components/Video2";
import Video3 from "../Components/Video3";
import Video4 from "../Components/Video4";
import Video5 from "../Components/Video5";
import Video6 from "../Components/Video6";

const OurWork = () => {
  return (
    <div className="min-h-screen bg-gradient-to-t from-[#000000] to-[#4C12BF] text-white">
      <Topbar />
      <main className="mx-auto">
        {/* Page Title Section */}
        <div className="bg-gradient-to-t from-[#4C12BF] to-[#ffffff] lg:min-h-screen py-12 md:py-20 flex flex-col justify-end">
          <div className="max-w-7xl mdpb-28 px-6 md:py-0 py-24">
            <h1 className="text-7xl md:text-[200px] xl:text-[300px] md:text-left text-center tracking-loose align-text-bottom text-white leading-tight fontAchivo">
              Portfolio
            </h1>
          </div>
        </div>
        {/* Video Stack */}
        <div className="flex flex-col gap-1">
          <Video2 />
          <Video5 />
          <Video6 />
          <Video1 />
          <Video3 />
          <Video4 />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OurWork;
