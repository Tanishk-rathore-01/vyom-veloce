# VYOM Veloce
India's premier luxury vehicle marketplace — **Born in India. Built for the World.**

## Live demo
- **Production:** https://vyom-veloce.vercel.app

## Tech stack
- React + Vite
- Tailwind CSS v4 via `@tailwindcss/vite`
- Framer Motion animations
- React Router
- Supabase (database + auth)
- Pexels API (vehicle photography)
- Razorpay (40% booking payment flow)
- Vercel deployment (`vercel.json` SPA rewrites)

## Features
- Cinematic homepage with brand reveal, featured vehicles, headquarters, expansion roadmap, and modifications preview
- Collection page with search + filters (category, brand, origin, INR ranges)
- Vehicle detail page with Razorpay booking flow (`Book Now — Pay 40% Online`) and handover balance messaging
- Modification request form (`modification_requests` in Supabase)
- Vehicle listing request form (`listing_requests` in Supabase)
- About page with mission, team placeholders, headquarters, future expansion
- Email/password auth (`/login`, `/signup`)
- Admin dashboard (`/admin`) protected by `VITE_ADMIN_EMAIL` match
  - Add/view/delete vehicle listings
  - View modification requests
  - View listing requests
- Premium 404 and unauthorized states
- Global loading skeletons and empty/error states on data-driven views

## Environment variables
Create `.env` at project root:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_PEXELS_API_KEY=your-pexels-api-key
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
VITE_ADMIN_EMAIL=admin@vyomveloce.com
```

## Supabase setup
1. Create a new Supabase project.
2. Open SQL Editor and run `supabase/schema.sql`.
3. Ensure **Email auth** is enabled and email confirmation is disabled if you want instant signup sessions.
4. Update admin policy email in `supabase/schema.sql` if using DB-level admin enforcement.

## Local development
Install dependencies 

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

Lint:

```bash
npm run lint
```

Build:

```bash
npm run build
```

## Deployment (Vercel)
1. Push repository to GitHub.
2. Import project into Vercel (or use linked repo `Tanishk-rathore-01/vyom-veloce`).
3. Add all `VITE_*` environment variables in Vercel project settings (see `.env.example`).
4. Deploy. SPA rewrites are handled by `vercel.json`.

**Production env vars configured:** Supabase URL/anon key, admin email, Pexels API key, Razorpay test key ID.

## Notes
- Tailwind CSS v4 is configured via `@tailwindcss/vite` (no `tailwind.config.js` required).
- Pexels image fetches are cached in `localStorage` for 24 hours.
- Booking flow charges 40% online and clearly states remaining 60% is payable at handover.
