import {
  IsString,
  IsOptional,
  IsEnum,
  IsDecimal,
  IsInt,
  IsDateString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { OrderType, OrderStatus, PaymentMethod } from '@prisma/client';
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

  @IsDateString()
  orderDate: string;

  @IsDecimal()
  totalAmount: number;

  @IsDecimal()
  shippingFee: number;

  @IsDecimal()
  taxAmount: number;

  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsOptional()
  @IsString()
  couponId?: string;

  @IsInt()
  earnedPoint: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[];

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @IsOptional()
  @IsString()
  trackingCode?: string;
}
