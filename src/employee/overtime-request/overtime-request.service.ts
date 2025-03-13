import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOvertimeRequestDto } from './dto/create-overtime-request.dto';
import { UpdateOvertimeRequestDto } from './dto/update-overtime-request.dto';

@Injectable()
export class OvertimeRequestService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOvertimeRequestDto: CreateOvertimeRequestDto) {
    return this.prisma.overtimeRequest.create({
      data: createOvertimeRequestDto,
    });
  }

  async findAll() {
    return this.prisma.overtimeRequest.findMany();
  }

  async findOne(id: string) {
    const overtimeRequest = await this.prisma.overtimeRequest.findUnique({
      where: { id },
    });
    if (!overtimeRequest) {
      throw new NotFoundException(`Overtime request with ID ${id} not found`);
    }
    return overtimeRequest;
  }

  async update(id: string, updateOvertimeRequestDto: UpdateOvertimeRequestDto) {
    const overtimeRequest = await this.prisma.overtimeRequest.findUnique({
      where: { id },
    });
    if (!overtimeRequest) {
      throw new NotFoundException(`Overtime request with ID ${id} not found`);
    }
    return this.prisma.overtimeRequest.update({
      where: { id },
      data: updateOvertimeRequestDto,
    });
  }

  async remove(id: string) {
    const overtimeRequest = await this.prisma.overtimeRequest.findUnique({
      where: { id },
    });
    if (!overtimeRequest) {
      throw new NotFoundException(`Overtime request with ID ${id} not found`);
    }
    return this.prisma.overtimeRequest.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
