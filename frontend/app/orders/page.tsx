"use client";

import Link from "next/link";
import { Package, ChevronRight, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function OrdersListPage() {
  const orders = [
    {
      id: "o1",
      orderNumber: "ORD-2026-00123",
      date: "23/9/2026",
      status: "SHIPPED",
      total: 156.97,
      itemsCount: 3,
    },
  ];

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-neutral-900">
      <Navbar />
      <section className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-2xl font-light tracking-tight sm:text-3xl">My Orders</h1>
        <p className="mt-1 text-xs text-neutral-500">ตรวจสอบและติดตามสถานะคำสั่งซื้อทั้งหมดของคุณ</p>

        <div className="mt-8 space-y-4">
          {orders.map((ord) => (
            <Link
              key={ord.id}
              href={`/account/orders/${ord.id}`}
              className="flex items-center justify-between rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-neutral-400"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700">
                  <Package size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-neutral-900">Order #{ord.orderNumber}</span>
                    <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-[10px] font-medium text-teal-700">
                      {ord.status}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-neutral-400">
                    <span className="flex items-center gap-1"><Clock size={12} /> {ord.date}</span>
                    <span>•</span>
                    <span>{ord.itemsCount} รายการ</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-semibold text-sm">${ord.total.toFixed(2)}</span>
                <ChevronRight size={18} className="text-neutral-400" />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}