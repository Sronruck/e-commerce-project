import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AddCartItemDto, UpdateCartItemDto } from "./dto/cart.dto";

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  findMine(userId: string) {
    return this.prisma.cartItem.findMany({
      where: { userId },
      include: { variant: { include: { product: true } } },
    });
  }

  async add(userId: string, dto: AddCartItemDto) {
    const existing = await this.prisma.cartItem.findUnique({
      where: { userId_variantId: { userId, variantId: dto.variantId } },
    });

    if (existing) {
      return this.prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + dto.quantity },
      });
    }

    return this.prisma.cartItem.create({
      data: { userId, variantId: dto.variantId, quantity: dto.quantity },
    });
  }

  update(id: string, dto: UpdateCartItemDto) {
    return this.prisma.cartItem.update({ where: { id }, data: { quantity: dto.quantity } });
  }

  remove(id: string) {
    return this.prisma.cartItem.delete({ where: { id } });
  }

  clear(userId: string) {
    return this.prisma.cartItem.deleteMany({ where: { userId } });
  }
}
