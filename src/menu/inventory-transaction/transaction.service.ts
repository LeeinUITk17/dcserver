import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTransactionDto: CreateTransactionDto) {
    return this.prisma.inventoryTransaction.create({
      data: createTransactionDto,
    });
  }

  async findAll() {
    return this.prisma.inventoryTransaction.findMany();
  }

  async findOne(id: string) {
    const transaction = await this.prisma.inventoryTransaction.findUnique({
      where: { id },
    });
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return transaction;
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.prisma.inventoryTransaction.findUnique({
      where: { id },
    });
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return this.prisma.inventoryTransaction.update({
      where: { id },
      data: updateTransactionDto,
    });
  }

  async remove(id: string) {
    const transaction = await this.prisma.inventoryTransaction.findUnique({
      where: { id },
    });
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return this.prisma.inventoryTransaction.delete({
      where: { id },
    });
  }
}
