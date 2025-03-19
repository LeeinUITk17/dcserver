import { IsString, IsInt, IsDecimal } from 'class-validator';

export class CreateOrderItemDto {
  @IsString()
  orderId: string;

  @IsString()
  menuItemId: string;

  @IsInt()
  quantity: number;

  @IsDecimal()
  price: number;
}
