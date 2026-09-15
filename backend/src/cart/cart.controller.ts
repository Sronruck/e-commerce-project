import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { CartService } from "./cart.service";
import { AddCartItemDto, UpdateCartItemDto } from "./dto/cart.dto";

@UseGuards(JwtAuthGuard)
@Controller("cart")
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  findMine(@CurrentUser() user: { id: string }) {
    return this.cartService.findMine(user.id);
  }

  @Post()
  add(@CurrentUser() user: { id: string }, @Body() dto: AddCartItemDto) {
    return this.cartService.add(user.id, dto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateCartItemDto) {
    return this.cartService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.cartService.remove(id);
  }

  @Delete()
  clear(@CurrentUser() user: { id: string }) {
    return this.cartService.clear(user.id);
  }
}
