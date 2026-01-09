#!/usr/bin/env node

/**
 * Stripe Backend API - Express Server
 * 
 * This is a simple Node.js/Express backend for handling Stripe payments
 * Run this alongside your Vite frontend
 * 
 * Setup:
 * 1. npm install express stripe cors dotenv body-parser
 * 2. Create a .env file with STRIPE_SECRET_KEY
 * 3. node stripe-backend.js
 * 4. Server runs on http://localhost:3000
 */

import express from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Stripe with your secret key
const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY || "");

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Stripe backend is running" });
});

// Create Stripe Checkout Session
app.post("/api/stripe/create-session", async (req, res) => {
  try {
    const { amount, email, name, phone, planName, billingType } = req.body;

    console.log("Creating checkout session:", { amount, email, name, planName });

    // Validate input
    if (!amount || !email || !name) {
      return res.status(400).json({
        error: "Missing required fields: amount, email, name",
      });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("⚠️ STRIPE_SECRET_KEY not configured in .env");
      return res.status(500).json({
        error: "Stripe secret key not configured",
      });
    }

    // Create checkout session
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: planName || "Titan Leap Plan",
              description: `${billingType} Subscription`,
              metadata: {
                planName,
                billingType,
              },
            },
            unit_amount: Math.round(amount), // Should already be in cents
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      metadata: {
        customerName: name,
        customerPhone: phone || "",
        planName,
        billingType,
      },
      success_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}/?success=true`,
      cancel_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}/?canceled=true`,
    });

    console.log("✅ Session created:", session.id);

    res.json({
      sessionId: session.id,
      clientSecret: session.client_secret,
    });
  } catch (error) {
    console.error("❌ Stripe session creation error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create checkout session";
    res.status(500).json({
      error: errorMessage,
    });
  }
});

// Webhook endpoint for Stripe events (optional)
app.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    try {
      const event = stripeClient.webhooks.constructEvent(
        req.body,
        sig || "",
        process.env.STRIPE_WEBHOOK_SECRET || ""
      );

      console.log(`📬 Webhook event received: ${event.type}`);

      // Handle different event types
      switch (event.type) {
        case "checkout.session.completed":
          console.log(
            "✅ Payment successful:",
            event.data.object.id
          );
          break;
        case "charge.failed":
          console.log(
            "❌ Payment failed:",
            event.data.object.id
          );
          break;
        default:
          console.log(`📬 Event: ${event.type}`);
      }

      res.json({ received: true });
    } catch (error) {
      console.error("🚨 Webhook error:", error);
      res.status(400).send("Webhook Error");
    }
  }
);

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   🎉 Stripe Backend Server Running 🎉 ║
║   Port: ${PORT}                            ║
║   URL: http://localhost:${PORT}                  ║
║   Health: http://localhost:${PORT}/health       ║
╚════════════════════════════════════════╝

✨ Make sure STRIPE_SECRET_KEY is in your .env file!
  `);
});
