import { IsString, IsDateString, IsEnum } from 'class-validator';
import { PaymentMethod, PaymentStatus } from '@prisma/client';

export class CreatePaymentDto {
  @IsString()
  orderId: string;

  @IsDateString()
  paymentDate: string;

  @IsEnum(PaymentMethod)
  method: PaymentMethod;

  @IsEnum(PaymentStatus)
  status: PaymentStatus;
}
