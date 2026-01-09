/**
 * Database Schema for Payment Transactions
 * 
 * Use this schema if you're using:
 * - PostgreSQL + Prisma
 * - PostgreSQL + TypeORM
 * - MongoDB
 * - Firebase
 * 
 * Adjust as needed for your specific database setup
 */

// ==================== PRISMA SCHEMA ====================
// prisma/schema.prisma

model Transaction {
  id            String   @id @default(cuid())
  
  // Payment Info
  reference     String   @unique  // Unique payment reference (PSK- or STR-)
  gateway       String   // "paystack" or "stripe"
  status        String   // "pending", "success", "failed", "cancelled"
  
  // Currency & Amount
  amount        Int      // Amount in cents
  currency      String   // "NGN" or "USD"
  originalAmount Int     // Amount in original currency
  
  // Customer Info
  email         String   @db.VarChar(255)
  name          String   @db.VarChar(255)
  phone         String   @db.VarChar(20)
  
  // Plan Info
  planName      String   // "Basic", "Premium", "Premium+"
  billingType   String   // "Monthly" or "Annual"
  deliverables  Int      // Number of deliverables
  
  // Gateway-specific IDs
  paystackRef   String?  // Paystack reference
  stripeSessionId String? // Stripe session ID
  stripeCustomerId String? // Stripe customer ID
  
  // Metadata
  metadata      Json?    // Additional metadata
  
  // Timestamps
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  completedAt   DateTime?
  
  @@index([email])
  @@index([status])
  @@index([gateway])
  @@index([createdAt])
}

// ==================== SQL (PostgreSQL) ====================
-- migrations/001_create_transactions.sql

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Payment Info
  reference VARCHAR(255) UNIQUE NOT NULL,
  gateway VARCHAR(20) NOT NULL, -- 'paystack' or 'stripe'
  status VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, success, failed, cancelled
  
  -- Currency & Amount
  amount INTEGER NOT NULL, -- in cents
  currency VARCHAR(3) NOT NULL, -- NGN or USD
  original_amount INTEGER NOT NULL,
  
  -- Customer Info
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  
  -- Plan Info
  plan_name VARCHAR(50) NOT NULL,
  billing_type VARCHAR(10) NOT NULL, -- Monthly or Annual
  deliverables INTEGER NOT NULL,
  
  -- Gateway IDs
  paystack_ref VARCHAR(255),
  stripe_session_id VARCHAR(255),
  stripe_customer_id VARCHAR(255),
  
  -- Metadata
  metadata JSONB,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  
  -- Indexes
  CREATE INDEX idx_email ON transactions(email);
  CREATE INDEX idx_status ON transactions(status);
  CREATE INDEX idx_gateway ON transactions(gateway);
  CREATE INDEX idx_created_at ON transactions(created_at);
);

// ==================== MONGODB SCHEMA ====================
// collections/transactions.js

db.createCollection("transactions", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "reference",
        "gateway",
        "status",
        "amount",
        "currency",
        "email",
        "name",
        "phone",
        "planName",
        "billingType",
      ],
      properties: {
        _id: { bsonType: "objectId" },
        reference: { bsonType: "string" },
        gateway: { enum: ["paystack", "stripe"] },
        status: { enum: ["pending", "success", "failed", "cancelled"] },
        amount: { bsonType: "int" },
        currency: { enum: ["NGN", "USD"] },
        originalAmount: { bsonType: "int" },
        email: { bsonType: "string" },
        name: { bsonType: "string" },
        phone: { bsonType: "string" },
        planName: { enum: ["Basic", "Premium", "Premium+"] },
        billingType: { enum: ["Monthly", "Annual"] },
        deliverables: { bsonType: "int" },
        paystackRef: { bsonType: ["string", "null"] },
        stripeSessionId: { bsonType: ["string", "null"] },
        stripeCustomerId: { bsonType: ["string", "null"] },
        metadata: { bsonType: "object" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" },
        completedAt: { bsonType: ["date", "null"] },
      },
    },
  },
});

// Create indexes
db.transactions.createIndex({ email: 1 });
db.transactions.createIndex({ status: 1 });
db.transactions.createIndex({ gateway: 1 });
db.transactions.createIndex({ createdAt: -1 });
db.transactions.createIndex({ reference: 1 }, { unique: true });

// ==================== TYPESCRIPT TYPES ====================
// types/transaction.ts

export interface Transaction {
  id: string;
  reference: string; // Unique payment reference
  gateway: "paystack" | "stripe";
  status: "pending" | "success" | "failed" | "cancelled";
  
  // Currency & Amount
  amount: number; // in cents
  currency: "NGN" | "USD";
  originalAmount: number;
  
  // Customer Info
  email: string;
  name: string;
  phone: string;
  
  // Plan Info
  planName: "Basic" | "Premium" | "Premium+";
  billingType: "Monthly" | "Annual";
  deliverables: number;
  
  // Gateway IDs
  paystackRef?: string;
  stripeSessionId?: string;
  stripeCustomerId?: string;
  
  // Metadata
  metadata?: Record<string, any>;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

// ==================== SAMPLE QUERIES ====================

-- Get all successful payments
SELECT * FROM transactions WHERE status = 'success' ORDER BY created_at DESC;

-- Get NGN payments total
SELECT SUM(amount) as total FROM transactions WHERE currency = 'NGN' AND status = 'success';

-- Get USD payments total
SELECT SUM(amount) as total FROM transactions WHERE currency = 'USD' AND status = 'success';

-- Get payments by plan
SELECT plan_name, COUNT(*) as count, SUM(amount) as total 
FROM transactions 
WHERE status = 'success' 
GROUP BY plan_name;

-- Get recent payments
SELECT * FROM transactions WHERE status = 'success' ORDER BY created_at DESC LIMIT 10;

// ==================== BACKEND WEBHOOK HANDLER EXAMPLE ====================
// api/stripe/webhook.ts (with database integration)

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma"; // or your DB client

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  try {
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // Update transaction in database
      await prisma.transaction.update({
        where: { stripeSessionId: session.id },
        data: {
          status: "success",
          completedAt: new Date(),
          stripeCustomerId: session.customer as string,
        },
      });

      // Send confirmation email
      // await sendConfirmationEmail({
      //   email: session.customer_email,
      //   amount: session.amount_total,
      //   currency: "USD",
      // });
    }

    if (event.type === "checkout.session.async_payment_failed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // Mark transaction as failed
      await prisma.transaction.update({
        where: { stripeSessionId: session.id },
        data: { status: "failed" },
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Webhook error" },
      { status: 400 }
    );
  }
}

// ==================== PAYSTACK WEBHOOK HANDLER EXAMPLE ====================
// api/paystack/webhook.ts (with database integration)

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";

const paystackSecret = process.env.PAYSTACK_SECRET_KEY!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const hash = crypto
    .createHmac("sha512", paystackSecret)
    .update(body)
    .digest("hex");

  const signature = request.headers.get("x-paystack-signature");

  if (hash !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  try {
    const event = JSON.parse(body);

    if (event.event === "charge.success") {
      const { reference, amount, customer } = event.data;

      // Update transaction in database
      await prisma.transaction.update({
        where: { paystackRef: reference },
        data: {
          status: "success",
          completedAt: new Date(),
        },
      });
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Webhook error" },
      { status: 400 }
    );
  }
}
