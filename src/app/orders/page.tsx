import Link from "next/link";

import RefreshButton from "@/components/RefreshButton";
import { currency, fetchOrders } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const { items: orders } = await fetchOrders();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">Orders</h1>
        <RefreshButton />
      </div>

      <p className="mt-2 text-black/60 dark:text-white/60">
        Read from{" "}
        <code className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-sm dark:bg-white/10">
          GET /api/orders
        </code>
        . Orders live in memory, so they clear when the server restarts.
      </p>

      {orders.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-black/15 p-10 text-center text-black/50 dark:border-white/15 dark:text-white/50">
          No orders yet — open a product and place one from the{" "}
          <Link href="/" className="underline underline-offset-4">
            catalogue
          </Link>
          .
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-black/10 rounded-xl border border-black/10 dark:divide-white/10 dark:border-white/10">
          {orders.map((order) => (
            <li key={order.id} className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <p className="truncate font-medium">{order.productName}</p>
                <p className="mt-0.5 font-mono text-xs text-black/50 dark:text-white/50">
                  {order.id} ·{" "}
                  {new Date(order.createdAt).toLocaleString("en-GB", {
                    timeZone: "UTC",
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}{" "}
                  UTC
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-semibold tabular-nums">
                  {currency.format(order.total)}
                </p>
                <p className="text-xs text-black/50 dark:text-white/50">
                  qty {order.quantity}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
