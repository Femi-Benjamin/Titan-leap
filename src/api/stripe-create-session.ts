/**
 * Stripe API Route: Create Checkout Session
 * 
 * This endpoint handles Stripe checkout session creation.
 * In production, this should be deployed on a Node.js backend (Vercel, Express, etc.)
 * 
 * For local development with Vite:
 * 1. Set up a separate Node.js/Express backend
 * 2. Or use a serverless function provider
 * 
 * Environment Variables Required:
 * - STRIPE_SECRET_KEY
 * - VITE_API_URL (frontend env for API endpoint)
 */

interface CreateSessionRequest {
  amount: number; // Amount in cents
  email: string;
  name: string;
  phone: string;
  planName: string;
  billingType: "Monthly" | "Annual";
  currency: "usd";
}

interface CreateSessionResponse {
  clientSecret: string;
  sessionId: string;
}

interface CreateSessionError {
  error: string;
}

/**
 * Implementation for Node.js/Express Backend
 * Deploy this as a serverless function or Express route handler
 */

// Example using Node.js + Express
export const createStripeSession = async (
  req: CreateSessionRequest
): Promise<CreateSessionResponse | CreateSessionError> => {
  try {
    // Import Stripe
    // const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

    const {
      amount,
      email,
      name,
      phone,
      planName,
      billingType,
      currency,
    } = req;

    // Validate inputs
    if (!amount || amount <= 0) {
      return { error: "Invalid amount" };
    }

    if (!email || !name || !phone) {
      return { error: "Missing required customer information" };
    }

    // Create Stripe customer (optional but recommended)
    // const customer = await stripe.customers.create({
    //   email,
    //   name,
    //   phone,
    // });

    // Create checkout session
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ["card"],
    //   customer_email: email,
    //   line_items: [
    //     {
    //       price_data: {
    //         currency,
    //         product_data: {
    //           name: planName,
    //           description: `${billingType} subscription`,
    //           metadata: {
    //             billing_type: billingType,
    //             plan_name: planName,
    //           },
    //         },
    //         unit_amount: amount, // Amount in cents
    //       },
    //       quantity: 1,
    //     },
    //   ],
    //   mode: "payment",
    //   success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
    //   metadata: {
    //     customer_name: name,
    //     customer_phone: phone,
    //     plan_name: planName,
    //     billing_type: billingType,
    //   },
    // });

    // Return session info
    // return {
    //   clientSecret: session.client_secret,
    //   sessionId: session.id,
    // };

    // Placeholder response (replace with actual Stripe implementation)
    return {
      clientSecret: "cs_test_placeholder",
      sessionId: "cs_test_placeholder",
    };
  } catch (error) {
    console.error("Stripe session creation error:", error);
    return {
      error:
        error instanceof Error ? error.message : "Failed to create session",
    };
  }
};

/**
 * Backend Implementation Notes:
 * 
 * 1. Express.js Example:
 * 
 * import express from "express";
 * import Stripe from "stripe";
 * 
 * const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
 * const app = express();
 * 
 * app.post("/api/stripe/create-session", async (req, res) => {
 *   try {
 *     const {
 *       amount,
 *       email,
 *       name,
 *       phone,
 *       planName,
 *       billingType,
 *     } = req.body;
 * 
 *     const session = await stripe.checkout.sessions.create({
 *       payment_method_types: ["card"],
 *       customer_email: email,
 *       line_items: [
 *         {
 *           price_data: {
 *             currency: "usd",
 *             product_data: {
 *               name: planName,
 *               description: `${billingType} subscription`,
 *             },
 *             unit_amount: amount,
 *           },
 *           quantity: 1,
 *         },
 *       ],
 *       mode: "payment",
 *       success_url: `${process.env.FRONTEND_URL}/payment-success`,
 *       cancel_url: `${process.env.FRONTEND_URL}/pricing`,
 *       metadata: {
 *         customer_name: name,
 *         customer_phone: phone,
 *         plan_name: planName,
 *         billing_type: billingType,
 *       },
 *     });
 * 
 *     res.json({
 *       clientSecret: session.client_secret,
 *       sessionId: session.id,
 *     });
 *   } catch (error) {
 *     res.status(400).json({ error: error.message });
 *   }
 * });
 * 
 * 2. Vercel Serverless Function:
 * 
 * // api/stripe/create-session.ts
 * import { NextRequest, NextResponse } from "next/server";
 * import Stripe from "stripe";
 * 
 * const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
 * 
 * export async function POST(request: NextRequest) {
 *   const { amount, email, name, phone, planName, billingType } =
 *     await request.json();
 * 
 *   try {
 *     const session = await stripe.checkout.sessions.create({
 *       ...session creation code...
 *     });
 * 
 *     return NextResponse.json({
 *       clientSecret: session.client_secret,
 *       sessionId: session.id,
 *     });
 *   } catch (error) {
 *     return NextResponse.json(
 *       { error: error instanceof Error ? error.message : "Server error" },
 *       { status: 400 }
 *     );
 *   }
 * }
 */

export default createStripeSession;
