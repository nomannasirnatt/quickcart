export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  stock: number;
  emoji: string;
  tags: string[];
};

export type Order = {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  total: number;
  createdAt: string;
};

export type Stats = {
  products: number;
  categories: number;
  inStock: number;
  averagePrice: number;
};

export type ProductListResponse = {
  count: number;
  categories: string[];
  items: Product[];
};
