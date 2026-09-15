import { Product, Category, Order } from "@/lib/types";

export const categories: Category[] = [
  { id: "c1", name: "Mens", slug: "mens" },
  { id: "c2", name: "Womens", slug: "womens" },
  { id: "c3", name: "Kids", slug: "kids" },
  { id: "c4", name: "Accessories", slug: "accessories" },
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Fear of God Essentials Fleece Hoodie Light Heather Gray",
    brand: "Fear of God Essentials",
    description:
      "Crafted from a premium fleece blend for everyday comfort. Relaxed fit with dropped shoulders and signature Essentials branding.",
    price: 38.99,
    rating: 5.0,
    images: ["/images/products/p1-1.jpg"],
    categoryId: "c1",
    tags: ["HOT"],
    variants: [
      { id: "v1", color: "Light Heather Gray", colorHex: "#B9B9B9", size: "M", stock: 12, sku: "FOG-HD-GRY-M" },
      { id: "v2", color: "Light Heather Gray", colorHex: "#B9B9B9", size: "L", stock: 8, sku: "FOG-HD-GRY-L" },
    ],
  },
  {
    id: "p2",
    name: "Fear of God Essentials Fleece Hoodie Desert Sand",
    brand: "Fear of God Essentials",
    description: "Relaxed silhouette fleece hoodie in an earthy desert sand tone.",
    price: 62.99,
    rating: 4.9,
    images: ["/images/products/p2-1.jpg"],
    categoryId: "c1",
    tags: ["HOT"],
    variants: [
      { id: "v3", color: "Desert Sand", colorHex: "#D8C9A3", size: "M", stock: 10, sku: "FOG-HD-SND-M" },
    ],
  },
  {
    id: "p3",
    name: "Fear of God Essentials Classic Fit Fleece Hoodie Jet Black",
    brand: "Fear of God Essentials",
    description: "Classic fit fleece hoodie in jet black with bold front branding.",
    price: 49.99,
    rating: 5.0,
    images: ["/images/products/p3-1.jpg"],
    categoryId: "c1",
    tags: ["HOT", "NEW_ARRIVAL"],
    variants: [
      { id: "v4", color: "Jet Black", colorHex: "#111111", size: "L", stock: 20, sku: "FOG-HD-BLK-L" },
    ],
  },
  {
    id: "p4",
    name: "Nike Air Force 1 '07 SE",
    brand: "Nike",
    description: "Timeless silhouette with modern comfort updates.",
    price: 46.0,
    rating: 4.9,
    images: ["/images/products/p4-1.jpg"],
    categoryId: "c4",
    tags: ["HOT"],
    variants: [
      { id: "v5", color: "White", colorHex: "#FFFFFF", size: "42", stock: 15, sku: "NK-AF1-WHT-42" },
    ],
  },
];

export const testimonials = [
  { id: "t1", name: "สมหญิง ใจดี", comment: "เนื้อผ้าเนื้อดีมากคุณภาพดี" },
  { id: "t2", name: "ศรราวุธ เชิดตระกูล", comment: "เสื้อผ้าเทศดีค่ะไม่ผิดหวังจากที่คิดไว้" },
  { id: "t3", name: "สมชาย ใจเย็น", comment: "บริการดีมาก" },
];

export const mockOrder: Order = {
  id: "o1",
  orderNumber: "ORD-2026-00123",
  userId: "u1",
  items: [
    {
      id: "oi1",
      product: products[0],
      variant: products[0].variants[0],
      quantity: 1,
      price: 38.99,
    },
  ],
  subtotal: 38.99,
  shipping: 5,
  total: 43.99,
  status: "SHIPPED",
  statusHistory: [
    { status: "PENDING", timestamp: "2026-08-25T09:00:00Z" },
    { status: "CONFIRMED", timestamp: "2026-08-25T10:30:00Z" },
    { status: "PROCESSING", timestamp: "2026-08-26T08:00:00Z" },
    { status: "SHIPPED", timestamp: "2026-08-27T14:00:00Z", note: "Handed to courier" },
  ],
  createdAt: "2026-08-25T09:00:00Z",
  shippingAddress: {
    firstName: "Somchai",
    lastName: "Jaidee",
    address: "123 Sukhumvit Rd.",
    city: "Bangkok",
    state: "Bangkok",
    postalCode: "10110",
    country: "Thailand",
    phone: "0812345678",
  },
  paymentMethod: "CREDIT_CARD",
};
