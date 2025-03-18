import {
  IsString,
  IsInt,
  IsEnum,
  IsDecimal,
  IsDateString,
} from 'class-validator';
import { TransactionType } from '@prisma/client';

export class CreateTransactionDto {
  @IsString()
  inventoryItemId: string;

  @IsEnum(TransactionType)
  transactionType: TransactionType;

  @IsInt()
  quantity: number;

  @IsDecimal()
  price: number;

  @IsDateString()
  timestamp: string;
}
