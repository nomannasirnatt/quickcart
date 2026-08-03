import type { Order, Product } from "@/lib/types";

/**
 * Dummy backend "database".
 * In a real app this would be Postgres/Mongo/etc. behind the same route handlers.
 */
export const products: Product[] = [
  {
    id: "p-001",
    name: "Aurora Wireless Headphones",
    description:
      "Over-ear headphones with adaptive noise cancelling and 40 hours of battery life.",
    price: 189.0,
    category: "Audio",
    rating: 4.7,
    stock: 24,
    emoji: "🎧",
    tags: ["bluetooth", "noise-cancelling", "travel"],
  },
  {
    id: "p-002",
    name: "Pulse Earbuds Mini",
    description:
      "Pocket sized earbuds with a wireless charging case and IPX5 water resistance.",
    price: 79.5,
    category: "Audio",
    rating: 4.3,
    stock: 61,
    emoji: "🎵",
    tags: ["bluetooth", "sports", "compact"],
  },
  {
    id: "p-003",
    name: "Nimbus Smart Watch",
    description:
      "AMOLED fitness watch with GPS, sleep tracking and a seven day battery.",
    price: 229.0,
    category: "Wearables",
    rating: 4.5,
    stock: 12,
    emoji: "⌚",
    tags: ["fitness", "gps", "health"],
  },
  {
    id: "p-004",
    name: "Trailband Fitness Tracker",
    description:
      "Lightweight band that logs steps, heart rate and workouts automatically.",
    price: 59.0,
    category: "Wearables",
    rating: 4.1,
    stock: 0,
    emoji: "📿",
    tags: ["fitness", "budget"],
  },
  {
    id: "p-005",
    name: "Vertex Mechanical Keyboard",
    description:
      "75% hot-swappable keyboard with tactile switches and per-key backlighting.",
    price: 139.0,
    category: "Desk",
    rating: 4.8,
    stock: 33,
    emoji: "⌨️",
    tags: ["mechanical", "usb-c", "rgb"],
  },
  {
    id: "p-006",
    name: "Glide Ergonomic Mouse",
    description:
      "Vertical mouse with silent clicks and a 4000 DPI sensor for long sessions.",
    price: 49.0,
    category: "Desk",
    rating: 4.2,
    stock: 47,
    emoji: "🖱️",
    tags: ["ergonomic", "wireless"],
  },
  {
    id: "p-007",
    name: 'Lumen 4K Monitor 27"',
    description:
      "27 inch IPS panel with 99% sRGB coverage and a single-cable USB-C dock.",
    price: 419.0,
    category: "Desk",
    rating: 4.6,
    stock: 8,
    emoji: "🖥️",
    tags: ["4k", "usb-c", "creator"],
  },
  {
    id: "p-008",
    name: "Beacon Smart Lamp",
    description:
      "Sixteen million colours, circadian scheduling and voice assistant support.",
    price: 64.0,
    category: "Home",
    rating: 4.0,
    stock: 55,
    emoji: "💡",
    tags: ["smart-home", "lighting"],
  },
  {
    id: "p-009",
    name: "Brew Precision Kettle",
    description:
      "Gooseneck kettle with degree-level temperature control and a hold timer.",
    price: 98.0,
    category: "Home",
    rating: 4.4,
    stock: 19,
    emoji: "🫖",
    tags: ["kitchen", "coffee"],
  },
  {
    id: "p-010",
    name: "Cascade Portable Speaker",
    description:
      "Rugged 360° speaker with 20 watt output and a floating waterproof shell.",
    price: 119.0,
    category: "Audio",
    rating: 4.5,
    stock: 27,
    emoji: "🔊",
    tags: ["outdoor", "waterproof", "party"],
  },
  {
    id: "p-011",
    name: "Voyager Power Bank 20K",
    description:
      "20,000 mAh battery with 65W fast charging for laptops and phones.",
    price: 72.0,
    category: "Accessories",
    rating: 4.3,
    stock: 40,
    emoji: "🔋",
    tags: ["charging", "travel"],
  },
  {
    id: "p-012",
    name: "Anchor Laptop Stand",
    description:
      "Folding aluminium stand that raises your screen to eye level and cools the base.",
    price: 45.0,
    category: "Accessories",
    rating: 4.1,
    stock: 73,
    emoji: "📐",
    tags: ["aluminium", "portable"],
  },
];

/**
 * In-memory order store. It resets whenever the serverless instance recycles,
 * which is fine for a demo — swap it for a real database when you need durability.
 */
export const orders: Order[] = [];

export const categories: string[] = [
  ...new Set(products.map((product) => product.category)),
].sort();

/** Pretend the database round-trip takes a moment, so loading states are visible. */
export function delay(ms = 250) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
