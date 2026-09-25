"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, ChevronRight, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface DisplayOrder {
  id: string;
  orderNumber: string;
  date: string;
  status: string;
  total: number;
  itemsCount: number;
}

export default function OrdersListPage() {
  const [orders, setOrders] = useState<DisplayOrder[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 1. ตรวจสอบข้อมูล User ที่กำลังล็อกอินอยู่
    let currentEmail = "";
    let currentId = "";

    try {
      const uRaw =
        localStorage.getItem("user") ||
        localStorage.getItem("currentUser") ||
        localStorage.getItem("auth_user") ||
        localStorage.getItem("profile");
      if (uRaw) {
        const u = JSON.parse(uRaw);
        currentEmail = (u.email || "").toLowerCase().trim();
        currentId = String(u.id || u.sub || u.userId || "");
      }
    } catch (e) {
      console.error(e);
    }

    // ถอดรหัสอีเมลจาก JWT Token เผื่อระบบเก็บไว้ใน token
    if (!currentEmail) {
      try {
        const token =
          localStorage.getItem("token") ||
          localStorage.getItem("access_token") ||
          localStorage.getItem("jwt");
        if (token) {
          const payloadBase64 = token.split(".")[1];
          if (payloadBase64) {
            const decoded = JSON.parse(atob(payloadBase64));
            currentEmail = (decoded.email || "").toLowerCase().trim();
            currentId = String(decoded.sub || decoded.id || "");
          }
        }
      } catch (e) {
        // ignore
      }
    }

    if (!currentEmail) {
      currentEmail = (
        localStorage.getItem("email") ||
        localStorage.getItem("user_email") ||
        ""
      ).toLowerCase().trim();
    }

    let orderList: DisplayOrder[] = [];

    // 2. ดึงออเดอร์ทั้งหมดจาก localStorage
    const savedOrdersRaw = localStorage.getItem("orders");
    if (savedOrdersRaw) {
      try {
        const parsed = JSON.parse(savedOrdersRaw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const filtered = parsed.filter((o: any) => {
            const status =
              localStorage.getItem(`orderStatus_${o.id}`) ||
              localStorage.getItem(`orderStatus_${o.orderNumber}`) ||
              o.status;

            // ไม่แสดงออเดอร์ที่ถูกยกเลิกแล้ว
            if (status === "CANCELLED") return false;

            const orderEmail = (
              o.user?.email ||
              o.shippingAddress?.email ||
              ""
            ).toLowerCase().trim();
            const orderUserId = String(o.userId || o.user?.id || "");

            // ถ้ามี session ผู้ใช้ ให้เช็คตรงกัน
            if (currentEmail && orderEmail) {
              return orderEmail === currentEmail;
            }
            if (currentId && orderUserId) {
              return orderUserId === currentId;
            }

            // ถ้าไม่มี session ในเครื่อง ให้แสดงออเดอร์ทั้งหมดที่ถูกสั่งในเครื่องนี้
            return true;
          });

          orderList = filtered.map((o: any) => {
            const count = (o.items || []).reduce(
              (sum: number, it: any) => sum + Number(it.quantity || 1),
              0
            );
            return {
              id: o.id,
              orderNumber: o.orderNumber || o.id,
              date: new Date(o.createdAt || Date.now()).toLocaleDateString(),
              status:
                localStorage.getItem(`orderStatus_${o.id}`) ||
                localStorage.getItem(`orderStatus_${o.orderNumber}`) ||
                o.status ||
                "PENDING",
              total: Number(o.total || 0),
              itemsCount: count || 1,
            };
          });
        }
      } catch (err) {
        console.error("Error parsing orders:", err);
      }
    }

    setOrders(orderList);
    setIsLoaded(true);
  }, []);

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-neutral-900">
      <Navbar />
      <section className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-2xl font-light tracking-tight sm:text-3xl">My Orders</h1>
        <p className="mt-1 text-xs text-neutral-500">ตรวจสอบและติดตามสถานะคำสั่งซื้อทั้งหมดของคุณ</p>

        <div className="mt-8 space-y-4">
          {!isLoaded ? (
            <div className="py-12 text-center text-xs text-neutral-400">กำลังโหลดคำสั่งซื้อ...</div>
          ) : orders.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-200 bg-white py-16 text-center">
              <p className="text-sm text-neutral-500">คุณยังไม่มีรายการคำสั่งซื้อในบัญชีนี้</p>
              <Link
                href="/shop"
                className="mt-4 inline-block rounded-lg bg-black px-5 py-2 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors"
              >
                เลือกซื้อสินค้า
              </Link>
            </div>
          ) : (
            orders.map((ord) => (
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
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
                          ord.status === "DELIVERED"
                            ? "bg-emerald-50 text-emerald-700"
                            : ord.status === "SHIPPED"
                            ? "bg-teal-50 text-teal-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {ord.status}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-3 text-xs text-neutral-400">
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {ord.date}
                      </span>
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
            ))
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}