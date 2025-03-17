import {
  IsString,
  IsOptional,
  IsInt,
  IsNumber,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePayrollDto {
  @IsString()
  employeeId: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  baseSalary?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  hourlyRate?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  workedHours?: number;

  @IsInt()
  @Type(() => Number)
  standardHours: number;

  @IsNumber()
  @Type(() => Number)
  overtimePay: number;

  @IsNumber()
  @Type(() => Number)
  deductions: number;

  @IsNumber()
  @Type(() => Number)
  netSalary: number;

  @IsOptional()
  @IsDateString()
  createdAt?: string;
}
