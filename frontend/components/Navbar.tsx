"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, User, LogOut, ChevronDown, Package, ShieldCheck } from "lucide-react";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "SHOP", href: "/shop" },
  { label: "FEATURES", href: "/shop?tag=HOT" },
  { label: "COLLECTIONS", href: "/shop" },
  { label: "MENS", href: "/shop/mens" },
  { label: "WOMENS", href: "/shop/womens" },
  { label: "KIDS", href: "/shop/kids" },
];

interface UserData {
  name?: string;
  email?: string;
  role?: string;
}

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // ฟังก์ชันคำนวณจำนวนสินค้าทั้งหมดในตะกร้า
  const updateCartCount = () => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const items = JSON.parse(storedCart);
        if (Array.isArray(items)) {
          const totalQty = items.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
          setCartCount(totalQty);
          return;
        }
      }
      setCartCount(0);
    } catch {
      setCartCount(0);
    }
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener("cart-updated", updateCartCount);
    window.addEventListener("storage", updateCartCount);
    return () => {
      window.removeEventListener("cart-updated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  // จัดการ Scroll ซ่อน/แสดง Navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
        setIsDropdownOpen(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ตรวจสอบการล็อกอิน
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token") || localStorage.getItem("accessToken");

      if (storedUser) {
        try {
          setCurrentUser(JSON.parse(storedUser));
        } catch {
          setCurrentUser({ name: "User" });
        }
      } else if (token) {
        setCurrentUser({ name: "My Account" });
      } else {
        setCurrentUser(null);
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setCurrentUser(null);
    setIsDropdownOpen(false);
    router.push("/sign-in");
    router.refresh();
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-black/5 bg-white/95 backdrop-blur transition-all duration-300 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Fashion Store
        </Link>

        <nav className="hidden gap-8 text-sm font-medium text-gray-700 md:flex">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-black transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* ไอคอนถุงช้อปปิ้งพร้อม Badge ตัวเลข */}
          <Link
            href="/cart"
            aria-label="Shopping bag"
            className="relative rounded-full border border-gray-200 p-2 hover:bg-gray-50 transition-colors"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-black px-1 text-[10px] font-semibold text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {currentUser ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 transition-colors"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs text-white">
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="max-w-[120px] truncate">
                  {currentUser.name || currentUser.email?.split("@")[0] || "Account"}
                </span>
                <ChevronDown size={14} className={`text-gray-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl border border-gray-100 bg-white py-1.5 shadow-lg ring-1 ring-black/5">
                  <div className="border-b border-gray-100 px-4 py-2">
                    <p className="text-xs text-gray-400">Signed in as</p>
                    <p className="truncate text-sm font-medium text-gray-800">
                      {currentUser.name || currentUser.email || "Customer"}
                    </p>
                  </div>

                  {currentUser.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <ShieldCheck size={16} />
                      Admin Dashboard
                    </Link>
                  )}

                  <Link
                    href="/orders"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Package size={16} className="text-gray-500" />
                    My Orders
                  </Link>

                  <div className="my-1 border-t border-gray-100" />

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
            >
              <User size={16} />
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}