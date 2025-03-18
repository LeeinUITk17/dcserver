import { IsString, IsOptional, IsDateString, IsInt } from 'class-validator';
import { UserTier } from '@prisma/client';

export class CreateCouponTargetDto {
  @IsString()
  couponId: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  userTier?: UserTier;

  @IsOptional()
  @IsDateString()
  sentAt?: string;

  @IsDateString()
  expiresAt: string;

  @IsOptional()
  @IsInt()
  usageLimit?: number;
}
