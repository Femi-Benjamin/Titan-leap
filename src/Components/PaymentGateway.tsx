"use client";
import type React from "react";

interface PaymentGatewayProps {
  currency: "NGN" | "USD";
  onCurrencyChange: (currency: "NGN" | "USD") => void;
}

/**
 * PaymentGateway Component
 * Allows users to select between Paystack (NGN) and Stripe (USD)
 * Automatically converts prices based on selected currency
 */
const PaymentGateway: React.FC<PaymentGatewayProps> = ({
  currency,
  onCurrencyChange,
}) => {
  return (
    <div className="mb-12 px-5 md:px-10 xl:px-22">
      {/* <div className="flex items-center justify-center mb-6">
        <div className="w-10 h-1 bg-yellow-400 mr-4"></div>
        <span className="text-[#FED65E] font-semibold text-lg tracking-wider">
          Select Payment Method
        </span>
      </div> */}
       <div className="mb-6 bg-white/5 rounded-lg p-4 border border-white/10">
          <p className="text-sm text-white/70 text-center">
            💡 Choose your preferred payment method. Prices will be displayed in{" "}
            <span className="font-semibold text-yellow-400">
              {currency === "NGN" ? "Nigerian Naira (NGN)" : "US Dollars (USD)"}
            </span>
          </p>
        </div>

      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-2 gap-4">
          {/* Paystack Option - NGN */}
          <button
            onClick={() => onCurrencyChange("NGN")}
            className={`relative p-6 rounded-2xl transition-all duration-300 backdrop-blur-sm border-2 ${
              currency === "NGN"
                ? "border-yellow-400 bg-gradient-to-b from-[#4C12BF] to-[#2D0A6B] shadow-lg shadow-yellow-400/20"
                : "border-white/30 bg-[#4C12BF] hover:border-yellow-400/50"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-white text-left">
                  Paystack
                </h3>
                <p className="text-sm text-white/70 text-left">NGN (Nigerian Naira)</p>
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  currency === "NGN"
                    ? "border-yellow-400 bg-yellow-400"
                    : "border-white/50"
                }`}
              >
                {currency === "NGN" && (
                  <svg
                    className="w-3 h-3 text-[#4C12BF]"
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
            <p className="text-xs text-white/60 text-left">
              Pay using Paystack's secure payment gateway
            </p>
          </button>

          {/* Stripe Option - USD */}
          <button
            onClick={() => onCurrencyChange("USD")}
            className={`relative p-6 rounded-2xl transition-all duration-300 backdrop-blur-sm border-2 ${
              currency === "USD"
                ? "border-yellow-400 bg-gradient-to-b from-[#4C12BF] to-[#2D0A6B] shadow-lg shadow-yellow-400/20"
                : "border-white/30 bg-[#4C12BF] hover:border-yellow-400/50"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-white text-left">
                  Stripe
                </h3>
                <p className="text-sm text-white/70 text-left">USD (US Dollar)</p>
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  currency === "USD"
                    ? "border-yellow-400 bg-yellow-400"
                    : "border-white/50"
                }`}
              >
                {currency === "USD" && (
                  <svg
                    className="w-3 h-3 text-[#4C12BF]"
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
            <p className="text-xs text-white/60 text-left">
              Pay using Stripe's global payment solution
            </p>
          </button>
        </div>

        {/* Info Box */}
       
      </div>
    </div>
  );
};

export default PaymentGateway;
