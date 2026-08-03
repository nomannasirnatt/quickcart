/**
 * Skeleton for the catalogue only. It lives inside the (catalogue) route group on
 * purpose: a loading.tsx at the app/ root would wrap every route in a Suspense
 * boundary, and the streamed shell would make /products/<unknown> answer 200
 * instead of a real 404.
 */
export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 animate-pulse px-5 py-10">
      <div className="h-9 w-48 rounded-lg bg-black/10 dark:bg-white/10" />
      <div className="mt-3 h-5 w-full max-w-xl rounded bg-black/5 dark:bg-white/5" />

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-20 rounded-xl bg-black/5 dark:bg-white/[.06]" />
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-44 rounded-xl bg-black/5 dark:bg-white/[.06]" />
        ))}
      </div>
    </main>
  );
}
