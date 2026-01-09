# Stripe + Paystack Dual Payment Integration Guide

## Overview

This document provides complete setup instructions for integrating both **Stripe** (USD payments) and **Paystack** (NGN payments) into your Titan-Leap website.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Variables Setup](#environment-variables-setup)
3. [Frontend Setup](#frontend-setup)
4. [Backend Setup](#backend-setup)
5. [Stripe Configuration](#stripe-configuration)
6. [Testing](#testing)
7. [Production Deployment](#production-deployment)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- **Node.js**: v16 or higher
- **npm**: v8 or higher
- **Stripe Account**: [Create at stripe.com](https://stripe.com)
- **Paystack Account**: [Create at paystack.com](https://paystack.com)

---

## Environment Variables Setup

### 1. Create `.env.local` File

Create a file named `.env.local` in the root directory of your project:

```env
# Paystack Configuration (NGN Payments)
VITE_PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_public_key_here
VITE_PAYSTACK_CURRENCY=NGN

# Stripe Configuration (USD Payments)
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key_here
VITE_API_URL=http://localhost:3000

# Backend Configuration (if using Node.js backend)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
PAYSTACK_SECRET_KEY=sk_test_your_paystack_secret_key_here
```

### 2. Get Your API Keys

#### For Paystack:
1. Go to [Paystack Dashboard](https://dashboard.paystack.co)
2. Log in to your account
3. Navigate to **Settings → API Keys & Webhooks**
4. Copy your **Public Key** and **Secret Key**

#### For Stripe:
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Log in to your account
3. Navigate to **Developers → API Keys**
4. Copy your **Publishable Key** and **Secret Key**

---

## Frontend Setup

### 1. Install Dependencies

```bash
npm install
```

This will install the newly added Stripe packages:
- `@stripe/react-stripe-js`
- `@stripe/stripe-js`

### 2. Component Structure

The following new components have been created:

#### `src/Components/PaymentGateway.tsx`
- Currency selection UI (NGN/USD toggle)
- Visual feedback for selected currency
- Payment method information display

#### `src/Components/StripeCheckout.tsx`
- Stripe Embedded Checkout integration
- Handles USD payment processing
- Error handling and user feedback

#### `src/utils/paymentUtils.ts`
- Currency conversion utilities
- Payment gateway selection logic
- Transaction record creation
- Exchange rate fetching

#### Updated `src/Components/Pricing.tsx`
- Integrated PaymentGateway component
- Dynamic price conversion based on currency
- Conditional routing to Paystack or Stripe
- Updated modal with payment method display

### 3. Verify Installation

```bash
npm run dev
```

Visit `http://localhost:5173` and check the pricing page to ensure:
- Payment gateway selector appears
- Prices update when switching between NGN and USD
- Both Paystack and Stripe buttons are visible

---

## Backend Setup

### Option 1: Vercel (Recommended for Production)

#### 1. Create Vercel Backend Structure

Create `api/stripe/create-session.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const { amount, email, name, phone, planName, billingType } =
    await request.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: planName,
              description: `${billingType} subscription`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment-success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
      metadata: {
        customer_name: name,
        customer_phone: phone,
        plan_name: planName,
        billing_type: billingType,
      },
    });

    return NextResponse.json({
      clientSecret: session.client_secret,
      sessionId: session.id,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 400 }
    );
  }
}
```

Create `api/stripe/webhook.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing signature" },
      { status: 400 }
    );
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // Update your database with payment info
      console.log("Payment successful:", session.id);

      // Send confirmation email
      // await sendConfirmationEmail({...});
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
```

#### 2. Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Follow the prompts to connect your GitHub repository.

#### 3. Add Environment Variables in Vercel Dashboard

1. Go to your Vercel project settings
2. Navigate to **Settings → Environment Variables**
3. Add all variables from `.env.local`:

```
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
PAYSTACK_SECRET_KEY
NEXT_PUBLIC_SITE_URL
```

### Option 2: Express.js Backend (Local/Self-hosted)

```typescript
import express from "express";
import Stripe from "stripe";
import cors from "cors";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const app = express();

app.use(cors());
app.use(express.json());

// Create Stripe Checkout Session
app.post("/api/stripe/create-session", async (req, res) => {
  try {
    const { amount, email, name, phone, planName, billingType } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: planName,
              description: `${billingType} subscription`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/payment-success`,
      cancel_url: `${process.env.FRONTEND_URL}/pricing`,
      metadata: {
        customer_name: name,
        customer_phone: phone,
        plan_name: planName,
        billing_type: billingType,
      },
    });

    res.json({
      clientSecret: session.client_secret,
      sessionId: session.id,
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: error instanceof Error ? error.message : "Server error" });
  }
});

// Stripe Webhook Handler
app.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const signature = req.headers["stripe-signature"] as string;

    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );

      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        // Handle successful payment
        console.log("Payment completed:", session.id);
      }

      res.json({ received: true });
    } catch (error) {
      res
        .status(400)
        .json({ error: error instanceof Error ? error.message : "Error" });
    }
  }
);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

