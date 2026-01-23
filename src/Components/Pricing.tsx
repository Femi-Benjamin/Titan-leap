"use client";
import type React from "react";
import { useState } from "react";
import StripeCheckout from "./StripeCheckout";
import { motion, AnimatePresence } from "framer-motion";
import gift from "../assets/gift.png";

interface Plan {
  title: string;
  subtitle: string;
  monthlyPrice: number;
  currencySymbol: string;
  unit: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
}

const PricingPage: React.FC = () => {
  const [billingType, setBillingType] = useState<"Annual" | "Monthly">(
    "Monthly",
  );
  const [selectedPlan, setSelectedPlan] =
    useState<string>("The Scaling System");
  const [showModal, setShowModal] = useState(false);
  const [showStripeCheckout, setShowStripeCheckout] = useState(false);
  const [expandedFeatures, setExpandedFeatures] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // const featureCardsRef = useRef<HTMLDivElement | null>(null);

  const plans: Plan[] = [
    {
      title: "Growth Foundation",
      subtitle: "For businesses that need visibility, leads, and clarity",
      monthlyPrice: 2999,
      currencySymbol: "$",
      unit: "Starting | USD",
      buttonText: "Select Plan",
      features: [
        "Features",
        "Market & competitor analysis",
        "Offer & messaging framework",
        "1 high-converting landing page",
        "Lead form or booking setup",
        "Email or WhatsApp automation",
        "13-17 short-form videos / month",
        "12 branded posts or carousels",
        "AI-powered content ideation & editing",
      ],
    },
    {
      title: "The Scaling System",
      subtitle: "For brands that want predictable leads and sales",
      monthlyPrice: 5999,
      currencySymbol: "$",
      unit: "Starting | USD",
      buttonText: "Select Plan",
      isPopular: true,
      features: [
        "Features",
        "Everything in Growth Foundation Plus:",
        "Advanced funnel system (landing + booking/sales page)",
        "Retargeting setup",
        "Email + WhatsApp automation sequences",
        "CRM integration to track leads",
        "25-35 short-form videos / month",
        "15-17 branded posts or carousels",
        "Motion graphics & UGC-style creatives",
        "Meta + TikTok or Google Ads management",
        "Weekly optimization & performance reports",
        "AI creative performance analysis",
        "AI hook & CTA optimization",
        "AI lead qualification & follow-ups",
        "AI content re-purposing (1 video → multiple assets)",
      ],
    },
    {
      title: "Authority Domination",
      subtitle: "For brands that want to own attention in their market",
      monthlyPrice: 9999,
      currencySymbol: "$",
      unit: "Starting | USD",
      buttonText: "Get Started",
      features: [
        "Features",
        "Everything in Scale system Plus:",
        "Thought-leadership positioning strategy",
        "Market dominance content plan",
        "60-80 short-form videos / month",
        "Long-form YouTube or podcast content",
        "Premium motion graphics & visuals",
        "Paid ads + organic growth synergy",
        "SEO or YouTube authority strategy",
        "Dedicated growth team:",
        "Content strategist",
        "Ad specialist",
        "Creative lead",
        "Account manager",
        "Advanced AI Systems",
        "AI trend & market analysis",
        "AI personalization (emails, offers, landing pages)",
        "AI performance dashboards (ads, content, leads, sales)",
        "AI internal automation for faster execution",
      ],
    },
  ];

  const handleFormSubmit = () => {
    if (!userInfo.name || !userInfo.email || !userInfo.phone) {
      alert("Please fill in all fields");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userInfo.email)) {
      alert("Please enter a valid email address");
      return;
    }
    setShowModal(false);
    setShowStripeCheckout(true);
  };

  const getPriceDisplay = (plan: Plan) => {
    const price =
      billingType === "Annual"
        ? Math.round(plan.monthlyPrice * 12 * 0.85)
        : plan.monthlyPrice;

    return `${plan.currencySymbol}${price.toLocaleString()}`;
  };

  const toggleFeatureExpansion = () => {
    setExpandedFeatures(!expandedFeatures);
  };

  const activePlanDetails = () => {
    const plan = plans.find((p) => p.title === selectedPlan);

    if (!plan)
      return {
        title: "The Scaling System",
        price: "$ 5,999",
        unit: "/Month",
        billing: "Billed Monthly",
        rawPrice: 5999,
      };

    const price =
      billingType === "Annual"
        ? Math.round(plan.monthlyPrice * 12 * 0.85)
        : plan.monthlyPrice;

    const unitTime = billingType === "Annual" ? "/Year" : "/Month";

    return {
      title: plan.title,
      price: `${plan.currencySymbol}${price.toLocaleString()}`,
      unit: `${plan.unit.split("|")[1]?.trim() || "USD"} ${unitTime}`,
      billing: billingType === "Annual" ? "Billed Annually" : "Billed Monthly",
      rawPrice: price,
    };
  };

  const activePlan = activePlanDetails();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4B11BF] via-[#4C12BF] to-[#170044] font-sans pb-0 overflow-x-hidden">
      {/* Header Section */}
        <div className="min-h-screen flex flex-col justify-end bg-gradient-to-t from-[#4C12BF] to-[#ffffff]">
          <div className="max-w-7xl pb-16 px-6">
            <h1 className="text-xl md:text-7xl tracking-loose align-text-bottom text-white leading-loose font-Achivo">
              Pricing
            </h1>
          </div>
        </div>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="md:px-12 lg:px-20"
      >

        <div className="flex items-center gap-4 mb-4 px-4 md:px-0">
          <div className="w-8 h-1 bg-[#D3CEE8]"></div>
          <span className="text-yellow-400 font-bold text-lg tracking-wider uppercase">
            Pricing or Offers
          </span>
        </div>

        <h2 className="text-white text-xl md:text-5xl xl:text-6xl leading-tight font-Achivo px-4 md:px-0">
          Best things are premium
        </h2>

        {/* Toggle */}
        <div className="flex justify-center my-16 md:my-20">
          <div className="bg-[#4C12BF] p-1.5 rounded-2xl inline-flex items-center border border-[#FED65E] shadow-lg">
            <button
              onClick={() => setBillingType("Annual")}
              className={`px-8 py-2.5 rounded-xl font-bold transition-all text-md tracking-wide duration-300 ${
                billingType === "Annual"
                  ? "bg-white text-[#4C12BF] shadow-md"
                  : "text-white hover:text-white/80"
              }`}
            >
              Annual
            </button>
            <button
              onClick={() => setBillingType("Monthly")}
              className={`px-8 py-2.5 rounded-xl font-bold transition-all text-md tracking-wide duration-300 ${
                billingType === "Monthly"
                  ? "bg-white text-[#4C12BF] shadow-md"
                  : "text-white hover:text-white/80"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-start pb-10 md:pb-16 px-4">
          {plans.map((plan, index) => (
            <div key={plan.title} className="flex flex-col gap-4 group">
              {/* TOP CARD: Pricing Info */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                onClick={() => setSelectedPlan(plan.title)}
                className={`flex flex-col rounded-3xl p-8 backdrop-blur-sm transition-all duration-300 relative cursor-pointer ${
                  selectedPlan === plan.title
                    ? "bg-[#3D0E99] hover:bg-[#280a6b]"
                    : "bg-[#3D0E99] hover:bg-[#280a6b]"
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 rounded-tr-3xl bg-[#FED65E] text-[#4C12BF] text-sm font-bold px-8 py-2 z-10 whitespace-nowrap rounded-bl-3xl shadow-md">
                    Most Popular
                  </div>
                )}

                <div className="flex justify-between items-start mb-4 mt-2">
                  <h3 className="md:text-4xl text-2xl font-bold text-yellow-400 leading-tight font-Inter">
                    {plan.title}
                  </h3>

                  {/* Radio Button */}
                  <div className="w-6 h-6 rounded-full border border-white/50 flex items-center justify-center flex-shrink-0 transition-all duration-300">
                    <motion.div
                      initial={false}
                      animate={{
                        scale: selectedPlan === plan.title ? 1 : 0,
                        opacity: selectedPlan === plan.title ? 1 : 0,
                      }}
                      className={`w-3 h-3 rounded-full bg-yellow-400 ${
                        selectedPlan !== plan.title
                          ? "group-hover:opacity-100 group-hover:scale-100 opacity-0 scale-0"
                          : ""
                      } transition-transform duration-300 ease-out`}
                    />
                  </div>
                </div>

                <p className="text-white/80 text-sm">{plan.subtitle}</p>

                <div className="mb-2">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={billingType}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="text-5xl font-bold text-yellow-400 font-sans block"
                    >
                      {getPriceDisplay(plan)}
                      {billingType === "Annual" && (
                        <span className="text-sm font-bold text-white/70 ml-3 bg-white/10 px-2 py-1 rounded-lg align-middle">
                          Save 15%
                        </span>
                      )}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <p className="text-white/60 text-xs mb-8 uppercase tracking-wider">
                  {plan.unit} / {billingType === "Annual" ? "Year" : "Month"}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPlan(plan.title);
                    setShowModal(true);
                  }}
                  className={`w-full py-4 rounded-full font-bold transition-all duration-300 active:scale-95 mt-auto border ${
                    plan.isPopular
                      ? "bg-[#FED65E] text-[#4C12BF] border-[#FED65E] hover:bg-[#ffe187] shadow-lg hover:shadow-xl cursor-pointer"
                      : index === 2
                        ? "bg-gradient-to-b from-[#4C12BF] to-[#FED65E] text-white border-white/20 hover:opacity-90 shadow-lg hover:shadow-xl cursor-pointer"
                        : "bg-white/10 text-white border-white hover:bg-white/20 backdrop-blur-md cursor-pointer"
                  }`}
                >
                  {plan.buttonText}
                </button>
              </motion.div>

              {/* BOTTOM CARD: Features */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15 + 0.1,
                  ease: "easeOut",
                }}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                onClick={() => setSelectedPlan(plan.title)}
                className={`rounded-3xl p-8 backdrop-blur-sm border border-white/5 cursor-pointer transition-colors duration-300 relative ${
                  selectedPlan === plan.title
                    ? "bg-[#340d87]"
                    : "bg-[#340d87] hover:bg-[#280a6b]"
                }`}
              >
                <div
                  className={`space-y-4 transition-all duration-500 ${
                    expandedFeatures
                      ? "max-h-[2000px]"
                      : "max-h-[280px] overflow-hidden"
                  }`}
                >
                  {plan.features.map((feature, i) => (
                    <div key={i} className={`flex items-start gap-3`}>
                      {feature === "Features" ? (
                        <span className="text-white text-base font-bold uppercase mb-2 block">
                          Features
                        </span>
                      ) : feature.includes("Everything in") ||
                        feature.includes("Advanced AI Systems") ||
                        feature.includes("Dedicated growth team") ? (
                        <span className="text-white/90 text-sm font-bold mt-2 block w-full">
                          {feature}
                        </span>
                      ) : (
                        <>
                          <div className="mt-1 min-w-[16px]">
                            <div className="w-4 h-4 rounded-full bg-[#FED65E] flex items-center justify-center shadow-sm">
                              <svg
                                viewBox="0 0 24 24"
                                className="w-3 h-3 text-[#4C12BF]"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                          </div>
                          <span className="text-white/80 text-sm leading-snug">
                            {feature}
                          </span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Centered Click to Scroll Down Button */}
        <div className="flex justify-center pb-10 md:pb-16">
          {!expandedFeatures ? (
            <motion.button
              onClick={toggleFeatureExpansion}
              className="text-[#FED65E] text-sm font-medium flex items-center justify-center gap-2 hover:text-yellow-300 transition-colors px-6 py-3"
              whileHover={{ y: 2 }}
              transition={{ duration: 0.2 }}
            >
              Click to scroll down
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.button>
          ) : (
            <motion.button
              onClick={toggleFeatureExpansion}
              className="text-[#FED65E] text-sm font-medium flex items-center justify-center gap-2 hover:text-yellow-300 transition-colors px-6 py-3"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              Click to scroll up
              <svg
                className="w-4 h-4 rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Bottom Bar Section */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="bg-[#2E027F] border-t border-white/10 w-full z-20 py-8 sticky bottom-0 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 text-center md:text-left">
            <motion.span
              key={activePlan.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="text-white font-bold text-xl md:w-1/3"
            >
              {activePlan.title}
            </motion.span>

            <div className="flex items-baseline gap-2 justify-center md:w-1/3">
              <motion.span
                key={activePlan.price}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-5xl font-bold text-white tracking-tight"
              >
                {activePlan.price}
              </motion.span>
              <span className="text-white font-bold text-lg">
                {activePlan.unit}
              </span>
            </div>

            <div className="md:w-1/3 text-right">
              <span className="text-white font-extrabold text-sm uppercase tracking-wide">
                {activePlan.billing}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setShowModal(true);
            }}
            className="w-full bg-[#FED65E] text-[#2E027F] py-4 rounded-full font-bold text-lg hover:bg-[#ffe187] transition-all transform hover:scale-[1.01] shadow-lg active:scale-95"
          >
            Subscribe & Pay
          </button>
        </div>
      </motion.div>

      {/* Gift Section */}
      <div className="bg-gradient-to-b from-[#170044] to-[#4B11BF] pt-20 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative">
          {/* Gift Image - positioned with bottom hidden, top visible */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            whileInView={{ scale: 1, opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute top-3 left-1/2 transform -translate-x-1/2 z-10 translate-y-[-60%] md:translate-y-[-65%]"
          >
            <div className="w-32 h-32 md:w-40 md:h-40">
              <div className="w-full h-full bg-contain bg-no-repeat bg-center animate-pulse">
                {/* Gift Box SVG */}
                <img src={gift} alt="giftbox" />
              </div>
            </div>
          </motion.div>

          {/* Purple rounded container */}
          <div className="bg-gradient-to-b from-[#4B11BF] to-[#170044] rounded-tr-4xl rounded-tl-4xl px-8 md:px-16 py-10 md:py-16 relative overflow-hidden z-10 font-Achivo">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center space-y-6 pt-12 md:pt-8 items-center justify-center"
            >
              <h2 className="text-xl md:text-2xl lg:text-4xl text-white leading-tight">
                Get a free Growth Readiness Audit
              </h2>
              <p className="text-[#FED65E] text-base md:text-md max-w-4xl mx-auto">
                Get a free Growth Readiness Audit and see exactly what's holding
                your business back.
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#FED65E] text-[#2E027F] py-4 rounded-full text-lg hover:bg-[#ffe187] transition-all transform hover:scale-[1.01] shadow-lg active:scale-95"
              >
                <span className="">👉 </span>
                <span>Get My Free Audit</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="bg-gradient-to-t from-[#4B11BF] to-[#170044] px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-white text-md md:text-xl pt-8 pb-4 items-center font-Achivo">
            Key Features
          </h3>
          {/* Add your key features content here */}
        </div>
      </div>

      {/* MODAL */}
      {showModal && !showStripeCheckout && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-gradient-to-b from-[#4C12BF] to-[#160043] rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/10"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white text-center">
                User Information
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setShowStripeCheckout(false);
                }}
                className="text-white/70 hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={userInfo.phone}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="+234 800 000 0000"
                />
              </div>

              <div className="bg-white/5 rounded-xl p-4 mt-6 border border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/80">Plan:</span>
                  <span className="font-semibold text-yellow-400">
                    {activePlan.title}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/80">Billing:</span>
                  <span className="font-semibold text-yellow-400">
                    {activePlan.billing}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/80">Total:</span>
                  <span className="font-bold text-yellow-400">
                    {activePlan.price}
                  </span>
                </div>
              </div>

              <button
                onClick={handleFormSubmit}
                className="w-full bg-[#FED65E] text-[#4C12BF] font-bold 
                text-lg py-4 rounded-xl hover:bg-yellow-300 transition-all duration-300 hover:scale-[1.02] shadow-lg mt-6"
              >
                Proceed to Payment
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* STRIPE CHECKOUT */}
      {showStripeCheckout && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1a0b38] rounded-3xl p-1 max-w-md w-full shadow-2xl overflow-hidden border border-white/10"
          >
            <div className="bg-[#2a1255] px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Secure Checkout</h2>
              <button
                onClick={() => {
                  setShowStripeCheckout(false);
                  setShowModal(false);
                }}
                className="text-white/60 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <StripeCheckout
                amount={activePlan.rawPrice || 0}
                email={userInfo.email}
                name={userInfo.name}
                phone={userInfo.phone}
                planName={selectedPlan}
                billingType={billingType}
                onSuccess={() => {
                  alert(
                    `Payment successful! Receipt sent to ${userInfo.email}`,
                  );
                  setShowStripeCheckout(false);
                  setShowModal(false);
                  setUserInfo({ name: "", email: "", phone: "" });
                }}
                onCancel={() => {
                  setShowStripeCheckout(false);
                  setShowModal(true);
                }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PricingPage;

// "use client";
// import type React from "react";
// import { useState } from "react";
// import StripeCheckout from "./StripeCheckout";
// import { motion, AnimatePresence } from "framer-motion";

// interface Plan {
//   title: string;
//   subtitle: string;
//   monthlyPrice: number; // Changed to explicitly mean Monthly Price
//   currencySymbol: string;
//   unit: string;
//   features: string[];
//   buttonText: string;
//   isPopular?: boolean;
// }

// const PricingPage: React.FC = () => {
//   const [billingType, setBillingType] = useState<"Annual" | "Monthly">(
//     "Monthly",
//   );
//   // Default to Annual since prices are annual? Or Monthly? User selected "Scale System".
//   const [selectedPlan, setSelectedPlan] = useState<string>("Scale System");
//   const [showModal, setShowModal] = useState(false);
//   const [showStripeCheckout, setShowStripeCheckout] = useState(false);
//   const [userInfo, setUserInfo] = useState({
//     name: "",
//     email: "",
//     phone: "",
//   });

//   const plans: Plan[] = [
//     {
//       title: "Growth Foundation",
//       subtitle: "For businesses that need visibility, leads, and clarity",
//       monthlyPrice: 2999,
//       currencySymbol: "$",
//       unit: "Starting | USD",
//       buttonText: "Select Plan",
//       features: [
//         "Features",
//         "Market & competitor analysis",
//         "Offer & messaging framework",
//         "1 high-converting landing page",
//         "Lead form or booking setup",
//         "Email or WhatsApp automation",
//         "10-12 short-form videos / month",
//         "12 branded posts or carousels",
//         "AI-powered content ideation & editing",
//       ],
//     },
//     {
//       title: "The Scaling System",
//       subtitle: "For brands that want predictable leads and sales",
//       monthlyPrice: 5999,
//       currencySymbol: "$",
//       unit: "Starting | USD",
//       buttonText: "Select Plan",
//       isPopular: true,
//       features: [
//         "Features",
//         "Everything in Growth Foundation Plus:",
//         "Advanced funnel system (landing + booking + sales page)",
//         "Retargeting setup",
//         "Email + WhatsApp automation sequences",
//         "CRM integration to track leads",
//         "20-35 short-form videos / month",
//         "15-17 branded posts or carousels",
//         "Motion graphics & UGC-style creatives",
//         "Meta + TikTok or Google Ads management",
//         "Weekly optimization & performance reports",
//         "AI creative performance analysis",
//         "AI hook & CTA optimization",
//         "AI lead qualification & follow-ups",
//         "AI content re-purposing (1 video -> multiple assets)",
//       ],
//     },
//     {
//       title: "Authority Domination",
//       subtitle: "For brands that want to own attention in their market",
//       monthlyPrice: 9999,
//       currencySymbol: "$",
//       unit: "Starting | USD",
//       buttonText: "Get Started",
//       features: [
//         "Features",
//         "Everything in Scale System Plus:",
//         "Thought-leadership positioning strategy",
//         "Market dominance content plan",
//         "50-60 short-form videos / month",
//         "Long-form YouTube or podcast content",
//         "Premium motion graphics & visuals",
//         "Paid ads + organic growth synergy",
//         "SEO or YouTube authority strategy",
//         "Dedicated growth team:",
//         "Content strategist",
//         "Ad specialist",
//         "Creative lead",
//         "Account manager",
//         "Advanced AI Systems",
//         "AI trend & market analysis",
//         "AI personalization (emails, offers, landing pages)",
//         "AI performance dashboards (ads, content, leads, sales)",
//         "AI internal automation for faster execution",
//       ],
//     },
//   ];

//   const handleFormSubmit = () => {
//     // Basic validation
//     if (!userInfo.name || !userInfo.email || !userInfo.phone) {
//       alert("Please fill in all fields");
//       return;
//     }
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(userInfo.email)) {
//       alert("Please enter a valid email address");
//       return;
//     }
//     setShowModal(false);
//     setShowStripeCheckout(true);
//   };

//   const getPriceDisplay = (plan: Plan) => {
//     // Logic: plan.annualPrice is the ANNUAL price.
//     // If billing Annual: Show full price.
//     // If billing Monthly: Show price / 12.
//     // We will round up to nearest integer for clean display.
//     const price =
//       billingType === "Annual"
//         ? Math.round(plan.monthlyPrice * 12 * 0.85)
//         : plan.monthlyPrice;

//     return `${plan.currencySymbol}${price.toLocaleString()}`;
//   };

//   const activePlanDetails = () => {
//     if (selectedPlan === "Premium Annual") {
//       return {
//         title: "Premium",
//         price: "$ 25,900",
//         unit: "/year",
//         billing: "Billed Annually",
//         rawPrice: 25900,
//       };
//     }
//     const plan = plans.find((p) => p.title === selectedPlan);

//     if (!plan)
//       return {
//         title: "Premium",
//         price: "$ 25,900",
//         unit: "/year",
//         billing: "Billed Annually",
//         rawPrice: 25900,
//       };

//     const price =
//       billingType === "Annual"
//         ? Math.round(plan.monthlyPrice * 12 * 0.85)
//         : plan.monthlyPrice;

//     const unitTime = billingType === "Annual" ? "/Year" : "/Month";

//     return {
//       title: plan.title,
//       price: `${plan.currencySymbol}${price.toLocaleString()}`,
//       unit: `${plan.unit.split("|")[1] || ""} ${unitTime}`,
//       billing: billingType === "Annual" ? "Billed Annually" : "Billed Monthly",
//       rawPrice: price,
//     };
//   };

//   const activePlan = activePlanDetails();

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#b8a4ff] via-[#4C12BF] to-[#160043] font-sans pb-0 overflow-x-hidden">
//       {/* Header Section */}
//       <motion.div
//         initial={{ opacity: 0, y: -30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         className="md:px-12 lg:px-20"
//       >
//         <div className="min-h-screen">
//           <div className="max-w-7xl mx-auto px-6 pt-20">
//             <h1 className="text-6xl md:text-7xl font-bold tracking-loose">
//               Pricing
//             </h1>
//           </div>
//         </div>

//         <div className="flex items-center gap-4 mb-4 px-4 md:px-0">
//           <div className="w-8 h-1 bg-[#D3CEE8]"></div>
//           <span className="text-yellow-400 font-bold text-lg tracking-wider uppercase">
//             Pricing or Offers
//           </span>
//         </div>

//         <h2 className="text-white text-xl md:text-5xl xl:text-6xl leading-tight font-Achivo px-4 md:px-0">
//           Best things are premium
//         </h2>

//         {/* Toggle */}
//         <div className="flex justify-center my-16 md:my-20">
//           <div className="bg-[#4C12BF] p-1.5 rounded-2xl inline-flex items-center border border-[#FED65E] shadow-lg">
//             <button
//               onClick={() => setBillingType("Annual")}
//               className={`px-8 py-2.5 rounded-xl font-bold transition-all text-md tracking-wide duration-300 ${
//                 billingType === "Annual"
//                   ? "bg-white text-[#4C12BF] shadow-md"
//                   : "text-white hover:text-white/80"
//               }`}
//             >
//               Annual
//             </button>
//             <button
//               onClick={() => setBillingType("Monthly")}
//               className={`px-8 py-2.5 rounded-xl font-bold transition-all text-md tracking-wide duration-300 ${
//                 billingType === "Monthly"
//                   ? "bg-white text-[#4C12BF] shadow-md"
//                   : "text-white hover:text-white/80"
//               }`}
//             >
//               Monthly
//             </button>
//           </div>
//         </div>

//         {/* Cards Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-start pb-10 md:pb-16 px-4">
//           {plans.map((plan, index) => (
//             <div key={plan.title} className="flex flex-col gap-4 group">
//               {/* TOP CARD: Pricing Info */}
//               <motion.div
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: "-50px" }}
//                 transition={{
//                   duration: 0.6,
//                   delay: index * 0.15,
//                   ease: "easeOut",
//                 }}
//                 whileHover={{
//                   scale: 1.03,
//                   transition: { duration: 0.3, ease: "easeOut" },
//                 }}
//                 onClick={() => setSelectedPlan(plan.title)}
//                 className={`flex flex-col rounded-3xl p-8 backdrop-blur-sm transition-all duration-300 relative ${
//                   selectedPlan === plan.title
//                     ? "bg-[#4C12BF] hover:bg-[#280a6b]"
//                     : "bg-[#4C12BF] hover:bg-[#280a6b]"
//                 }`}
//               >
//                 {plan.isPopular && (
//                   <div className="absolute top-0 right-0 rounded-tr-3xl bg-[#FED65E] text-[#4C12BF] text-sm font-bold px-8 py-2 z-10 whitespace-nowrap rounded-bl-3xl shadow-md">
//                     Most Popular
//                   </div>
//                 )}

//                 <div className="flex justify-between items-start mb-4 mt-2">
//                   <h3 className="md:text-4xl text-2xl font-bold text-yellow-400 leading-tight font-Inter">
//                     {plan.title}
//                   </h3>

//                   {/* Radio Button */}
//                   <div className="w-6 h-6 rounded-full border border-white/50 flex items-center justify-center flex-shrink-0 transition-all duration-300">
//                     <motion.div
//                       initial={false}
//                       animate={{
//                         scale: selectedPlan === plan.title ? 1 : 0,
//                         opacity: selectedPlan === plan.title ? 1 : 0,
//                       }}
//                       className={`w-3 h-3 rounded-full bg-yellow-400 ${
//                         // If not selected, show on hover
//                         selectedPlan !== plan.title
//                           ? "group-hover:opacity-100 group-hover:scale-100 opacity-0 scale-0"
//                           : ""
//                       } transition-transform duration-300 ease-out`}
//                     />
//                   </div>
//                 </div>

//                 <p className="text-white/80 text-sm">{plan.subtitle}</p>

//                 <div className="mb-2">
//                   {/* Animated Price Change */}
//                   <AnimatePresence mode="wait">
//                     <motion.span
//                       key={billingType}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       transition={{ duration: 0.2 }}
//                       className="text-5xl font-bold text-yellow-400 font-sans block"
//                     >
//                       {getPriceDisplay(plan)}
//                       {billingType === "Annual" && (
//                         <span className="text-sm font-bold text-white/70 ml-3 bg-white/10 px-2 py-1 rounded-lg align-middle">
//                           Save 15%
//                         </span>
//                       )}
//                     </motion.span>
//                   </AnimatePresence>
//                 </div>
//                 <p className="text-white/60 text-xs mb-8 uppercase tracking-wider">
//                   {plan.unit} / {billingType === "Annual" ? "Year" : "Month"}
//                 </p>

//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setSelectedPlan(plan.title);
//                     setShowModal(true);
//                   }}
//                   className={`w-full py-4 rounded-full font-bold transition-all duration-300 active:scale-95 mt-auto border ${
//                     plan.isPopular
//                       ? "bg-[#FED65E] text-[#4C12BF] border-[#FED65E] hover:bg-[#ffe187] shadow-lg hover:shadow-xl cursor-pointer"
//                       : index === 2
//                         ? "bg-gradient-to-b from-[#4C12BF] to-[#FED65E] text-white border-white/20 hover:opacity-90 shadow-lg hover:shadow-xl cursor-pointer"
//                         : "bg-white/10 text-white border-white hover:bg-white/20 backdrop-blur-md cursor-pointer"
//                   }`}
//                 >
//                   {plan.buttonText}
//                 </button>
//               </motion.div>

//               {/* BOTTOM CARD: Features */}
//               <motion.div
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: "-50px" }}
//                 transition={{
//                   duration: 0.6,
//                   delay: index * 0.15 + 0.1,
//                   ease: "easeOut",
//                 }}
//                 whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
//                 onClick={() => setSelectedPlan(plan.title)}
//                 className={`rounded-3xl p-8 backdrop-blur-sm border border-white/5 cursor-pointer transition-colors duration-300 ${
//                   selectedPlan === plan.title
//                     ? "bg-[#340d87]"
//                     : "bg-[#340d87] hover:bg-[#280a6b]"
//                 }`}
//               >
//                 <div className="space-y-4">
//                   {plan.features.map((feature, i) => (
//                     <div key={i} className={`flex items-start gap-3`}>
//                       {feature === "Features" ? (
//                         <span className="text-white text-base font-bold uppercase mb-2 block">
//                           Features
//                         </span>
//                       ) : feature.includes("Everything in") ||
//                         feature.includes("Advanced AI Systems") ||
//                         feature.includes("Dedicated growth team") ? (
//                         <span className="text-white/90 text-sm font-bold mt-2 block w-full">
//                           {feature}
//                         </span>
//                       ) : (
//                         <>
//                           <div className="mt-1 min-w-[16px]">
//                             <div className="w-4 h-4 rounded-full bg-[#FED65E] flex items-center justify-center shadow-sm">
//                               <svg
//                                 viewBox="0 0 24 24"
//                                 className="w-3 h-3 text-[#4C12BF]"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="4"
//                               >
//                                 <polyline points="20 6 9 17 4 12" />
//                               </svg>
//                             </div>
//                           </div>
//                           <span className="text-white/80 text-sm leading-snug">
//                             {feature}
//                           </span>
//                         </>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>
//             </div>
//           ))}
//         </div>
//       </motion.div>

//       {/* Bottom Bar Section Section */}
//       <motion.div
//         initial={{ y: 100 }}
//         animate={{ y: 0 }}
//         transition={{ type: "spring", stiffness: 100, damping: 20 }}
//         className="bg-[#2E027F] border-t border-white/10 w-full z-20 py-8 sticky bottom-0 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]"
//       >
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 text-center md:text-left">
//             <motion.span
//               key={activePlan.title}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.3 }}
//               className="text-white font-bold text-xl md:w-1/3"
//             >
//               {activePlan.title}
//             </motion.span>

//             <div className="flex items-baseline gap-2 justify-center md:w-1/3">
//               <motion.span
//                 key={activePlan.price}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.3 }}
//                 className="text-5xl font-bold text-white tracking-tight"
//               >
//                 {activePlan.price}
//               </motion.span>
//               <span className="text-white font-bold text-lg">
//                 {activePlan.unit}
//               </span>
//             </div>

//             <div className="md:w-1/3 text-right">
//               <span className="text-white font-extrabold text-sm uppercase tracking-wide">
//                 {activePlan.billing}
//               </span>
//             </div>
//           </div>

//           <button
//             onClick={() => {
//               setShowModal(true);
//             }}
//             className="w-full bg-[#FED65E] text-[#2E027F] py-4 rounded-full font-bold text-lg hover:bg-[#ffe187] transition-all transform hover:scale-[1.01] shadow-lg active:scale-95"
//           >
//             Subscribe & Pay
//           </button>
//         </div>
//       </motion.div>

//       {/* MODAL & CHECKOUT logic remains same, just wrapping presence if wanted, but standard react conditional is fine */}
//       {showModal && !showStripeCheckout && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4 backdrop-blur-md">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             transition={{ type: "spring", duration: 0.5 }}
//             className="bg-gradient-to-b from-[#4C12BF] to-[#160043] rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/10"
//           >
//             {/* ... Modal Content ... */}
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold text-white text-center">
//                 User Information
//               </h2>
//               <button
//                 onClick={() => {
//                   setShowModal(false);
//                   setShowStripeCheckout(false);
//                 }}
//                 className="text-white/70 hover:text-white transition-colors"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-white/90 mb-2">
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   value={userInfo.name}
//                   onChange={(e) =>
//                     setUserInfo({ ...userInfo, name: e.target.value })
//                   }
//                   className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                   placeholder="John Doe"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-white/90 mb-2">
//                   Email Address *
//                 </label>
//                 <input
//                   type="email"
//                   value={userInfo.email}
//                   onChange={(e) =>
//                     setUserInfo({ ...userInfo, email: e.target.value })
//                   }
//                   className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                   placeholder="john@example.com"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-white/90 mb-2">
//                   Phone Number *
//                 </label>
//                 <input
//                   type="tel"
//                   value={userInfo.phone}
//                   onChange={(e) =>
//                     setUserInfo({ ...userInfo, phone: e.target.value })
//                   }
//                   className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                   placeholder="+234 800 000 0000"
//                 />
//               </div>

//               <div className="bg-white/5 rounded-xl p-4 mt-6 border border-white/10">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-white/80">Plan:</span>
//                   <span className="font-semibold text-yellow-400">
//                     {activePlan.title}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-white/80">Billing:</span>
//                   <span className="font-semibold text-yellow-400">
//                     {activePlan.billing}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-white/80">Total:</span>
//                   <span className="font-bold text-yellow-400">
//                     {activePlan.price}
//                   </span>
//                 </div>
//               </div>

//               <button
//                 onClick={handleFormSubmit}
//                 className="w-full bg-[#FED65E] text-[#4C12BF] font-bold
//                 text-lg py-4 rounded-xl hover:bg-yellow-300 transition-all duration-300 hover:scale-[1.02] shadow-lg mt-6"
//               >
//                 Proceed to Payment
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}

//       {showStripeCheckout && (
//         <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4 backdrop-blur-md">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-[#1a0b38] rounded-3xl p-1 max-w-md w-full shadow-2xl overflow-hidden border border-white/10"
//           >
//             {/* Same Stripe Checkout UI */}
//             <div className="bg-[#2a1255] px-6 py-4 flex justify-between items-center">
//               <h2 className="text-xl font-bold text-white">Secure Checkout</h2>
//               <button
//                 onClick={() => {
//                   setShowStripeCheckout(false);
//                   setShowModal(false);
//                 }}
//                 className="text-white/60 hover:text-white transition-colors"
//               >
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>
//             <div className="p-6">
//               <StripeCheckout
//                 amount={
//                   // Stripe expects integer cents if currency is USD?
//                   // If current logic was 25900 (Stripe expects lower denomination usually?)
//                   // Wait, "25,900" string usually means 25900.00
//                   // If Stripe expects cents, it should be 2590000.
//                   // The previous code had `25900`.
//                   // If currency is NGN, 25900 is small.
//                   // I will assume the `parsePrice` cleans it to integer.
//                   // I will stick to the activePlan.rawPrice logic.
//                   activePlan.rawPrice || 0
//                 }
//                 email={userInfo.email}
//                 name={userInfo.name}
//                 phone={userInfo.phone}
//                 planName={selectedPlan}
//                 billingType={billingType}
//                 onSuccess={() => {
//                   alert(
//                     `Payment successful! Receipt sent to ${userInfo.email}`,
//                   );
//                   setShowStripeCheckout(false);
//                   setShowModal(false);
//                   setUserInfo({ name: "", email: "", phone: "" });
//                 }}
//                 onCancel={() => {
//                   setShowStripeCheckout(false);
//                   setShowModal(true);
//                 }}
//               />
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PricingPage;
