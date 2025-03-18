import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMenuitemDto } from './dto/create-menuitem.dto';
import { UpdateMenuitemDto } from './dto/update-menuitem.dto';

@Injectable()
export class MenuitemService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMenuitemDto: CreateMenuitemDto) {
    const { recipeIngredients, ...menuItemData } = createMenuitemDto;

    return this.prisma.$transaction(async (prisma) => {
      const menuItem = await prisma.menuItem.create({
        data: menuItemData,
      });

      await prisma.recipeIngredient.createMany({
        data: recipeIngredients.map((ingredient) => ({
          menuItemId: menuItem.id,
          inventoryItemId: ingredient.inventoryItemId,
          quantity: ingredient.quantity,
          unit: ingredient.unit,
        })),
      });

      return menuItem;
    });
  }

  async findAll() {
    return this.prisma.menuItem.findMany({
      where: { isDeleted: false },
      include: {
        category: true,
        recipeIngredients: true,
      },
    });
  }

  async findOne(id: string) {
    const menuItem = await this.prisma.menuItem.findUnique({
      where: { id },
      include: {
        category: true,
        recipeIngredients: true,
      },
    });
    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }
    return menuItem;
  }

  async update(id: string, updateMenuitemDto: UpdateMenuitemDto) {
    const menuItem = await this.prisma.menuItem.findUnique({
      where: { id },
    });
    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }

    const { recipeIngredients, ...menuItemData } = updateMenuitemDto;

    return this.prisma.$transaction(async (prisma) => {
      await prisma.recipeIngredient.deleteMany({
        where: { menuItemId: id },
      });

      return prisma.menuItem.update({
        where: { id },
        data: {
          ...menuItemData,
          recipeIngredients: {
            create: recipeIngredients.map((ingredient) => ({
              inventoryItemId: ingredient.inventoryItemId,
              quantity: ingredient.quantity,
              unit: ingredient.unit,
            })),
          },
        },
        include: {
          recipeIngredients: true,
        },
      });
    });
  }

  async remove(id: string) {
    const menuItem = await this.prisma.menuItem.findUnique({
      where: { id },
    });
    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }
    return this.prisma.menuItem.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
