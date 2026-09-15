"use client";

import {
  AreaChart, Area, BarChart, Bar, XAxis, ResponsiveContainer, Tooltip,
} from "recharts";
import { ChevronDown } from "lucide-react";

// TODO: replace all mock series below with real data from
// GET /admin/analytics/revenue, GET /admin/orders?limit=3, GET /admin/analytics/customers
const revenueData = [
  { month: "Jan", value: 120 }, { month: "Feb", value: 300 }, { month: "Mar", value: 500 },
  { month: "Jun", value: 900 }, { month: "Wed", value: 700 },
];

const customerBarData = [
  { month: "Jan", value: 90 }, { month: "Feb", value: 180 }, { month: "Mar", value: 110 },
  { month: "Apr", value: 150 }, { month: "May", value: 30 },
];

const customerAreaData = [
  { month: "Jan", value: 200 }, { month: "Feb", value: 400 }, { month: "Mar", value: 900 },
  { month: "Apr", value: 650 }, { month: "May", value: 950 },
];

const recentOrders = [
  { name: "Product heave Jacket", meta: "Product · 7, 2023", price: "$35.00" },
  { name: "Product Heights", meta: "Product · 3, 2023", price: "$20.00" },
  { name: "Product Litur Red", meta: "Product · 1, 2023", price: "$20.00" },
];

function CardHeader({ title, filterLabel }: { title: string; filterLabel: string }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-sm font-semibold text-admin-text">{title}</h3>
      <button className="flex items-center gap-1 rounded-lg bg-admin-cardLight px-3 py-1 text-xs text-admin-muted">
        {filterLabel} <ChevronDown size={12} />
      </button>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div className="rounded-2xl bg-admin-card p-5">
        <CardHeader title="Total Revenue" filterLabel="All Month" />
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8FA0C2" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#8FA0C2" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" stroke="#9AA3B2" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "#2B3341", border: "none", borderRadius: 8, fontSize: 12 }} />
            <Area type="monotone" dataKey="value" stroke="#B7C2DA" fill="url(#revFill)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-2xl bg-admin-card p-5">
        <CardHeader title="Recent Orders" filterLabel="All day" />
        <div className="space-y-3">
          {recentOrders.map((o) => (
            <div key={o.name} className="flex items-center gap-3 rounded-xl bg-admin-cardLight/40 p-2">
              <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-admin-cardLight" />
              <div className="flex-1">
                <p className="text-sm font-medium text-admin-text">{o.name}</p>
                <p className="text-xs text-admin-muted">{o.meta}</p>
              </div>
              <p className="text-sm font-semibold text-admin-text">{o.price}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-admin-card p-5">
        <CardHeader title="Customer Insights" filterLabel="All neah" />
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={customerBarData}>
            <XAxis dataKey="month" stroke="#9AA3B2" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "#2B3341", border: "none", borderRadius: 8, fontSize: 12 }} />
            <Bar dataKey="value" fill="#8FA0C2" radius={[8, 8, 8, 8]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-2xl bg-admin-card p-5">
        <CardHeader title="Customer Insights" filterLabel="All Day" />
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={customerAreaData}>
            <defs>
              <linearGradient id="custFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6C8CFF" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#6C8CFF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" stroke="#9AA3B2" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "#2B3341", border: "none", borderRadius: 8, fontSize: 12 }} />
            <Area type="monotone" dataKey="value" stroke="#6C8CFF" fill="url(#custFill)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
