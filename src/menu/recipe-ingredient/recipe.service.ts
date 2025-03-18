import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRecipeDto: CreateRecipeDto) {
    return this.prisma.recipeIngredient.create({
      data: createRecipeDto,
    });
  }
  async createMany(createRecipeDto: CreateRecipeDto[]) {
    return this.prisma.recipeIngredient.createMany({
      data: createRecipeDto,
    });
  }

  async findAll() {
    return this.prisma.recipeIngredient.findMany();
  }

  async findOne(id: string) {
    const recipeIngredient = await this.prisma.recipeIngredient.findUnique({
      where: { id },
    });
    if (!recipeIngredient) {
      throw new NotFoundException(`Recipe ingredient with ID ${id} not found`);
    }
    return recipeIngredient;
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto) {
    const recipeIngredient = await this.prisma.recipeIngredient.findUnique({
      where: { id },
    });
    if (!recipeIngredient) {
      throw new NotFoundException(`Recipe ingredient with ID ${id} not found`);
    }
    return this.prisma.recipeIngredient.update({
      where: { id },
      data: updateRecipeDto,
    });
  }

  async remove(id: string) {
    const recipeIngredient = await this.prisma.recipeIngredient.findUnique({
      where: { id },
    });
    if (!recipeIngredient) {
      throw new NotFoundException(`Recipe ingredient with ID ${id} not found`);
    }
    return this.prisma.recipeIngredient.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
