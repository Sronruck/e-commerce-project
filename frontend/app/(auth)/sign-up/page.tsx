"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, EyeOff, Calendar } from "lucide-react";
import { api } from "@/lib/api";

export default function SignUpPage() {
  const [form, setForm] = useState({ name: "", dob: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/auth/register", form);
      window.location.href = "/sign-in";
    } catch (err: any) {
      setError(err?.response?.data?.message || "สมัครสมาชิกไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm">
        <Link href="/" className="mb-6 inline-flex text-gray-500">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-center text-xl font-semibold">Sign up</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            required
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-teal"
          />
          <div className="relative">
            <input
              required
              type="date"
              value={form.dob}
              onChange={(e) => update("dob", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-teal"
            />
            <Calendar size={16} className="pointer-events-none absolute right-3 top-2.5 text-gray-400" />
          </div>
          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-teal"
          />
          <div className="relative">
            <input
              required
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-teal"
            />
            <EyeOff size={16} className="absolute right-3 top-2.5 text-gray-400" />
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-brand-teal py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-500">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-semibold text-brand-teal">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
