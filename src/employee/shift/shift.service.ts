import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';

@Injectable()
export class ShiftService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createShiftTemplateDto: CreateShiftDto) {
    return this.prisma.shiftTemplate.create({
      data: createShiftTemplateDto,
    });
  }
  async bulkCreate(shiftTemplates: CreateShiftDto[]) {
    return this.prisma.shiftTemplate.createMany({
      data: shiftTemplates,
    });
  }
  async findAll() {
    return this.prisma.shiftTemplate.findMany();
  }

  async findOne(id: string) {
    const shiftTemplate = await this.prisma.shiftTemplate.findUnique({
      where: { id },
    });
    if (!shiftTemplate) {
      throw new NotFoundException(`Shift template with ID ${id} not found`);
    }
    return shiftTemplate;
  }

  async update(id: string, updateShiftTemplateDto: UpdateShiftDto) {
    const shiftTemplate = await this.prisma.shiftTemplate.findUnique({
      where: { id },
    });
    if (!shiftTemplate) {
      throw new NotFoundException(`Shift template with ID ${id} not found`);
    }
    return this.prisma.shiftTemplate.update({
      where: { id },
      data: updateShiftTemplateDto,
    });
  }

  async remove(id: string) {
    const shiftTemplate = await this.prisma.shiftTemplate.findUnique({
      where: { id },
    });
    if (!shiftTemplate) {
      throw new NotFoundException(`Shift template with ID ${id} not found`);
    }
    return this.prisma.shiftTemplate.delete({
      where: { id },
    });
  }
}
