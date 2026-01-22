import Topbar from "../Layouts/Topbar";
import Footer from "../Layouts/Footer";
import Video2 from "../Components/Video2";
import Video1 from "../Components/Video1";
import Video3 from "../Components/Video3";
import Video4 from "../Components/Video4";

const OurWork = () => {
  return (
    <div className="min-h-screen bg-gradient-to-t from-[#000000] to-[#4C12BF] text-white">
      <Topbar />
      <main className="mx-auto">
        <div className="pt-20 px-4 md:px-40 max-w-7xl">
          <h1 className="text-white text-6xl md:text-7xl leading-loose font-bold text-center md:text-left">
            Portfolio
          </h1>
        </div>

        <div>
          <Video2 />
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
