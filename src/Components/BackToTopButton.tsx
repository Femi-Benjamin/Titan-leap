import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useLocation } from "react-router-dom";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 360);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsVisible(false);
  }, [pathname]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 14, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed right-5 bottom-6 z-[60] w-11 h-11 rounded-full bg-[#FED65E] text-[#160043] shadow-lg hover:bg-yellow-300 transition-colors flex items-center justify-center"
        >
          <ChevronUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;
