import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateWorkScheduleDto {
  @IsString()
  employeeId: string;

  @IsOptional()
  @IsString()
  shiftTemplateId: string;

  @IsDateString()
  shiftStart: string;

  @IsDateString()
  shiftEnd: string;
}
