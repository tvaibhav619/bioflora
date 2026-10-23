import { MetadataRoute } from "next";
import {
  getTreatments,
  getCategories,
  getProviders,
  getLocations,
  getJournalArticles,
} from "@/lib/db/store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bioflora-medspa.example.com";

  const [treatments, categories, providers, locations, articles] = await Promise.all([
    getTreatments(),
    getCategories(),
    getProviders(),
    getLocations(),
    getJournalArticles(),
  ]);

  const staticPages = [
    "",
    "/about",
    "/treatments",
    "/pricing",
    "/consultation",
    "/booking",
    "/team",
    "/locations",
    "/journal",
    "/gallery",
    "/memberships",
    "/offers",
    "/gift-cards",
    "/concerns",
    "/privacy",
    "/patient-privacy",
    "/terms",
    "/cancellation-policy",
    "/accessibility",
    "/cookies",
    "/medical-disclaimer",
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/treatments" || route === "/booking" ? 0.9 : 0.7,
  }));

  const treatmentRoutes: MetadataRoute.Sitemap = treatments.map((t) => ({
    url: `${baseUrl}/treatments/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${baseUrl}/treatments/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const providerRoutes: MetadataRoute.Sitemap = providers.map((p) => ({
    url: `${baseUrl}/team/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const locationRoutes: MetadataRoute.Sitemap = locations.map((l) => ({
    url: `${baseUrl}/locations/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${baseUrl}/journal/${a.slug}`,
    lastModified: new Date(a.published_at),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...treatmentRoutes,
    ...categoryRoutes,
    ...providerRoutes,
    ...locationRoutes,
    ...articleRoutes,
  ];
}
