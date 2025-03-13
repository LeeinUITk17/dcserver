import { IsString, IsDateString, IsOptional, IsEnum } from 'class-validator';
import { LeaveStatus } from '@prisma/client';

export class CreateLeaveRequestDto {
  @IsString()
  employeeId: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsEnum(LeaveStatus)
  status?: LeaveStatus;
}
