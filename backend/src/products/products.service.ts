import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProductDto, UpdateProductDto } from "./dto/product.dto";
import { ProductTag } from "@prisma/client";

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  findAll(params: { categorySlug?: string; tag?: ProductTag }) {
    return this.prisma.product.findMany({
      where: {
        isActive: true,
        category: params.categorySlug ? { slug: params.categorySlug } : undefined,
        tags: params.tag ? { has: params.tag } : undefined,
      },
      include: { images: true, variants: true, category: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { images: true, variants: true, category: true },
    });
    if (!product) throw new NotFoundException("ไม่พบสินค้านี้");
    return product;
  }

  create(dto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        name: dto.name,
        brand: dto.brand,
        description: dto.description,
        price: dto.price,
        categoryId: dto.categoryId,
        tags: dto.tags ?? [],
        images: dto.images ? { create: dto.images.map((url, i) => ({ url, position: i })) } : undefined,
        variants: dto.variants ? { create: dto.variants } : undefined,
      },
      include: { images: true, variants: true },
    });
  }

  async update(id: string, dto: UpdateProductDto) {
    await this.findOne(id);
    return this.prisma.product.update({
      where: { id },
      data: {
        name: dto.name,
        brand: dto.brand,
        description: dto.description,
        price: dto.price,
        categoryId: dto.categoryId,
        tags: dto.tags ?? [],
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    // soft delete so historical orders keep referencing a valid product
    return this.prisma.product.update({ where: { id }, data: { isActive: false } });
  }
}
