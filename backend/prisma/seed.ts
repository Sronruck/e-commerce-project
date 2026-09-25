import { PrismaClient, ProductTag } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

interface SeedProduct {
  name: string;
  brand: string;
  description: string;
  price: number;
  rating: number;
  categoryId: string;
  tags: ProductTag[];
  images: string[];
  variants: {
    color: string;
    colorHex: string;
    size: string;
    stock: number;
    sku: string;
  }[];
}

async function main() {
  console.log("Seeding database with 8 products...");

  const admin = await prisma.user.upsert({
    where: { email: "admin@fashionstore.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@fashionstore.com",
      passwordHash: await bcrypt.hash("Admin123!", 10),
      role: "ADMIN",
    },
  });

  const mens = await prisma.category.upsert({
    where: { slug: "mens" },
    update: {},
    create: { name: "Mens", slug: "mens" },
  });

  const accessories = await prisma.category.upsert({
    where: { slug: "accessories" },
    update: {},
    create: { name: "Accessories", slug: "accessories" },
  });

  await prisma.category.upsert({
    where: { slug: "womens" },
    update: {},
    create: { name: "Womens", slug: "womens" },
  });

  await prisma.category.upsert({
    where: { slug: "kids" },
    update: {},
    create: { name: "Kids", slug: "kids" },
  });

  // เคลียร์ข้อมูลเดิมเพื่อป้องกัน SKU หรือ ID ซ้ำ
  await prisma.orderItem.deleteMany({});
  await prisma.productImage.deleteMany({});
  await prisma.productVariant.deleteMany({});
  await prisma.product.deleteMany({});

  const allProducts: SeedProduct[] = [
    {
      name: "Fear of God Essentials Fleece Hoodie Light Heather Gray",
      brand: "Fear of God Essentials",
      description: "Crafted from a premium fleece blend for everyday comfort. Relaxed fit with dropped shoulders and signature Essentials branding.",
      price: 38.99,
      rating: 5.0,
      categoryId: mens.id,
      tags: ["HOT" as ProductTag],
      images: ["/images/products/p1-1.jpg"],
      variants: [
        { color: "Light Heather Gray", colorHex: "#B9B9B9", size: "M", stock: 12, sku: "FOG-HD-GRY-M" },
        { color: "Light Heather Gray", colorHex: "#B9B9B9", size: "L", stock: 8, sku: "FOG-HD-GRY-L" },
      ],
    },
    {
      name: "Fear of God Essentials Fleece Hoodie Desert Sand",
      brand: "Fear of God Essentials",
      description: "Relaxed silhouette fleece hoodie in an earthy desert sand tone.",
      price: 62.99,
      rating: 4.9,
      categoryId: mens.id,
      tags: ["HOT" as ProductTag],
      images: ["/images/products/p2-1.jpg"],
      variants: [
        { color: "Desert Sand", colorHex: "#D8C9A3", size: "M", stock: 10, sku: "FOG-HD-SND-M" },
      ],
    },
    {
      name: "Fear of God Essentials Classic Fit Fleece Hoodie Jet Black",
      brand: "Fear of God Essentials",
      description: "Classic fit fleece hoodie in jet black with bold front branding.",
      price: 49.99,
      rating: 5.0,
      categoryId: mens.id,
      tags: ["HOT" as ProductTag, "NEW_ARRIVAL" as ProductTag],
      images: ["/images/products/p3-1.jpg"],
      variants: [
        { color: "Jet Black", colorHex: "#111111", size: "L", stock: 20, sku: "FOG-HD-BLK-L" },
      ],
    },
    {
      name: "Nike Air Force 1 '07",
      brand: "Nike",
      description: "The radiance lives on in the Nike Air Force 1 '07, the b-ball OG that puts a fresh spin on what you know best.",
      price: 46.0,
      rating: 4.9,
      categoryId: accessories.id,
      tags: ["HOT" as ProductTag],
      images: [
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,c_scale,w_300,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/e6da41fa-1be4-4ce5-b89c-22be4f1f02d4/AIR+FORCE+1+%2707.png",
      ],
      variants: [
        { color: "White", colorHex: "#FFFFFF", size: "42", stock: 15, sku: "NK-AF1-WHT-42" },
      ],
    },
    {
      name: "Nike Dunk Low Retro White Black Panda",
      brand: "Nike",
      description: "Created for the hardwood but taken to the streets, the 80s b-ball icon returns with classic details and throwback hoops flair.",
      price: 115.0,
      rating: 4.8,
      categoryId: accessories.id,
      tags: ["HOT" as ProductTag, "NEW_ARRIVAL" as ProductTag],
      images: [
        "https://blob.sxv.pl/shops/media/f1000/2020/nike/181980/nike-dunk-low-wmns-panda-dd1503-101-64674cc7a4a35.jpg",
      ],
      variants: [
        { color: "Black/White", colorHex: "#000000", size: "42", stock: 10, sku: "NK-DNK-PND-42" },
        { color: "Black/White", colorHex: "#000000", size: "43", stock: 8, sku: "NK-DNK-PND-43" },
      ],
    },
    {
      name: "Adidas Samba OG Cloud White Core Black",
      brand: "Adidas",
      description: "Born on the pitch, the Samba is a timeless icon of street style. Staying true to its legacy with a tasteful, low-profile leather upper.",
      price: 100.0,
      rating: 4.9,
      categoryId: accessories.id,
      tags: ["HOT" as ProductTag],
      images: [
        "https://img.sasom.co.th/adidas-samba-og-cloud-white-core-black-1-sq.jpg",
      ],
      variants: [
        { color: "Cloud White", colorHex: "#F5F5F5", size: "41", stock: 14, sku: "ADI-SAMBA-WHT-41" },
        { color: "Cloud White", colorHex: "#F5F5F5", size: "42", stock: 18, sku: "ADI-SAMBA-WHT-42" },
      ],
    },
    {
      name: "Stüssy Basic Stüssy Tee Black",
      brand: "Stüssy",
      description: "Short sleeve crewneck t-shirt featuring printed Stüssy basic stock logo graphic on the left chest and large back print.",
      price: 40.0,
      rating: 4.9,
      categoryId: mens.id,
      tags: ["HOT" as ProductTag],
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbZDb7FtqbyTQ8Uvh_RixZAMqQUgL-j5x00mvZz03GBy2d5aadE5BukuP6&s=10",
      ],
      variants: [
        { color: "Black", colorHex: "#000000", size: "M", stock: 25, sku: "STU-TEE-BLK-M" },
        { color: "Black", colorHex: "#000000", size: "L", stock: 30, sku: "STU-TEE-BLK-L" },
      ],
    },
    {
      name: "Fear of God Essentials Sweatpants Jet Black",
      brand: "Fear of God Essentials",
      description: "Relaxed silhouette sweatpants featuring an elongated drawstring, side seam pockets, and rubberized brand label on the front.",
      price: 45.0,
      rating: 4.7,
      categoryId: mens.id,
      tags: ["NEW_ARRIVAL" as ProductTag, "HOT" as ProductTag],
      images: [
        "https://fearofgod.com/cdn/shop/files/130AS262031F_CLASSIC_FIT_FLEECE_SWEATPANT-JET_BLACK_1_edit.jpg?v=1770755192",
      ],
      variants: [
        { color: "Jet Black", colorHex: "#111111", size: "M", stock: 12, sku: "FOG-PNT-BLK-M" },
        { color: "Jet Black", colorHex: "#111111", size: "L", stock: 15, sku: "FOG-PNT-BLK-L" },
      ],
    },
  ];

  for (const item of allProducts) {
    await prisma.product.create({
      data: {
        name: item.name,
        brand: item.brand,
        description: item.description,
        price: item.price,
        rating: item.rating,
        categoryId: item.categoryId,
        tags: item.tags,
        images: {
          create: item.images.map((url, index) => ({ url, position: index })),
        },
        variants: {
          create: item.variants,
        },
      },
    });
  }

  console.log({
    admin: admin.email,
    status: "All 8 products seeded successfully",
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });