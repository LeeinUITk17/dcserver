import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';

class RecipeIngredientDto {
  @IsString()
  inventoryItemId: string;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsString()
  unit: string;
}

export class CreateMenuitemDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsString()
  categoryId: string;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RecipeIngredientDto)
  recipeIngredients: RecipeIngredientDto[];
}
