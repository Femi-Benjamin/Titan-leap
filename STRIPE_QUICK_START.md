# 🚀 Stripe Integration Complete - Quick Start Guide

## ✅ What's Been Set Up

1. **Frontend** (React/Vite) - Stripe payment UI
2. **Backend** (Express.js) - Stripe session creation
3. **Environment Variables** - API keys configured
4. **Dependencies** - All packages installed

---

## 🎯 How to Run Everything

### **Terminal 1: Start the Stripe Backend Server**
```bash
npm run stripe-backend
```

Expected output:
```
╔════════════════════════════════════════╗
║   🎉 Stripe Backend Server Running 🎉 ║
║   Port: 3000                           ║
║   URL: http://localhost:3000           ║
║   Health: http://localhost:3000/health ║
╚════════════════════════════════════════╝
```

### **Terminal 2: Start the Frontend Development Server**
```bash
npm run dev
```

Expected output:
```
➜  Local:   http://localhost:5173/
```

---

## 🧪 Test the Integration

1. **Go to Pricing Page** → Navigate to http://localhost:5173
2. **Select USD Currency** → Important! Stripe requires USD
3. **Select a Plan** → Click on Premium or any plan
4. **Fill Form** → Name, Email, Phone
5. **Click "Get Started"** → Modal opens
6. **Click "Continue to Stripe Checkout"** → Redirects to Stripe
7. **Use Test Card** → `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., 12/26)
   - CVC: Any 3 digits (e.g., 123)
8. **Complete Payment** → Success page!

---

## 📋 Environment Variables

Your `.env` file contains:

```env
# Paystack (for NGN payments)
VITE_PAYSTACK_PUBLIC_KEY=pk_test_3a00e1ea19de19...
VITE_PAYSTACK_CURRENCY=NGN

# Stripe (for USD payments)
VITE_STRIPE_PUBLIC_KEY=pk_test_51STllgGg...
STRIPE_SECRET_KEY=sk_test_51STllgGg...

# Backend URL
VITE_API_URL=http://localhost:3000
```

---

## 🔍 How It Works

### Payment Flow:
```
User selects USD currency
         ↓
Fills in payment form
         ↓
Clicks "Get Started" → Modal opens
         ↓
Clicks "Continue to Stripe Checkout"
         ↓
Frontend sends POST to backend: /api/stripe/create-session
         ↓
Backend creates Stripe checkout session with secret key
         ↓
Backend returns sessionId to frontend
         ↓
Frontend redirects to Stripe Checkout page
         ↓
User enters card details
         ↓
Stripe processes payment
         ↓
Redirects to success page
```

---

## 🐛 Troubleshooting

### ❌ "Failed to initialize checkout"
**Check:**
- ✅ Backend running on port 3000
- ✅ `npm run stripe-backend` in Terminal 1
- ✅ `STRIPE_SECRET_KEY` in `.env`
- ✅ `VITE_API_URL=http://localhost:3000` in `.env`

### ❌ "Cannot connect to http://localhost:3000"
**Fix:** 
```bash
# Kill any process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Then restart backend
npm run stripe-backend
```

### ❌ Stripe button not appearing
**Check:**
- ✅ `VITE_STRIPE_PUBLIC_KEY` is in `.env`
- ✅ Restart Vite dev server after adding keys
- ✅ Check browser console for errors (F12)

### ❌ CORS errors in console
**Should be fixed** - Backend has CORS enabled for localhost:5173

---

## 📱 Test Stripe Cards

| Card | Status | Expiry | CVC |
|------|--------|--------|-----|
| 4242 4242 4242 4242 | ✅ Success | Any future | Any |
| 4000 0000 0000 0002 | ❌ Declined | Any future | Any |
| 4000 0025 0000 3155 | ⚠️ Fraud Block | Any future | Any |

---

## 🔐 Security Notes

- ✅ **Public key** in frontend (safe)
- ✅ **Secret key** ONLY in backend (hidden)
- ✅ Never commit `.env` to Git (already ignored)
- ✅ In production, use HTTPS and live keys

---

## 📦 Project Structure

```
titan-leap/
├── src/
│   ├── Components/
│   │   ├── Pricing.tsx          ← Main pricing page
│   │   └── StripeCheckout.tsx   ← Stripe payment form
│   └── ...
├── stripe-backend.js            ← Express server
├── .env                         ← Your keys (not in Git)
├── package.json                 ← npm config with scripts
└── ...
```

---

## 🚀 Production Deployment

### For Frontend (Vercel/Netlify):
```bash
npm run build
# Deploy dist/ folder
```

### For Backend (Heroku/Railway):
```bash
# Push code to hosting platform
# Set environment variables in dashboard
# Update VITE_API_URL to your backend URL
```

### Important Steps:
1. Get production Stripe keys (pk_live_ and sk_live_)
2. Update .env with production keys
3. Set up webhooks for payment confirmations
4. Enable HTTPS everywhere
5. Test thoroughly before going live

---

## 📚 Helpful Resources

- [Stripe Docs](https://stripe.com/docs/payments/checkout)
- [Express.js Docs](https://expressjs.com/)
- [React/Vite Docs](https://vitejs.dev/)

---

## ✨ Next Steps

1. **Test payments** with test cards
2. **Set up database** to store transactions
3. **Add email notifications** for confirmations
4. **Create thank you page** after payment
5. **Set up webhooks** for automatic confirmations
6. **Go live** with production credentials

---

**Got questions?** Check the browser console (F12) for detailed error messages!

Happy coding! 🎉
