"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/mock";

const TABS = [
  { key: "SALE", label: "SALE" },
  { key: "HOT", label: "HOT" },
  { key: "NEW_ARRIVAL", label: "NEW ARRIVALS" },
  { key: "ACCESSORIES", label: "ACCESSORIES" },
] as const;

export default function ShopPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("HOT");

  const filtered = products.filter((p) => p.tags.includes(tab));

  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 py-14 text-center">
        <h1 className="font-serif text-3xl font-semibold text-brand-green">Our products</h1>

        <div className="mt-6 flex justify-center gap-8 border-b border-gray-200 text-sm font-medium text-gray-500">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`-mb-px border-b-2 pb-3 ${
                tab === t.key ? "border-brand-teal text-brand-teal" : "border-transparent"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 text-left md:grid-cols-4">
          {filtered.length === 0 ? (
            <p className="col-span-full text-sm text-gray-400">ยังไม่มีสินค้าในหมวดนี้</p>
          ) : (
            filtered.map((p) => <ProductCard key={p.id} product={p} />)
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
