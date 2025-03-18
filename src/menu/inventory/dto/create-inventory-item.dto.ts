import {
  IsString,
  IsInt,
  IsOptional,
  IsEnum,
  IsDecimal,
} from 'class-validator';
import { InventoryCategory } from '@prisma/client';
import { TransactionType } from '@prisma/client';
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

  @IsDecimal()
  price: number;

  @IsEnum(TransactionType)
  transactionType: TransactionType;
}
