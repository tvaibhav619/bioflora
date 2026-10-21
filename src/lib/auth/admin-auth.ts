import { cookies } from "next/headers";

export type AdminRole = "owner" | "admin" | "content_editor" | "clinical_reviewer";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  title: string;
}

export const DEMO_ADMIN_USERS: Record<string, AdminUser & { passwordHash: string }> = {
  "admin@bioflora.com": {
    id: "usr-admin-1",
    email: "admin@bioflora.com",
    name: "Dr. Elena Vance, MD",
    role: "owner",
    title: "Medical Director & Practice Owner",
    passwordHash: "Bioflora2026!",
  },
  "editor@bioflora.com": {
    id: "usr-editor-1",
    email: "editor@bioflora.com",
    name: "Aesthetic Content Editor",
    role: "content_editor",
    title: "Brand & Editorial Coordinator",
    passwordHash: "Bioflora2026!",
  },
  "clinical@bioflora.com": {
    id: "usr-clin-1",
    email: "clinical@bioflora.com",
    name: "Marcus Thorne, MPAS PA-C",
    role: "clinical_reviewer",
    title: "Clinical Safety & Review Officer",
    passwordHash: "Bioflora2026!",
  },
};

const SESSION_COOKIE_NAME = "bioflora_admin_session";

export async function getCurrentAdminUser(): Promise<AdminUser | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionToken) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(sessionToken, "base64").toString("utf-8"));
    if (payload.email && DEMO_ADMIN_USERS[payload.email]) {
      const u = DEMO_ADMIN_USERS[payload.email];
      return {
        id: u.id,
        email: u.email,
        name: u.name,
        role: u.role,
        title: u.title,
      };
    }
  } catch (e) {
    return null;
  }

  return null;
}

export function createSessionToken(user: AdminUser): string {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    createdAt: Date.now(),
  };
  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

export function verifyRolePermission(
  userRole: AdminRole,
  requiredRole: AdminRole | AdminRole[]
): boolean {
  const hierarchy: Record<AdminRole, number> = {
    owner: 4,
    admin: 3,
    clinical_reviewer: 2,
    content_editor: 1,
  };

  const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  return allowedRoles.some((r) => hierarchy[userRole] >= hierarchy[r]);
}
