import { IsString, IsDateString, IsOptional, IsInt } from 'class-validator';

export class CreateAttendanceDto {
  @IsString()
  employeeId: string;

  @IsDateString()
  workDate: string;

  @IsDateString()
  checkIn: string;

  @IsOptional()
  @IsDateString()
  checkOut?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsInt()
  overtimeMinutes?: number;

  @IsOptional()
  @IsInt()
  lateMinutes?: number;

  @IsOptional()
  @IsInt()
  earlyDepartureMinutes?: number;
}
