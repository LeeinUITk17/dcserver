import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.menuCategory.create({
      data: createCategoryDto,
    });
  }

  async findAll() {
    return this.prisma.menuCategory.findMany();
  }

  async findOne(id: string) {
    return this.prisma.menuCategory.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.menuCategory.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: string) {
    return this.prisma.menuCategory.delete({
      where: { id },
    });
  }
  async bulkCreate(createMenuCategoriesDto: CreateCategoryDto[]) {
    return await this.prisma.menuCategory.createMany({
      data: createMenuCategoriesDto,
      skipDuplicates: true,
    });
  }
}
