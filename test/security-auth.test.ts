import { describe, it, expect } from "vitest";
import { checkRateLimit } from "../src/lib/security/rate-limit";
import {
  createSessionToken,
  verifyRolePermission,
  DEMO_ADMIN_USERS,
  AdminRole,
} from "../src/lib/auth/admin-auth";

describe("Security & Rate Limiting", () => {
  it("allows requests within configured threshold", () => {
    const key = "test-client-ip-" + Date.now();
    const result1 = checkRateLimit(key, 3, 5000);
    expect(result1.allowed).toBe(true);
    expect(result1.remaining).toBe(2);

    const result2 = checkRateLimit(key, 3, 5000);
    expect(result2.allowed).toBe(true);
    expect(result2.remaining).toBe(1);

    const result3 = checkRateLimit(key, 3, 5000);
    expect(result3.allowed).toBe(true);
    expect(result3.remaining).toBe(0);
  });

  it("blocks requests exceeding threshold with status 429 response intent", () => {
    const key = "rate-limit-blocked-" + Date.now();
    // Consume quota of 2
    checkRateLimit(key, 2, 5000);
    checkRateLimit(key, 2, 5000);

    // 3rd attempt
    const result = checkRateLimit(key, 2, 5000);
    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
  });
});

describe("Admin RBAC & Authentication", () => {
  it("correctly generates session tokens with base64 payload", () => {
    const adminUser = DEMO_ADMIN_USERS["admin@bioflora.com"];
    const token = createSessionToken(adminUser);
    expect(typeof token).toBe("string");
    expect(token.length).toBeGreaterThan(10);

    const decoded = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
    expect(decoded.email).toBe("admin@bioflora.com");
    expect(decoded.role).toBe("owner");
  });

  it("enforces hierarchical role permissions", () => {
    // Owner can access everything
    expect(verifyRolePermission("owner", "owner")).toBe(true);
    expect(verifyRolePermission("owner", "admin")).toBe(true);
    expect(verifyRolePermission("owner", "clinical_reviewer")).toBe(true);
    expect(verifyRolePermission("owner", "content_editor")).toBe(true);

    // Content editor cannot perform clinical reviews or owner actions
    expect(verifyRolePermission("content_editor", "clinical_reviewer")).toBe(false);
    expect(verifyRolePermission("content_editor", "owner")).toBe(false);
    expect(verifyRolePermission("content_editor", "content_editor")).toBe(true);

    // Clinical reviewer can review content
    expect(verifyRolePermission("clinical_reviewer", "content_editor")).toBe(true);
    expect(verifyRolePermission("clinical_reviewer", "owner")).toBe(false);

    // Admin has access to clinical and content
    expect(verifyRolePermission("admin", "clinical_reviewer")).toBe(true);
    expect(verifyRolePermission("admin", "content_editor")).toBe(true);
    expect(verifyRolePermission("admin", "owner")).toBe(false);

    // Array of allowed roles
    expect(verifyRolePermission("content_editor", ["admin", "owner"])).toBe(false);
    expect(verifyRolePermission("owner", ["admin", "owner"])).toBe(true);
    expect(verifyRolePermission("admin", ["admin", "owner"])).toBe(true);
  });
});

