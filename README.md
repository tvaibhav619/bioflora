# BIOFLORA — Luxury Medical Spa & Aesthetic Sanctuary

A multi-page medical spa website and clinical operations platform built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, and a persistent relational database architecture.

Bioflora is engineered as a flagship portfolio system demonstrating how established medical spas should look, operate, and safeguard patient data online.

---

## 1. Architectural Highlights

* **Next.js 16 (App Router)** with React Server Components by default and client boundaries only where interactive state is required.
* **Dual Operating Mode Architecture**:
  * **Portfolio Demonstration Mode** (Default): Clear illustrative notices, sandbox booking engine with realistic slot generation, sample pricing indicators, illustrative clinician profiles, and simulated transactional email notifications.
  * **Client Production Mode**: Strips demonstration banners, activates verified staff credentials, connects to live scheduling platforms (Boulevard, Jane, Zenoti), dispatches real emails via Resend/SendGrid, and enforces merchant payment processing.
* **Persistent Relational Database**:
  * Local zero-setup persistent storage (`.data/bioflora-db.json`) with atomic transactions, audit logs, and automatic seeding.
  * Full PostgreSQL / Supabase migration script located at `supabase/migrations/20261021_bioflora_schema.sql` with Row Level Security (RLS) policies and indexes.
* **Refined Botanical-Clinical Visual Identity**:
  * Deep Forest Green (`#183B32`), Warm Ivory (`#F7F4ED`), Pale Sage (`#E3E9DF`), Warm Stone (`#DAD2C5`), Muted Champagne (`#B99A6A`), and Charcoal (`#252823`).
  * Editorial typography combining **Cormorant Garamond** serif display with **Plus Jakarta Sans**.
* **WCAG 2.2 Level AA Accessibility**:
  * Complete keyboard navigation, visible 2px focus outlines, semantic landmark hierarchy, ARIA attributes on modals and accordions, and `prefers-reduced-motion` compliance.
* **Comprehensive Clinical & Legal Safeguards**:
  * Strict separation between public marketing forms and Protected Health Information (PHI).
  * No invasive third-party ad pixels on booking journeys or health concern exploration.
  * Formal HIPAA Notice of Privacy Practices, Medical Disclaimer, Cancellation Policy, and category-level Cookie Preferences.

---

## 2. Directory Structure & Key Routes

```text
├── src/
│   ├── app/
│   │   ├── page.tsx                           # Homepage (All 14 required sections)
│   │   ├── layout.tsx                         # Global layout with fonts, header, footer, cookie banner
│   │   ├── globals.css                        # Design tokens, luxury cards, WCAG focus styles
│   │   ├── treatments/
│   │   │   ├── page.tsx                       # Filterable catalogue (Search, categories, concerns, sort)
│   │   │   ├── [slug]/page.tsx                # Treatment clinical detail page (Candidacy, contraindications, downtime)
│   │   │   └── category/[slug]/page.tsx       # Dedicated category landing pages
│   │   ├── concerns/
│   │   │   ├── page.tsx                       # Goal-oriented concerns directory
│   │   │   └── [slug]/page.tsx                # Clinical concern guide with mapped treatments
│   │   ├── booking/page.tsx                   # Guided 6-step online appointment wizard
│   │   ├── consultation/page.tsx              # Safe marketing inquiry form (No PHI textboxes)
│   │   ├── about/page.tsx                     # Philosophy, safety standards, clinical pillars
│   │   ├── team/
│   │   │   ├── page.tsx                       # Clinician directory
│   │   │   └── [slug]/page.tsx                # Practitioner profile & credentials
│   │   ├── locations/
│   │   │   ├── page.tsx                       # Beverly Hills & Tribeca directories
│   │   │   └── [slug]/page.tsx                # Dedicated sanctuary detail with parking & hours
│   │   ├── pricing/page.tsx                   # Diagnostic fees & treatment schedules
│   │   ├── offers/page.tsx                    # Seasonal packages & series terms
│   │   ├── memberships/page.tsx               # The Flora Society VIP membership tiers
│   │   ├── gift-cards/page.tsx                # Digital gift certificate purchase & issuance
│   │   ├── gallery/page.tsx                   # Treatment suites & clinical safety disclosures
│   │   ├── journal/
│   │   │   ├── page.tsx                       # Editorial clinical journal
│   │   │   └── [slug]/page.tsx                # Medically reviewed articles with citations
│   │   ├── admin/page.tsx                     # Protected administration portal
│   │   ├── privacy/page.tsx                   # Privacy policy & PHI distinction
│   │   ├── terms/page.tsx                     # Terms of use
│   │   ├── cookies/page.tsx                   # Cookie policy & category controls
│   │   ├── medical-disclaimer/page.tsx        # Mandatory clinical disclaimer
│   │   ├── cancellation-policy/page.tsx       # 48-hour cancellation standard
│   │   ├── patient-privacy/page.tsx           # HIPAA Notice of Privacy Practices
│   │   ├── accessibility/
│   │   │   ├── page.tsx                       # WCAG 2.2 AA statement
│   │   │   └── feedback/page.tsx              # Accessibility issue reporting form
│   │   └── api/
│   │       ├── booking/route.ts               # Availability checking & booking persistence
│   │       ├── consultation/route.ts          # Inquiry validation & notification dispatch
│   │       └── admin/                         # Settings, treatments, and inquiry update endpoints
│   ├── components/
│   │   ├── layout/                            # Header, Footer, DemonstrationBanner
│   │   ├── compliance/                        # CookieConsent banner & modal
│   │   ├── home/                              # TreatmentDiscoveryTool, FaqAccordion
│   │   ├── treatments/                        # TreatmentCatalogueClient
│   │   ├── booking/                           # BookingWizardClient
│   │   ├── consultation/                      # ConsultationFormClient
│   │   └── admin/                             # AdminDashboardClient
│   └── lib/
│       ├── db/                                # Persistent store, schema, seed data, TypeScript types
│       ├── booking/                           # Booking adapter interface & sandbox adapter
│       ├── notifications/                     # Email notification handler (Resend / sandbox)
│       └── validations/                       # Zod form validation schemas
├── supabase/
│   └── migrations/20261021_bioflora_schema.sql # PostgreSQL DDL with RLS policies & indexes
├── test/
│   ├── validations.test.ts                    # Form schema unit tests
│   ├── booking-adapter.test.ts                # Slot generation & sandbox booking tests
│   └── db-store.test.ts                       # Database CRUD & persistence tests
```

