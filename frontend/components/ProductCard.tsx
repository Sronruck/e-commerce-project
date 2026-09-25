"use client";

import Link from "next/link";
import { Star, ArrowUpRight } from "lucide-react";
import { Product } from "@/lib/types";

// ลิงก์รูปภาพของแท้ตรงรุ่น Fear of God Essentials แต่ละสี (สำรองกรณีสินค้าไม่มีรูป)
const HOODIE_IMAGE_MAP: Record<string, string> = {
  gray: "https://d2cva83hdk3bwc.cloudfront.net/fear-of-god-essentials-fleece-hoodie-light-heather-gray-2.jpg",
  sand: "https://img.sasom.co.th/fear-of-god-essentials-fleece-hoodie-desert-sand-1-n.jpg?width=1920&quality=75",
  black: "https://d2cva83hdk3bwc.cloudfront.net/192as252050f-fear-of-god-essentials-classic-fit-fleece-hoodie-jet-black-1.jpg",
};

export default function ProductCard({ product }: { product: Product }) {
  const resolveImage = () => {
    // 1. ตรวจหารูปภาพจริงของสินค้าก่อนเสมอ (ทั้งแบบสตริงตรงๆ หรือ object จาก Prisma)
    const existing =
      (typeof product.images?.[0] === "string" ? product.images[0] : null) ||
      (product as any).images?.[0]?.url ||
      (product as any).imageUrl;

    if (existing && typeof existing === "string") {
      // ถ้ารูปเป็น URL ภายนอก (http) ให้ใช้ได้ทันที
      if (existing.startsWith("http")) {
        return existing;
      }
    }

    // 2. ถ้าเป็นสินค้า Fear of God หรือไม่มี URL รูปภายนอก ให้จับคู่ตามสี
    const name = (product.name || "").toLowerCase();

    if (name.includes("desert") || name.includes("sand") || name.includes("beige")) {
      return HOODIE_IMAGE_MAP.sand;
    }
    if (name.includes("black") || name.includes("jet")) {
      return HOODIE_IMAGE_MAP.black;
    }
    return HOODIE_IMAGE_MAP.gray;
  };

  const imageSrc = resolveImage();

  return (
    <Link href={`/product/${product.id}`} className="group flex flex-col">
      {/* Container แสดงรูปภาพสินค้า */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#F4F4F4] transition-all duration-500 hover:shadow-lg">
        <img
          src={imageSrc}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* แผ่นฟิล์มไล่ระดับแสง */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* ปุ่มลูกศรลอยมุมขวาบน */}
        <div className="absolute right-3.5 top-3.5 flex h-8 w-8 translate-y-1 items-center justify-center rounded-full bg-white/90 text-neutral-800 opacity-0 shadow-sm backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-neutral-900 hover:text-white">
          <ArrowUpRight size={15} />
        </div>
      </div>

      {/* ข้อมูลชื่อและราคาสินค้า */}
      <div className="mt-3.5 flex flex-col gap-1 px-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-sm font-medium text-neutral-900 group-hover:text-neutral-600 transition-colors">
            {product.name}
          </h3>
          {product.rating !== undefined && (
            <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-neutral-700">
              <Star size={11} className="fill-amber-400 text-amber-400" />
              {product.rating.toFixed(1)}
            </span>
          )}
        </div>

        <p className="text-sm font-semibold text-neutral-900">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}