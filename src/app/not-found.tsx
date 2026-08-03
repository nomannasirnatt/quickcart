import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-5 py-24 text-center">
      <p className="font-mono text-sm text-black/50 dark:text-white/50">404</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-2 text-black/60 dark:text-white/60">
        The product may have been removed, or the URL is wrong.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-90"
      >
        Back to catalogue
      </Link>
    </main>
  );
}
