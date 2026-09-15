"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid, Package, ShoppingCart, LineChart, Settings, LogOut, UserCircle2,
} from "lucide-react";

const menu = [
  { label: "Dashboard", href: "/admin", icon: LayoutGrid },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Analytics", href: "/admin/analytics", icon: LineChart },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

// NOTE: wrap this layout with an auth guard (check role === "ADMIN")
// once real authentication is wired up — redirect non-admins to "/".
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-admin-bg p-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-admin-card text-admin-muted">
            <UserCircle2 size={22} />
          </div>
          <h1 className="text-lg font-semibold text-admin-text">E-Commerce Management System</h1>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-admin-card text-admin-muted hover:text-admin-text">
          <LogOut size={18} />
        </button>
      </div>

      <div className="mx-auto flex max-w-7xl gap-6">
        <aside className="w-56 flex-shrink-0 space-y-2">
          {menu.map((m) => {
            const active = pathname === m.href;
            return (
              <Link
                key={m.href}
                href={m.href}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium shadow-inner transition-colors ${
                  active
                    ? "bg-admin-cardLight text-admin-text"
                    : "bg-admin-card text-admin-muted hover:bg-admin-cardLight hover:text-admin-text"
                }`}
              >
                <m.icon size={16} /> {m.label}
              </Link>
            );
          })}
        </aside>

        <main className="flex-1 rounded-[28px] bg-admin-panel p-6">{children}</main>
      </div>
    </div>
  );
}
