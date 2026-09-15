"use client";

import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "SHOP", href: "/shop" },
  { label: "FEATURES", href: "/shop?tag=HOT" },
  { label: "COLLECTIONS", href: "/shop" },
  { label: "MENS", href: "/shop/mens" },
  { label: "WOMENS", href: "/shop/womens" },
  { label: "KIDS", href: "/shop/kids" },
];

export default function Navbar() {
  return (
    <header className="w-full border-b border-black/5 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Fashion Store
        </Link>

        <nav className="hidden gap-8 text-sm font-medium text-gray-700 md:flex">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-brand-teal">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/cart" aria-label="Shopping bag" className="rounded-full border border-gray-200 p-2 hover:bg-gray-50">
            <ShoppingBag size={18} />
          </Link>
          <Link
            href="/sign-in"
            className="flex items-center gap-2 rounded-lg bg-brand-dark px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            <User size={16} />
            LOGIN
          </Link>
        </div>
      </div>
    </header>
  );
}
