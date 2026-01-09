# Quick Start: Stripe + Paystack Setup

## 5-Minute Setup Guide

### Step 1: Get Your API Keys (2 min)

**Paystack:**
- Go to https://dashboard.paystack.co/settings/developer
- Copy Public Key and Secret Key

**Stripe:**
- Go to https://dashboard.stripe.com/apikeys
- Copy Publishable Key and Secret Key

### Step 2: Create `.env.local` (1 min)

```env
VITE_PAYSTACK_PUBLIC_KEY=pk_test_your_key_here
VITE_STRIPE_PUBLIC_KEY=pk_test_your_key_here
VITE_API_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_test_your_key_here
```

### Step 3: Install & Run (2 min)

```bash
npm install
npm run dev
```

Visit `http://localhost:5173/pricing` and test the payment flow!

---

## Test Card Numbers

| Card Type | Number | Exp | CVC |
|-----------|--------|-----|-----|
| Stripe | 4242 4242 4242 4242 | 12/25 | 123 |
| Paystack | 5531 8866 5411 3829 | 08/25 | 564 |

---

## Payment Flow

```
User selects currency (NGN or USD)
         ↓
   User enters details
         ↓
   ✅ NGN → Paystack    OR    ✅ USD → Stripe
         ↓                        ↓
  Paystack Popup          Stripe Checkout
         ↓                        ↓
  Payment Confirmation    Payment Confirmation
```

---

## Deployment Checklist

- [ ] Push code to GitHub
- [ ] Connect to Vercel
- [ ] Add environment variables in Vercel dashboard
- [ ] Update Stripe webhook URL to production domain
- [ ] Switch to production keys
- [ ] Test payment flow on live site

---

## Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| "Key not set" | Check `.env.local` and restart dev server |
| Payment fails | Verify backend is running on correct port |
| Webhook not working | Update webhook URL in Stripe dashboard |
| Exchange rate wrong | Update default rate in `paymentUtils.ts` |

---

## Files Changed/Created

✅ `package.json` - Added Stripe dependencies
✅ `src/Components/PaymentGateway.tsx` - NEW
✅ `src/Components/StripeCheckout.tsx` - NEW
✅ `src/utils/paymentUtils.ts` - NEW
✅ `src/api/stripe-create-session.ts` - NEW
✅ `src/api/stripe-webhook.ts` - NEW
✅ `src/Components/Pricing.tsx` - UPDATED

---

## Next: Production Backend

Deploy backend API to Vercel or your own server with these endpoints:

```
POST /api/stripe/create-session
POST /api/stripe/webhook
```

See `STRIPE_PAYSTACK_INTEGRATION.md` for full backend implementation.

---

Need help? Check the main integration guide or contact Stripe/Paystack support.
