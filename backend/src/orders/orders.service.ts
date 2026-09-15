import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateOrderDto, UpdateOrderStatusDto } from "./dto/order.dto";

const SHIPPING_FEE = 5;

function generateOrderNumber() {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `ORD-${year}-${random}`;
}

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateOrderDto) {
    const variants = await this.prisma.productVariant.findMany({
      where: { id: { in: dto.items.map((i) => i.variantId) } },
      include: { product: true },
    });

    let subtotal = 0;
    const itemsData = dto.items.map((input) => {
      const variant = variants.find((v) => v.id === input.variantId);
      if (!variant) throw new NotFoundException(`ไม่พบสินค้า variant ${input.variantId}`);
      const price = Number(variant.product.price);
      subtotal += price * input.quantity;
      return { variantId: variant.id, quantity: input.quantity, price };
    });

    const total = subtotal + SHIPPING_FEE;

    const order = await this.prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId,
        subtotal,
        shipping: SHIPPING_FEE,
        total,
        paymentMethod: dto.paymentMethod,
        shippingFirstName: dto.shippingFirstName,
        shippingLastName: dto.shippingLastName,
        shippingPhone: dto.shippingPhone,
        shippingAddress: dto.shippingAddress,
        shippingCity: dto.shippingCity,
        shippingState: dto.shippingState,
        shippingPostalCode: dto.shippingPostalCode,
        shippingCountry: dto.shippingCountry,
        items: { create: itemsData },
        statusHistory: { create: { status: "PENDING" } },
      },
      include: { items: { include: { variant: { include: { product: true } } } }, statusHistory: true },
    });

    // clear the cart items that were just checked out
    await this.prisma.cartItem.deleteMany({
      where: { userId, variantId: { in: dto.items.map((i) => i.variantId) } },
    });

    return order;
  }

  findMine(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: { include: { variant: { include: { product: true } } } }, statusHistory: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: string, requester: { id: string; role: string }) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: { include: { variant: { include: { product: true } } } },
        statusHistory: { orderBy: { createdAt: "asc" } },
      },
    });
    if (!order) throw new NotFoundException("ไม่พบคำสั่งซื้อนี้");
    if (order.userId !== requester.id && requester.role !== "ADMIN") {
      throw new ForbiddenException("คุณไม่มีสิทธิ์ดูคำสั่งซื้อนี้");
    }
    return order;
  }

  findAllForAdmin() {
    return this.prisma.order.findMany({
      include: { items: true, user: { select: { name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    });
  }

  // Admin updates status -> this is what powers the customer-facing tracking timeline
  async updateStatus(id: string, dto: UpdateOrderStatusDto) {
    await this.prisma.order.update({ where: { id }, data: { status: dto.status } });
    return this.prisma.orderStatusEvent.create({
      data: { orderId: id, status: dto.status, note: dto.note },
    });
  }
}
