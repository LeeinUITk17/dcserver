import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSupplierItemDto } from './dto/create-supplier-item.dto';
import { UpdateSupplierItemDto } from './dto/update-supplier-item.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class SupplierItemService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSupplierItemDto: CreateSupplierItemDto) {
    return this.prisma.supplier.create({
      data: createSupplierItemDto,
    });
  }

  async findAll() {
    return this.prisma.supplier.findMany();
  }

  async findOne(id: string) {
    return this.prisma.supplier.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateSupplierItemDto: UpdateSupplierItemDto) {
    return this.prisma.supplier.update({
      where: { id },
      data: updateSupplierItemDto,
    });
  }

  async remove(id: string) {
    return this.prisma.supplier.delete({
      where: { id },
    });
  }
  async bulkCreate(suppliers: Prisma.SupplierCreateManyInput[]) {
    return this.prisma.supplier.createMany({
      data: suppliers,
      skipDuplicates: true,
    });
  }
}
