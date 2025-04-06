import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateWorkScheduleDto } from './dto/create-work-schedule.dto';
import { UpdateWorkScheduleDto } from './dto/update-work-schedule.dto';

@Injectable()
export class WorkScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWorkScheduleDto: CreateWorkScheduleDto, userId: string) {
    const employee = await this.prisma.employee.findUnique({
      where: { userId: userId },
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${userId} not found`);
    }
    const data = {
      ...createWorkScheduleDto,
      employeeId: employee.id,
    };
    return this.prisma.workSchedule.create({ data });
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
