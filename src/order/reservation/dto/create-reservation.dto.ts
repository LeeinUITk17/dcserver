import { IsString, IsDateString, IsEnum } from 'class-validator';
import { ReservationStatus } from '@prisma/client';

export class CreateReservationDto {
  @IsString()
  userId: string;

  @IsString()
  tableId: string;

  @IsDateString()
  reservationTime: string;

  @IsEnum(ReservationStatus)
  status: ReservationStatus;
}
