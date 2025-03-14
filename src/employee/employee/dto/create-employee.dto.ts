import { IsString, IsDecimal, IsDateString, IsEnum } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateEmployeeDto {
  @IsString()
  userId: string;

  @IsEnum(Role)
  role: Role;

  @IsDecimal()
  salary: number;

  @IsDateString()
  hireDate: string;
}
