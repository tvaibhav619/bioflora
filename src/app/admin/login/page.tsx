"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Lock, ArrowLeft, AlertCircle, KeyRound, Check } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@bioflora.com");
  const [password, setPassword] = useState("Bioflora2026!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const staffProfiles = [
    {
      name: "Dr. Elena Vance, MD",
      role: "Medical Director & Practice Owner",
      badge: "Owner",
      email: "admin@bioflora.com",
    },
    {
      name: "Marcus Thorne, MPAS PA-C",
      role: "Clinical Reviewer",
      badge: "Clinical",
      email: "clinical@bioflora.com",
    },
    {
      name: "Aesthetic Content Editor",
      role: "Content & Editorial Editor",
      badge: "Editor",
      email: "editor@bioflora.com",
    },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.message || "Invalid administrative credentials.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError("An unexpected network error occurred.");
      setLoading(false);
    }
  };

  const quickFill = (targetEmail: string) => {
    setEmail(targetEmail);
    setPassword("Bioflora2026!");
    setError(null);
  };

  return (
    <div className="py-12 sm:py-20 bg-ivory min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white border border-stone p-8 sm:p-10 rounded-3xl shadow-sm">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-charcoal-muted hover:text-forest transition-colors mb-6 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </Link>

          <div className="flex items-center gap-2 mb-2">
            <span className="p-2 bg-sage rounded-xl text-forest">
              <Lock className="w-5 h-5" />
            </span>
            <span className="text-xs font-mono uppercase bg-forest text-ivory px-2 py-0.5 rounded font-bold">
              Restricted Area
            </span>
          </div>

          <h1 className="font-serif-luxury text-3xl font-medium text-forest">
            Staff Portal Sign In
          </h1>
          <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
            Authorized administrative access for medical directors, clinical reviewers, and operations staff.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-forest mb-1 font-mono">
              Staff Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="staff@bioflora.com"
              className="w-full px-3.5 py-2.5 bg-ivory border border-stone rounded-xl text-xs sm:text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-forest mb-1 font-mono">
              Security Key / Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 bg-ivory border border-stone rounded-xl text-xs sm:text-sm text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-forest hover:bg-forest-dark text-ivory rounded-full text-xs font-semibold uppercase tracking-widest transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? "Authenticating Session..." : "Authorize Administrative Session"}
          </button>
        </form>

        <div className="pt-6 border-t border-stone/40 space-y-3">
          <span className="block text-[10px] font-mono uppercase tracking-wider text-charcoal-muted font-bold">
            Authorized Demonstration Credentials:
          </span>
          <div className="space-y-2">
            {staffProfiles.map((p) => (
              <button
                key={p.email}
                type="button"
                onClick={() => quickFill(p.email)}
                className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                  email === p.email
                    ? "border-forest bg-sage-light/70 ring-1 ring-forest"
                    : "border-stone/60 hover:bg-ivory"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-forest">{p.name}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-stone/40 text-charcoal">
                      {p.badge}
                    </span>
                  </div>
                  <span className="text-[11px] text-charcoal-muted">{p.email}</span>
                </div>
                {email === p.email && <Check className="w-4 h-4 text-forest" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
