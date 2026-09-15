"use client";

import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

// TODO: replace with GET /admin/orders?status=&page= from the backend
const orders = [
  { id: "#ORDER-12345", customer: "John Doe", product: "Product heave Jacket", total: "$35.00", status: "Delivered", date: "Oct 20, 2023" },
  { id: "#ORDER-12346", customer: "John Doe", product: "Product Heights", total: "$20.00", status: "Delivered", date: "Oct 20, 2023" },
  { id: "#ORDER-12347", customer: "Janusan Doe", product: "Product Litur Red", total: "$20.00", status: "Delivered", date: "Oct 20, 2023" },
  { id: "#ORDER-12348", customer: "John Doe", product: "Product Litur Red", total: "$20.00", status: "Delivered", date: "Oct 20, 2023" },
  { id: "#ORDER-12349", customer: "John Doe", product: "Product heave Jacket", total: "$35.00", status: "Delivered", date: "Oct 20, 2023" },
  { id: "#ORDER-12340", customer: "John Doe", product: "Product Litur Red", total: "$20.00", status: "Delivered", date: "Oct 20, 2023" },
];

const statusFilters = ["All", "Pending", "Shipped", "Delivered"];

export default function AdminOrdersPage() {
  const [status, setStatus] = useState("All");

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-admin-text">Orders</h1>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-medium text-admin-muted">Status</p>
          <div className="flex gap-2">
            {statusFilters.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium ${
                  status === s ? "bg-admin-cardLight text-admin-text" : "bg-admin-card text-admin-muted"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-admin-muted">Date Range</p>
          <div className="flex gap-2">
            {["Last 30 Days", "Last 10 Days", "All Month", "More"].map((d) => (
              <button key={d} className="flex items-center gap-1 rounded-full bg-admin-card px-3 py-1.5 text-xs text-admin-muted">
                {d} <ChevronDown size={12} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-admin-card">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase text-admin-muted">
            <tr>
              <th className="px-5 py-4">Order ID</th>
              <th className="px-5 py-4">Customer</th>
              <th className="px-5 py-4">Product</th>
              <th className="px-5 py-4">Total</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t border-admin-border/40 text-admin-text">
                <td className="px-5 py-4">{o.id}</td>
                <td className="px-5 py-4 text-admin-muted">{o.customer}</td>
                <td className="px-5 py-4 text-admin-muted">{o.product}</td>
                <td className="px-5 py-4">{o.total}</td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-400">
                    {o.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-admin-muted">{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 text-admin-muted">
        <button className="rounded-lg bg-admin-card p-2"><ChevronsLeft size={14} /></button>
        <button className="rounded-lg bg-admin-card p-2"><ChevronLeft size={14} /></button>
        <span className="rounded-lg bg-admin-cardLight px-3 py-1.5 text-sm text-admin-text">2</span>
        <button className="rounded-lg bg-admin-card p-2"><ChevronRight size={14} /></button>
        <button className="rounded-lg bg-admin-card p-2"><ChevronsRight size={14} /></button>
      </div>
    </div>
  );
}
