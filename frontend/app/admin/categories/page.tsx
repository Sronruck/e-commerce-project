"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { categories as initialCategories } from "@/data/mock";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [name, setName] = useState("");

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    // TODO: POST /admin/categories then refresh from server response
    setCategories((c) => [
      ...c,
      { id: crypto.randomUUID(), name, slug: name.toLowerCase().replace(/\s+/g, "-") },
    ]);
    setName("");
  }

  return (
    <div className="max-w-lg">
      <h1 className="mb-6 text-2xl font-semibold text-admin-text">Categories</h1>

      <form onSubmit={handleAdd} className="mb-6 flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New category name"
          className="w-full rounded-xl bg-admin-cardLight px-3 py-2.5 text-sm text-admin-text placeholder:text-admin-muted outline-none focus:ring-2 focus:ring-admin-accent"
        />
        <button className="flex items-center gap-1 whitespace-nowrap rounded-full bg-admin-accent px-4 py-2.5 text-sm font-medium text-white">
          <Plus size={14} /> Add
        </button>
      </form>

      <ul className="divide-y divide-admin-border/40 rounded-2xl bg-admin-card">
        {categories.map((c) => (
          <li key={c.id} className="flex items-center justify-between px-5 py-3 text-sm text-admin-text">
            <span>{c.name}</span>
            <button className="text-red-400"><Trash2 size={14} /></button>
          </li>
        ))}
      </ul>
    </div>
  );
}
