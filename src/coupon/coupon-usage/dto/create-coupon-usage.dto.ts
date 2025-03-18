import { IsString, IsDateString } from 'class-validator';

export class CreateCouponUsageDto {
  @IsString()
  couponId: string;

  @IsString()
  userId: string;

  @IsDateString()
  usedAt: string;
}
