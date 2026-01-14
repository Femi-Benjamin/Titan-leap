import Topbar from "../Layouts/Topbar";
import Footer from "../Layouts/Footer";

const Services = () => {
  return (
    <div className="min-h-screen bg-gradient-to-t from-[#160043] to-[#4C12BF] text-white">
      <Topbar />
      <main className="max-w-6xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-6">Services</h1>
        <p className="text-white/80">List your offered services and descriptions here.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
