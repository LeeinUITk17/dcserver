import { IsString, IsDecimal, IsDateString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  userId: string;

  @IsString()
  position: string;

  @IsDecimal()
  salary: number;

  @IsDateString()
  hireDate: string;
}
