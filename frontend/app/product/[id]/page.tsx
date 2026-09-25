"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ShoppingBag, Check } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/data/mock";

// รูปภาพสำรองเฉพาะเสื้อฮู้ด Essentials (fallback)
const HOODIE_IMAGE_MAP: Record<string, string> = {
  gray: "https://d2cva83hdk3bwc.cloudfront.net/fear-of-god-essentials-fleece-hoodie-light-heather-gray-2.jpg",
  sand: "https://img.sasom.co.th/fear-of-god-essentials-fleece-hoodie-desert-sand-1-n.jpg?width=1920&quality=75",
  black: "https://d2cva83hdk3bwc.cloudfront.net/192as252050f-fear-of-god-essentials-classic-fit-fleece-hoodie-jet-black-1.jpg",
};

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
  const [activeThumb, setActiveThumb] = useState(0);

  const selectedVariant = product.variants.find(
    (v) => v.color === selectedColor && v.size === selectedSize
  ) ?? product.variants[0];

  // คืนค่ารูปภาพตามสินค้า: ถ้ามี images ให้ใช้รูปจากสินค้า ถ้าไม่มีค่อยดูตามสี
  const currentImage = useMemo(() => {
    if (product.images && product.images.length > 0) {
      return product.images[activeThumb] || product.images[0];
    }

    const c = (selectedColor || "").toLowerCase();
    const name = (product.name || "").toLowerCase();

    if (c.includes("sand") || c.includes("desert") || name.includes("sand")) {
      return HOODIE_IMAGE_MAP.sand;
    }
    if (c.includes("black") || c.includes("jet") || name.includes("black")) {
      return HOODIE_IMAGE_MAP.black;
    }
    return HOODIE_IMAGE_MAP.gray;
  }, [product, activeThumb, selectedColor]);

  // รายการรูปรวมสำหรับแสดง Thumbnail
  const galleryImages = useMemo(() => {
    if (product.images && product.images.length > 0) {
      return product.images;
    }
    return [currentImage];
  }, [product, currentImage]);

  // ฟังก์ชัน Add to Cart ที่บันทึกเข้า localStorage และยิง Event ไปหา Navbar
  function addToCart() {
    if (!selectedVariant) return;

    try {
      const stored = localStorage.getItem("cart");
      const cart = stored ? JSON.parse(stored) : [];

      const existingIndex = cart.findIndex(
        (item: any) =>
          item.product?.id === product.id && item.variant?.id === selectedVariant.id
      );

      if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
      } else {
        cart.push({
          product,
          variant: selectedVariant,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cart-updated"));

      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-neutral-900">
      <Navbar />
      <section className="mx-auto max-w-5xl px-6 py-10">
        <Link href="/shop" className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors">
          <ArrowLeft size={18} />
          <span>Back to shop</span>
        </Link>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* ส่วนแสดงรูปภาพสินค้า */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100 shadow-sm border border-neutral-200/60">
              <img
                src={currentImage}
                alt={product.name}
                className="h-full w-full object-cover object-center transition-all duration-300"
              />
            </div>

            {/* แกลเลอรี่รูปย่อด้านล่าง */}
            <div className="mt-3 flex gap-2">
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveThumb(i)}
                  className={`h-16 w-16 overflow-hidden rounded-lg border bg-neutral-100 transition-all ${
                    activeThumb === i ? "border-neutral-900 ring-1 ring-neutral-900" : "border-neutral-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* รายละเอียดสินค้าและตัวเลือก */}
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-neutral-900">{product.name}</h1>
            <p className="mt-2 text-2xl font-semibold text-neutral-900">${product.price.toFixed(2)}</p>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">{product.description}</p>

            {/* เลือกสี */}
            <p className="mt-6 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Color: <span className="text-neutral-800">{selectedColor}</span>
            </p>
            <div className="flex gap-2">
              {colors.map((c) => {
                const swatch = product.variants.find((v) => v.color === c)?.colorHex || (
                  c.toLowerCase().includes("gray") ? "#B8B8B8" :
                  c.toLowerCase().includes("sand") ? "#D2B48C" : "#1A1A1A"
                );
                return (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    style={{ backgroundColor: swatch }}
                    className={`h-8 w-8 rounded-full border-2 transition-all ${
                      selectedColor === c ? "border-neutral-900 scale-105" : "border-white shadow-sm"
                    }`}
                    aria-label={c}
                  />
                );
              })}
            </div>

            {/* เลือกขนาด */}
            <p className="mt-6 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Size</p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`rounded-xl border px-4 py-2 text-xs font-medium transition-all ${
                    selectedSize === s
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {selectedVariant && (
              <p className="mt-3 text-xs text-gray-400">
                {selectedVariant.stock > 0 ? `${selectedVariant.stock} in stock` : "Out of stock"}
              </p>
            )}

            {/* ปุ่ม ADD TO CART */}
            <button
              onClick={addToCart}
              disabled={!selectedVariant || selectedVariant.stock === 0}
              className={`mt-8 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-semibold tracking-wider uppercase transition-all duration-200 disabled:opacity-40 ${
                added
                  ? "bg-emerald-700 text-white"
                  : "bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm"
              }`}
            >
              {added ? (
                <>
                  <Check size={16} />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={16} />
                  <span>ADD TO BAG</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}