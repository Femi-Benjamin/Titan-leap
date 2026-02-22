import { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import Intro from "./Pages/Intro";
import Main from "./Pages/Main";
import LoadingScreen from "./LoadingScreen/loadingscreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Lazy-load route-level pages for code-splitting (reduces initial JS bundle)
const Portfolio = lazy(() => import("./Pages/Portfolio"));
const Services = lazy(() => import("./Pages/Services"));
const Pricing = lazy(() => import("./Pages/Pricing"));
const Contacts = lazy(() => import("./Pages/Contacts"));

const RouteFallback = () => (
  <div className="min-h-screen bg-[#1a0b3c] flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<
    "success" | "canceled" | null
  >(null);

  useEffect(() => {
    // Check for payment status in URL
    const params = new URLSearchParams(window.location.search);
    if (params.get("success")) {
      setPaymentStatus("success");
    } else if (params.get("canceled")) {
      setPaymentStatus("canceled");
    }

    // Simulate loading time - adjust duration as needed
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 seconds loading time

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  // Show success page
  if (paymentStatus === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-t from-[#160043] to-[#4C12BF] text-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-8">
            <svg
              className="w-24 h-24 mx-auto text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-bold mb-4 text-[#FED65E]">
            Payment Successful! 🎉
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Thank you for your purchase. Your plan is now active!
          </p>
          <div className="space-y-4">
            <p className="text-white/70">
              A confirmation email has been sent to your inbox.
            </p>
            <button
              onClick={() => {
                setPaymentStatus(null);
                window.history.replaceState(
                  {},
                  document.title,
                  window.location.pathname,
                );
              }}
              className="bg-[#FED65E] text-[#4C12BF] font-bold py-3 px-8 rounded-lg hover:bg-yellow-300 transition-all duration-300"
            >
              Continue to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show canceled page
  if (paymentStatus === "canceled") {
    return (
      <div className="min-h-screen bg-gradient-to-t from-[#160043] to-[#4C12BF] text-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-8">
            <svg
              className="w-24 h-24 mx-auto text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-bold mb-4 text-red-400">
            Payment Canceled
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Your payment was canceled. No charges were made.
          </p>
          <button
            onClick={() => {
              setPaymentStatus(null);
              window.history.replaceState(
                {},
                document.title,
                window.location.pathname,
              );
            }}
            className="bg-[#FED65E] text-[#4C12BF] font-bold py-3 px-8 rounded-lg hover:bg-yellow-300 transition-all duration-300"
          >
            Back to Pricing
          </button>
        </div>
      </div>
    );
  }

  // Show loading screen while isLoading is true
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Show main content after loading is complete
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Intro />
              <Main />
            </>
          }
        />
        <Route
          path="/portfolio"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Portfolio />
            </Suspense>
          }
        />
        <Route
          path="/services"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Services />
            </Suspense>
          }
        />
        <Route
          path="/pricing"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Pricing />
            </Suspense>
          }
        />
        <Route
          path="/contacts"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Contacts />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <>
              <Intro />
              <Main />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
