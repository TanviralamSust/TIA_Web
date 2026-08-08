# Toronto Islamic Academy Website

A public website + admin CMS for Toronto Islamic Academy (JK–Grade 8), built with Next.js and Payload CMS.

## Tech Stack

- **Next.js 16** (App Router, TypeScript) with **Payload CMS 3** embedded in the same app
- **Postgres** database, hosted on [Neon](https://neon.tech)
- **Vercel Blob** for uploaded images (staff photos, activity photos) — falls back to local disk automatically if no token is set, so local dev works without it
- **Tailwind CSS 4** for styling
- **Stripe** for one-time donation checkout
- **Resend** for form-submission email notifications (optional — submissions always land in `/admin` either way)
- Deploys to **Vercel**

## Local Development

```bash
npm install
npm run dev
```

Visit:
- **Public site:** http://localhost:3000
- **Admin panel:** http://localhost:3000/admin

The first time you visit `/admin`, you'll be prompted to create an admin user (email + password). That account can then log in and manage everything on the site.

### Environment variables

Copy `.env.example` to `.env` and fill in real values when you're ready:

| Variable | Purpose |
|---|---|
| `PAYLOAD_SECRET` | Random secret used to sign sessions. Already generated for local dev — generate a new one for production. |
| `DATABASE_URI` | Your [Neon](https://neon.tech) Postgres connection string (`postgres://user:password@host/dbname?sslmode=require`). |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token for image uploads. Optional for local dev — uploads just use local disk if it's blank. Vercel sets this automatically in production once a Blob store is connected to the project. |
| `RESEND_API_KEY`, `NOTIFICATION_EMAIL_FROM`, `NOTIFICATION_EMAIL_TO` | If set, the Admissions and Contact forms email a notification here via [Resend](https://resend.com) whenever someone submits. If left blank, submissions are still saved and visible under **Admission Inquiries** / **Contact Submissions** in `/admin` — nothing is lost, you just won't get an email ping. |
| `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY` | Real keys from your [Stripe dashboard](https://dashboard.stripe.com/apikeys) turn on live donations. With the placeholder values, the Donate page still works but shows a friendly "not yet configured" message instead of charging a card. |

### Seeding starter content

`npm run seed` populates the Home, About, Admissions, Academics, Donate, and Contact page content with real copy adapted from the current tiacademy.com site, so the site isn't empty on first run. It's safe to re-run — it overwrites those specific fields, not staff or activities. **Staff** and **Recent Activities** are intentionally left empty for you to fill in with real people and events via `/admin`.

## Using the Admin Panel

Log into `/admin` to:

- **Site Settings** — school name, logo, phone, email, address, office hours, social links
- **Home / About / Admissions / Academics / Donate / Contact Page** (under *Globals*) — edit the text content of each public page
- **Staff** — add/edit/remove staff members and reorder them via the `order` field (lower number = shown first)
- **Activities** — publish "Recent Activities" posts with a main photo, extra gallery photos, an optional YouTube link, and a description. The 3 most recent published activities show on the home page automatically.
- **Admission Inquiries** / **Contact Submissions** — view everything submitted through the public forms
- **Media** — all uploaded images live here; images are automatically resized for thumbnails, cards, and hero banners

Only logged-in admin users can see form submissions or edit content — everything else on the public site is read-only for visitors.

## Donations (Stripe)

The Donate page creates a Stripe Checkout session server-side (`src/app/api/stripe/checkout/route.ts`) and redirects to Stripe's hosted, secure checkout page — no card details ever touch this server. To go live:

1. Create a [Stripe account](https://dashboard.stripe.com) if you don't have one.
2. Copy your **Secret key** and **Publishable key** into `.env` as `STRIPE_SECRET_KEY` / `STRIPE_PUBLISHABLE_KEY`.
3. Restart the server. That's it — no code changes needed.

Start with Stripe's **test mode** keys to try a full checkout flow risk-free before switching to live keys.

## Deploying to Vercel

1. **Push this repo to GitHub**, then in Vercel: **Add New → Project** and import it.
2. **Add a Blob store**: in the new Vercel project, go to **Storage → Create Database → Blob**, and connect it to this project. Vercel automatically adds `BLOB_READ_WRITE_TOKEN` as an environment variable for you — you don't need to copy it manually.
3. **Set the remaining environment variables** in the project's **Settings → Environment Variables**:
   - `PAYLOAD_SECRET` — generate a new random string for production (don't reuse the local dev one)
   - `DATABASE_URI` — your Neon connection string
   - `NEXT_PUBLIC_SERVER_URL` — your real domain, e.g. `https://tiacademy.com`
   - `RESEND_API_KEY`, `NOTIFICATION_EMAIL_FROM`, `NOTIFICATION_EMAIL_TO` — once you're ready for email notifications
   - `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY` — once you're ready for live donations
4. **Deploy.** Payload creates the database tables in Neon automatically on first boot — no manual migration step needed.
5. **Visit `yourdomain.com/admin`** and create your first admin user — this is a fresh production database, separate from your local one, so you'll re-enter real Staff/Activities content here (or ask for a one-off script to copy your local content over).
6. **Point your domain's DNS** at Vercel if you're using a custom domain like tiacademy.com — Vercel's project settings walk you through this under **Settings → Domains**.

## Production Build

```bash
npm run build
npm run start
```

## Project Structure

```
src/
  app/
    (frontend)/       # Public website pages
    (payload)/        # Payload admin panel + REST/GraphQL API routes
    api/stripe/        # Stripe checkout route
  collections/         # Payload collections: Staff, Activities, Admission Inquiries, Contact Submissions, Media, Users
  globals/              # Payload globals: one per editable page (Home, About, Admissions, Academics, Donate, Contact) + Site Settings
  components/           # Shared UI components (Header, Footer, cards, etc.)
  lib/                  # Small helpers (email, rate limiting, Payload client, etc.)
  seed/                 # Starter content seed script (`npm run seed`)
```
