import { NextResponse } from "next/server";

import { delay, orders, products } from "@/lib/data";
import type { Order } from "@/lib/types";

export const dynamic = "force-dynamic";

/** GET /api/orders — newest first. */
export async function GET() {
  await delay(150);

  const items = [...orders].reverse();
  return NextResponse.json({ count: items.length, items });
}

/** POST /api/orders — body: { productId: string, quantity?: number } */
export async function POST(request: Request) {
  await delay(400);

  let body: { productId?: string; quantity?: number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const quantity = Number(body.quantity ?? 1);

  if (!body.productId) {
    return NextResponse.json({ error: "productId is required" }, { status: 400 });
  }

  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
    return NextResponse.json(
      { error: "quantity must be a whole number between 1 and 10" },
      { status: 400 },
    );
  }

  const product = products.find((item) => item.id === body.productId);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  if (product.stock < quantity) {
    return NextResponse.json(
      { error: `Only ${product.stock} left in stock` },
      { status: 409 },
    );
  }

  product.stock -= quantity;

  const order: Order = {
    id: `ord-${(orders.length + 1).toString().padStart(4, "0")}`,
    productId: product.id,
    productName: product.name,
    quantity,
    total: Math.round(product.price * quantity * 100) / 100,
    createdAt: new Date().toISOString(),
  };

  orders.push(order);

  return NextResponse.json(order, { status: 201 });
}
