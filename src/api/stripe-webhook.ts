/**
 * Stripe Webhook Handler
 * 
 * Handles Stripe webhook events for payment status updates
 * Deploy this as a serverless function on Vercel, AWS Lambda, or similar
 * 
 * Environment Variables Required:
 * - STRIPE_SECRET_KEY
 * - STRIPE_WEBHOOK_SECRET
 * - DATABASE_URL (for storing transactions)
 */

interface StripeEvent {
  type: string;
  data: {
    object: {
      id: string;
      status: string;
      customer_email?: string;
      amount_total?: number;
      currency?: string;
      metadata?: Record<string, string>;
    };
  };
}

/**
 * Process Stripe webhook event
 * 
 * Supported events:
 * - checkout.session.completed: Payment successful
 * - checkout.session.async_payment_succeeded: Async payment succeeded
 * - checkout.session.async_payment_failed: Async payment failed
 * - payment_intent.succeeded: Payment succeeded
 * - payment_intent.payment_failed: Payment failed
 */
export const handleStripeWebhook = async (
  event: StripeEvent
): Promise<{ received: boolean }> => {
  try {
    const { type, data } = event;
    const session = data.object;

    switch (type) {
      case "checkout.session.completed": {
        // Payment successful
        console.log("✅ Payment completed:", session.id);

        // TODO: Update your database
        // await db.transactions.update({
        //   where: { stripeSessionId: session.id },
        //   data: {
        //     status: "success",
        //     completedAt: new Date(),
        //     stripeCustomerId: session.customer,
        //   },
        // });

        // TODO: Send confirmation email
        // await sendConfirmationEmail({
        //   email: session.customer_email,
        //   transactionId: session.id,
        //   amount: session.amount_total,
        // });

        break;
      }

      case "checkout.session.async_payment_succeeded": {
        // Async payment succeeded
        console.log("✅ Async payment succeeded:", session.id);
        // Handle async payment success
        break;
      }

      case "checkout.session.async_payment_failed": {
        // Async payment failed
        console.log("❌ Async payment failed:", session.id);

        // TODO: Update transaction status
        // await db.transactions.update({
        //   where: { stripeSessionId: session.id },
        //   data: { status: "failed" },
        // });

        // TODO: Send failure notification
        break;
      }

      case "payment_intent.succeeded": {
        // Payment intent succeeded
        console.log("✅ Payment intent succeeded:", session.id);
        break;
      }

      case "payment_intent.payment_failed": {
        // Payment intent failed
        console.log("❌ Payment intent failed:", session.id);
        break;
      }

      default:
        console.log(`ℹ️ Unhandled event type: ${type}`);
    }

    return { received: true };
  } catch (error) {
    console.error("Webhook processing error:", error);
    throw error;
  }
};

/**
 * Vercel Serverless Function Implementation
 * 
 * File: api/stripe/webhook.ts
 * 
 * import { NextRequest, NextResponse } from "next/server";
 * import Stripe from "stripe";
 * import { handleStripeWebhook } from "@/lib/stripe/webhook";
 * 
 * const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
 * const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
 * 
 * export async function POST(request: NextRequest) {
 *   const body = await request.text();
 *   const signature = request.headers.get("stripe-signature");
 * 
 *   if (!signature) {
 *     return NextResponse.json(
 *       { error: "Missing signature" },
 *       { status: 400 }
 *     );
 *   }
 * 
 *   try {
 *     const event = stripe.webhooks.constructEvent(
 *       body,
 *       signature,
 *       webhookSecret
 *     );
 * 
 *     await handleStripeWebhook(event);
 * 
 *     return NextResponse.json({ received: true });
 *   } catch (error) {
 *     console.error("Webhook error:", error);
 *     return NextResponse.json(
 *       {
 *         error:
 *           error instanceof Error ? error.message : "Webhook processing failed",
 *       },
 *       { status: 400 }
 *     );
 *   }
 * }
 * 
 * 
 * Express.js Implementation
 * 
 * import express from "express";
 * import Stripe from "stripe";
 * import { handleStripeWebhook } from "./stripe/webhook";
 * 
 * const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
 * const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
 * 
 * app.post(
 *   "/api/stripe/webhook",
 *   express.raw({ type: "application/json" }),
 *   async (req, res) => {
 *     const signature = req.headers["stripe-signature"] as string;
 * 
 *     try {
 *       const event = stripe.webhooks.constructEvent(
 *         req.body,
 *         signature,
 *         webhookSecret
 *       );
 * 
 *       await handleStripeWebhook(event);
 * 
 *       res.json({ received: true });
 *     } catch (error) {
 *       res.status(400).json({
 *         error: error instanceof Error ? error.message : "Webhook error",
 *       });
 *     }
 *   }
 * );
 */

export default handleStripeWebhook;
