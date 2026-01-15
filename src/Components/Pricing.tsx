"use client";
import type React from "react";
import { useState, useEffect } from "react";
import PaymentGateway from "./PaymentGateway";
import StripeCheckout from "./StripeCheckout";
import { convertNGNToUSD, selectPaymentGateway } from "../utils/paymentUtils";

interface Plan {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  deliverables: number;
}

interface PaystackResponse {
  reference: string;
  status: string;
  trans: string;
  transaction: string;
  trxref: string;
}

interface PaystackHandler {
  openIframe: () => void;
}

interface PaystackConfig {
  key: string;
  email: string;
  amount: number;
  currency: string;
  ref: string;
  metadata?: {
    custom_fields: Array<{
      display_name: string;
      variable_name: string;
      value: string;
    }>;
  };
  onClose: () => void;
  callback: (response: PaystackResponse) => void;
}

declare global {
  interface Window {
    PaystackPop?: {
      setup: (config: PaystackConfig) => PaystackHandler | undefined;
    };
  }
}

interface ImportMetaEnv {
  VITE_PAYSTACK_PUBLIC_KEY?: string;
  VITE_PAYSTACK_CURRENCY?: string;
  VITE_STRIPE_PUBLIC_KEY?: string;
  VITE_API_URL?: string;
}

