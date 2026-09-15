"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import { products } from "@/data/mock";

// TODO: replace with real cart state (zustand store / backend cart API)
const cartItems = [
  { product: products[0], variant: products[0].variants[0], quantity: 1 },
];

export default function CartPage() {
  const subtotal = cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const shipping = cartItems.length > 0 ? 5 : 0;
  const total = subtotal + shipping;

  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/shop" className="text-gray-500"><ArrowLeft size={18} /></Link>
          <h1 className="text-sm font-semibold uppercase tracking-wide">Shopping bag</h1>
          <ShoppingBag size={18} />
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            {cartItems.length === 0 && (
              <p className="text-sm text-gray-400">ตะกร้าของคุณว่างเปล่า</p>
            )}
            {cartItems.map((item) => (
              <div key={item.variant.id} className="flex gap-4 rounded-xl border border-gray-100 p-4">
                <div className="h-24 w-20 flex-shrink-0 rounded-lg bg-gray-100" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.product.name}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    {item.variant.color} / {item.variant.size}
                  </p>
                  <div className="mt-3 flex items-center gap-3 text-sm">
                    <button className="h-7 w-7 rounded border border-gray-300">-</button>
                    <span>{item.quantity}</span>
                    <button className="h-7 w-7 rounded border border-gray-300">+</button>
                  </div>
                </div>
                <p className="text-sm font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-gray-100 p-6 h-fit">
            <h2 className="mb-4 text-sm font-semibold uppercase text-gray-500">Order Summary</h2>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
            </div>
            <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 text-sm font-semibold">
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
            <label className="mt-4 flex items-start gap-2 text-xs text-gray-500">
              <input type="checkbox" className="mt-0.5" />
              I agree to the Terms and Conditions
            </label>
            <Link
              href="/checkout"
              className="mt-6 block rounded-lg bg-gray-300 py-2.5 text-center text-sm font-semibold text-gray-600 hover:bg-brand-teal hover:text-white"
            >
              CONTINUE
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
