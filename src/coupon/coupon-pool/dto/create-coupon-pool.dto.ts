import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateCouponPoolDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  totalCoupons: string;

  @IsOptional()
  @IsString()
  campaignId?: string;

  @IsOptional()
  @IsInt()
  allocatedCount?: number;
}
