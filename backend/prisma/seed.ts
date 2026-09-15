import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
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

  const product = await prisma.product.create({
    data: {
      name: "Fear of God Essentials Classic Fit Fleece Hoodie Jet Black",
      brand: "Fear of God Essentials",
      description: "Classic fit fleece hoodie in jet black with bold front branding.",
      price: 49.99,
      rating: 5.0,
      categoryId: mens.id,
      tags: ["HOT", "NEW_ARRIVAL"],
      images: { create: [{ url: "/images/products/p3-1.jpg", position: 0 }] },
      variants: {
        create: [
          { color: "Jet Black", colorHex: "#111111", size: "M", sku: "FOG-HD-BLK-M", stock: 15 },
          { color: "Jet Black", colorHex: "#111111", size: "L", sku: "FOG-HD-BLK-L", stock: 20 },
        ],
      },
    },
  });

  console.log({ admin: admin.email, product: product.name });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
