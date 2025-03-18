import {
  IsString,
  IsOptional,
  IsEnum,
  IsDecimal,
  IsInt,
  IsBoolean,
  IsDateString,
} from 'class-validator';
import { DiscountType, CouponStatus } from '@prisma/client';

export class CreateCouponDto {
  @IsString()
  code: string;

  @IsEnum(DiscountType)
  discountType: DiscountType;

  @IsDecimal()
  discountValue: number;

  @IsDecimal()
  minOrderValue: number;

  @IsDecimal()
  maxDiscountValue: number;

  @IsOptional()
  @IsInt()
  usageLimit?: number;

  @IsEnum(CouponStatus)
  status: CouponStatus;

  @IsBoolean()
  isActive: boolean;

  @IsDateString()
  expiresAt: string;

  @IsOptional()
  @IsString()
  campaignId?: string;

  @IsOptional()
  @IsString()
  poolId: string;
}
