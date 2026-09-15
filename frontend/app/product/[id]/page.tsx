"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/data/mock";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id) ?? products[0];

  const colors = useMemo(
    () => Array.from(new Set(product.variants.map((v) => v.color))),
    [product]
  );
  const sizes = useMemo(
    () => Array.from(new Set(product.variants.map((v) => v.size))),
    [product]
  );

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [added, setAdded] = useState(false);

  const selectedVariant = product.variants.find(
    (v) => v.color === selectedColor && v.size === selectedSize
  );

  function addToCart() {
    // TODO: replace with real cart API / zustand store call
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-5xl px-6 py-10">
        <Link href="/shop" className="mb-6 inline-flex text-gray-500">
          <ArrowLeft size={18} />
        </Link>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <div className="aspect-square rounded-xl bg-gray-100" />
            <div className="mt-3 flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 w-16 rounded-lg bg-gray-100" />
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-lg font-semibold">{product.name}</h1>
            <p className="mt-2 text-xl font-semibold">${product.price.toFixed(2)}</p>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">{product.description}</p>

            <p className="mt-6 mb-2 text-xs font-semibold uppercase text-gray-500">Color</p>
            <div className="flex gap-2">
              {colors.map((c) => {
                const swatch = product.variants.find((v) => v.color === c)?.colorHex;
                return (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    style={{ backgroundColor: swatch }}
                    className={`h-8 w-8 rounded-full border-2 ${
                      selectedColor === c ? "border-brand-teal" : "border-transparent"
                    }`}
                    aria-label={c}
                  />
                );
              })}
            </div>

            <p className="mt-6 mb-2 text-xs font-semibold uppercase text-gray-500">Size</p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`rounded-lg border px-3 py-1.5 text-sm ${
                    selectedSize === s
                      ? "border-brand-teal bg-brand-teal text-white"
                      : "border-gray-300 text-gray-700"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {selectedVariant && (
              <p className="mt-2 text-xs text-gray-400">
                {selectedVariant.stock > 0 ? `${selectedVariant.stock} in stock` : "Out of stock"}
              </p>
            )}

            <button
              onClick={addToCart}
              disabled={!selectedVariant || selectedVariant.stock === 0}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-dark py-3 text-sm font-semibold text-white disabled:opacity-40"
            >
              <ShoppingBag size={16} />
              {added ? "Added!" : "ADD"}
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