---

## 3. Quick Start & Local Development

### Prerequisites
* Node.js v20+ or v24+
* npm or pnpm

### Installation
```bash
# Clone the repository and enter directory
cd BIOFLORA

# Install dependencies
npm install

# Run automated test suite (Vitest)
npm run test

# Run production build validation
npm run build

# Start local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.
The Administration Portal is accessible at [http://localhost:3000/admin](http://localhost:3000/admin).

---

## 4. Production Deployment & Database Migration

### Zero-Configuration Mode
By default, the application runs out-of-the-box using the built-in persistent storage engine (`.data/bioflora-db.json`), which handles full CRUD, inquiry management, and demonstration appointments without needing any external database account.

### Supabase / Managed PostgreSQL Deployment
To deploy to a production Supabase instance:
1. Create a project in [Supabase](https://supabase.com).
2. Open the SQL Editor in your Supabase dashboard and execute `supabase/migrations/20261021_bioflora_schema.sql`.
3. Set your environment variables in `.env`:
   ```bash
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key
   DATABASE_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres
   ```

---

## 5. Client Production Launch Gates

Before toggling from **Portfolio Demonstration Mode** to **Client Production Mode** for a real operating medical spa, verify the following 12 launch gates:

1. **Business Identity**: Confirm legal business registration, physical premises lease, and verified phone numbers.
2. **Clinical Licensure**: Verify medical licenses, board certifications, and supervisory protocols for all practicing physicians, PAs, and nurses.
3. **Clinical Review**: Obtain written medical director sign-off on all treatment descriptions, contraindications, and pre/post-care protocols.
4. **Booking Adapter**: Connect the live scheduling API credentials (Boulevard, Jane, or Zenoti) and map treatment IDs to active service books.
5. **Transactional Email**: Configure Resend or SendGrid with custom domain DKIM/SPF verification.
6. **Payment Merchant**: Connect Stripe Checkout for booking deposits, treatment packages, and digital gift cards.
7. **Legal Counsel Review**: Review the Patient Privacy Notice (HIPAA), Terms of Use, and Cancellation Policy with qualified healthcare counsel.
8. **Patient Media Consent**: Ensure executed HIPAA media releases are on file for all clinical before-and-after photographs.
9. **No Tracking Pixels**: Verify third-party advertising pixels are strictly excluded from booking journeys and medical concern pages.
10. **Accessibility Audit**: Perform keyboard and screen reader checks against WCAG 2.2 AA.
11. **Domain & TLS**: Map production custom domain with automated HTTPS certificate renewal.
12. **Telemetry & Backups**: Connect Sentry for error logging and enable daily automated database snapshots.
