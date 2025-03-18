import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';
import { UpdateInventoryItemDto } from './dto/update-inventory-item.dto';
import { TransactionService } from '../inventory-transaction/transaction.service';
import { CreateTransactionDto } from '../inventory-transaction/dto/create-transaction.dto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class InventoryItemService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly transactionService: TransactionService,
  ) {}

  async create(
    createInventoryItemDto: CreateInventoryItemDto,
    transactionType: string,
    transactionPrice: Decimal,
  ) {
    const inventoryItem = await this.prisma.inventoryItem.create({
      data: createInventoryItemDto,
    });

    const createTransactionDto: CreateTransactionDto = {
      inventoryItemId: inventoryItem.id,
      quantity: inventoryItem.quantity,
      transactionType: transactionType as any,
      price: transactionPrice.toNumber(),
      timestamp: new Date().toISOString(),
    };

    await this.transactionService.create(createTransactionDto);
    return inventoryItem;
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
