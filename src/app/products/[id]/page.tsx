import Link from "next/link";
import { notFound } from "next/navigation";

import AddToCartButton from "@/components/AddToCartButton";
import { currency, fetchProduct } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetchProduct(id);

  if (!product) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-10">
      <Link
        href="/"
        className="text-sm text-black/60 underline-offset-4 hover:underline dark:text-white/60"
      >
        ← Back to catalogue
      </Link>

      <article className="mt-6 rounded-2xl border border-black/10 p-6 dark:border-white/10 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <span className="text-6xl" aria-hidden>
            {product.emoji}
          </span>
          <span className="rounded-full bg-black/5 px-3 py-1 text-xs text-black/60 dark:bg-white/10 dark:text-white/60">
            {product.category}
          </span>
        </div>

        <h1 className="mt-5 text-2xl font-semibold tracking-tight">{product.name}</h1>
        <p className="mt-2 text-black/60 dark:text-white/60">{product.description}</p>

        <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <span className="text-3xl font-semibold tabular-nums">
            {currency.format(product.price)}
          </span>
          <span className="text-sm text-black/60 dark:text-white/60">
            ★ {product.rating} rating
          </span>
          <span className="text-sm text-black/60 dark:text-white/60">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </span>
        </div>

        <ul className="mt-5 flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-black/10 px-2.5 py-1 font-mono text-xs text-black/60 dark:border-white/15 dark:text-white/60"
            >
              #{tag}
            </li>
          ))}
        </ul>

        <hr className="my-6 border-black/10 dark:border-white/10" />

        <AddToCartButton productId={product.id} disabled={product.stock === 0} />

        <p className="mt-6 font-mono text-xs text-black/40 dark:text-white/40">
          GET /api/products/{product.id} · POST /api/orders
        </p>
      </article>
    </main>
  );
}
