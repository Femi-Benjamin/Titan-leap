// "use client";
// import type React from "react";
// import { useState, useEffect } from "react";

// interface Plan {
//   name: string;
//   monthlyPrice: number;
//   annualPrice: number;
//   features: string[];
//   deliverables: number;
// }

// const PricingPage: React.FC = () => {
//   const [billingType, setBillingType] = useState<"Annual" | "Monthly">(
//     "Annual"
//   );
//   const [selectedPlan, setSelectedPlan] = useState<string>("Premium");

//   const plans: Record<string, Plan> = {
//     Basic: {
//       name: "Basic Plan",
//       monthlyPrice: 1500,
//       annualPrice: 18000,
//       features: [
//         "Basic Video Editing",
//         "Simple motion graphics",
//         "Animated Texts",
//         "Social Media Cuts",
//         "100 short-form videos",
//         "1 Iman Gadzi Style Edits",
//         "(Reels, TikToks, Shorts)",
//       ],
//       deliverables: 100,
//     },
//     Premium: {
//       name: "Premium Plan",
//       monthlyPrice: 2500,
//       annualPrice: 30000,
//       features: [
//         "Everything in Basic, and",
//         "Advanced Video Editing / AI Videos",
//         "Branded Content/Motion Graphics",
//         "50 AI Advert Videos",
//         "15 Explainer Videos",
//         "5 Iman Gadzi Style Edits",
//         "125 Short-form Videos",
//       ],
//       deliverables: 200,
//     },
//     "Premium+": {
//       name: "Premium+ Plan",
//       monthlyPrice: 5000,
//       annualPrice: 60000,
//       features: [
//         "Everything in Premium, and",
//         "High-End Commercial Work",
//         "Strategic Video Content",
//         "Priority Services",
//         "5 Explainer Videos",
//         "15 Iman Gadzi Style Edits",
//         "200 Short-form Videos",
//       ],
//       deliverables: 400,
//     },
//   };

//   const handlePlanClick = (planKey: string) => {
//     setSelectedPlan(planKey);
//   };

//   // Load Paystack inline script once on mount
//   useEffect(() => {
//     const src = "https://js.paystack.co/v1/inline.js";
//     if (!document.querySelector(`script[src=\"${src}\"]`)) {
//       const script = document.createElement("script");
//       script.src = src;
//       script.async = true;
//       document.body.appendChild(script);
//     }
//   }, []);

//   // Helper to start a Paystack transaction
//   const payWithPaystack = async () => {
//     // Recommended: set your public key in a .env file as VITE_PAYSTACK_PUBLIC_KEY
//     const publicKey = (import.meta as any).env.VITE_PAYSTACK_PUBLIC_KEY ||
//       "pk_test_3a00e1ea19de19eed59d846a1b2b65f799609fb6";

//     if (!publicKey || publicKey.includes("replace")) {
//       alert(
//         "Paystack public key not set. Put VITE_PAYSTACK_PUBLIC_KEY in your .env"
//       );
//       return;
//     }

//     // Get customer email — integrate with your auth/user state in real app
//     const email = window.prompt("Enter your email for the receipt:") || "customer@example.com";

//     // Compute amount in minor currency unit
//     const currency = (import.meta as any).env.VITE_PAYSTACK_CURRENCY || "NGN";
//     const rawAmount = getSelectedPlanTotal();

//     // Paystack expects amount in kobo (NGN) or cents for other currencies.
//     const amount = Math.round(rawAmount * 100);

//     const handler = (window as any).PaystackPop?.setup({
//       key: publicKey,
//       email,
//       amount,
//       currency,
//       ref: `titan-${Date.now()}`,
//       onClose: function () {
//         // User closed the payment modal
//         // You can show UI or log closure
//         // eslint-disable-next-line no-console
//         console.log("Payment closed");
//         alert("Payment window closed.");
//       },
//       callback: function (response: any) {
//         // Payment successful — response.reference is important
//         // IMPORTANT: verify the transaction on your server using Paystack secret key
//         // Example (client-side): POST to your verification endpoint with reference
//         // fetch(`/api/verify-payment`, { method: 'POST', body: JSON.stringify({ reference: response.reference }) })
//         //   .then(...) // handle verification
//         // For now, show success to the user
//         // eslint-disable-next-line no-console
//         console.log("Payment success", response);
//         alert("Payment successful. Reference: " + response.reference);
//       },
//     });

