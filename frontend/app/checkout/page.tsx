"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { products } from "@/data/mock";

const item = { product: products[0], variant: products[0].variants[0], quantity: 1 };

export default function CheckoutPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "", phone: "", firstName: "", lastName: "",
    country: "", state: "", address: "", city: "", postalCode: "",
  });

  const subtotal = item.product.price * item.quantity;
  const shipping = 5;
  const total = subtotal + shipping;

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    // TODO: persist shipping info (localStorage/state/store) before navigating
    router.push("/checkout/payment");
  }

  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-4xl px-6 py-10">
        <ArrowLeft size={18} className="mb-4 text-gray-500" />
        <h1 className="mb-1 text-lg font-semibold uppercase">Checkout</h1>
        <div className="mb-6 flex gap-6 border-b border-gray-200 text-sm">
          <span className="border-b-2 border-brand-teal pb-2 font-medium text-brand-teal">Information</span>
          <span className="pb-2 text-gray-400">Payment</span>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <form onSubmit={handleContinue} className="md:col-span-2 space-y-6">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase text-gray-500">Contact info</p>
              <div className="space-y-3">
                <input required type="email" placeholder="Email" value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                <input required placeholder="Phone" value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase text-gray-500">Shipping address</p>
              <div className="grid grid-cols-2 gap-3">
                <input required placeholder="First Name" value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                <input required placeholder="Last Name" value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                <input required placeholder="Country" value={form.country}
                  onChange={(e) => update("country", e.target.value)}
                  className="col-span-2 rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                <input required placeholder="State / Region" value={form.state}
                  onChange={(e) => update("state", e.target.value)}
                  className="col-span-2 rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                <input required placeholder="Address" value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  className="col-span-2 rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                <input required placeholder="City" value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                <input required placeholder="Postal Code" value={form.postalCode}
                  onChange={(e) => update("postalCode", e.target.value)}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </div>
            </div>

            <button type="submit" className="flex items-center gap-2 rounded-lg bg-gray-800 px-6 py-2.5 text-sm font-semibold text-white">
              Shipping <ArrowRight size={14} />
            </button>
          </form>

          <div className="rounded-xl border border-gray-100 p-6 h-fit">
            <p className="mb-4 text-xs font-semibold uppercase text-gray-500">Your order</p>
            <div className="flex gap-3">
              <div className="h-16 w-14 flex-shrink-0 rounded-lg bg-gray-100" />
              <div className="flex-1 text-sm">
                <p className="font-medium">{item.product.name}</p>
                <p className="text-xs text-gray-500">Qty {item.quantity}</p>
              </div>
              <p className="text-sm font-semibold">${subtotal.toFixed(2)}</p>
            </div>
            <div className="mt-6 space-y-2 border-t border-gray-200 pt-4 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
              <div className="flex justify-between font-semibold"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
