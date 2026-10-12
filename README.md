# CLOUDX — RIDZZ Smart Ride Booking Platform

> **Your City. Your Ride. Your Way.**

CLOUDX is the main web experience powering **RIDZZ** — a premium, futuristic ride-booking platform built with React, TypeScript, Vite, and Tailwind CSS v4.

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ (tested on v24)
- npm v9+

### Installation

```bash
cd cloudx-ridzz
npm install
npm run dev
```

The app runs at **http://localhost:5173**

### Production Build

```bash
npm run build
npm run preview
```

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── Navbar.tsx          # Sticky responsive nav with auth state
│   ├── Footer.tsx          # CLOUDX footer with links and branding
│   ├── BookingCard.tsx     # Reusable booking form (pickup, destination, ride type, fare)
│   ├── DestinationGuard.tsx# Signature safety feature — mismatch detection UI
│   └── HeroMap.tsx         # Animated canvas city map for the hero section
├── context/
│   └── AuthContext.tsx     # Auth state with demo sign-in / register + role management
├── data/
│   └── demo.ts             # All sample data: rides, drivers, users, FAQs, stats
├── pages/
│   ├── HomePage.tsx        # Full CLOUDX landing page
│   ├── BookRidePage.tsx    # Multi-step booking: form → options → confirm → success
│   ├── SignInPage.tsx      # Sign in / Register with role selector
│   ├── DashboardPage.tsx   # Customer dashboard
│   ├── MyRidesPage.tsx     # Ride history with tabs and search
│   ├── ProfilePage.tsx     # Profile editing and preferences
│   ├── DriverDashboardPage.tsx  # Driver: online toggle, incoming requests, earnings
│   ├── AdminDashboardPage.tsx   # Admin: users, drivers, bookings, stats
│   └── SupportPage.tsx    # FAQ accordion + issue report form
└── App.tsx                 # Router with role-based PrivateRoute guards
```

---

## 🎨 Design System

| Token | Value |
|---|---|
| Midnight Navy | `#081120` |
| Electric Blue | `#2878FF` |
| Cyan | `#28D7F2` |
| Font | Inter (Google Fonts) |

Utility classes defined in `src/index.css`:
- `.glass` — Glassmorphism card
- `.btn-primary` / `.btn-secondary` / `.btn-cyan` — Button variants
- `.input-field` — Styled text input
- `.card-hover` — Lift-on-hover card
- `.text-gradient` — Blue → Cyan gradient text
- `.glow-blue` / `.glow-cyan` — Ambient glow effects

---

## 🔐 Authentication (Demo Mode)

Authentication is fully **demo-only**. Any email + password combination works.

**Role selector on the sign-in page determines the role:**

| Role | Dashboard |
|---|---|
| Customer (default) | `/dashboard` |
| Driver | `/driver-dashboard` |
| Admin | `/admin-dashboard` |

> ⚠️ When a real backend is connected, replace the `signIn` and `register` functions in `src/context/AuthContext.tsx` with API calls. Store JWT tokens securely (httpOnly cookies, not localStorage).

---

## 🛡️ Destination Guard

RIDZZ's **signature safety feature**. Displays pickup and destination clearly to both rider and driver. When a mismatch between the customer's selected destination and the driver's confirmed endpoint is detected, users are warned and prompted to confirm or correct before the trip starts.

Full location comparison is enabled when a mapping/routing service (e.g., Google Maps Platform, MapmyIndia) is integrated.

---

## 🌐 Environment Variables

No secrets are required for the prototype. When you add backend services, create a `.env` file:

```env
# Never commit this file
VITE_API_BASE_URL=https://api.yourbackend.com
VITE_MAPS_API_KEY=your_maps_key_here
```

Access in code: `import.meta.env.VITE_API_BASE_URL`

> **Never expose API keys or passwords in frontend code.**

---

## 🔧 Planned Integrations

| Feature | Service |
|---|---|
| Maps & Geocoding | Google Maps Platform / MapmyIndia |
| Real-time Updates | Socket.io / Supabase Realtime |
| Authentication | Supabase Auth / Firebase Auth |
| Database | Supabase (PostgreSQL) / Firebase |
| Payments | Razorpay / Stripe |
| Fare Calculation | Backend microservice |

---

## 📋 Pages & Routes

| Route | Page | Auth |
|---|---|---|
| `/` | CLOUDX Homepage | Public |
| `/book` | Book a Ride | Public |
| `/signin` | Sign In / Register | Public |
| `/dashboard` | Customer Dashboard | Customer, Admin |
| `/my-rides` | Ride History | Customer, Admin |
| `/profile` | Profile | Any authenticated |
| `/driver-dashboard` | Driver Dashboard | Driver only |
| `/admin-dashboard` | Admin Panel | Admin only |
| `/support` | Support & FAQ | Public |

---

## ⚠️ Prototype Disclaimers

- **No real drivers** are connected. Driver cards show demo data.
- **Fares are demo estimates** — actual fare requires a backend calculation engine.
- **Live tracking is not implemented** — requires real-time backend services.
- **No payments are processed** — payment UI is a placeholder.
- **Emergency assistance** is a UI placeholder pending real service integration.

---

© 2026 CLOUDX Technologies Pvt. Ltd.
