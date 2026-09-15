import { Type } from "class-transformer";
import {
  IsArray, IsEnum, IsInt, IsString, Min, ValidateNested,
} from "class-validator";
import { OrderStatus, PaymentMethod } from "@prisma/client";

export class OrderItemInput {
  @IsString() variantId: string;
  @IsInt() @Min(1) quantity: number;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemInput)
  items: OrderItemInput[];

  @IsEnum(PaymentMethod) paymentMethod: PaymentMethod;

  @IsString() shippingFirstName: string;
  @IsString() shippingLastName: string;
  @IsString() shippingPhone: string;
  @IsString() shippingAddress: string;
  @IsString() shippingCity: string;
  @IsString() shippingState: string;
  @IsString() shippingPostalCode: string;
  @IsString() shippingCountry: string;
}

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus) status: OrderStatus;
  @IsString() note?: string;
}
