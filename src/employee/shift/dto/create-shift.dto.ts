import { IsString, IsEnum } from 'class-validator';
import { ShiftType } from '@prisma/client';

export class CreateShiftDto {
  @IsString()
  name: string;

  @IsEnum(ShiftType)
  shiftType: ShiftType;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;
}
