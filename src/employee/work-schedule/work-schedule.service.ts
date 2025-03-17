import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateWorkScheduleDto } from './dto/create-work-schedule.dto';
import { UpdateWorkScheduleDto } from './dto/update-work-schedule.dto';

@Injectable()
export class WorkScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWorkScheduleDto: CreateWorkScheduleDto) {
    return this.prisma.workSchedule.create({
      data: createWorkScheduleDto,
    });
  }

  async findAll() {
    return this.prisma.workSchedule.findMany();
  }

  async findOne(id: string) {
    const workSchedule = await this.prisma.workSchedule.findUnique({
      where: { id },
    });
    if (!workSchedule) {
      throw new NotFoundException(`Work schedule with ID ${id} not found`);
    }
    return workSchedule;
  }

  async update(id: string, updateWorkScheduleDto: UpdateWorkScheduleDto) {
    const workSchedule = await this.prisma.workSchedule.findUnique({
      where: { id },
    });
    if (!workSchedule) {
      throw new NotFoundException(`Work schedule with ID ${id} not found`);
    }
    return this.prisma.workSchedule.update({
      where: { id },
      data: updateWorkScheduleDto,
    });
  }

  async remove(id: string) {
    const workSchedule = await this.prisma.workSchedule.findUnique({
      where: { id },
    });
    if (!workSchedule) {
      throw new NotFoundException(`Work schedule with ID ${id} not found`);
    }
    return this.prisma.workSchedule.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