---

## Stripe Configuration

### 1. Create Products in Stripe Dashboard

1. Go to **Stripe Dashboard → Products**
2. Create products for each plan:

```
Basic Plan
- Price: USD equivalent of NGN 1,500

Premium Plan
- Price: USD equivalent of NGN 2,500

Premium+ Plan
- Price: USD equivalent of NGN 5,000
```

### 2. Configure Webhooks

1. Go to **Developers → Webhooks**
2. Click **Add endpoint**
3. Enter your endpoint URL: `https://yourdomain.com/api/stripe/webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded`
   - `checkout.session.async_payment_failed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`

5. Copy the **Signing Secret** and add to `.env.local` as `STRIPE_WEBHOOK_SECRET`

---

## Testing

### 1. Test Payment Flow

#### NGN Payment (Paystack):
1. Select "Paystack - NGN" on the pricing page
2. Enter test customer information
3. Click "Subscribe & Pay"
4. Use Paystack test card details

#### USD Payment (Stripe):
1. Select "Stripe - USD" on the pricing page
2. Enter test customer information
3. Click "Subscribe & Pay"
4. Use Stripe test card: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., 12/25)
   - CVC: Any 3 digits (e.g., 123)

### 2. Test Webhook Locally

Use Stripe CLI to forward webhooks to your local development server:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to your Stripe account
stripe login

# Forward webhooks
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Run your backend
npm run dev
```

### 3. Test Exchange Rate API

The system fetches real-time USD to NGN exchange rates from:
- API: https://api.exchangerate-api.com/v4/latest/USD

If the API is unavailable, the system falls back to a default rate (1430 NGN = 1 USD).

---

## Production Deployment

### 1. Vercel Deployment Checklist

- [ ] Set all environment variables in Vercel dashboard
- [ ] Configure Stripe webhook URL to production domain
- [ ] Test payment flow on production
- [ ] Enable Stripe production keys
- [ ] Set up monitoring and error logging

### 2. Environment Variables for Production

```env
# Production - Never commit these!
VITE_STRIPE_PUBLIC_KEY=pk_live_your_production_key
STRIPE_SECRET_KEY=sk_live_your_production_key
STRIPE_WEBHOOK_SECRET=whsec_your_production_secret
VITE_PAYSTACK_PUBLIC_KEY=pk_live_your_production_key
PAYSTACK_SECRET_KEY=sk_live_your_production_key
```

### 3. Security Best Practices

- ✅ Use environment variables for all secret keys
- ✅ Never commit `.env.local` to git
- ✅ Add `.env.local` to `.gitignore`
- ✅ Verify webhook signatures on the backend
- ✅ Validate payment amounts on the backend
- ✅ Store transaction records securely
- ✅ Use HTTPS for all payments
- ✅ Implement proper error handling

---

## Troubleshooting

### Issue: "Stripe public key not set"

**Solution:** Ensure `VITE_STRIPE_PUBLIC_KEY` is in your `.env.local` file and start the dev server again.

```bash
npm run dev
```

### Issue: "Failed to create checkout session"

**Solution:** 
1. Verify your backend API is running
2. Check that `VITE_API_URL` matches your backend URL
3. Ensure `STRIPE_SECRET_KEY` is set on the backend

### Issue: Exchange rate not updating

**Solution:** The system will fall back to default rate (1430 NGN = 1 USD) if the API is unavailable. You can update this in `src/utils/paymentUtils.ts`.

### Issue: Webhook events not received

**Solution:**
1. Verify webhook URL in Stripe dashboard
2. Check webhook signing secret is correct
3. Use Stripe CLI to test locally: `stripe listen --forward-to localhost:3000/api/stripe/webhook`

### Issue: Payment succeeds but order not recorded

**Solution:** Implement database logic in webhook handler to store transaction records. See `src/api/stripe-webhook.ts` for commented examples.

---

## File Structure

```
src/
├── Components/
│   ├── PaymentGateway.tsx          # Currency selection UI
│   ├── StripeCheckout.tsx          # Stripe payment component
│   ├── Pricing.tsx                 # Updated with dual payment
│   └── ... (other components)
├── utils/
│   └── paymentUtils.ts             # Currency conversion & helpers
├── api/
│   ├── stripe-create-session.ts    # Backend session creation
│   └── stripe-webhook.ts           # Webhook handler
└── ... (other files)
```

---

## Next Steps

1. **Add Database Integration**: Store payment transactions in your database
2. **Email Notifications**: Send confirmation emails after successful payments
3. **Admin Dashboard**: Create dashboard to view NGN vs USD payments
4. **Auto-Locale Detection**: Auto-suggest currency based on user location
5. **Payment History**: Show customers their payment history

---

## Support Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Paystack Documentation](https://paystack.com/docs)
- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)

---

## Version History

- **v1.0** (Jan 2026): Initial Stripe + Paystack dual integration
  - Currency selection (NGN/USD)
  - Dynamic price conversion
  - Paystack (NGN) and Stripe (USD) support
  - Webhook handling setup
  - Environment variable configuration
