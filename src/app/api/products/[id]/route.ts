import { NextResponse } from "next/server";

import { delay, products } from "@/lib/data";

export const dynamic = "force-dynamic";

/** GET /api/products/p-003 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await delay(150);

  const { id } = await params;
  const product = products.find((item) => item.id === id);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}
