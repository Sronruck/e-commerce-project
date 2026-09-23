"use client";

import Link from "next/link";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-100 bg-gray-50 text-gray-600">
      {/* ส่วนจุดเด่นของร้านค้า (Store Features) */}
      <div className="border-b border-gray-200/60 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-8 sm:grid-cols-3">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-black">
              <Truck size={22} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">จัดส่งฟรีทั่วประเทศ</h4>
              <p className="text-xs text-gray-500">เมื่อสั่งซื้อสินค้าครบ 990 บาทขึ้นไป</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-black">
              <RotateCcw size={22} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">เปลี่ยนคืนสินค้าสะดวก</h4>
              <p className="text-xs text-gray-500">รับประกันคืนสินค้าภายใน 14 วัน</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-black">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">ชำระเงินปลอดภัย 100%</h4>
              <p className="text-xs text-gray-500">รองรับบัตรเครดิตและพร้อมเพย์</p>
            </div>
          </div>
        </div>
      </div>

      {/* ส่วนเนื้อหาหลักของ Footer */}
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
              Fashion Store
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-500">
              จุดหมายปลายทางของแฟชั่นร่วมสมัย คัดสรรเสื้อผ้าและไอเทมมีสไตล์คุณภาพสูง เพื่อตอบสนองทุกไลฟ์สไตล์ของคุณ
            </p>
            <div className="mt-6 flex items-center gap-3 text-gray-500">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 hover:bg-black hover:text-white transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 hover:bg-black hover:text-white transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 hover:bg-black hover:text-white transition-colors">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* เมนูเลือกดูสินค้า */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900">หมวดหมู่สินค้า</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/shop" className="hover:text-black transition-colors">สินค้าทั้งหมด</Link>
              </li>
              <li>
                <Link href="/shop/mens" className="hover:text-black transition-colors">ผู้ชาย (Men)</Link>
              </li>
              <li>
                <Link href="/shop/womens" className="hover:text-black transition-colors">ผู้หญิง (Women)</Link>
              </li>
              <li>
                <Link href="/shop/kids" className="hover:text-black transition-colors">เด็ก (Kids)</Link>
              </li>
              <li>
                <Link href="/shop?tag=HOT" className="hover:text-black transition-colors">สินค้าขายดี (Popular)</Link>
              </li>
            </ul>
          </div>

          {/* บริการลูกค้า */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900">ช่วยเหลือ & นโยบาย</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/orders" className="hover:text-black transition-colors">ติดตามคำสั่งซื้อ</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black transition-colors">นโยบายการจัดส่ง</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black transition-colors">นโยบายการคืนสินค้า</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black transition-colors">ข้อกำหนดและเงื่อนไข</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black transition-colors">ความเป็นส่วนตัว</Link>
              </li>
            </ul>
          </div>

          {/* สมัครรับส่วนลด / ติดต่อ */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900">รับข่าวสาร & ส่วนลด</h4>
            <p className="mt-2 text-xs text-gray-500">ลงทะเบียนรับส่วนลด 10% สำหรับการสั่งซื้อครั้งแรก</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="กรอกอีเมลของคุณ" 
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
              <button 
                type="submit" 
                className="flex items-center justify-center gap-1 rounded-lg bg-black px-4 py-2 text-xs font-medium text-white hover:bg-gray-800 transition-colors"
              >
                <span>สมัครรับสิทธิ์</span>
                <ArrowRight size={13} />
              </button>
            </form>
          </div>
        </div>

        {/* แถบล่างสุด Copyright */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-200/60 pt-6 text-xs text-gray-400 sm:flex-row">
          <p>© 2026 Fashion Store. All rights reserved.</p>
          <div className="mt-3 flex gap-4 sm:mt-0">
            <span>Bangkok, Thailand</span>
            <span>•</span>
            <span>English / THB (฿)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}