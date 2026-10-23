import fs from "fs";
import path from "path";
import {
  SiteSettings,
  TreatmentCategory,
  TreatmentGoal,
  Treatment,
  Provider,
  Location,
  Offer,
  MembershipPlan,
  ConsultationRequest,
  SandboxBooking,
  JournalArticle,
  Review,
  AuditLog,
  FunnelMetrics,
} from "./types";
import {
  initialSettings,
  initialCategories,
  initialGoals,
  initialTreatments,
  initialProviders,
  initialLocations,
  initialOffers,
  initialMemberships,
  initialJournalArticles,
  initialReviews,
} from "./seed-data";

export interface DatabaseState {
  settings: SiteSettings;
  categories: TreatmentCategory[];
  goals: TreatmentGoal[];
  treatments: Treatment[];
  providers: Provider[];
  locations: Location[];
  offers: Offer[];
  memberships: MembershipPlan[];
  consultation_requests: ConsultationRequest[];
  sandbox_bookings: SandboxBooking[];
  journal_articles: JournalArticle[];
  reviews: Review[];
  audit_logs: AuditLog[];
  funnel_metrics: FunnelMetrics;
}


const ROOT_DB_FILE = path.join(process.cwd(), ".data", "bioflora-db.json");
const DB_DIR = process.env.VERCEL
  ? path.join("/tmp", ".data")
  : path.join(process.cwd(), ".data");
const DB_FILE = path.join(DB_DIR, "bioflora-db.json");

function getInitialState(): DatabaseState {
  return {
    settings: { ...initialSettings },
    categories: [...initialCategories],
    goals: [...initialGoals],
    treatments: [...initialTreatments],
    providers: [...initialProviders],
    locations: [...initialLocations],
    offers: [...initialOffers],
    memberships: [...initialMemberships],
    consultation_requests: [],
    sandbox_bookings: [],
    journal_articles: [...initialJournalArticles],
    reviews: [...initialReviews],
    audit_logs: [
      {
        id: "audit-init",
        timestamp: new Date().toISOString(),
        actor: "System",
        action: "Database Initialized",
        entity_type: "system",
        entity_id: "global",
        details: "Bioflora database successfully seeded with clinical models and initial portfolio demonstration state.",
      },
    ],
    funnel_metrics: {
      consultation_views: 142,
      consultation_starts: 58,
      consultation_submits: 24,
      booking_views: 210,
      booking_step_1: 185,
      booking_step_2: 152,
      booking_step_3: 130,
      booking_step_4: 98,
      booking_step_5: 74,
      booking_step_6: 52,
      booking_confirmed: 41,
      last_updated: new Date().toISOString(),
    },
  };
}

let cachedState: DatabaseState | null = null;

function loadDatabase(): DatabaseState {
  if (cachedState && (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test" || process.env.VITEST)) {
    return cachedState;
  }

  try {
    // 1. Try reading existing file in DB_FILE
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, "utf-8");
      if (data && data.trim()) {
        cachedState = JSON.parse(data);
        if (!cachedState!.funnel_metrics) {
          cachedState!.funnel_metrics = getInitialState().funnel_metrics;
        }
        return cachedState!;
      }
    }

    // 2. If in serverless and DB_FILE in /tmp doesn't exist yet, check committed root db
    if (ROOT_DB_FILE !== DB_FILE && fs.existsSync(ROOT_DB_FILE)) {
      const rootData = fs.readFileSync(ROOT_DB_FILE, "utf-8");
      if (rootData && rootData.trim()) {
        cachedState = JSON.parse(rootData);
        saveDatabase(cachedState!);
        return cachedState!;
      }
    }
  } catch (error) {
    if (cachedState) {
      return cachedState;
    }
    console.warn("Notice: Reading database file encountered an error, falling back to seed state:", error);
  }

  if (cachedState) {
    return cachedState;
  }

  const initial = getInitialState();
  saveDatabase(initial);
  cachedState = initial;
  return cachedState;
}

