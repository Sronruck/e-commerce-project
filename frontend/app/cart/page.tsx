"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import Navbar from "@/components/Navbar";
import { products } from "@/data/mock";

// รูปภาพตรงรุ่น Fear of God Essentials
const HOODIE_IMAGES: Record<string, string> = {
  gray: "https://d2cva83hdk3bwc.cloudfront.net/fear-of-god-essentials-fleece-hoodie-light-heather-gray-2.jpg",
  sand: "https://img.sasom.co.th/fear-of-god-essentials-fleece-hoodie-desert-sand-1-n.jpg?width=1920&quality=75",
  black: "https://d2cva83hdk3bwc.cloudfront.net/192as252050f-fear-of-god-essentials-classic-fit-fleece-hoodie-jet-black-1.jpg",
};

interface CartItemType {
  product: typeof products[0];
  variant: typeof products[0]["variants"][0];
  quantity: number;
}

export default function CartPage() {
  // เริ่มต้นโดยดึงข้อมูลจาก localStorage หากยังไม่มีให้ใช้ค่าตั้งต้นจาก mock
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch {
        setCartItems([]);
      }
    } else if (products.length > 0) {
      const initial: CartItemType[] = [
        { product: products[0], variant: products[0].variants[0], quantity: 1 },
      ];
      setCartItems(initial);
      localStorage.setItem("cart", JSON.stringify(initial));
      window.dispatchEvent(new Event("cart-updated"));
    }
    setIsLoaded(true);
  }, []);

  // ฟังก์ชัน Sync ข้อมูลลง LocalStorage และอัปเดตแจ้งเตือนไปที่ Navbar
  const syncCart = (newItems: CartItemType[]) => {
    setCartItems(newItems);
    localStorage.setItem("cart", JSON.stringify(newItems));
    window.dispatchEvent(new Event("cart-updated"));
  };

  // เพิ่ม / ลด จำนวน
  const updateQuantity = (variantId: string, delta: number) => {
    const updated = cartItems
      .map((item) => {
        if (item.variant.id === variantId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean) as CartItemType[];

    syncCart(updated);
  };

  // ลบสินค้าออกจากตะกร้า
  const removeItem = (variantId: string) => {
    const updated = cartItems.filter((item) => item.variant.id !== variantId);
    syncCart(updated);
  };

  const subtotal = cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const shipping = cartItems.length > 0 ? 5 : 0;
  const total = subtotal + shipping;

  // ค้นหารูปภาพตามสี variant หรือชื่อ
  const getImage = (item: CartItemType) => {
    const color = (item.variant.color || "").toLowerCase();
    const name = (item.product.name || "").toLowerCase();
    if (color.includes("gray") || name.includes("gray")) return HOODIE_IMAGES.gray;
    if (color.includes("sand") || name.includes("sand")) return HOODIE_IMAGES.sand;
    if (color.includes("black") || name.includes("black")) return HOODIE_IMAGES.black;
    return HOODIE_IMAGES.gray;
  };

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/shop" className="text-gray-500 hover:text-black transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-sm font-semibold uppercase tracking-wide">Shopping bag</h1>
          <ShoppingBag size={18} />
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-200 py-16 text-center">
                <p className="text-sm text-gray-500">ตะกร้าของคุณว่างเปล่า</p>
                <Link
                  href="/shop"
                  className="mt-4 inline-block rounded-lg bg-black px-5 py-2 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors"
                >
                  เลือกซื้อสินค้า
                </Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.variant.id}
                  className="flex gap-4 rounded-xl border border-gray-100 p-4 shadow-sm items-center"
                >
                  {/* แสดงรูปภาพสินค้าจริง */}
                  <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={getImage(item)}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-gray-900">{item.product.name}</p>
                      <button
                        onClick={() => removeItem(item.variant.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                        title="ลบรายการนี้"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <p className="mt-1 text-xs text-gray-500">
                      {item.variant.color} / {item.variant.size}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <button
                          onClick={() => updateQuantity(item.variant.id, -1)}
                          className="flex h-7 w-7 items-center justify-center rounded border border-gray-300 hover:bg-gray-50 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.variant.id, 1)}
                          className="flex h-7 w-7 items-center justify-center rounded border border-gray-300 hover:bg-gray-50 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <p className="text-sm font-semibold text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="rounded-xl border border-gray-100 p-6 h-fit shadow-sm bg-gray-50/50">
            <h2 className="mb-4 text-sm font-semibold uppercase text-gray-500">Order Summary</h2>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 text-sm font-semibold text-gray-900">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <label className="mt-4 flex items-start gap-2 text-xs text-gray-500 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5"
              />
              <span>I agree to the Terms and Conditions</span>
            </label>

            <Link
              href={agreed && cartItems.length > 0 ? "/checkout" : "#"}
              className={`mt-6 block rounded-lg py-2.5 text-center text-sm font-semibold transition-colors ${
                agreed && cartItems.length > 0
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
              }`}
            >
              CONTINUE
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}