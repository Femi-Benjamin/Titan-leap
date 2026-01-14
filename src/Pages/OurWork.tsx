import Topbar from "../Layouts/Topbar";
import Footer from "../Layouts/Footer";

const OurWork = () => {
  return (
    <div className="min-h-screen bg-gradient-to-t from-[#160043] to-[#4C12BF] text-white">
      <Topbar />
      <main className="max-w-6xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-6">Our Work</h1>
        <p className="text-white/80">Showcase your portfolio, case studies, and highlights here.</p>
      </main>
      <Footer />
    </div>
  );
};

export default OurWork;