//     if (!handler) {
//       alert("Paystack script not loaded yet. Please try again in a moment.");
//       return;
//     }

//     handler.openIframe();
//   };

//   const getSelectedPlanTotal = () => {
//     if (billingType === "Annual") {
//       return plans[selectedPlan].annualPrice;
//     } else {
//       return plans[selectedPlan].monthlyPrice;
//     }
//   };

//   return (
//     <div className="md:min-h-screen bg-gradient-to-t from-[#160043] to-[#4C12BF] text-white pt-8">
//       {/* Header */}
//       <div className="mb-16 xl:px-22 md:px-10 px-5">
//         <div className="flex items-center mb-4">
//           <div className="w-10 h-1 bg-yellow-400 mr-4"></div>
//           <span className="text-[#FED65E] font-semibold text-lg tracking-wider">
//             Pricing or Offers
//           </span>
//         </div>
//         <h1 className="text-xl md:text-5xl xl:text-6xl font-Achivo text-[#FFFFFF] mb-8 text-left">
//           Best things are premium
//         </h1>
//       </div>
//       <div className="max-w-6xl mx-auto">
//         {/* Toggle */}
//         <div className="text-center mb-12">
//           <div className="inline-flex bg-[#4C12BF] rounded-2xl p-1 backdrop-blur-sm border font-bold">
//             <button
//               onClick={() => setBillingType("Annual")}
//               className={`px-6 py-2 rounded-2xl transition-all ${
//                 billingType === "Annual"
//                   ? "bg-white text-purple-700 font-medium"
//                   : "text-white"
//               }`}
//             >
//               Annual
//             </button>
//             <button
//               onClick={() => setBillingType("Monthly")}
//               className={`px-6 py-2 rounded-2xl transition-all ${
//                 billingType === "Monthly"
//                   ? "bg-white text-purple-700 font-medium"
//                   : "text-white "
//               }`}
//             >
//               Monthly
//             </button>
//           </div>
//         </div>

//         {/* Pricing Cards */}
//         <div className="grid md:grid-cols-3 gap-8 mb-12 xlpx22 mdpx-10 px-5">
//           {Object.entries(plans).map(([key, plan]) => (
//             <div
//               key={key}
//               onClick={() => handlePlanClick(key)}
//               className={`relative bg-[#4C12BF] backdrop-blur-sm rounded-2xl p-8 cursor-pointer transition-all duration-300 
//                 hover:bg-gradient-to-t from-[#160043] to-[#4C12BF] hover:scale-105 hover:shadow-2xl hover:-translate-y-2 ${
//                   selectedPlan === key
//                     ? "ring-2 ring-yellow-400 bg-gradient-to-t from-[#160043] to-[#4C12BF]"
//                     : ""
//                 }`}
//             >
//               {/* Radio button indicator */}
//               <div className="absolute top-6 right-6">
//                 <div
//                   className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
//                     selectedPlan === key
//                       ? "border-yellow-400 bg-yellow-400"
//                       : "border-white/50"
//                   }`}
//                 >
//                   {selectedPlan === key && (
//                     <svg
//                       className="w-3 h-3 text-purple-700"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   )}
//                 </div>
//               </div>

//               <h3 className="text-xl font-semibold mb-4 text-yellow-400">
//                 {plan.name}
//               </h3>

//               <div className="mb-6">
//                 <span className="text-4xl font-bold text-yellow-400">
//                   $
//                   {billingType === "Monthly"
//                     ? plan.monthlyPrice.toLocaleString()
//                     : plan.monthlyPrice.toLocaleString()}
//                 </span>
//                 <span className="text-lg ml-2">/month</span>
//                 <div className="text-sm text-white/80 mt-1">
//                   {billingType === "Annual"
//                     ? `$${plan.annualPrice.toLocaleString()} billed annually`
//                     : `$${plan.monthlyPrice.toLocaleString()} billed monthly`}
//                 </div>
//               </div>

