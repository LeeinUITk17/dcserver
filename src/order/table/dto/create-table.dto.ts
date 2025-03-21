import { IsString, IsInt } from 'class-validator';

export class CreateTableDto {
  @IsString()
  number: string;

  @IsInt()
  capacity: number;
}