function saveDatabase(state: DatabaseState): void {
  cachedState = state;
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }

    const tempFile = `${DB_FILE}.${Date.now()}.${Math.random().toString(36).slice(2)}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(state, null, 2), "utf-8");
    try {
      fs.renameSync(tempFile, DB_FILE);
    } catch {
      // Fallback if cross-device or permission race
      fs.writeFileSync(DB_FILE, JSON.stringify(state, null, 2), "utf-8");
      if (fs.existsSync(tempFile)) {
        try { fs.unlinkSync(tempFile); } catch {}
      }
    }
  } catch (error) {
    console.warn("Notice: Persistent filesystem write unavailable in current environment, retaining state in-memory:", error);
  }
}

// -------------------------------------------------------------
// Settings
// -------------------------------------------------------------
export async function getSettings(): Promise<SiteSettings> {
  const db = loadDatabase();
  return db.settings;
}

export async function updateSettings(updates: Partial<SiteSettings>): Promise<SiteSettings> {
  const db = loadDatabase();
  db.settings = {
    ...db.settings,
    ...updates,
    last_updated: new Date().toISOString(),
  };
  saveDatabase(db);
  await addAuditLog("Admin", "Update Settings", "settings", "global", JSON.stringify(updates));
  return db.settings;
}

// -------------------------------------------------------------
// Categories
// -------------------------------------------------------------
export async function getCategories(): Promise<TreatmentCategory[]> {
  const db = loadDatabase();
  return db.categories.filter((c) => c.is_active).sort((a, b) => a.display_order - b.display_order);
}

export async function getAllCategories(): Promise<TreatmentCategory[]> {
  const db = loadDatabase();
  return db.categories.sort((a, b) => a.display_order - b.display_order);
}

export async function getCategoryBySlug(slug: string): Promise<TreatmentCategory | null> {
  const db = loadDatabase();
  return db.categories.find((c) => c.slug === slug) || null;
}

// -------------------------------------------------------------
// Treatment Goals (Concerns)
// -------------------------------------------------------------
export async function getGoals(): Promise<TreatmentGoal[]> {
  const db = loadDatabase();
  return db.goals.sort((a, b) => a.display_order - b.display_order);
}

export async function getGoalBySlug(slug: string): Promise<TreatmentGoal | null> {
  const db = loadDatabase();
  return db.goals.find((g) => g.slug === slug) || null;
}

// -------------------------------------------------------------
// Treatments
// -------------------------------------------------------------
export interface TreatmentFilterOptions {
  categorySlug?: string;
  goalSlug?: string;
  search?: string;
  locationSlug?: string;
  includeUnpublished?: boolean;
}

export async function getTreatments(filters?: TreatmentFilterOptions): Promise<Treatment[]> {
  const db = loadDatabase();
  let list = db.treatments;

  if (!filters?.includeUnpublished) {
    list = list.filter((t) => t.status === "published");
  }

  if (filters?.categorySlug) {
    list = list.filter((t) => t.category_slug === filters.categorySlug);
  }

  if (filters?.goalSlug) {
    list = list.filter((t) => t.target_goals.includes(filters.goalSlug!));
  }

  if (filters?.locationSlug) {
    list = list.filter((t) => t.available_locations.includes(filters.locationSlug!));
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase().trim();
    list = list.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.overview.toLowerCase().includes(q)
    );
  }

  return list;
}

export async function getFeaturedTreatments(): Promise<Treatment[]> {
  const db = loadDatabase();
  return db.treatments.filter((t) => t.status === "published" && t.is_featured);
}

export async function getTreatmentBySlug(slug: string): Promise<Treatment | null> {
  const db = loadDatabase();
  return db.treatments.find((t) => t.slug === slug) || null;
}

export async function saveTreatment(treatment: Treatment): Promise<Treatment> {
  const db = loadDatabase();
  const idx = db.treatments.findIndex((t) => t.id === treatment.id || t.slug === treatment.slug);
  if (idx >= 0) {
    db.treatments[idx] = treatment;
    await addAuditLog("Admin", "Update Treatment", "treatment", treatment.slug, `Updated ${treatment.name}`);
  } else {
    db.treatments.push(treatment);
    await addAuditLog("Admin", "Create Treatment", "treatment", treatment.slug, `Created ${treatment.name}`);
  }
  saveDatabase(db);
  return treatment;
}

export async function deleteTreatment(slug: string): Promise<boolean> {
  const db = loadDatabase();
  const initialLen = db.treatments.length;
  db.treatments = db.treatments.filter((t) => t.slug !== slug);
  if (db.treatments.length !== initialLen) {
    saveDatabase(db);
    await addAuditLog("Admin", "Delete Treatment", "treatment", slug, `Deleted ${slug}`);
    return true;
  }
  return false;
}

// -------------------------------------------------------------
// Providers
// -------------------------------------------------------------
export async function getProviders(): Promise<Provider[]> {
  const db = loadDatabase();
  return db.providers.filter((p) => p.status === "published").sort((a, b) => a.display_order - b.display_order);
}

export async function getAllProviders(): Promise<Provider[]> {
  const db = loadDatabase();
  return db.providers.sort((a, b) => a.display_order - b.display_order);
}

export async function getProviderBySlug(slug: string): Promise<Provider | null> {
  const db = loadDatabase();
  return db.providers.find((p) => p.slug === slug) || null;
}

// -------------------------------------------------------------
// Locations
// -------------------------------------------------------------
export async function getLocations(): Promise<Location[]> {
  const db = loadDatabase();
  return db.locations.sort((a, b) => a.display_order - b.display_order);
}

export async function getLocationBySlug(slug: string): Promise<Location | null> {
  const db = loadDatabase();
  return db.locations.find((l) => l.slug === slug) || null;
}

// -------------------------------------------------------------
// Offers & Memberships
// -------------------------------------------------------------
export async function getOffers(): Promise<Offer[]> {
  const db = loadDatabase();
  return db.offers.filter((o) => o.is_active);
}

export async function getMemberships(): Promise<MembershipPlan[]> {
  const db = loadDatabase();
  return db.memberships.filter((m) => m.is_active).sort((a, b) => a.tier_level - b.tier_level);
}

// -------------------------------------------------------------
// Journal Articles
// -------------------------------------------------------------
export async function getJournalArticles(): Promise<JournalArticle[]> {
  const db = loadDatabase();
  return db.journal_articles.filter((a) => a.status === "published").sort((a, b) => b.published_at.localeCompare(a.published_at));
}

export async function getAllJournalArticles(): Promise<JournalArticle[]> {
  const db = loadDatabase();
  return db.journal_articles.sort((a, b) => b.published_at.localeCompare(a.published_at));
}

export async function getJournalArticleBySlug(slug: string): Promise<JournalArticle | null> {
  const db = loadDatabase();
  return db.journal_articles.find((a) => a.slug === slug) || null;
}

export async function saveJournalArticle(article: JournalArticle): Promise<JournalArticle> {
  const db = loadDatabase();
  const idx = db.journal_articles.findIndex((a) => a.id === article.id || a.slug === article.slug);
  if (idx >= 0) {
    db.journal_articles[idx] = article;
  } else {
    db.journal_articles.push(article);
  }
  saveDatabase(db);
  return article;
}

// -------------------------------------------------------------
// Reviews & Illustrative Clinical Protocols
// -------------------------------------------------------------
export async function getReviews(): Promise<Review[]> {
  const db = loadDatabase();
  return db.reviews.sort((a, b) => b.date_posted.localeCompare(a.date_posted));
}


// -------------------------------------------------------------
// Consultation Requests & Enquiries
// -------------------------------------------------------------
export async function getConsultationRequests(): Promise<ConsultationRequest[]> {
  const db = loadDatabase();
  return db.consultation_requests.sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function createConsultationRequest(
  data: Omit<ConsultationRequest, "id" | "reference_number" | "created_at">
): Promise<ConsultationRequest> {
  const db = loadDatabase();
  const id = `req-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const refNum = `BIO-REQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const newRequest: ConsultationRequest = {
    ...data,
    id,
    reference_number: refNum,
    created_at: new Date().toISOString(),
  };

  db.consultation_requests.unshift(newRequest);
  saveDatabase(db);

  await addAuditLog(
    "Public User",
    "Submit Consultation Request",
    "consultation_request",
    refNum,
    `Service: ${data.service_interest}, Location: ${data.location_preference}`
  );

  return newRequest;
}

export async function updateConsultationStatus(
  id: string,
  status: ConsultationRequest["status"]
): Promise<ConsultationRequest | null> {
  const db = loadDatabase();
  const req = db.consultation_requests.find((r) => r.id === id);
  if (!req) return null;

  req.status = status;
  saveDatabase(db);
  await addAuditLog("Admin", "Update Consultation Status", "consultation_request", req.reference_number, `New Status: ${status}`);
  return req;
}

// -------------------------------------------------------------
// Sandbox & Live Bookings
// -------------------------------------------------------------
export async function getSandboxBookings(): Promise<SandboxBooking[]> {
  const db = loadDatabase();
  return db.sandbox_bookings.sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function createSandboxBooking(
  data: Omit<SandboxBooking, "id" | "reference_number" | "created_at">
): Promise<SandboxBooking> {
  const db = loadDatabase();
  const id = `bk-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const refNum = `BIO-BKG-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

  const newBooking: SandboxBooking = {
    ...data,
    id,
    reference_number: refNum,
    created_at: new Date().toISOString(),
  };

  db.sandbox_bookings.unshift(newBooking);
  saveDatabase(db);

  await addAuditLog(
    "Public User (Sandbox)",
    "Create Sandbox Booking",
    "sandbox_booking",
    refNum,
    `Treatment: ${data.treatment_name}, Date: ${data.appointment_date} at ${data.time_slot}`
  );

  return newBooking;
}

export async function updateSandboxBookingStatus(
  id: string,
  status: SandboxBooking["status"]
): Promise<SandboxBooking | null> {
  const db = loadDatabase();
  const bkg = db.sandbox_bookings.find((b) => b.id === id);
  if (!bkg) return null;

  bkg.status = status;
  saveDatabase(db);
  await addAuditLog("Admin", "Update Booking Status", "sandbox_booking", bkg.reference_number, `New Status: ${status}`);
  return bkg;
}

// -------------------------------------------------------------
// Audit Logs
// -------------------------------------------------------------
export async function getAuditLogs(): Promise<AuditLog[]> {
  const db = loadDatabase();
  return db.audit_logs.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}

export async function addAuditLog(
  actor: string,
  action: string,
  entity_type: string,
  entity_id: string,
  details: string
): Promise<void> {
  const db = loadDatabase();
  const log: AuditLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toISOString(),
    actor,
    action,
    entity_type,
    entity_id,
    details,
  };
  db.audit_logs.unshift(log);
  // Keep last 500 logs
  if (db.audit_logs.length > 500) {
    db.audit_logs = db.audit_logs.slice(0, 500);
  }
  saveDatabase(db);
}

// -------------------------------------------------------------
// Privacy-Conscious Funnel Analytics & Conversion Metrics
// -------------------------------------------------------------
export async function getFunnelMetrics(): Promise<FunnelMetrics> {
  const db = loadDatabase();
  return db.funnel_metrics;
}

export type ValidFunnelEvent =
  | "consultation_views"
  | "consultation_starts"
  | "consultation_submits"
  | "booking_views"
  | "booking_step_1"
  | "booking_step_2"
  | "booking_step_3"
  | "booking_step_4"
  | "booking_step_5"
  | "booking_step_6"
  | "booking_confirmed";

export async function recordFunnelEvent(
  eventName: ValidFunnelEvent
): Promise<FunnelMetrics> {
  const db = loadDatabase();
  if (typeof db.funnel_metrics[eventName] === "number") {
    db.funnel_metrics[eventName] += 1;
    db.funnel_metrics.last_updated = new Date().toISOString();
    saveDatabase(db);
  }
  return db.funnel_metrics;
}