//               <div className="space-y-3 mb-8">
//                 {plan.features.map((feature, index) => (
//                   <div key={index} className="flex items-start">
//                     {feature.startsWith("Everything") ? (
//                       <span className="text-sm">{feature}</span>
//                     ) : (
//                       <>
//                         <svg
//                           className="w-5 h-5 text-[#FFFFFF] mr-3 mt-0.5 flex-shrink-0"
//                           fill="currentColor"
//                           viewBox="0 0 20 20"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                         <span className="text-sm">{feature}</span>
//                       </>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               <div className="border-t border-white/20 pt-6 flex gap-5">
//                 <div className="text-4xl font-bold">{plan.deliverables}</div>
//                 <div className="text-sm text-white/80">
//                   Video
//                   <br /> Deliverables
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       {/* Summary */}
//       <div className="text-center bg-[#3D0E99] py-10 items-center">
//         <div className="flex items-center justify-evenly pb-4 text-lg ">
//           <span className="font-medium">{selectedPlan}</span>
//           <div>
//             <span className="md:text-3xl text-xl font-bold">
//               $ {getSelectedPlanTotal().toLocaleString()}
//             </span>
//             <span className="font-medium">
//               /{billingType === "Annual" ? "year" : "month"}
//             </span>
//           </div>
//           <span className="text-white font-medium">
//             Billed {billingType === "Annual" ? "Annually" : "Monthly"}
//           </span>
//         </div>

//         {/* Subscribe Button */}
//         <div className="text-center px-5">
//           <button
//             className="bg-[#FED65E] text-[#4C12BF] font-bold text-xl xl:w-[1250px] w-full py-4 
//           rounded-2xl transition-all duration-300 md:hover:scale-105 hover:scale-95 shadow-lg cursor-pointer"
//             onClick={() => payWithPaystack()}
//           >
//             Subscribe & Pay
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PricingPage;



"use client";
import type React from "react";
import { useState, useEffect } from "react";

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

