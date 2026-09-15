"use client";

import { AreaChart, Area, XAxis, ResponsiveContainer, Tooltip } from "recharts";

// TODO: replace with real aggregated data from GET /admin/analytics
const salesTrend = [
  { month: "Jan", value: 400 }, { month: "Feb", value: 650 }, { month: "Mar", value: 500 },
  { month: "Apr", value: 800 }, { month: "May", value: 1100 }, { month: "Jun", value: 950 },
];

const kpis = [
  { label: "Conversion Rate", value: "3.4%" },
  { label: "Avg. Order Value", value: "$42.10" },
  { label: "Repeat Customers", value: "27%" },
  { label: "Cart Abandonment", value: "58%" },
];

export default function AdminAnalyticsPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-admin-text">Analytics</h1>

      <div className="mb-5 grid grid-cols-2 gap-4 md:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-2xl bg-admin-card p-5">
            <p className="text-xs text-admin-muted">{k.label}</p>
            <p className="mt-2 text-xl font-semibold text-admin-text">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-admin-card p-5">
        <h3 className="mb-4 text-sm font-semibold text-admin-text">Sales Trend</h3>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={salesTrend}>
            <defs>
              <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6C8CFF" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#6C8CFF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" stroke="#9AA3B2" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "#2B3341", border: "none", borderRadius: 8, fontSize: 12 }} />
            <Area type="monotone" dataKey="value" stroke="#6C8CFF" fill="url(#salesFill)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
