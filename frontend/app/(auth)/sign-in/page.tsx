"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, EyeOff } from "lucide-react";
import { api } from "@/lib/api";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.accessToken);
      window.location.href = data.user?.role === "ADMIN" ? "/admin" : "/";
    } catch (err: any) {
      setError(err?.response?.data?.message || "เข้าสู่ระบบไม่สำเร็จ");
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
        <h1 className="text-center text-xl font-semibold">Sign in</h1>
        <p className="mt-1 text-center text-sm text-gray-500">
          Please login to continue to your account.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-teal"
          />
          <div className="relative">
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-teal"
            />
            <EyeOff size={16} className="absolute right-3 top-2.5 text-gray-400" />
          </div>

          <label className="flex items-center gap-2 text-xs text-gray-600">
            <input type="checkbox" /> Keep me logged in
          </label>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-brand-teal py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-500">
          Need an account?{" "}
          <Link href="/sign-up" className="font-semibold text-brand-teal">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
