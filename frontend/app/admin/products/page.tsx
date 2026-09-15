"use client";

import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { products } from "@/data/mock";

export default function AdminProductsPage() {
  function handleDelete(id: string) {
    // TODO: call DELETE /admin/products/:id then refresh list
    if (confirm("ลบสินค้านี้ใช่ไหม?")) {
      console.log("delete", id);
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-admin-text">Products</h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 rounded-full bg-admin-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          <Plus size={16} /> Add product
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl bg-admin-card">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase text-admin-muted">
            <tr>
              <th className="px-5 py-4">Product</th>
              <th className="px-5 py-4">Brand</th>
              <th className="px-5 py-4">Price</th>
              <th className="px-5 py-4">Stock</th>
              <th className="px-5 py-4">Tags</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const stock = p.variants.reduce((s, v) => s + v.stock, 0);
              return (
                <tr key={p.id} className="border-t border-admin-border/40 text-admin-text">
                  <td className="flex items-center gap-3 px-5 py-4">
                    <div className="h-10 w-10 rounded-lg bg-admin-cardLight" />
                    <span className="line-clamp-1">{p.name}</span>
                  </td>
                  <td className="px-5 py-4 text-admin-muted">{p.brand}</td>
                  <td className="px-5 py-4">${p.price.toFixed(2)}</td>
                  <td className="px-5 py-4">{stock}</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1">
                      {p.tags.map((t) => (
                        <span key={t} className="rounded-full bg-admin-cardLight px-2 py-0.5 text-xs text-admin-muted">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/products/${p.id}`} className="rounded-lg bg-admin-cardLight p-1.5 text-admin-muted hover:text-admin-text">
                        <Pencil size={14} />
                      </Link>
                      <button onClick={() => handleDelete(p.id)} className="rounded-lg bg-admin-cardLight p-1.5 text-red-400">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
