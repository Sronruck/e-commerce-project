"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CreditCard, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import { products } from "@/data/mock";

const item = { product: products[0], quantity: 1 };
const shipping = 5;

const METHODS = [
  { key: "COD", label: "Pay on Delivery", desc: "Pay with cash on delivery" },
  { key: "CREDIT_CARD", label: "Credit/Debit Cards", desc: "Pay with your Credit / Debit Card" },
  { key: "BANK_TRANSFER", label: "Direct Bank Transfer", desc: "Make payment directly through bank account" },
  { key: "OTHER", label: "Other Payment Methods", desc: "Make payment through Qpay, Paypal, Paytm etc." },
] as const;

export default function PaymentPage() {
  const router = useRouter();
  const [method, setMethod] = useState<(typeof METHODS)[number]["key"]>("CREDIT_CARD");
  const [placing, setPlacing] = useState(false);

  const total = item.product.price * item.quantity + shipping;

  function handlePay() {
    setPlacing(true);
    // TODO: call POST /orders on backend, then redirect using the real order id
    setTimeout(() => router.push("/account/orders/o1"), 800);
  }

  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-lg px-6 py-10">
        <ArrowLeft size={18} className="mb-4 text-gray-500" />
        <div className="rounded-xl bg-brand-mint p-6">
          <h2 className="mb-4 text-sm font-semibold">Payment Methods</h2>
          <div className="space-y-3">
            {METHODS.map((m) => (
              <label
                key={m.key}
                className={`flex cursor-pointer items-start gap-3 rounded-lg bg-white p-3 ${
                  method === m.key ? "ring-2 ring-brand-teal" : ""
                }`}
              >
                <input
                  type="radio"
                  name="method"
                  checked={method === m.key}
                  onChange={() => setMethod(m.key)}
                  className="mt-1"
                />
                <div>
                  <p className="text-sm font-medium">{m.label}</p>
                  <p className="text-xs text-gray-500">{m.desc}</p>
                  {m.key === "CREDIT_CARD" && method === "CREDIT_CARD" && (
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
                        <CreditCard size={14} className="text-gray-400" />
                        <input placeholder="Card number" className="w-full text-sm outline-none" />
                      </div>
                      <div className="flex gap-2">
                        <input placeholder="MM/YY" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none" />
                        <div className="flex w-full items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
                          <input placeholder="CVV" className="w-full text-sm outline-none" />
                          <Lock size={14} className="text-gray-400" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </label>
            ))}
          </div>

          <div className="mt-6 flex justify-between gap-3">
            <button
              onClick={() => router.push("/checkout")}
              className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium"
            >
              Back
            </button>
            <button
              onClick={handlePay}
              disabled={placing}
              className="flex-1 rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
            >
              {placing ? "Processing..." : `Pay $${total.toFixed(2)}`}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