const PricingPage: React.FC = () => {
  const [billingType, setBillingType] = useState<"Annual" | "Monthly">(
    "Annual"
  );
  const [selectedPlan, setSelectedPlan] = useState<string>("Premium");

  const plans: Record<string, Plan> = {
    Basic: {
      name: "Basic Plan",
      monthlyPrice: 1500,
      annualPrice: 18000,
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
      monthlyPrice: 2500,
      annualPrice: 30000,
      features: [
        "Everything in Basic, and",
        "Advanced Video Editing / AI Videos",
        "Branded Content/Motion Graphics",
        "50 AI Advert Videos",
        "15 Explainer Videos",
        "5 Iman Gadzi Style Edits",
        "125 Short-form Videos",
      ],
      deliverables: 200,
    },
    "Premium+": {
      name: "Premium+ Plan",
      monthlyPrice: 5000,
      annualPrice: 60000,
      features: [
        "Everything in Premium, and",
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

  const handlePlanClick = (planKey: string) => {
    setSelectedPlan(planKey);
  };

  // Load Paystack inline script once on mount
  useEffect(() => {
    const src = "https://js.paystack.co/v1/inline.js";
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Helper to start a Paystack transaction
  const payWithPaystack = async () => {
    // Recommended: set your public key in a .env file as VITE_PAYSTACK_PUBLIC_KEY
    const publicKey = (import.meta as Record<string, unknown>).env?.VITE_PAYSTACK_PUBLIC_KEY as string ||
      "pk_test_3a00e1ea19de19eed59d846a1b2b65f799609fb6";

    if (!publicKey || publicKey.includes("replace")) {
      alert(
        "Paystack public key not set. Put VITE_PAYSTACK_PUBLIC_KEY in your .env"
      );
      return;
    }

    // Get customer email — integrate with your auth/user state in real app
    const email = window.prompt("Enter your email for the receipt:") || "customer@example.com";

    // Compute amount in minor currency unit
    const currency = (import.meta as Record<string, unknown>).env?.VITE_PAYSTACK_CURRENCY as string || "NGN";
    const rawAmount = getSelectedPlanTotal();

    // Paystack expects amount in kobo (NGN) or cents for other currencies.
    const amount = Math.round(rawAmount * 100);

    const handler = window.PaystackPop?.setup({
      key: publicKey,
      email,
      amount,
      currency,
      ref: `titan-${Date.now()}`,
      onClose: function () {
        // User closed the payment modal
        // console.log("Payment closed");
        alert("Payment window closed.");
      },
      callback: function (response: PaystackResponse) {
        // Payment successful — response.reference is important
        // IMPORTANT: verify the transaction on your server using Paystack secret key
        // Example (client-side): POST to your verification endpoint with reference
        // fetch(`/api/verify-payment`, { method: 'POST', body: JSON.stringify({ reference: response.reference }) })
        //   .then(...) // handle verification
        // For now, show success to the user
        // console.log("Payment success", response);
        alert("Payment successful. Reference: " + response.reference);
      },
    });

    if (!handler) {
      alert("Paystack script not loaded yet. Please try again in a moment.");
      return;
    }

    handler.openIframe();
  };

  const getSelectedPlanTotal = () => {
    if (billingType === "Annual") {
      return plans[selectedPlan].annualPrice;
    } else {
      return plans[selectedPlan].monthlyPrice;
    }
  };

  return (
    <div className="md:min-h-screen bg-gradient-to-t from-[#160043] to-[#4C12BF] text-white pt-8">
      {/* Header */}
      <div className="mb-16 xl:px-22 md:px-10 px-5">
        <div className="flex items-center mb-4">
          <div className="w-10 h-1 bg-yellow-400 mr-4"></div>
          <span className="text-[#FED65E] font-semibold text-lg tracking-wider">
            Pricing or Offers
          </span>
        </div>
        <h1 className="text-xl md:text-5xl xl:text-6xl font-Achivo text-[#FFFFFF] mb-8 text-left">
          Best things are premium
        </h1>
      </div>
      <div className="max-w-6xl mx-auto">
        {/* Toggle */}
        <div className="text-center mb-12">
          <div className="inline-flex bg-[#4C12BF] rounded-2xl p-1 backdrop-blur-sm border font-bold">
            <button
              onClick={() => setBillingType("Annual")}
              className={`px-6 py-2 rounded-2xl transition-all ${
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
                  : "text-white "
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 xlpx22 mdpx-10 px-5">
          {Object.entries(plans).map(([key, plan]) => (
            <div
              key={key}
              onClick={() => handlePlanClick(key)}
              className={`relative bg-[#4C12BF] backdrop-blur-sm rounded-2xl p-8 cursor-pointer transition-all duration-300 
                hover:bg-gradient-to-t from-[#160043] to-[#4C12BF] hover:scale-105 hover:shadow-2xl hover:-translate-y-2 ${
                  selectedPlan === key
                    ? "ring-2 ring-yellow-400 bg-gradient-to-t from-[#160043] to-[#4C12BF]"
                    : ""
                }`}
            >
              {/* Radio button indicator */}
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
                  $
                  {billingType === "Monthly"
                    ? plan.monthlyPrice.toLocaleString()
                    : plan.monthlyPrice.toLocaleString()}
                </span>
                <span className="text-lg ml-2">/month</span>
                <div className="text-sm text-white/80 mt-1">
                  {billingType === "Annual"
                    ? `$${plan.annualPrice.toLocaleString()} billed annually`
                    : `$${plan.monthlyPrice.toLocaleString()} billed monthly`}
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

              <div className="border-t border-white/20 pt-6 flex gap-5">
                <div className="text-4xl font-bold">{plan.deliverables}</div>
                <div className="text-sm text-white/80">
                  Video
                  <br /> Deliverables
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Summary */}
      <div className="text-center bg-[#3D0E99] py-10 items-center">
        <div className="flex items-center justify-evenly pb-4 text-lg ">
          <span className="font-medium">{selectedPlan}</span>
          <div>
            <span className="md:text-3xl text-xl font-bold">
              $ {getSelectedPlanTotal().toLocaleString()}
            </span>
            <span className="font-medium">
              /{billingType === "Annual" ? "year" : "month"}
            </span>
          </div>
          <span className="text-white font-medium">
            Billed {billingType === "Annual" ? "Annually" : "Monthly"}
          </span>
        </div>

        {/* Subscribe Button */}
        <div className="text-center px-5">
          <button
            className="bg-[#FED65E] text-[#4C12BF] font-bold text-xl xl:w-[1250px] w-full py-4 
          rounded-2xl transition-all duration-300 md:hover:scale-105 hover:scale-95 shadow-lg cursor-pointer"
            onClick={() => payWithPaystack()}
          >
            Subscribe & Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
