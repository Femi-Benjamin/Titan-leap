"use client";
import type React from "react";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

interface StripeCheckoutProps {
  amount: number;
  email: string;
  name: string;
  phone: string;
  planName: string;
  billingType: "Monthly" | "Annual";
  onSuccess: () => void;
  onCancel: () => void;
}

/**
 * StripeCheckout Component
 * Handles Stripe payment processing
 * Requires VITE_STRIPE_PUBLIC_KEY environment variable
 */
const StripeCheckout: React.FC<StripeCheckoutProps> = ({
  amount,
  email,
  name,
  phone,
  planName,
  billingType,
  onCancel,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getEnvVar = (key: string, defaultValue: string): string => {
    return (
      (import.meta.env[key as keyof ImportMetaEnv] as string) || defaultValue
    );
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const stripeKey = getEnvVar("VITE_STRIPE_PUBLIC_KEY", "");

      if (!stripeKey) {
        throw new Error(
          "Stripe public key not configured. Check VITE_STRIPE_PUBLIC_KEY in .env",
        );
      }

      // Load Stripe
      const stripe = await loadStripe(stripeKey);

      if (!stripe) {
        throw new Error("Failed to load Stripe");
      }

      // Create checkout session by calling your backend
      const apiUrl = getEnvVar("VITE_API_URL", "http://localhost:3000");

      const response = await fetch(`${apiUrl}/api/stripe/create-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convert to cents
          email,
          name,
          phone,
          planName,
          billingType,
          currency: "usd",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `API Error: ${response.status}`);
      }

      const session = await response.json();

      if (!session.sessionId) {
        throw new Error("No session ID returned from server");
      }

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });

      if (result.error) {
        throw new Error(result.error.message || "Checkout redirect failed");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      console.error("Stripe checkout error:", err);
      setIsLoading(false);
    }
  };

  interface ImportMetaEnv {
    VITE_STRIPE_PUBLIC_KEY?: string;
    VITE_API_URL?: string;
  }

  return (
    <div className="w-full space-y-4">
      {error && (
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-4">
          <p className="text-red-200 text-sm font-semibold">Error:</p>
          <p className="text-red-200 text-sm mt-1">{error}</p>
          <p className="text-red-300 text-xs mt-2 font-mono">
            Make sure your backend API is running and VITE_API_URL is set in
            .env
          </p>
        </div>
      )}

      <div className="bg-white/5 rounded-lg p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-white/70">Plan:</span>
          <span className="font-semibold text-yellow-400">{planName}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/70">Amount:</span>
          <span className="font-semibold text-white">
            ${amount.toFixed(2)} USD
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/70">Email:</span>
          <span className="text-white text-xs">{email}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/70">Billing:</span>
          <span className="text-white">{billingType}</span>
        </div>
        <div className="flex justify-between text-sm border-t border-white/10 pt-2 mt-2">
          <span className="text-white/70">Total:</span>
          <span className="text-lg font-bold text-yellow-400">
            ${amount.toFixed(2)}
          </span>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-bold 
        text-lg py-4 rounded-lg transition-all duration-300 disabled:cursor-not-allowed"
      >
        {isLoading ? "Processing..." : "Continue to Stripe Checkout"}
      </button>

      <button
        onClick={onCancel}
        disabled={isLoading}
        className="w-full bg-transparent border border-white/30 hover:border-white/50 text-white font-semibold 
        text-lg py-3 rounded-lg transition-all duration-300 disabled:opacity-50"
      >
        Cancel
      </button>
    </div>
  );
};

export default StripeCheckout;
