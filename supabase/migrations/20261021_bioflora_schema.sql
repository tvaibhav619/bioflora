-- BIOFLORA Production Medical Spa Database Schema
-- Managed PostgreSQL / Supabase Compatible Migration

-- 1. Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Enums
CREATE TYPE operating_mode AS ENUM ('demonstration', 'production');
CREATE TYPE content_status AS ENUM ('draft', 'awaiting_clinical_review', 'approved', 'published', 'archived');
CREATE TYPE price_type AS ENUM ('fixed', 'starting_at', 'consultation_required');
CREATE TYPE booking_status AS ENUM ('confirmed', 'cancelled', 'completed');
CREATE TYPE request_status AS ENUM ('new', 'contacted', 'scheduled', 'archived');

-- 3. Settings Table
CREATE TABLE IF NOT EXISTS settings (
    id TEXT PRIMARY KEY DEFAULT 'global-settings',
    clinic_name TEXT NOT NULL,
    tagline TEXT NOT NULL,
    operating_mode operating_mode DEFAULT 'demonstration',
    announcement_active BOOLEAN DEFAULT TRUE,
    announcement_text TEXT,
    announcement_link TEXT,
    primary_phone TEXT NOT NULL,
    primary_email TEXT NOT NULL,
    booking_provider TEXT DEFAULT 'sandbox',
    booking_provider_configured BOOLEAN DEFAULT FALSE,
    email_provider TEXT DEFAULT 'mock',
    email_provider_configured BOOLEAN DEFAULT FALSE,
    stripe_configured BOOLEAN DEFAULT FALSE,
    last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Locations Table
CREATE TABLE IF NOT EXISTS locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    address_line1 TEXT NOT NULL,
    address_line2 TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    hours JSONB NOT NULL DEFAULT '[]'::jsonb,
    parking_info TEXT,
    accessibility_info TEXT,
    map_query_url TEXT,
    image_url TEXT,
    is_flagship BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Providers Table
CREATE TABLE IF NOT EXISTS providers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    title TEXT NOT NULL,
    credentials TEXT NOT NULL,
    license_number TEXT,
    bio TEXT NOT NULL,
    photo_url TEXT NOT NULL,
    areas_of_practice TEXT[] DEFAULT '{}',
    locations TEXT[] DEFAULT '{}',
    is_demonstration_profile BOOLEAN DEFAULT TRUE,
    status TEXT DEFAULT 'published',
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Treatment Categories Table
CREATE TABLE IF NOT EXISTS treatment_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    tagline TEXT,
    description TEXT NOT NULL,
    hero_image TEXT NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Treatment Goals Table
CREATE TABLE IF NOT EXISTS treatment_goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    short_description TEXT NOT NULL,
    detailed_overview TEXT NOT NULL,
    recommended_treatments TEXT[] DEFAULT '{}',
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Treatments Table
CREATE TABLE IF NOT EXISTS treatments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category_id UUID REFERENCES treatment_categories(id) ON DELETE SET NULL,
    category_slug TEXT NOT NULL,
    tagline TEXT NOT NULL,
    summary TEXT NOT NULL,
    hero_image TEXT NOT NULL,
    overview TEXT NOT NULL,
    what_it_involves TEXT NOT NULL,
    target_goals TEXT[] DEFAULT '{}',
    clinical_mechanism TEXT NOT NULL,
    candidacy TEXT NOT NULL,
    contraindications TEXT[] DEFAULT '{}',
    typical_duration_minutes INT NOT NULL,
    preparation_guidance TEXT[] DEFAULT '{}',
    visit_expectations TEXT NOT NULL,
    aftercare_instructions TEXT[] DEFAULT '{}',
    recovery_downtime TEXT NOT NULL,
    risks_and_side_effects TEXT[] DEFAULT '{}',
    expected_timeframe TEXT NOT NULL,
    recommended_sessions TEXT NOT NULL,
    price_type price_type DEFAULT 'starting_at',
    price_amount NUMERIC(10,2),
    is_sample_pricing BOOLEAN DEFAULT TRUE,
    status content_status DEFAULT 'published',
    reviewed_by_clinician TEXT,
    clinician_license TEXT,
    last_clinical_review_date DATE,
    is_featured BOOLEAN DEFAULT FALSE,
    available_locations TEXT[] DEFAULT '{}',
    faqs JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for Fast Catalogue Search & Filtering
CREATE INDEX IF NOT EXISTS idx_treatments_slug ON treatments(slug);
CREATE INDEX IF NOT EXISTS idx_treatments_category_slug ON treatments(category_slug);
CREATE INDEX IF NOT EXISTS idx_treatments_status ON treatments(status);
CREATE INDEX IF NOT EXISTS idx_treatments_featured ON treatments(is_featured);

-- 9. Consultation Requests Table
CREATE TABLE IF NOT EXISTS consultation_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_number TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    preferred_contact_method TEXT NOT NULL,
    service_interest TEXT NOT NULL,
    location_preference TEXT NOT NULL,
    preferred_time_window TEXT,
    privacy_consent_acknowledged BOOLEAN NOT NULL DEFAULT FALSE,
    marketing_consent BOOLEAN NOT NULL DEFAULT FALSE,
    status request_status DEFAULT 'new',
    is_demonstration BOOLEAN DEFAULT TRUE,
    notification_delivery_status TEXT DEFAULT 'simulated',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_consultation_ref ON consultation_requests(reference_number);
CREATE INDEX IF NOT EXISTS idx_consultation_status ON consultation_requests(status);

-- 10. Sandbox Bookings Table
CREATE TABLE IF NOT EXISTS sandbox_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_number TEXT UNIQUE NOT NULL,
    treatment_slug TEXT NOT NULL,
    treatment_name TEXT NOT NULL,
    location_slug TEXT NOT NULL,
    provider_slug TEXT NOT NULL,
    appointment_date DATE NOT NULL,
    time_slot TEXT NOT NULL,
    patient_name TEXT NOT NULL,
    patient_email TEXT NOT NULL,
    patient_phone TEXT NOT NULL,
    status booking_status DEFAULT 'confirmed',
    is_sandbox BOOLEAN DEFAULT TRUE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sandbox_ref ON sandbox_bookings(reference_number);

-- 11. Row Level Security (RLS) Policies
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE sandbox_bookings ENABLE ROW LEVEL SECURITY;

-- Public can view published treatments
CREATE POLICY "Public can read published treatments"
ON treatments FOR SELECT
USING (status = 'published');

-- Public can insert consultation requests
CREATE POLICY "Public can insert consultation inquiries"
ON consultation_requests FOR INSERT
WITH CHECK (TRUE);

-- Authenticated admins can perform all operations
CREATE POLICY "Admins have full access to consultation requests"
ON consultation_requests FOR ALL
TO authenticated
USING (TRUE)
WITH CHECK (TRUE);
