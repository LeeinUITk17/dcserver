import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateMenuitemDto } from './create-menuitem.dto';

export class BulkCreateMenuItemsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMenuitemDto)
  items: CreateMenuitemDto[];
}
