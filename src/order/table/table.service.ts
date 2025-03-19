import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Injectable()
export class TableService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTableDto: CreateTableDto) {
    return this.prisma.table.create({
      data: createTableDto,
    });
  }
  async bulkCreate(createTablesDto: CreateTableDto[]) {
    return await this.prisma.table.createMany({
      data: createTablesDto,
      skipDuplicates: true,
    });
  }

  async findAll() {
    return this.prisma.table.findMany();
  }

  async findOne(id: string) {
    const table = await this.prisma.table.findUnique({
      where: { id },
    });
    if (!table) {
      throw new NotFoundException(`Table with ID ${id} not found`);
    }
    return table;
  }

  async update(id: string, updateTableDto: UpdateTableDto) {
    const table = await this.prisma.table.findUnique({
      where: { id },
    });
    if (!table) {
      throw new NotFoundException(`Table with ID ${id} not found`);
    }
    return this.prisma.table.update({
      where: { id },
      data: updateTableDto,
    });
  }

  async remove(id: string) {
    const table = await this.prisma.table.findUnique({
      where: { id },
    });
    if (!table) {
      throw new NotFoundException(`Table with ID ${id} not found`);
    }
    return this.prisma.table.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
