import { IsString, IsOptional } from 'class-validator';

export class CreateSupplierItemDto {
  @IsString()
  name: string;

  @IsString()
  contact: string;

  @IsOptional()
  @IsString()
  address?: string;
}
