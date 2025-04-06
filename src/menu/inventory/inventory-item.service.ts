import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';
import { UpdateInventoryItemDto } from './dto/update-inventory-item.dto';
import { TransactionService } from '../inventory-transaction/transaction.service';
import { CreateTransactionDto } from '../inventory-transaction/dto/create-transaction.dto';
import { TransactionType } from '@prisma/client';
@Injectable()
export class InventoryItemService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly transactionService: TransactionService,
  ) {}

  async create(
    createInventoryItemDto: CreateInventoryItemDto,
    // transactionType: string,
    // transactionPrice: Decimal,
  ) {
    const inventoryItem = await this.prisma.inventoryItem.create({
      data: {
        name: createInventoryItemDto.name,
        quantity: createInventoryItemDto.quantity,
        unit: createInventoryItemDto.unit,
        supplierId: createInventoryItemDto.supplierId,
        category: createInventoryItemDto.category,
      },
    });

    const createTransactionDto: CreateTransactionDto = {
      inventoryItemId: inventoryItem.id,
      quantity: inventoryItem.quantity,
      transactionType: createInventoryItemDto.transactionType as any,
      price: createInventoryItemDto.price,
      timestamp: new Date().toISOString(),
    };

    await this.transactionService.create(createTransactionDto);
    return inventoryItem;
  }
  async bulkCreate(createInventoryItemDtos: CreateInventoryItemDto[]) {
    const createdInventoryItems = await this.prisma.$transaction(
      async (prisma) => {
        const itemsCreatedInTx = [];

        for (const item of createInventoryItemDtos) {
          const inventoryItem = await prisma.inventoryItem.create({
            data: {
              name: item.name,
              quantity: item.quantity,
              unit: item.unit,
              supplierId: item.supplierId,
              category: item.category,
            },
          });

          if (!inventoryItem || !inventoryItem.id) {
            throw new Error(`Failed to create inventory item: ${item.name}`);
          }

          await prisma.inventoryTransaction.create({
            data: {
              inventoryItemId: inventoryItem.id,
              quantity: inventoryItem.quantity,
              transactionType: item.transactionType as TransactionType,
              price: item.price,
              timestamp: new Date(),
            },
          });

          itemsCreatedInTx.push(inventoryItem);
        }
        return itemsCreatedInTx;
      },
    );

    return createdInventoryItems;
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
