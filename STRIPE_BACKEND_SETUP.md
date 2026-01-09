# Stripe Backend Setup Guide

Your Stripe payment integration requires a backend server to handle session creation. Here's how to set it up:

## Quick Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install express stripe cors dotenv body-parser
```

### 2. Update Your .env File
Your `.env` file already has the required keys:
```
VITE_STRIPE_PUBLIC_KEY=pk_test_51STllgG...
STRIPE_SECRET_KEY=sk_test_51STllgG...
VITE_API_URL=http://localhost:3000
```

### 3. Run the Backend Server
**In a NEW terminal window**, navigate to your project root and run:
```bash
node stripe-backend.js
```

You should see:
```
╔════════════════════════════════════════╗
║   Stripe Backend Server Running        ║
║   Port: 3000                           ║
║   URL: http://localhost:3000           ║
╚════════════════════════════════════════╝
```

### 4. Keep Frontend Running
In another terminal, your Vite dev server should already be running:
```bash
npm run dev
```

## Architecture

```
┌─────────────────────────────────────────────────┐
│   React Frontend (Vite)                         │
│   - Port: 5173                                  │
│   - Handles UI & payment form                   │
│   - Has PUBLIC key: pk_test_...                 │
└────────────┬────────────────────────────────────┘
             │ POST /api/stripe/create-session
             ↓
┌─────────────────────────────────────────────────┐
│   Express Backend                               │
│   - Port: 3000                                  │
│   - Creates Stripe checkout sessions            │
│   - Has SECRET key: sk_test_...                 │
└─────────────────────────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────────────┐
│   Stripe APIs                                   │
│   - Creates payment sessions                    │
│   - Processes payments                          │
└─────────────────────────────────────────────────┘
```

## Testing the Integration

1. **Frontend**: Navigate to Pricing page, select a plan
2. **Choose USD Currency**: Stripe payments require USD
3. **Fill in Details**: Enter name, email, phone
4. **Click "Get Started"**: Modal opens with Stripe button
5. **Use Test Card**: `4242 4242 4242 4242` (any future date, any CVC)
6. **Verify**: Backend logs should show session creation

## Troubleshooting

### "Failed to initialize checkout"
- ✅ Backend server is running on port 3000
- ✅ `STRIPE_SECRET_KEY` is in your `.env`
- ✅ Frontend has `VITE_API_URL=http://localhost:3000`

### "Stripe public key not configured"
- ✅ `VITE_STRIPE_PUBLIC_KEY` is in `.env`
- ✅ Restart Vite dev server after adding keys

### CORS Errors
- Backend has `cors()` enabled - should allow requests from frontend
- Check browser DevTools Console for details

## Production Deployment

### For Vercel/Firebase Functions:
```javascript
// Convert stripe-backend.js to serverless function format
export default async (req, res) => {
  // Use Stripe client to create session
  // Return sessionId
}
```

### For Heroku/Railway:
```bash
git push heroku main
# Set environment variables in dashboard
# Update VITE_API_URL to your Heroku URL
```

### Important Security Notes:
1. **Never expose SECRET keys** - Only on backend
2. **Always use HTTPS** in production
3. **Set webhook secrets** for payment confirmations
4. **Verify amounts** on backend before charging

## Test Stripe Cards

| Card Number | Use | Expiry | CVC |
|------------|-----|--------|-----|
| 4242 4242 4242 4242 | Success | Any future | Any |
| 4000 0000 0000 0002 | Declined | Any future | Any |
| 4000 0025 0000 3155 | Declined (fraud) | Any future | Any |

## Next Steps

1. Set up webhook endpoint to confirm payments
2. Store transaction data in database
3. Send confirmation emails
4. Set up production Stripe account for live keys

---

**Need Help?** Check stripe-backend.js for detailed comments or visit [Stripe Docs](https://stripe.com/docs/payments/checkout)
