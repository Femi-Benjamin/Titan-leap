import Topbar from "../Layouts/Topbar";
import Footer from "../Layouts/Footer";
import PricingComponent from "../Components/Pricing";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-t from-[#04000a] to-[#4C12BF] text-white">
      <Topbar />
      <main>
        <PricingComponent />
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
