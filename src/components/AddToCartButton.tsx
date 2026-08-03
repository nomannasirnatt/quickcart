"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { Order } from "@/lib/types";

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "done"; order: Order }
  | { status: "error"; message: string };

export default function AddToCartButton({
  productId,
  disabled,
}: {
  productId: string;
  disabled?: boolean;
}) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [state, setState] = useState<State>({ status: "idle" });

  async function placeOrder() {
    setState({ status: "loading" });

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });

      const payload = await response.json();

      if (!response.ok) {
        setState({ status: "error", message: payload.error ?? "Something went wrong" });
        return;
      }

      setState({ status: "done", order: payload as Order });
      router.refresh(); // pull the updated stock count from the server
    } catch {
      setState({ status: "error", message: "Network error — is the API reachable?" });
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <label htmlFor="quantity" className="text-sm text-black/60 dark:text-white/60">
          Qty
        </label>
        <select
          id="quantity"
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
          disabled={disabled}
          className="rounded-lg border border-black/10 bg-transparent px-3 py-2 text-sm outline-none disabled:opacity-50 dark:border-white/15"
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={placeOrder}
          disabled={disabled || state.status === "loading"}
          className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {state.status === "loading" ? "Placing order…" : "Place order"}
        </button>
      </div>

      {state.status === "done" && (
        <p className="rounded-lg border border-green-600/30 bg-green-600/10 px-3 py-2 text-sm text-green-700 dark:text-green-400">
          Order <span className="font-mono">{state.order.id}</span> placed —{" "}
          {state.order.quantity} × {state.order.productName}.
        </p>
      )}

      {state.status === "error" && (
        <p className="rounded-lg border border-red-600/30 bg-red-600/10 px-3 py-2 text-sm text-red-700 dark:text-red-400">
          {state.message}
        </p>
      )}
    </div>
  );
}
