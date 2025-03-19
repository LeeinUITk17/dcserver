import { IsString, IsInt, IsEnum } from 'class-validator';
import { TableStatus } from '@prisma/client';

export class CreateTableDto {
  @IsString()
  number: string;

  @IsInt()
  capacity: number;

  @IsEnum(TableStatus)
  status: TableStatus;
}
