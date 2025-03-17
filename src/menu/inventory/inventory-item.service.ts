import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';
import { UpdateInventoryItemDto } from './dto/update-inventory-item.dto';

@Injectable()
export class InventoryItemService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createInventoryItemDto: CreateInventoryItemDto) {
    return this.prisma.inventoryItem.create({
      data: createInventoryItemDto,
    });
  }

  async findAll() {
    return this.prisma.inventoryItem.findMany({
      where: { isDeleted: false },
    });
  }

  async findOne(id: string) {
    const inventoryItem = await this.prisma.inventoryItem.findUnique({
      where: { id },
    });
    if (!inventoryItem) {
      throw new NotFoundException(`Inventory item with ID ${id} not found`);
    }
    return inventoryItem;
  }

  async update(id: string, updateInventoryItemDto: UpdateInventoryItemDto) {
    const inventoryItem = await this.prisma.inventoryItem.findUnique({
      where: { id },
    });
    if (!inventoryItem) {
      throw new NotFoundException(`Inventory item with ID ${id} not found`);
    }
    return this.prisma.inventoryItem.update({
      where: { id },
      data: updateInventoryItemDto,
    });
  }

  async remove(id: string) {
    const inventoryItem = await this.prisma.inventoryItem.findUnique({
      where: { id },
    });
    if (!inventoryItem) {
      throw new NotFoundException(`Inventory item with ID ${id} not found`);
    }
    return this.prisma.inventoryItem.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
