import Process from "../Components/Process";
import Proof from "../Components/Proof";
import Testimonials from "../Components/Testimonials";
// import Pricing from "../Components/Pricing";
import ContactForm from "../Components/ContactForm";
import CardMany from "../Components/CardMany";
import Footer from "../Layouts/Footer";

const Main = () => {
  return (
    <div>
      <Process />
      <Proof />
      <Testimonials />
      {/* <Pricing /> */}
      <div
        className="min-h-screen bg-gradient-to-t from-[#4C12BF] to-[#FFFFFF] flex flex-col 
        md:flex-row justify-center items-center xl:px-22 md:px-10 px-2 py-10 gap-10"
      >
        <div>
          <ContactForm />
        </div>
        <div>
          <CardMany />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
