import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { Role } from "@prisma/client";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { OrdersService } from "./orders.service";
import { CreateOrderDto, UpdateOrderStatusDto } from "./dto/order.dto";

@UseGuards(JwtAuthGuard)
@Controller("orders")
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  create(@CurrentUser() user: { id: string }, @Body() dto: CreateOrderDto) {
    return this.ordersService.create(user.id, dto);
  }

  @Get()
  findMine(@CurrentUser() user: { id: string }) {
    return this.ordersService.findMine(user.id);
  }

  @Get(":id")
  findOne(@Param("id") id: string, @CurrentUser() user: { id: string; role: Role }) {
    return this.ordersService.findOne(id, user);
  }

  // --- Admin-only endpoints ---

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get("admin/all")
  findAllForAdmin() {
    return this.ordersService.findAllForAdmin();
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(":id/status")
  updateStatus(@Param("id") id: string, @Body() dto: UpdateOrderStatusDto) {
    return this.ordersService.updateStatus(id, dto);
  }
}
