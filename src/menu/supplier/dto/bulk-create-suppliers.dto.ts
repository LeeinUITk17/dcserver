import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateSupplierItemDto } from './create-supplier-item.dto';

export class BulkCreateSuppliersDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSupplierItemDto)
  suppliers: CreateSupplierItemDto[];
}
