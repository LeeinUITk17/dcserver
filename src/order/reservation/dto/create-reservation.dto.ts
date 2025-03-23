import { IsString, IsDateString } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  userId: string;

  @IsDateString()
  reservationTime: string;
}
