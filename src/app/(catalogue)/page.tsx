import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import StatCard from "@/components/StatCard";
import { currency, fetchProducts, fetchStats } from "@/lib/api";

export const dynamic = "force-dynamic";

type SearchParams = { q?: string; category?: string; sort?: string };

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { q = "", category = "", sort = "" } = await searchParams;

  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (category && category !== "All") params.set("category", category);
  if (sort) params.set("sort", sort);

  const [stats, list] = await Promise.all([fetchStats(), fetchProducts(params)]);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-10">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight">Catalogue</h1>
        <p className="mt-2 max-w-2xl text-black/60 dark:text-white/60">
          Every product on this page is served by the app&apos;s own dummy backend at{" "}
          <code className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-sm dark:bg-white/10">
            /api/products
          </code>
          . No external service, no database — deploy it to Vercel as-is.
        </p>
      </section>

      <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Products" value={stats.products} />
        <StatCard label="Categories" value={stats.categories} />
        <StatCard label="In stock" value={stats.inStock} />
        <StatCard label="Avg. price" value={currency.format(stats.averagePrice)} />
      </dl>

      <div className="mt-8">
        <SearchBar
          query={q}
          category={category}
          sort={sort}
          categories={list.categories}
        />
      </div>

      <p className="mt-4 text-sm text-black/50 dark:text-white/50">
        {list.count} {list.count === 1 ? "result" : "results"}
        {q ? ` for “${q}”` : ""}
      </p>

      {list.count === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-black/15 p-10 text-center text-black/50 dark:border-white/15 dark:text-white/50">
          Nothing matched that search. Try clearing the filters.
        </p>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
