import { NextResponse } from "next/server";

import { categories, delay, products } from "@/lib/data";

export const dynamic = "force-dynamic";

/** GET /api/stats — summary numbers for the dashboard strip. */
export async function GET() {
  await delay(120);

  const inStock = products.filter((product) => product.stock > 0).length;
  const averagePrice =
    products.reduce((sum, product) => sum + product.price, 0) / products.length;

  return NextResponse.json({
    products: products.length,
    categories: categories.length,
    inStock,
    averagePrice: Math.round(averagePrice * 100) / 100,
  });
}
