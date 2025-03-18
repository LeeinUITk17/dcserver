import { IsString, IsInt } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  menuItemId: string;

  @IsString()
  inventoryItemId: string;

  @IsInt()
  quantity: number;

  @IsString()
  unit: string;
}
