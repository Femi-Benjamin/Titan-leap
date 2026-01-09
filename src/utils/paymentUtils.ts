/**
 * Currency Conversion and Payment Utilities
 * Handles NGN <-> USD conversions and payment gateway logic
 */

// Exchange rate (you should fetch this from a real-time API in production)
// This is a sample rate - update to use live rates from API
const NGN_TO_USD_RATE = 0.0007; // 1 NGN = 0.0007 USD (example)
const USD_TO_NGN_RATE = 1430; // 1 USD = 1430 NGN (example)

/**
 * Fetches real-time exchange rate from API
 * You can use services like fixer.io, exchangerate-api.com, etc.
 */
export const fetchExchangeRate = async (): Promise<number> => {
  try {
    // Example using exchangerate-api.com (free tier available)
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );
    const data = await response.json();
    return data.rates.NGN || USD_TO_NGN_RATE;
  } catch {
    // Fallback to default rate if API fails
    return USD_TO_NGN_RATE;
  }
};

/**
 * Converts USD to NGN
 */
export const convertUSDToNGN = (usd: number, rate: number = USD_TO_NGN_RATE): number => {
  return Math.round(usd * rate);
};

/**
 * Converts NGN to USD
 */
export const convertNGNToUSD = (ngn: number, rate: number = NGN_TO_USD_RATE): number => {
  return Math.round((ngn * rate) * 100) / 100;
};

/**
 * Payment Gateway Selection Logic
 */
export const selectPaymentGateway = (
  currency: "NGN" | "USD"
): "paystack" | "stripe" => {
  return currency === "NGN" ? "paystack" : "stripe";
};

/**
 * Validates payment amount
 */
export const isValidPaymentAmount = (amount: number): boolean => {
  return amount > 0 && amount <= 999999999;
};

/**
 * Generates unique reference for payment tracking
 */
export const generatePaymentReference = (gateway: "paystack" | "stripe"): string => {
  const prefix = gateway === "paystack" ? "PSK" : "STR";
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

/**
 * Formats currency amount for display
 */
export const formatCurrencyAmount = (
  amount: number,
  currency: "NGN" | "USD"
): string => {
  if (currency === "USD") {
    return `$${amount.toFixed(2)}`;
  }
  return `₦${amount.toLocaleString()}`;
};

/**
 * Transaction logging (for backend integration)
 */
export interface TransactionRecord {
  id: string;
  reference: string;
  email: string;
  name: string;
  phone: string;
  planName: string;
  billingType: "Monthly" | "Annual";
  amount: number;
  currency: "NGN" | "USD";
  gateway: "paystack" | "stripe";
  status: "pending" | "success" | "failed" | "cancelled";
  createdAt: string;
  completedAt?: string;
}

/**
 * Creates a transaction record for database storage
 */
export const createTransactionRecord = (
  reference: string,
  email: string,
  name: string,
  phone: string,
  planName: string,
  billingType: "Monthly" | "Annual",
  amount: number,
  currency: "NGN" | "USD"
): TransactionRecord => {
  const gateway = selectPaymentGateway(currency);
  return {
    id: generatePaymentReference(gateway),
    reference,
    email,
    name,
    phone,
    planName,
    billingType,
    amount,
    currency,
    gateway,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
};
