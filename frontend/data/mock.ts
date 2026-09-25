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
    name: "Nike Air Force 1 '07",
    brand: "Nike",
    description: "The radiance lives on in the Nike Air Force 1 '07, the b-ball OG that puts a fresh spin on what you know best.",
    price: 46.0,
    rating: 4.9,
    images: [
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,c_scale,w_300,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/e6da41fa-1be4-4ce5-b89c-22be4f1f02d4/AIR+FORCE+1+%2707.png",
    ],
    categoryId: "c4",
    tags: ["HOT"],
    variants: [
      { id: "v5", color: "White", colorHex: "#FFFFFF", size: "42", stock: 15, sku: "NK-AF1-WHT-42" },
    ],
  },
  {
    id: "p5",
    name: "Nike Dunk Low Retro White Black Panda",
    brand: "Nike",
    description: "Created for the hardwood but taken to the streets, the 80s b-ball icon returns with classic details and throwback hoops flair.",
    price: 115.0,
    rating: 4.8,
    images: [
      "https://blob.sxv.pl/shops/media/f1000/2020/nike/181980/nike-dunk-low-wmns-panda-dd1503-101-64674cc7a4a35.jpg",
    ],
    categoryId: "c4",
    tags: ["HOT", "NEW_ARRIVAL"],
    variants: [
      { id: "v6", color: "Black/White", colorHex: "#000000", size: "42", stock: 10, sku: "NK-DNK-PND-42" },
      { id: "v7", color: "Black/White", colorHex: "#000000", size: "43", stock: 8, sku: "NK-DNK-PND-43" },
    ],
  },
  {
    id: "p6",
    name: "Adidas Samba OG Cloud White Core Black",
    brand: "Adidas",
    description: "Born on the pitch, the Samba is a timeless icon of street style. Staying true to its legacy with a tasteful, low-profile leather upper.",
    price: 100.0,
    rating: 4.9,
    images: [
      "https://img.sasom.co.th/adidas-samba-og-cloud-white-core-black-1-sq.jpg",
    ],
    categoryId: "c4",
    tags: ["HOT"],
    variants: [
      { id: "v8", color: "Cloud White", colorHex: "#F5F5F5", size: "41", stock: 14, sku: "ADI-SAMBA-WHT-41" },
      { id: "v9", color: "Cloud White", colorHex: "#F5F5F5", size: "42", stock: 18, sku: "ADI-SAMBA-WHT-42" },
    ],
  },
  {
    id: "p7",
    name: "Stüssy Basic Stüssy Tee Black",
    brand: "Stüssy",
    description: "Short sleeve crewneck t-shirt featuring printed Stüssy basic stock logo graphic on the left chest and large back print.",
    price: 40.0,
    rating: 4.9,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbZDb7FtqbyTQ8Uvh_RixZAMqQUgL-j5x00mvZz03GBy2d5aadE5BukuP6&s=10",
    ],
    categoryId: "c1",
    tags: ["HOT"],
    variants: [
      { id: "v10", color: "Black", colorHex: "#000000", size: "M", stock: 25, sku: "STU-TEE-BLK-M" },
      { id: "v11", color: "Black", colorHex: "#000000", size: "L", stock: 30, sku: "STU-TEE-BLK-L" },
    ],
  },
  {
    id: "p8",
    name: "Fear of God Essentials Sweatpants Jet Black",
    brand: "Fear of God Essentials",
    description: "Relaxed silhouette sweatpants featuring an elongated drawstring, side seam pockets, and rubberized brand label on the front.",
    price: 45.0,
    rating: 4.7,
    images: [
      "https://fearofgod.com/cdn/shop/files/130AS262031F_CLASSIC_FIT_FLEECE_SWEATPANT-JET_BLACK_1_edit.jpg?v=1770755192",
    ],
    categoryId: "c1",
    tags: ["NEW_ARRIVAL", "HOT"],
    variants: [
      { id: "v12", color: "Jet Black", colorHex: "#111111", size: "M", stock: 12, sku: "FOG-PNT-BLK-M" },
      { id: "v13", color: "Jet Black", colorHex: "#111111", size: "L", stock: 15, sku: "FOG-PNT-BLK-L" },
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