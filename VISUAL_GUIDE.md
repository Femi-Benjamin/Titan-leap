# 🎨 Visual Setup Guide - Stripe + Paystack Integration

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        User Browser                              │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │          Pricing Page (React Component)                  │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │        Payment Gateway Selector Component          │  │   │
│  │  │  ┌──────────────┐        ┌──────────────┐        │  │   │
│  │  │  │ Paystack NGN │   OR   │  Stripe USD  │        │  │   │
│  │  │  │     ₦        │        │      $       │        │  │   │
│  │  │  └──────────────┘        └──────────────┘        │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  │                           ↓                               │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │         Pricing Component (Dynamic)                │  │   │
│  │  │  Prices update based on selected currency         │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  │                           ↓                               │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │        Checkout Modal                              │  │   │
│  │  │  Name, Email, Phone                               │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  │                           ↓                               │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │     Smart Gateway Router                           │  │   │
│  │  │  If NGN → Paystack    If USD → Stripe Checkout   │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                             ↓
        ┌────────────────────┴────────────────────┐
        ↓                                          ↓
   ┌─────────────┐                         ┌──────────────┐
   │  Paystack   │                         │    Stripe    │
   │  Payment    │                         │   Checkout   │
   │  Popup      │                         │              │
   └─────────────┘                         └──────────────┘
        ↓                                          ↓
   ┌─────────────┐                         ┌──────────────┐
   │  Paystack   │                         │   Stripe     │
   │  Servers    │                         │   Servers    │
   │  (Process)  │                         │   (Process)  │
   └─────────────┘                         └──────────────┘
        ↓                                          ↓
   ┌────────────────────┬────────────────────┐
   ↓                    ↓
Backend Webhook Handler
   │
   └─→ Update Database
   └─→ Send Confirmation Email
   └─→ Return Success Response
```

---

## File Structure Diagram

```
titan-leap/
│
├── 📁 src/
│   ├── 📁 Components/
│   │   ├── 📄 Pricing.tsx ⭐ UPDATED
│   │   ├── 📄 PaymentGateway.tsx ✨ NEW
│   │   ├── 📄 StripeCheckout.tsx ✨ NEW
│   │   └── ... other components
│   │
│   ├── 📁 utils/
│   │   ├── 📄 paymentUtils.ts ✨ NEW
│   │   └── ... other utilities
│   │
│   ├── 📁 api/
│   │   ├── 📄 stripe-create-session.ts ✨ NEW
│   │   └── 📄 stripe-webhook.ts ✨ NEW
│   │
│   ├── 📄 App.tsx
│   ├── 📄 main.tsx
│   └── ... other files
│
├── 📁 public/
│
├── 📄 package.json ⭐ UPDATED
│   └── Added: @stripe/react-stripe-js, @stripe/stripe-js
│
├── 📄 .env.example ✨ NEW
│   └── All required environment variables
│
├── 📄 vite.config.ts
├── 📄 tsconfig.json
│
├── 📚 DOCUMENTATION FILES (NEW)
│   ├── 📖 README_IMPLEMENTATION.md
│   ├── 📖 QUICK_START.md
│   ├── 📖 STRIPE_PAYSTACK_INTEGRATION.md
│   ├── 📖 DATABASE_SCHEMA.md
│   ├── 📖 BEFORE_AND_AFTER.md
│   └── 📖 IMPLEMENTATION_SUMMARY.md
│
└── 📄 ... other config files

Legend:
✨ = New file
⭐ = Modified file
📄 = File
📁 = Folder
📖 = Documentation
```

---

## Component Interaction Flow

```
┌──────────────────────────────────────────────────────────┐
│                    Pricing.tsx                            │
│                 (Main Component)                          │
│                                                           │
│  State Management:                                        │
│  • billingType: "Annual" | "Monthly"                     │
│  • currency: "NGN" | "USD"                               │
│  • selectedPlan: string                                  │
│  • showModal: boolean                                    │
│  • showStripeCheckout: boolean                           │
│  • exchangeRate: number                                  │
│  • userInfo: { name, email, phone }                      │
└──────────────────────────────────────────────────────────┘
    │                          │
    │                          │
    ↓                          ↓
