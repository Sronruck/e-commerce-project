"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { categories } from "@/data/mock";

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "", brand: "", description: "", price: "", categoryId: categories[0].id,
  });
  const [loading, setLoading] = useState(false);

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/admin/products", { ...form, price: Number(form.price) });
      router.push("/admin/products");
    } catch (err) {
      alert("บันทึกไม่สำเร็จ กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl bg-admin-cardLight px-3 py-2.5 text-sm text-admin-text placeholder:text-admin-muted outline-none focus:ring-2 focus:ring-admin-accent";

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-semibold text-admin-text">Add product</h1>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-admin-card p-6">
        <input required placeholder="Product name" value={form.name}
          onChange={(e) => update("name", e.target.value)} className={inputClass} />
        <input required placeholder="Brand" value={form.brand}
          onChange={(e) => update("brand", e.target.value)} className={inputClass} />
        <textarea required placeholder="Description" value={form.description}
          onChange={(e) => update("description", e.target.value)} rows={4} className={inputClass} />
        <input required type="number" step="0.01" placeholder="Price" value={form.price}
          onChange={(e) => update("price", e.target.value)} className={inputClass} />
        <select value={form.categoryId} onChange={(e) => update("categoryId", e.target.value)} className={inputClass}>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        {/* TODO: variant (color/size/stock) editor + image upload */}

        <button type="submit" disabled={loading}
          className="w-full rounded-full bg-admin-accent py-2.5 text-sm font-semibold text-white disabled:opacity-60">
          {loading ? "Saving..." : "Save product"}
        </button>
      </form>
    </div>
  );
}
