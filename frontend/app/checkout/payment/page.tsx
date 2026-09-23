"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CreditCard, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";

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
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart);
        const subtotal = items.reduce(
          (sum: number, it: any) => sum + (it.product?.price || 0) * (it.quantity || 1),
          0
        );
        setTotal(subtotal > 0 ? subtotal + 5 : 0);
      } catch {
        setTotal(43.99);
      }
    } else {
      setTotal(43.99);
    }
  }, []);

  async function handlePay() {
    setPlacing(true);

    const currentCart = localStorage.getItem("cart");
    const savedShipping = localStorage.getItem("shippingAddress");

    const cartItems = currentCart ? JSON.parse(currentCart) : [];
    const shipping = savedShipping ? JSON.parse(savedShipping) : {};

    // 1. สำรองข้อมูลสินค้าสำหรับแสดงผลหน้าเว็บ
    if (currentCart) {
      localStorage.setItem("lastOrder", currentCart);
    }

    // 2. ดึง JWT Token สำหรับผ่าน JwtAuthGuard
    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("access_token") ||
      localStorage.getItem("jwt");

    // 3. จัด Format ข้อมูลให้ตรงกับ CreateOrderDto ใน Backend
    const orderPayload = {
      items: cartItems.map((it: any) => ({
        variantId: it.variant?.id || it.variantId || "v1",
        quantity: Number(it.quantity || 1),
      })),
      paymentMethod: method,
      shippingFirstName: shipping.firstName || "Customer",
      shippingLastName: shipping.lastName || "",
      shippingPhone: shipping.phone || "0800000000",
      shippingAddress: shipping.address || "Address",
      shippingCity: shipping.city || "Bangkok",
      shippingState: shipping.state || "Bangkok",
      shippingPostalCode: shipping.postalCode || "10110",
      shippingCountry: shipping.country || "Thailand",
    };

    let createdOrderId = "o1";

    try {
      // 4. ส่ง Request ไปสร้าง Order ใน NestJS และบันทึกเข้า Neon Database
      const res = await fetch("http://localhost:4000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(orderPayload),
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.id || data?.orderNumber) {
          createdOrderId = data.id || data.orderNumber;
        }
      } else {
        console.warn("API response not ok:", await res.text());
      }
    } catch (err) {
      console.error("Failed to connect to backend:", err);
    }

    // 5. เคลียร์ตะกร้าสินค้า
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cart-updated"));
    localStorage.setItem(`orderStatus_${createdOrderId}`, "SHIPPED");

    router.push(`/account/orders/${createdOrderId}`);
  }

  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-lg px-6 py-10">
        <button
          onClick={() => router.push("/checkout")}
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black"
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        <div className="rounded-xl bg-brand-mint p-6">
          <h2 className="mb-4 text-sm font-semibold">Payment Methods</h2>
          <div className="space-y-3">
            {METHODS.map((m) => (
              <label
                key={m.key}
                className={`flex cursor-pointer items-start gap-3 rounded-lg bg-white p-3 transition-all ${
                  method === m.key ? "ring-2 ring-brand-teal shadow-sm" : ""
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
                        <input
                          placeholder="MM/YY"
                          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none"
                        />
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
              className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={handlePay}
              disabled={placing}
              className="flex-1 rounded-lg bg-black py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 disabled:opacity-60 transition-colors"
            >
              {placing ? "Processing..." : `Pay $${total.toFixed(2)}`}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}