┌─────────────────┐  ┌──────────────────────────┐
│ PaymentGateway  │  │    PricingCards          │
│   Component     │  │   (Each Plan Card)       │
│                 │  │                          │
│ Props:          │  │ Shows:                   │
│ • currency      │  │ • Plan name              │
│ • onChange      │  │ • Features               │
│                 │  │ • Converted price       │
│ UI Elements:    │  │ • Deliverables          │
│ • NGN Button    │  │                          │
│ • USD Button    │  │ Props:                   │
│ • Info Box      │  │ • plan data              │
└─────────────────┘  │ • billingType            │
    │                │ • currency               │
    └────────────────────┬─────────────────────┘
                         │
                         ↓
                ┌────────────────────┐
                │  Checkout Modal    │
                │                    │
                │ Shows:             │
                │ • Form inputs      │
                │ • Price summary    │
                │ • Payment method   │
                │                    │
                │ Triggers either:   │
                │ • payWithPaystack()│
                │ • showStripeUI()   │
                └────────────────────┘
                    │            │
         ┌──────────┘            └──────────┐
         ↓                                   ↓
    ┌─────────────┐          ┌──────────────────────┐
    │  Paystack   │          │ StripeCheckout       │
    │  Handler    │          │ Component            │
    │             │          │                      │
    │ Creates:    │          │ Props:               │
    │ • Handler   │          │ • amount             │
    │ • Opens     │          │ • email              │
    │   Popup     │          │ • name               │
    │             │          │ • phone              │
    │ Handles:    │          │ • planName           │
    │ • Callback  │          │ • billingType        │
    │ • Success   │          │ • onSuccess()        │
    └─────────────┘          │ • onCancel()         │
         │                    │                      │
         │                    │ Calls API:           │
         │                    │ /api/stripe/...      │
         │                    │                      │
         │                    │ Creates Stripe       │
         │                    │ Checkout Session     │
         │                    └──────────────────────┘
         │                                   │
         ↓                                   ↓
    ┌─────────────┐               ┌──────────────────┐
    │  Paystack   │               │  Stripe Checkout │
    │  Popup      │               │  Modal           │
    │  Opens      │               │  Opens           │
    └─────────────┘               └──────────────────┘
```

---

## Data Flow: Currency & Price

```
User selects currency (NGN or USD)
              ↓
    ┌─────────────────────────┐
    │ PaymentGateway.tsx      │
    │ Sets: currency state    │
    └─────────────────────────┘
              ↓
    ┌─────────────────────────────────┐
    │ Pricing.tsx                     │
    │ Effect Hook triggered:          │
    │ • Fetch exchange rate           │
    │ • Update exchangeRate state     │
    └─────────────────────────────────┘
              ↓
    ┌──────────────────────────────────────┐
    │ getSelectedPlanTotal()               │
    │ Uses: paymentUtils.ts functions      │
    │                                      │
    │ if currency === "USD":               │
    │   return convertNGNToUSD(...)        │
    │ else:                                │
    │   return basePrice (NGN)             │
    └──────────────────────────────────────┘
              ↓
    ┌──────────────────────────┐
    │ Update Price Display:    │
    │ • All plan cards        │
    │ • Summary section       │
    │ • Checkout modal        │
    └──────────────────────────┘
```

---

## Payment Routing Logic

```
User submits form
         ↓
   Form validation
         ↓
   ✅ All fields filled?
   ✅ Valid email?
   ✅ Valid phone?
         ↓
   Call: selectPaymentGateway(currency)
         ↓
    ┌────────────────────┐
    │  Router Decision   │
    └────────────────────┘
         ↓
    ┌────────┴────────┐
    ↓                 ↓
Currency    Currency
"NGN"       "USD"
    ↓                 ↓
┌──────────────┐  ┌──────────────────┐
│payWithPaystack│  │setShowStripeUI() │
│    ()        │  │                  │
└──────────────┘  └──────────────────┘
    ↓                 ↓
PaystackPop.setup()  StripeCheckout
    ↓                Component
openIframe()         renders
    ↓                 ↓
Paystack          API calls:
popup              /api/stripe/
opens              create-session
    ↓                 ↓
User pays          Stripe
                   Checkout
                   opens
                   ↓
                  User pays
```

---

## Environment Variables Flow

```
┌──────────────────────────────────┐
│      .env.local file             │
│  (Never committed to git!)       │
│                                  │
│  VITE_PAYSTACK_PUBLIC_KEY=...    │
│  VITE_STRIPE_PUBLIC_KEY=...      │
│  VITE_API_URL=...                │
│  STRIPE_SECRET_KEY=...           │
│  STRIPE_WEBHOOK_SECRET=...       │
└──────────────────────────────────┘
         ↓
    ┌────┴──────────────────────┐
    ↓                           ↓
Frontend Keys          Backend Keys
(Vite/React)          (Node.js API)
    ↓                           ↓
paymentUtils.ts         /api/stripe/
Pricing.tsx               create-session.ts
StripeCheckout.tsx        stripe-webhook.ts
    ↓                           ↓
Used for:              Used for:
• Load Paystack        • Create sessions
• Load Stripe          • Verify webhooks
• Display prices       • Secure payments
• Make API calls       • Database updates
```

---

## Setup Workflow

```
Day 1: Development Setup
├── Step 1: Get API keys from Stripe & Paystack
├── Step 2: Create .env.local
├── Step 3: Run npm install (installs Stripe deps)
├── Step 4: npm run dev
└── Step 5: Test at localhost:5173/pricing ✅

Day 2: Backend Deployment
├── Step 1: Choose backend (Vercel recommended)
├── Step 2: Deploy API endpoints
├── Step 3: Set backend env variables
├── Step 4: Test with Stripe CLI webhooks
└── Step 5: Verify database setup ✅

