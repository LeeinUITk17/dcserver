import { IsString, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { DeliveryStatus } from '@prisma/client';

export class CreateDeliveryDto {
  @IsString()
  orderId: string;

  @IsOptional()
  @IsDateString()
  deliveryDate?: string;

  @IsEnum(DeliveryStatus)
  status: DeliveryStatus;

  @IsString()
  carrier: string;

  @IsOptional()
  @IsString()
  trackingCode?: string;
}
