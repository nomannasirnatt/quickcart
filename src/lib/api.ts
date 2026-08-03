import { headers } from "next/headers";

import type { Order, Product, ProductListResponse, Stats } from "@/lib/types";

/**
 * Server components need an absolute URL to call our own route handlers.
 * Works locally, on Vercel previews and on production without any config.
 */
export async function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  const headerList = await headers();
  const host =
    headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "localhost:3000";
  const protocol =
    headerList.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");

  return `${protocol}://${host}`;
}

async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${await getBaseUrl()}${path}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${path} (${response.status})`);
  }

  return response.json() as Promise<T>;
}

export function fetchProducts(searchParams: URLSearchParams) {
  const query = searchParams.toString();
  return apiGet<ProductListResponse>(`/api/products${query ? `?${query}` : ""}`);
}

export async function fetchProduct(id: string): Promise<Product | null> {
  const response = await fetch(`${await getBaseUrl()}/api/products/${id}`, {
    cache: "no-store",
  });

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`API request failed: /api/products/${id} (${response.status})`);
  }

  return response.json() as Promise<Product>;
}

export function fetchStats() {
  return apiGet<Stats>("/api/stats");
}

export function fetchOrders() {
  return apiGet<{ count: number; items: Order[] }>("/api/orders");
}

export const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
