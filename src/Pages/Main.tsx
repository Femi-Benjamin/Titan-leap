import { lazy, Suspense } from "react";

const Process = lazy(() => import("../Components/Process"));
const Proof = lazy(() => import("../Components/Proof"));
const Testimonials = lazy(() => import("../Components/Testimonials"));
const ContactForm = lazy(() => import("../Components/ContactForm"));
const CardMany = lazy(() => import("../Components/CardMany"));
const Footer = lazy(() => import("../Layouts/Footer"));

const LazyFallback = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-10 h-10 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Main = () => {
  return (
    <div>
      <Suspense fallback={<LazyFallback />}>
        <Process />
      </Suspense>
      <Suspense fallback={<LazyFallback />}>
        <Proof />
      </Suspense>
      <Suspense fallback={<LazyFallback />}>
        <Testimonials />
      </Suspense>
      <div
        className="min-h-screen bg-gradient-to-t from-[#4C12BF] to-[#FFFFFF] flex flex-col 
        md:flex-row justify-center items-center xl:px-22 md:px-10 px-2 py-10 gap-10"
      >
        <Suspense fallback={<LazyFallback />}>
          <div>
            <ContactForm />
          </div>
          <div>
            <CardMany />
          </div>
        </Suspense>
      </div>
      <Suspense fallback={<LazyFallback />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Main;
