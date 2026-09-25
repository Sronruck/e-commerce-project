"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { products } from "@/data/mock";

// รูปภาพสำรองเฉพาะฮู้ด Fear of God Essentials
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

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [form, setForm] = useState({
    email: "", phone: "", firstName: "", lastName: "",
    country: "Thailand", state: "", address: "", city: "", postalCode: "",
  });

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch {
        setCartItems([]);
      }
    } else if (products.length > 0) {
      setCartItems([
        { product: products[0], variant: products[0].variants[0], quantity: 1 }
      ]);
    }

    const savedShipping = localStorage.getItem("shippingAddress");
    if (savedShipping) {
      try {
        setForm(JSON.parse(savedShipping));
      } catch {}
    }

    setIsLoaded(true);
  }, []);

  const subtotal = cartItems.reduce((sum, i) => sum + (i.product?.price || 0) * (i.quantity || 1), 0);
  const shipping = cartItems.length > 0 ? 5 : 0;
  const total = subtotal + shipping;

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem("shippingAddress", JSON.stringify(form));
    router.push("/checkout/payment");
  }

  // ดึงรูปจริงของสินค้าก่อนเสมอ ถ้าไม่มีจึงค่อย fallback
  const getImage = (item: CartItemType) => {
    if (item.product?.images && item.product.images.length > 0) {
      return item.product.images[0];
    }
    const color = (item.variant?.color || "").toLowerCase();
    const name = (item.product?.name || "").toLowerCase();
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
    <main className="min-h-screen bg-white text-neutral-900">
      <Navbar />
      <section className="mx-auto max-w-4xl px-6 py-10">
        <Link href="/cart" className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-black transition-colors">
          <ArrowLeft size={18} />
          <span>Back to cart</span>
        </Link>
        <h1 className="mb-1 text-lg font-semibold uppercase">Checkout</h1>
        <div className="mb-6 flex gap-6 border-b border-gray-200 text-sm">
          <span className="border-b-2 border-black pb-2 font-medium text-black">Information</span>
          <span className="pb-2 text-gray-400">Payment</span>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <form onSubmit={handleContinue} className="md:col-span-2 space-y-6">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase text-gray-500">Contact info</p>
              <div className="space-y-3">
                <input
                  required
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                />
                <input
                  required
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                />
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase text-gray-500">Shipping address</p>
              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                />
                <input
                  required
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                />
                <input
                  required
                  placeholder="Country"
                  value={form.country}
                  onChange={(e) => update("country", e.target.value)}
                  className="col-span-2 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                />
                <input
                  required
                  placeholder="State / Region"
                  value={form.state}
                  onChange={(e) => update("state", e.target.value)}
                  className="col-span-2 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                />
                <input
                  required
                  placeholder="Address"
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  className="col-span-2 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                />
                <input
                  required
                  placeholder="City"
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                />
                <input
                  required
                  placeholder="Postal Code"
                  value={form.postalCode}
                  onChange={(e) => update("postalCode", e.target.value)}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-black px-6 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors shadow-sm"
            >
              <span>Continue to Payment</span>
              <ArrowRight size={14} />
            </button>
          </form>

          <div className="rounded-xl border border-gray-100 p-6 h-fit bg-gray-50/50 shadow-sm">
            <p className="mb-4 text-xs font-semibold uppercase text-gray-500">Your order ({cartItems.length})</p>

            <div className="space-y-4 max-h-[340px] overflow-y-auto pr-1">
              {cartItems.map((item, idx) => (
                <div key={item.variant?.id || idx} className="flex gap-3 items-center">
                  <div className="h-16 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 border border-gray-200/60">
                    <img
                      src={getImage(item)}
                      alt={item.product?.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="font-medium text-gray-900 line-clamp-1">{item.product?.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.variant?.color} / {item.variant?.size} • Qty {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    ${((item.product?.price || 0) * (item.quantity || 1)).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-2 border-t border-gray-200 pt-4 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-900 border-t border-gray-100 pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}