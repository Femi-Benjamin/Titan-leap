"use client";
import type React from "react";
import { useState } from "react";
import StripeCheckout from "./StripeCheckout";
import { motion, AnimatePresence } from "framer-motion";
import gift from "../assets/gift.png";
import AuditModal from "./AuditModal";
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
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [expandedFeatures, setExpandedFeatures] = useState(false);
  const [expandedCards, setExpandedCards] = useState<{
    [key: string]: boolean;
  }>({});
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

  const toggleCardExpansion = (planTitle: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [planTitle]: !prev[planTitle],
    }));
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
  type TableValue = boolean | "optional";

  type TableRow = {
    feature: string;
    isHeader?: boolean;
    f1: TableValue;
    f2: TableValue;
    f3: TableValue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4B11BF] via-[#4C12BF] to-[#170044] font-sans pb-0 overflow-x-hidden">
      {/* Header Section */}
      {/* <div className="lg:min-h-screen py-12 md:py-0 flex flex-col justify-end bg-[#1a0b3c]">
        <div className="max-w-7xl px-6 md:px-16 md:py-0 py-24">
          <h1 className="text-7xl md:text-[200px] xl:text-[300px] md:text-left text-center tracking-loose align-text-bottom text-white leading-loose font-medium">
            Pricing
          </h1>
        </div>
      </div> */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="md:px-12 lg:px-20"
      >
        <div className="flex items-center gap-4 mb-20 px-4 md:px-0">
          <div className="w-8 h-1 bg-[#D3CEE8]"></div>
          <span className="text-yellow-400 font-bold text-xl tracking-wider">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-start pb-10 md:pb-0 px-4">
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
                className={`rounded-3xl p-8 backdrop-blur-md cursor-pointer transition-colors duration-300 relative ${
                  selectedPlan === plan.title
                    ? "bg-[#340d87]"
                    : "bg-[#340d87] hover:bg-[#340d87]"
                }`}
              >
                <div
                  className={`space-y-4 transition-all duration-500 ${
                    window.innerWidth < 768
                      ? expandedCards[plan.title]
                        ? "max-h-[2000px]"
                        : "max-h-[280px] overflow-hidden"
                      : expandedFeatures
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

                {/* Mobile Expand/Collapse Button */}
                <div className="md:hidden mt-4 flex justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCardExpansion(plan.title);
                    }}
                    className="text-[#FED65E] text-xs font-medium flex items-center gap-2 hover:text-yellow-300 transition-colors"
                  >
                    {expandedCards[plan.title] ? "Show less" : "Show more"}
                    <svg
                      className={`w-3 h-3 transition-transform duration-300 ${
                        expandedCards[plan.title] ? "rotate-180" : ""
                      }`}
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
                  </button>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Centered Click to Scroll Down Button */}
        <div className="relative z-30 hidden md:block">
          {/* Background Blur Layer with Fade Mask */}
          <div
            className="absolute inset-0 backdrop-blur-7xl backdrop z-30 w-full"
            style={{
              maskImage: "linear-gradient(to top, black 50%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to top, black 50%, transparent 100%)",
            }}
          />

          <div className="flex justify-center pt-3 pb-7 relative z-40">
            {!expandedFeatures ? (
              <motion.button
                onClick={toggleFeatureExpansion}
                className="text-[#FED65E] md:text-md text-sm cursor-pointer font-medium flex items-center justify-center gap-1 hover:text-yellow-300 transition-colors"
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
                className="text-[#FED65E] text-sm font-medium cursor-pointer flex items-center justify-center gap-2 hover:text-yellow-300 transition-colors px-6 py-3"
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
        </div>
      </motion.div>

      {/* Bottom Bar Section */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="bg-[#2E027F]  w-full z-20 py-8 md:py-10 sticky bottom-0 shadow[0_-10px_40px_rgba(0,0,0,0.3)]"
      >
        <div className="max-w-7xl mx-auto md:px-0 px-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 text-center md:text-left">
            <motion.span
              key={activePlan.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="text-white font-bold text-sm md:w-1/3 uppercase"
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
              <span className="text-white font-bold text-sm md:w-1/3 uppercase">
                {activePlan.billing}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setShowModal(true);
            }}
            className="w-full bg-[#FED65E] text-[#4C12BF] py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-[1.01] shadow-lg active:scale-95 font-Achivo"
          >
            Subscribe & Pay
          </button>
        </div>
      </motion.div>

      {/* Gift Section */}
      <div className="bg-[#170044] pt-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          {/* Gift Image - positioned with bottom hidden, top visible */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            whileInView={{ scale: 1, opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute top-3 left-1/2 transform -translate-x-1/2 z-10 translate-y-[-60%] md:translate-y-[-65%]"
          >
            <div className="w-32 h-32 md:w-40 md:h-40">
              <div className="w-full h-full bg-contain bg-no-repeat bg-center">
                {/* Gift Box SVG */}
                <img src={gift} alt="giftbox" />
              </div>
            </div>
          </motion.div>

          {/* Purple rounded container */}
          <div className="bg-gradient-to-b from-[#4B11BF] to-[#170044] rounded-tr-4xl rounded-tl-4xl px-8 md:px-16 pt-7 md:pb-16 pb-10 relative overflow-hidden z-10 font-Achivo">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center items-center justify-center"
            >
              <h2 className="text-xl md:text-3xl lg:text-5xl text-white leading-tight pb-5">
                Get a free Growth Readiness Audit
              </h2>
              <p className="text-[#FED65E] text-xl md:text-2xl max-w-6xl mx-auto pb-15">
                Get a free Growth Readiness Audit and see exactly what's holding
                your business back.
              </p>

              <motion.button
                onClick={() => setShowAuditModal(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#FED65E] text-[#4C12BF] py-4 rounded-2xl text-lg transition-all transform hover:scale-[1.01] shadow-lg active:scale-95"
              >
                <span className="">👉 </span>
                <span>Get My Free Audit</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-t from-[#4B11BF] to-[#170044]">
        <h3 className="text-white text-md md:text-xl py-8 md:px-32 px-5 items-center font-Achivo relative">
          Key Features
        </h3>
      </div>
      {/* Key Features Section */}
      <div className="pb-20 bg-white">
        <div className="max-w-7xl mx-auto md:px-0 px-5">
          {/* Features Comparison Table */}

          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                {(
                  [
                    {
                      feature: "Strategy & Positioning",
                      f1: true,
                      f2: true,
                      f3: true,
                    },
                    { feature: "Funnel Setup", f1: true, f2: true, f3: true },
                    {
                      feature: "Monthly Content",
                      f1: true,
                      f2: true,
                      f3: true,
                    },
                    {
                      feature: "Paid Ads Management",
                      f1: "optional",
                      f2: true,
                      f3: true,
                    },
                    {
                      feature: "Social Media Management",
                      f1: true,
                      f2: true,
                      f3: true,
                    },
                    {
                      feature: "AI Content Optimization",
                      f1: true,
                      f2: true,
                      f3: true,
                    },
                    {
                      feature: "AI Lead Automation",
                      f1: false,
                      f2: true,
                      f3: true,
                    },
                    { feature: "Re-targeting", f1: false, f2: true, f3: true },
                    {
                      feature: "Thought Leadership Strategy",
                      f1: false,
                      f2: true,
                      f3: true,
                    },
                    {
                      feature: "AI Built In",
                      isHeader: true,
                      f1: false,
                      f2: false,
                      f3: false,
                    },
                    {
                      feature: "AI creative performance analysis",
                      f1: true,
                      f2: true,
                      f3: true,
                    },
                    {
                      feature: "AI hook & CTA optimization",
                      f1: false,
                      f2: true,
                      f3: true,
                    },
                    {
                      feature: "AI lead qualification & follow-ups",
                      f1: false,
                      f2: true,
                      f3: true,
                    },
                    {
                      feature:
                        "AI content repurposing (1 video → multiple assets)",
                      f1: false,
                      f2: true,
                      f3: true,
                    },
                    {
                      feature:
                        "AI performance dashboards (ads, content, leads, sales)",
                      f1: false,
                      f2: false,
                      f3: true,
                    },
                    {
                      feature: "Dedicated growth team",
                      isHeader: true,
                      f1: false,
                      f2: false,
                      f3: false,
                    },
                  ] as TableRow[]
                ).map((row, idx) => (
                  <tr
                    key={idx}
                    className={`${row.isHeader ? "border-b-2 border-[#D9D9D9]" : "border-b border-white/10 hover:bg-white/[0.03]"} transition-colors`}
                  >
                    <td
                      className={`text-left py-6 text-sm md:text-base font-medium ${row.isHeader ? "text-black font-bold uppercase text-xs" : "text-gray-600"}`}
                    >
                      {row.feature}
                    </td>
                    <td className="text-center py-6 px-4">
                      {!row.isHeader &&
                        (row.f1 === true ? (
                          <div className="flex justify-center">
                            <div className="w-6 h-6 rounded-full bg-[#4C12BF] flex items-center justify-center shadow-md border">
                              <svg
                                viewBox="0 0 24 24"
                                className="w-3.5 h-3.5 text-white"
                                fill="currentColor"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                          </div>
                        ) : row.f1 === "optional" ? (
                          <span className="text-[#4C12BF] text-sm font-semibold">
                            Optional
                          </span>
                        ) : (
                          <span className="text-black text-3xl leading-none">
                            −
                          </span>
                        ))}
                    </td>
                    <td className="text-center py-6 px-4">
                      {!row.isHeader &&
                        (row.f2 === true ? (
                          <div className="flex justify-center">
                            <div className="w-6 h-6 rounded-full bg-[#4C12BF] flex items-center justify-center shadow-md">
                              <svg
                                viewBox="0 0 24 24"
                                className="w-3.5 h-3.5 text-white"
                                fill="currentColor"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                          </div>
                        ) : row.f2 === "optional" ? (
                          <span className="text-[#FED65E] text-sm font-semibold">
                            Optional
                          </span>
                        ) : (
                          <span className="text-black text-3xl leading-none">
                            −
                          </span>
                        ))}
                    </td>
                    <td className="text-center py-6 px-4">
                      {!row.isHeader &&
                        (row.f3 === true ? (
                          <div className="flex justify-center">
                            <div className="w-6 h-6 rounded-full bg-[#4C12BF] flex items-center justify-center shadow-md">
                              <svg
                                viewBox="0 0 24 24"
                                className="w-3.5 h-3.5 text-white"
                                fill="currentColor"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                          </div>
                        ) : row.f3 === "optional" ? (
                          <span className="text-[#FED65E] text-sm font-semibold">
                            Optional
                          </span>
                        ) : (
                          <span className="text-black text-3xl leading-none">
                            −
                          </span>
                        ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
                  placeholder="Your Name"
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

      {/* Audit Modal */}
      <AuditModal
        isOpen={showAuditModal}
        onClose={() => setShowAuditModal(false)}
      />
    </div>
  );
};

export default PricingPage;
