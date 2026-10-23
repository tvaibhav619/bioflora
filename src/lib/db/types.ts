export type OperatingMode = "demonstration" | "production";

export type ContentStatus = "draft" | "awaiting_clinical_review" | "approved" | "published" | "archived";

export interface SiteSettings {
  id: string;
  clinic_name: string;
  tagline: string;
  operating_mode: OperatingMode;
  announcement_active: boolean;
  announcement_text: string;
  announcement_link?: string;
  primary_phone: string;
  primary_email: string;
  booking_provider: "sandbox" | "boulevard" | "jane" | "zenoti";
  booking_provider_configured: boolean;
  email_provider: "resend" | "sendgrid" | "mock";
  email_provider_configured: boolean;
  stripe_configured: boolean;
  last_updated: string;
}

export interface TreatmentCategory {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  hero_image: string;
  display_order: number;
  is_active: boolean;
}

export interface TreatmentGoal {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  detailed_overview: string;
  recommended_treatments: string[]; // treatment slugs
  display_order: number;
}

export interface Treatment {
  id: string;
  slug: string;
  name: string;
  category_id: string;
  category_slug: string;
  tagline: string;
  summary: string;
  hero_image: string;
  overview: string;
  what_it_involves: string;
  target_goals: string[]; // e.g. ["fine-lines", "skin-laxity"]
  clinical_mechanism: string;
  candidacy: string;
  contraindications: string[];
  typical_duration_minutes: number;
  preparation_guidance: string[];
  visit_expectations: string;
  aftercare_instructions: string[];
  recovery_downtime: string;
  risks_and_side_effects: string[];
  expected_timeframe: string;
  recommended_sessions: string;
  price_type: "fixed" | "starting_at" | "consultation_required";
  price_amount: number | null;
  is_sample_pricing: boolean;
  status: ContentStatus;
  reviewed_by_clinician?: string;
  clinician_license?: string;
  last_clinical_review_date?: string;
  is_featured: boolean;
  available_locations: string[]; // location slugs
  faqs: { question: string; answer: string }[];
}

export interface Provider {
  id: string;
  slug: string;
  full_name: string;
  title: string;
  credentials: string;
  license_number?: string;
  bio: string;
  photo_url: string;
  areas_of_practice: string[];
  locations: string[];
  is_demonstration_profile: boolean;
  status: "published" | "draft";
  display_order: number;
}

export interface Location {
  id: string;
  slug: string;
  name: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  phone: string;
  email: string;
  hours: { days: string; hours: string }[];
  parking_info: string;
  accessibility_info: string;
  map_query_url: string;
  image_url: string;
  is_flagship: boolean;
  display_order: number;
}

export interface Offer {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  price_display: string;
  savings_display?: string;
  valid_until?: string;
  terms: string[];
  is_active: boolean;
  category: "package" | "seasonal" | "first_time";
  booking_link: string;
}

export interface MembershipPlan {
  id: string;
  slug: string;
  name: string;
  tier_level: number;
  price_monthly: number;
  billing_period: "monthly" | "annually";
  description: string;
  included_monthly_treatments: string[];
  discount_percentage_on_services: number;
  perks: string[];
  terms: string[];
  is_active: boolean;
}

export interface ConsultationRequest {
  id: string;
  reference_number: string;
  full_name: string;
  email: string;
  phone: string;
  preferred_contact_method: "email" | "phone" | "text";
  service_interest: string;
  location_preference: string;
  preferred_time_window: string;
  privacy_consent_acknowledged: boolean;
  marketing_consent: boolean;
  status: "new" | "contacted" | "scheduled" | "archived";
  is_demonstration: boolean;
  notification_delivery_status: "delivered" | "simulated" | "failed";
  created_at: string;
}

export interface SandboxBooking {
  id: string;
  reference_number: string;
  treatment_slug: string;
  treatment_name: string;
  location_slug: string;
  provider_slug: string;
  appointment_date: string;
  time_slot: string;
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  status: "confirmed" | "cancelled" | "completed";
  is_sandbox: boolean;
  notes?: string;
  created_at: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body_markdown: string;
  cover_image: string;
  author_name: string;
  author_role: string;
  medical_reviewer_name?: string;
  medical_reviewer_title?: string;
  published_at: string;
  read_time_minutes: number;
  category: string;
  tags: string[];
  status: ContentStatus;
}

export interface Review {
  id: string;
  author_name: string;
  treatment_received: string;
  location_name: string;
  rating: number; // 1-5
  comment: string;
  date_posted: string;
  source: "illustrative_scenario" | "sample_protocol" | "verified_patient" | "google_verified" | "clinic_survey";
  is_verified: boolean;
  is_illustrative: boolean;
  clinical_protocol_notes?: string;
  clinic_response?: string;
}


export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  entity_type: string;
  entity_id: string;
  details: string;
}

export interface FunnelMetrics {
  consultation_views: number;
  consultation_starts: number;
  consultation_submits: number;
  booking_views: number;
  booking_step_1: number;
  booking_step_2: number;
  booking_step_3: number;
  booking_step_4: number;
  booking_step_5: number;
  booking_step_6: number;
  booking_confirmed: number;
  last_updated: string;
}

