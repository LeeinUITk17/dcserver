import { IsString, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { UserTier } from '@prisma/client';
export class CreateCampaignDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsEnum(UserTier)
  userTier: UserTier;
}
