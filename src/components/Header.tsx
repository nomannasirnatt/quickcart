import Link from "next/link";

const links = [
  { href: "/", label: "Catalogue" },
  { href: "/orders", label: "Orders" },
] as const;

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-black/10 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-black/60">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid size-8 place-items-center rounded-lg bg-foreground text-background">
            Q
          </span>
          QuickCart
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-black/70 transition hover:bg-black/5 hover:text-foreground dark:text-white/70 dark:hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
          {/* Route handler, not a page — must be a full navigation, not a <Link>. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/api/products"
            className="rounded-md px-3 py-1.5 font-mono text-xs text-black/50 transition hover:bg-black/5 hover:text-foreground dark:text-white/50 dark:hover:bg-white/10"
          >
            /api
          </a>
        </nav>
      </div>
    </header>
  );
}
