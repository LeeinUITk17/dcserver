import {
  IsString,
  IsDateString,
  IsInt,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { OvertimeStatus } from '@prisma/client';

export class CreateOvertimeRequestDto {
  @IsString()
  employeeId: string;

  @IsDateString()
  date: string;

  @IsInt()
  requestedMinutes: number;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsEnum(OvertimeStatus)
  status?: OvertimeStatus;
}