Day 3: Production Launch
├── Step 1: Switch to production keys
├── Step 2: Update webhook URLs
├── Step 3: Final testing
├── Step 4: Deploy to production
├── Step 5: Monitor transactions ✅
└── Step 6: Launch! 🎉
```

---

## Testing Checklist Flowchart

```
                        START
                         ↓
          ┌──────────────────────────┐
          │ Test Paystack (NGN)      │
          │                          │
          │ 1. Select Paystack       │
          │ 2. Fill form             │
          │ 3. Click subscribe       │
          │ 4. Use test card         │
          │ 5. Verify popup          │
          └──────────────────────────┘
                    ✅ PASS?
                         ↓
          ┌──────────────────────────┐
          │ Test Stripe (USD)        │
          │                          │
          │ 1. Select Stripe         │
          │ 2. Fill form             │
          │ 3. Click subscribe       │
          │ 4. Use test card         │
          │ 5. Verify Stripe UI      │
          └──────────────────────────┘
                    ✅ PASS?
                         ↓
          ┌──────────────────────────┐
          │ Test Currency Conversion │
          │                          │
          │ 1. Switch NGN ↔ USD      │
          │ 2. Verify prices change  │
          │ 3. Check math correct    │
          │ 4. Test multiple times   │
          └──────────────────────────┘
                    ✅ PASS?
                         ↓
          ┌──────────────────────────┐
          │ Test Mobile & Desktop    │
          │                          │
          │ 1. Test on phone         │
          │ 2. Test on tablet        │
          │ 3. Test on desktop       │
          │ 4. Check responsive UI   │
          └──────────────────────────┘
                    ✅ PASS?
                         ↓
          ┌──────────────────────────┐
          │ Backend Testing          │
          │                          │
          │ 1. Test webhook URLs     │
          │ 2. Verify signatures     │
          │ 3. Check database        │
          │ 4. Test emails (if set)  │
          └──────────────────────────┘
                    ✅ PASS?
                         ↓
                    READY FOR
                    PRODUCTION! 🚀
```

---

## Deployment Architecture

```
┌─────────────────────────────────────┐
│        GitHub Repository             │
│  (Your code - all commits)          │
└─────────────────────────────────────┘
              ↓ Push
┌─────────────────────────────────────┐
│        Vercel (Frontend)             │
│  • Deploys React app                │
│  • Serves static files              │
│  • CDN distribution                 │
│  • https://yourdomain.com           │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│        Vercel (Backend)              │
│  • API routes                       │
│  • /api/stripe/create-session      │
│  • /api/stripe/webhook             │
│  • https://yourdomain.com/api      │
└─────────────────────────────────────┘
              ↓           ↓
        ┌──────────┬──────────┐
        ↓          ↓          ↓
    Database   Paystack    Stripe
    (optional)  API         API
```

---

## Real-world Example: User Journey

```
👤 User: "I want to buy the Premium Plan"

1️⃣ Visits Pricing Page (localhost:5173/pricing)
   └─ Sees both Paystack and Stripe options

2️⃣ Selects Currency
   └─ Clicks "Stripe - USD"
   └─ Prices update: ₦30,000 → $21 USD

3️⃣ Selects Plan
   └─ Clicks Premium Plan
   └─ $21/month selected

4️⃣ Clicks "Subscribe & Pay"
   └─ Modal opens

5️⃣ Fills Details
   ├─ Name: John Doe
   ├─ Email: john@example.com
   └─ Phone: +1-234-567-8900

6️⃣ Clicks "Proceed to Stripe"
   └─ Frontend detects: currency = USD
   └─ Calls API: /api/stripe/create-session

7️⃣ Backend Response
   └─ Creates Stripe session
   └─ Returns client secret

8️⃣ Stripe Checkout Opens
   └─ User enters card: 4242 4242 4242 4242
   └─ User pays

9️⃣ Stripe Webhook Triggers
   └─ /api/stripe/webhook receives event
   └─ Signature verified ✅
   └─ Database updated ✅

🔟 Success!
    ├─ User sees confirmation
    ├─ Email receipt sent
    ├─ John becomes customer
    └─ Revenue recorded! 💰
```

---

## Common Issues Flowchart

```
         Something not working?
                  ↓
    ┌─────────────────────────┐
    │ Check error message     │
    └─────────────────────────┘
         ↓                ↓              ↓
    "Key not set"   "Payment failed"  "Webhook..."
         ↓                ↓              ↓
    Check .env.local  Verify keys    Check logs
    Restart server    Test with card  Restart API
    ↓                ↓              ↓
   Fixed?           Fixed?          Fixed?
    ↓                ↓              ↓
   ✅               ✅              ✅
   Continue         Continue        Continue
```

---

This visual guide should help you understand the structure and flow! 🎨

For detailed implementation, refer to the documentation files.
