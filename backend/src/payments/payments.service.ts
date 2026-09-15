import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PaymentMethod, PaymentStatus } from "@prisma/client";

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async createForOrder(orderId: string, method: PaymentMethod, amount: number) {
    return this.prisma.payment.create({
      data: { orderId, method, amount, status: "PENDING" },
    });
  }

  async markPaid(orderId: string) {
    await this.prisma.order.update({ where: { id: orderId }, data: { paymentStatus: "PAID" } });
    return this.prisma.payment.update({
      where: { orderId },
      data: { status: PaymentStatus.PAID, paidAt: new Date() },
    });
  }
}
