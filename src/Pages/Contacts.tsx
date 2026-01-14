import Topbar from "../Layouts/Topbar";
import Footer from "../Layouts/Footer";
import ContactForm from "../Components/ContactForm";

const Contacts = () => {
  return (
    <div className="min-h-screen bg-gradient-to-t from-[#160043] to-[#4C12BF] text-white">
      <Topbar />
      <main className="max-w-6xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <div className="mt-8">
          <ContactForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contacts;
