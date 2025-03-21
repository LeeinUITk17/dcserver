import {
  IsString,
  IsOptional,
  IsEnum,
  IsDecimal,
  IsInt,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { OrderType } from '@prisma/client';
import { Type } from 'class-transformer';

class OrderItemDto {
  @IsString()
  menuItemId: string;

  @IsInt()
  quantity: number;

  @IsDecimal()
  price: number;
}

export class CreateOrderDto {
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  tableId?: string;

  @IsEnum(OrderType)
  orderType: OrderType;

  @IsDecimal()
  shippingFee?: number;

  @IsOptional()
  @IsString()
  couponId?: string;

  // @IsInt()
  // earnedPoint: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[];
}
