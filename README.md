# CPR Foodies — Full Stack Restaurant Website

A complete restaurant website built with **Next.js 14 (App Router)**, **MongoDB**, **NextAuth**, and **Razorpay**, themed in elegant black & gold for a multi-cuisine restaurant (Indian, Chinese, Continental, Fast Food).

## Features

- **Home page** — hero, highlights, featured dishes, CTA
- **Menu** — searchable/filterable by category, cuisine, veg-only
- **Cart & Checkout** — persistent cart, delivery/pickup, Razorpay payments
- **Reservations** — table booking form, status tracking
- **Reviews** — customers can rate & review (login required)
- **Contact** — contact form + map embed
- **Auth** — signup/login (NextAuth credentials, bcrypt-hashed passwords)
- **Account page** — order history & reservation history
- **Admin Dashboard** (`/admin`, admin role only):
  - Menu management (add/edit/delete/feature/hide items)
  - Orders management (view & update order status)
  - Reservations management (view & update status)
  - Contact messages inbox

## Tech Stack

- Next.js 14 (App Router, API routes)
- MongoDB + Mongoose
- NextAuth (Credentials provider, JWT sessions)
- Razorpay (payments)
- Tailwind CSS
- lucide-react icons, react-hot-toast

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

- **MONGODB_URI** — your MongoDB connection string (local or MongoDB Atlas)
- **NEXTAUTH_SECRET** — random string, generate with `openssl rand -base64 32`
- **NEXTAUTH_URL** — `http://localhost:3000` for local dev
- **RAZORPAY_KEY_ID** / **RAZORPAY_KEY_SECRET** — from your [Razorpay Dashboard](https://dashboard.razorpay.com/app/keys) (use test keys to start)
- **NEXT_PUBLIC_RAZORPAY_KEY_ID** — same value as RAZORPAY_KEY_ID (exposed to browser for checkout widget)
- **ADMIN_EMAIL** / **ADMIN_PASSWORD** — credentials for the admin account created by the seed script

### 3. Seed the database

This populates the menu with ~28 placeholder dishes and creates an admin account:

```bash
npm run seed
```

Default admin login (unless you changed `.env.local`):
- Email: `admin@cprfoodies.com`
- Password: `Admin@123`

### 4. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

### 5. Build for production

```bash
npm run build
npm run start
```

## Project Structure

```
app/
  page.js                 → Home page
  menu/page.js            → Menu (filterable)
  cart/page.js            → Cart
  checkout/page.js        → Checkout + Razorpay
  order-success/page.js   → Order confirmation
  reservations/page.js    → Table booking
  reviews/page.js         → Reviews list + submit
  contact/page.js         → Contact form + map
  about/page.js           → About page
  login/, signup/         → Auth pages
  account/page.js         → Customer order/reservation history
  admin/page.js           → Admin dashboard (tabs)
  api/                     → All backend API routes
    auth/[...nextauth]    → NextAuth
    signup                → Account creation
    menu, menu/[id]       → Menu CRUD
    reservations, [id]    → Reservations
    orders, [id]          → Orders
    reviews               → Reviews
    contact               → Contact messages
    razorpay/             → Payment order creation & verification

components/               → Shared UI components
components/admin/         → Admin dashboard tab components
models/                    → Mongoose schemas
lib/                       → DB connection, auth config
scripts/seed.js            → Database seeder
```

## Notes

- **Admin access**: log in with the seeded admin account, then visit `/admin`. Regular signups always get the `customer` role.
- **Images**: menu items use Unsplash placeholder images; replace `image` URLs in the database (via admin panel) with your own photos.
- **Payments**: Razorpay is in test mode by default with test keys — use [Razorpay test card numbers](https://razorpay.com/docs/payments/payments/test-card-upi-details/) to simulate payments.
- **Cart**: stored in browser localStorage, so it persists across sessions on the same device/browser.
