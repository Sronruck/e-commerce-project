import { Controller, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { PaymentsService } from "./payments.service";

@UseGuards(JwtAuthGuard)
@Controller("payments")
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  // TODO: replace with a real gateway webhook (Omise/Stripe) instead of a manual confirm call
  @Post(":orderId/confirm")
  confirm(@Param("orderId") orderId: string) {
    return this.paymentsService.markPaid(orderId);
  }
}
