import { NextResponse } from "next/server";

import { categories, delay, products } from "@/lib/data";
import type { Product } from "@/lib/types";

export const dynamic = "force-dynamic";

/**
 * GET /api/products?q=watch&category=Wearables&sort=price-asc
 * The dummy backend: filtering, sorting and searching over the in-memory catalogue.
 */
export async function GET(request: Request) {
  await delay();

  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") ?? "").trim().toLowerCase();
  const category = searchParams.get("category") ?? "";
  const sort = searchParams.get("sort") ?? "";

  let items: Product[] = products;

  if (query) {
    items = items.filter((product) =>
      [product.name, product.description, product.category, ...product.tags]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }

  if (category && category !== "All") {
    items = items.filter((product) => product.category === category);
  }

  if (sort === "price-asc") {
    items = [...items].sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    items = [...items].sort((a, b) => b.price - a.price);
  } else if (sort === "rating") {
    items = [...items].sort((a, b) => b.rating - a.rating);
  }

  return NextResponse.json({ count: items.length, categories, items });
}
