import { IsString, IsInt, IsOptional, IsEnum } from 'class-validator';
import { InventoryCategory } from '@prisma/client';

export class CreateInventoryItemDto {
  @IsString()
  name: string;

  @IsEnum(InventoryCategory)
  category: InventoryCategory;

  @IsInt()
  quantity: number;

  @IsString()
  unit: string;

  @IsOptional()
  @IsString()
  supplierId?: string;
}
