import Link from "next/link";
import { Star } from "lucide-react";
import { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
        {/* replace with next/image + real product photo once assets are ready */}
        <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
          {product.name}
        </div>
      </div>
      <div className="mt-3">
        <p className="line-clamp-1 text-sm font-medium text-gray-900">{product.name}</p>
        <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
          <span>${product.price.toFixed(2)}</span>
          <span className="text-gray-300">|</span>
          <span className="flex items-center gap-1">
            {product.rating.toFixed(1)} <Star size={12} className="fill-yellow-400 text-yellow-400" />
          </span>
        </div>
      </div>
    </Link>
  );
}
