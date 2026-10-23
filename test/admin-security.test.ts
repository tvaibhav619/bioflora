import { describe, it, expect } from "vitest";
import {
  authenticateAdminRequest,
  verifyRolePermission,
  createSessionToken,
  DEMO_ADMIN_USERS,
} from "../src/lib/auth/admin-auth";

describe("[P0] Admin Portal Security & Authorization", () => {
  it("enforces role permissions across role hierarchy", () => {
    // Owner permissions
    expect(verifyRolePermission("owner", "owner")).toBe(true);
    expect(verifyRolePermission("owner", "admin")).toBe(true);
    expect(verifyRolePermission("owner", "clinical_reviewer")).toBe(true);
    expect(verifyRolePermission("owner", "content_editor")).toBe(true);

    // Admin permissions
    expect(verifyRolePermission("admin", "owner")).toBe(false);
    expect(verifyRolePermission("admin", "admin")).toBe(true);
    expect(verifyRolePermission("admin", "clinical_reviewer")).toBe(true);
    expect(verifyRolePermission("admin", "content_editor")).toBe(true);

    // Clinical reviewer permissions
    expect(verifyRolePermission("clinical_reviewer", "owner")).toBe(false);
    expect(verifyRolePermission("clinical_reviewer", "admin")).toBe(false);
    expect(verifyRolePermission("clinical_reviewer", "clinical_reviewer")).toBe(true);
    expect(verifyRolePermission("clinical_reviewer", "content_editor")).toBe(true);

    // Content editor permissions (restricted)
    expect(verifyRolePermission("content_editor", "owner")).toBe(false);
    expect(verifyRolePermission("content_editor", "admin")).toBe(false);
    expect(verifyRolePermission("content_editor", "clinical_reviewer")).toBe(false);
    expect(verifyRolePermission("content_editor", "content_editor")).toBe(true);
  });

  it("denies unauthenticated requests without session cookie", async () => {
    const result = await authenticateAdminRequest();
    expect("response" in result).toBe(true);
    if ("response" in result) {
      expect(result.response.status).toBe(401);
    }
  });

  it("creates valid Base64 administrative session tokens", () => {
    const user = DEMO_ADMIN_USERS["admin@bioflora.com"];
    const token = createSessionToken(user);
    expect(token).toBeDefined();

    const decoded = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
    expect(decoded.id).toBe(user.id);
    expect(decoded.email).toBe(user.email);
    expect(decoded.role).toBe("owner");
    expect(decoded.createdAt).toBeTypeOf("number");
  });
});
