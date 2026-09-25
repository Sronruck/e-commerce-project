"use client";

import { useEffect, useState, useMemo } from "react";
import { 
  TrendingUp, 
  ShoppingBag, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  RefreshCw
} from "lucide-react";
import { mockOrder } from "@/data/mock";

interface OrderItem {
  id?: string;
  quantity?: number;
  price?: number;
  product?: {
    name?: string;
    images?: string[];
  };
}

interface Order {
  id: string;
  orderNumber: string;
  total: number;
  status: string;
  createdAt: string;
  user?: {
    name?: string;
    email?: string;
  };
  shippingAddress?: {
    firstName?: string;
    lastName?: string;
  };
  items?: OrderItem[];
}

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchDashboardData = async () => {
    setIsRefreshing(true);
    let loadedOrders: Order[] = [];

    // 1. ดึงจาก Backend Database ก่อน (ถ้าเซิร์ฟเวอร์เปิดอยู่)
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch("http://localhost:5000/orders/admin/all", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          loadedOrders = data;
        }
      }
    } catch (err) {
      // Backend offline or unreachable
    }

    // 2. ถ้า Backend ไม่มีข้อมูล ให้ดึงจากข้อมูลจริงใน localStorage
    if (loadedOrders.length === 0) {
      const list: Order[] = [];

      try {
        const savedOrders = localStorage.getItem("orders");
        if (savedOrders) {
          const parsed = JSON.parse(savedOrders);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // ซิงค์สถานะล่าสุดจาก orderStatus_${id} หรือ orderStatus_${orderNumber}
            list.push(
              ...parsed.map((o: any) => {
                const overrideStatus =
                  localStorage.getItem(`orderStatus_${o.id}`) ||
                  localStorage.getItem(`orderStatus_${o.orderNumber}`);
                return {
                  ...o,
                  status: overrideStatus || o.status || "PENDING",
                };
              })
            );
          }
        }
      } catch (e) {
        console.error(e);
      }

      // ถ้าในระบบยังไม่มีออเดอร์จากการสั่งซื้อจริงเลย ให้ดึง mockOrder เป็นฐาน
      if (list.length === 0 && mockOrder) {
        const savedMockStatus = localStorage.getItem(`orderStatus_${mockOrder.id}`);
        list.push({
          id: mockOrder.id,
          orderNumber: mockOrder.orderNumber,
          total: 156.97,
          status: savedMockStatus || mockOrder.status || "SHIPPED",
          createdAt: mockOrder.createdAt || "2026-08-25T08:00:00.000Z",
          user: { 
            name: `${mockOrder.shippingAddress?.firstName || "Somchai"} ${mockOrder.shippingAddress?.lastName || "Jaidee"}`.trim(),
            email: "customer@example.com" 
          },
          items: (mockOrder.items as any[]) || [{ quantity: 1, price: 156.97 }],
        });
      }

      loadedOrders = list;
    }

    setOrders(loadedOrders);
    setLoading(false);
    setIsRefreshing(false);
    setLastUpdated(new Date());
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 4000);
    return () => clearInterval(interval);
  }, []);

  // ยอดขายรวม คำนวณเฉพาะออเดอร์ที่ไม่ถูก CANCELLED
  const totalRevenue = useMemo(() => {
    return orders
      .filter((o) => o.status !== "CANCELLED")
      .reduce((sum, o) => sum + Number(o.total || 0), 0);
  }, [orders]);

  const recentOrders = useMemo(() => {
    return [...orders];
  }, [orders]);

  return (
    <div className="space-y-8">
      {/* ส่วนหัว Live Sync */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-admin-text">Dashboard Overview</h1>
          <p className="text-xs text-admin-muted">
            Live updates synchronized with Orders Database
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-admin-card px-3 py-1.5 text-xs text-admin-muted border border-admin-border/40">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span>Live Sync</span>
            <span className="text-[10px] text-admin-muted/60">
              {mounted ? `(${lastUpdated.toLocaleTimeString()})` : ""}
            </span>
          </div>

          <button
            onClick={fetchDashboardData}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-admin-card border border-admin-border/40 text-admin-muted hover:text-white transition-colors"
            title="Refresh Data"
          >
            <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* บล็อกสถิติ 4 การ์ด */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl bg-admin-card p-5 border border-admin-border/40 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase text-admin-muted">Total Revenue</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <DollarSign size={16} />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-admin-text">
            ${totalRevenue.toFixed(2)}
          </p>
          <span className="mt-1 flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
            <TrendingUp size={12} /> Active Orders
          </span>
        </div>

        <div className="rounded-2xl bg-admin-card p-5 border border-admin-border/40 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase text-admin-muted">Total Orders</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <ShoppingBag size={16} />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-admin-text">{orders.length}</p>
          <span className="mt-1 text-[11px] text-admin-muted">คำสั่งซื้อในระบบทั้งหมด</span>
        </div>

        <div className="rounded-2xl bg-admin-card p-5 border border-admin-border/40 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase text-admin-muted">Pending Orders</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
              <Clock size={16} />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-admin-text">
            {orders.filter((o) => o.status === "PENDING" || o.status === "PROCESSING").length}
          </p>
          <span className="mt-1 text-[11px] text-amber-400">รอดำเนินการจัดส่ง</span>
        </div>

        <div className="rounded-2xl bg-admin-card p-5 border border-admin-border/40 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase text-admin-muted">Completed</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-admin-text">
            {orders.filter((o) => o.status === "DELIVERED" || o.status === "SHIPPED").length}
          </p>
          <span className="mt-1 text-[11px] text-admin-muted">จัดส่งสำเร็จเรียบร้อย</span>
        </div>
      </div>

      {/* ตาราง Recent Orders */}
      <div className="rounded-2xl bg-admin-card p-6 border border-admin-border/40 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-admin-text">Recent Orders</h2>
            <p className="text-xs text-admin-muted">คำสั่งซื้อล่าสุดจากลูกค้าที่มีการสั่งซื้อเข้ามา</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-[11px] uppercase tracking-wider text-admin-muted border-b border-admin-border/40">
              <tr>
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Items</th>
                <th className="pb-3 font-medium">Total</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-border/30">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-xs text-admin-muted">
                    ยังไม่มีรายการคำสั่งซื้อเข้ามาในระบบ
                  </td>
                </tr>
              ) : (
                recentOrders.map((ord) => {
                  const itemsCount = (ord.items || []).reduce(
                    (sum: number, it: any) => sum + Number(it.quantity || 1),
                    0
                  );
                  return (
                    <tr key={ord.id} className="text-admin-text hover:bg-admin-border/10 transition-colors">
                      <td className="py-3.5 font-medium text-xs text-brand-teal">
                        #{ord.orderNumber || ord.id.slice(0, 8)}
                      </td>
                      <td className="py-3.5">
                        <p className="text-xs font-medium">{ord.user?.name || "Customer"}</p>
                        <p className="text-[10px] text-admin-muted">{ord.user?.email || "No email"}</p>
                      </td>
                      <td className="py-3.5 text-xs text-admin-muted">
                        {itemsCount || 1} รายการ
                      </td>
                      <td className="py-3.5 text-xs font-semibold">
                        ${Number(ord.total).toFixed(2)}
                      </td>
                      <td className="py-3.5">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
                          ord.status === "DELIVERED"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : ord.status === "SHIPPED"
                            ? "bg-blue-500/10 text-blue-400"
                            : ord.status === "CANCELLED"
                            ? "bg-red-500/10 text-red-400"
                            : "bg-amber-500/10 text-amber-400"
                        }`}>
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-[11px] text-admin-muted">
                        {mounted ? new Date(ord.createdAt).toLocaleDateString() : ""}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}