const PricingPage: React.FC = () => {
  const [billingType, setBillingType] = useState<"Annual" | "Monthly">(
    "Annual"
  );
  const [selectedPlan, setSelectedPlan] = useState<string>("Premium");
  const [currency, setCurrency] = useState<"NGN" | "USD">("NGN");
  const [showModal, setShowModal] = useState(false);
  const [showStripeCheckout, setShowStripeCheckout] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  // const [exchangeRate] = useState(1474.5); // Exchange rate NGN to USD
  const [exchangeRate, setExchangeRate] = useState<number>(1474.5); // Exchange rate: 1 USD = 1474.5 NGN

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          "https://api.exchangerate.host/latest?base=USD&symbols=NGN"
        );
        const data = await response.json();

        if (data?.rates?.NGN) {
          setExchangeRate(data.rates.NGN); // NGN per USD
        }
      } catch (error) {
        console.error("Exchange rate fetch failed, using fallback.", error);
        setExchangeRate(1474.5); // fallback rate
      }
    };

    fetchExchangeRate();
  }, []);

  const plans: Record<string, Plan> = {
    Basic: {
      name: "Basic Plan",
      monthlyPrice: 30000,
      annualPrice: 360000,
      features: [
        "Basic Video Editing",
        "Simple motion graphics",
        "Animated Texts",
        "Social Media Cuts",
        "100 short-form videos",
        "1 Iman Gadzi Style Edits",
        "(Reels, TikToks, Shorts)",
      ],
      deliverables: 100,
    },
    Premium: {
      name: "Premium Plan",
      monthlyPrice: 60000,
      annualPrice: 720000,
      features: [
        "Everything in Basic, and",
        "Advanced Video Editing/ AI Videos",
        "Branded Content/Motion Graphics",
        "50 AI Advert Videos",
        "15 Explainer Videos",
        "5 Iman Gadzi Style Edits",
        "125 Short-form Videos",
      ],
      deliverables: 200,
    },
    "Premium+ Plan": {
      name: "Premium+ Plan",
      monthlyPrice: 90000,
      annualPrice: 1080000,
      features: [
        "Everything in Premium plan, and",
        "High-End Commercial Work",
        "Strategic Video Content",
        "Priority Services",
        "5 Explainer Videos",
        "15 Iman Gadzi Style Edits",
        "200 Short-form Videos",
      ],
      deliverables: 400,
    },
  };
  useEffect(() => {
    if (!window.PaystackPop) {
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const getEnvVar = (key: string, defaultValue: string): string => {
    return import.meta.env[key as keyof ImportMetaEnv] || defaultValue;
  };

  const getSelectedPlanTotal = () => {
    if (billingType === "Annual") {
      return plans[selectedPlan].annualPrice;
    } else {
      return plans[selectedPlan].monthlyPrice;
    }
  };

  const payWithPaystack = () => {
    if (currency !== "NGN") {
      alert("Paystack only accepts Nigerian Naira (NGN). Please select Naira.");
      return;
    }

    const publicKey = getEnvVar(
      "VITE_PAYSTACK_PUBLIC_KEY",
      "pk_test_3a00e1ea19de19eed59d846a1b2b65f799609fb6"
    );

    if (!publicKey || publicKey.includes("replace")) {
      alert(
        "Paystack public key not set. Put VITE_PAYSTACK_PUBLIC_KEY in your .env"
      );
      return;
    }

    const { name, email, phone } = userInfo;
    const rawAmount = getSelectedPlanTotal();
    const amount = Math.round(rawAmount * 100);

    const handler = window.PaystackPop?.setup({
      key: publicKey,
      email,
      amount,
      currency: "NGN",
      ref: `titan-${Date.now()}`,
      metadata: {
        custom_fields: [
          {
            display_name: "Customer Name",
            variable_name: "customer_name",
            value: name,
          },
          {
            display_name: "Phone Number",
            variable_name: "phone_number",
            value: phone,
          },
          {
            display_name: "Plan",
            variable_name: "plan",
            value: selectedPlan,
          },
          {
            display_name: "Billing Type",
            variable_name: "billing_type",
            value: billingType,
          },
        ],
      },
      onClose: function () {
        alert("Payment window closed.");
      },
      callback: function (response: PaystackResponse) {
        alert(
          `Payment successful! Reference: ${response.reference}\nReceipt sent to ${email}`
        );
        setShowModal(false);
        setUserInfo({ name: "", email: "", phone: "" });
      },
    });

    if (!handler) {
      alert("Paystack script not loaded yet. Please try again in a moment.");
      return;
    }

    handler.openIframe();
  };

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

    if (userInfo.phone.length < 10) {
      alert("Please enter a valid phone number");
      return;
    }

    const gateway = selectPaymentGateway(currency);

    if (gateway === "paystack") {
      payWithPaystack();
    } else if (gateway === "stripe") {
      setShowModal(false);
      setShowStripeCheckout(true);
    }
  };

  return (
    <div className="md:min-h-screen bg-gradient-to-t from-[#160043] to-[#4C12BF] text-white xl:pt-20 pt-20">
      <div className="mb-16 xl:px-22 md:px-10 px-5">
        <div className="flex items-center mb-4">
          <div className="w-10 h-1 bg-yellow-400 mr-4"></div>
          <span className="text-[#FED65E] font-semibold text-lg tracking-wider">
            Pricing or Offers
          </span>
        </div>
        <h1 className="text-xl md:text-5xl xl:text-6xl font-Achivo text-[#FFFFFF] text-left">
          Best things are premium
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <PaymentGateway currency={currency} onCurrencyChange={setCurrency} />

        <div className="text-center mb-12 mt-8">
          <div className="inline-flex bg-[#4C12BF] rounded-2xl p-1 backdrop-blur-sm border font-bold">
            <button
              onClick={() => setBillingType("Annual")}
              className={`px-6 py-2 rounded-xl transition-all ${
                billingType === "Annual"
                  ? "bg-white text-purple-700 font-medium"
                  : "text-white"
              }`}
            >
              Annual
            </button>
            <button
              onClick={() => setBillingType("Monthly")}
              className={`px-6 py-2 rounded-2xl transition-all ${
                billingType === "Monthly"
                  ? "bg-white text-purple-700 font-medium"
                  : "text-white"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {Object.entries(plans).map(([key, plan]) => (
            <div
              key={key}
              onClick={() => setSelectedPlan(key)}
              className={`relative bg-[#4C12BF] backdrop-blur-sm rounded-2xl p-8 cursor-pointer transition-all duration-300 
                hover:bg-gradient-to-t from-[#160043] to-[#4C12BF] hover:scale-105 hover:shadow-2xl hover:-translate-y-2 ${
                  selectedPlan === key
                    ? "ring-2 ring-yellow-400 bg-gradient-to-t from-[#160043] to-[#4C12BF]"
                    : ""
                }`}
            >
              <div className="absolute top-6 right-6">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedPlan === key
                      ? "border-yellow-400 bg-yellow-400"
                      : "border-white/50"
                  }`}
                >
                  {selectedPlan === key && (
                    <svg
                      className="w-3 h-3 text-purple-700"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-yellow-400">
                {plan.name}
              </h3>

              <div className="mb-6">
                <span className="text-4xl font-bold text-yellow-400">
                  {currency === "USD"
                    ? `$${convertNGNToUSD(
                        billingType === "Annual"
                          ? plan.annualPrice / 12
                          : plan.monthlyPrice,
                        1 / exchangeRate
                      ).toFixed(2)}`
                    : `₦${(billingType === "Annual"
                        ? Math.round(plan.annualPrice / 12)
                        : plan.monthlyPrice
                      ).toLocaleString()}`}
                </span>
                <span className="text-lg ml-2 font-bold">/month</span>
                <div className="text-md font-bold text-white/80 pt-1">
                  {billingType === "Annual"
                    ? currency === "USD"
                      ? `$${convertNGNToUSD(
                          plan.annualPrice,
                          1 / exchangeRate
                        ).toFixed(2)} billed annually`
                      : `₦${plan.annualPrice.toLocaleString()} billed annually`
                    : currency === "USD"
                    ? `$${convertNGNToUSD(
                        plan.monthlyPrice,
                        1 / exchangeRate
                      ).toFixed(2)} billed monthly`
                    : `₦${plan.monthlyPrice.toLocaleString()} billed monthly`}
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    {feature.startsWith("Everything") ? (
                      <span className="text-sm">{feature}</span>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5 text-[#FFFFFF] mr-3 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm">{feature}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>

              <div className="border-t border-white/20 pt-6 flex gap-5 items-center">
                <div className="text-4xl font-bold">{plan.deliverables}</div>
                <div className="text-sm text-white/80 font-bold font-Achivo items-center">
                  Video{plan.deliverables !== 1 ? "s" : ""} <br></br>{" "}
                  Deliverables
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedPlan(key);
                  setShowModal(true);
                }}
                className="w-full mt-6 bg-[#FED65E] text-[#4C12BF] font-bold py-3 rounded-lg hover:bg-yellow-300 transition-all duration-300 hover:scale-105"
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>

      {showModal && !showStripeCheckout && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-gradient-to-b from-[#4C12BF] to-[#160043] rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="md:text-2xl text-xl font-bold text-white text-center">
                Complete Your Purchase
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
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="+234 800 000 0000"
                />
              </div>

              <div className="bg-white/5 rounded-lg p-4 mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/80">Plan:</span>
                  <span className="font-semibold text-yellow-400">
                    {selectedPlan}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/80">Payment Method:</span>
                  <span className="font-semibold text-yellow-400">
                    {currency === "NGN" ? "Paystack" : "Stripe"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Total:</span>
                  <span className="text-2xl font-bold text-yellow-400">
                    {currency === "USD"
                      ? `$${convertNGNToUSD(
                          getSelectedPlanTotal(),
                          1 / exchangeRate
                        ).toFixed(2)}`
                      : `₦${getSelectedPlanTotal().toLocaleString()}`}
                  </span>
                </div>
                <div className="text-md font-bold text-white/60 text-right">
                  Billed {billingType === "Annual" ? "Annually" : "Monthly"}
                </div>
              </div>

              <button
                onClick={handleFormSubmit}
                className="w-full bg-[#FED65E] text-[#4C12BF] font-bold 
                text-lg py-4 rounded-lg hover:bg-yellow-300 transition-all duration-300 hover:scale-105 shadow-lg mt-6"
              >
                Proceed to {currency === "NGN" ? "Paystack" : "Stripe"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showStripeCheckout && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-gradient-to-b from-[#4C12BF] to-[#160043] rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Stripe Checkout</h2>
              <button
                onClick={() => {
                  setShowStripeCheckout(false);
                  setShowModal(false);
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

            <StripeCheckout
              amount={getSelectedPlanTotal()}
              email={userInfo.email}
              name={userInfo.name}
              phone={userInfo.phone}
              planName={selectedPlan}
              billingType={billingType}
              onSuccess={() => {
                alert(`Payment successful! Receipt sent to ${userInfo.email}`);
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
        </div>
      )}
    </div>
  );
};

export default PricingPage;
