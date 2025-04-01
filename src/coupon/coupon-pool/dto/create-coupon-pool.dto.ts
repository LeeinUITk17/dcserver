import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateCouponPoolDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  totalCoupons: number;

  @IsOptional()
  @IsString()
  campaignId?: string;

  @IsOptional()
  @IsInt()
  allocatedCount?: number;
}
