import { Type } from "class-transformer";
import {
  IsArray, IsNumber, IsOptional, IsString, ValidateNested, IsEnum,
} from "class-validator";
import { ProductTag } from "@prisma/client";

export class VariantDto {
  @IsString() color: string;
  @IsString() colorHex: string;
  @IsString() size: string;
  @IsString() sku: string;
  @IsNumber() stock: number;
}

export class CreateProductDto {
  @IsString() name: string;
  @IsString() brand: string;
  @IsString() description: string;
  @IsNumber() price: number;
  @IsString() categoryId: string;

  @IsOptional()
  @IsEnum(ProductTag, { each: true })
  tags?: ProductTag[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantDto)
  variants?: VariantDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}

export class UpdateProductDto extends CreateProductDto {}
