import Topbar from "../Layouts/Topbar";
import Footer from "../Layouts/Footer";
import ContactForm from "../Components/ContactForm";
import { motion } from "framer-motion";

const Contacts = () => {
  return (
    <div className="min-h-screen bg-[#160043] text-white">
      <Topbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-3 py-28 md:text-left text-center"
      >
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <div className="mt-8">
          <ContactForm />
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default Contacts;
