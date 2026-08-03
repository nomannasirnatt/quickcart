import Link from "next/link";

import { currency } from "@/lib/api";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col rounded-xl border border-black/10 p-4 transition hover:border-black/30 hover:shadow-sm dark:border-white/10 dark:hover:border-white/30"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-3xl" aria-hidden>
          {product.emoji}
        </span>
        <span className="rounded-full bg-black/5 px-2 py-0.5 text-xs text-black/60 dark:bg-white/10 dark:text-white/60">
          {product.category}
        </span>
      </div>

      <h2 className="mt-3 font-medium leading-snug group-hover:underline">
        {product.name}
      </h2>
      <p className="mt-1 line-clamp-2 text-sm text-black/60 dark:text-white/60">
        {product.description}
      </p>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="font-semibold tabular-nums">
          {currency.format(product.price)}
        </span>
        <span className="text-black/50 dark:text-white/50">
          {product.stock > 0 ? `★ ${product.rating}` : "Out of stock"}
        </span>
      </div>
    </Link>
  );
}
