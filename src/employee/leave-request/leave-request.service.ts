import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';

@Injectable()
export class LeaveRequestService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLeaveRequestDto: CreateLeaveRequestDto) {
    return this.prisma.leaveRequest.create({
      data: createLeaveRequestDto,
    });
  }

  async findAll() {
    return this.prisma.leaveRequest.findMany();
  }

  async findOne(id: string) {
    const leaveRequest = await this.prisma.leaveRequest.findUnique({
      where: { id },
    });
    if (!leaveRequest) {
      throw new NotFoundException(`Leave request with ID ${id} not found`);
    }
    return leaveRequest;
  }

  async update(id: string, updateLeaveRequestDto: UpdateLeaveRequestDto) {
    const leaveRequest = await this.prisma.leaveRequest.findUnique({
      where: { id },
    });
    if (!leaveRequest) {
      throw new NotFoundException(`Leave request with ID ${id} not found`);
    }
    return this.prisma.leaveRequest.update({
      where: { id },
      data: updateLeaveRequestDto,
    });
  }

  async remove(id: string) {
    const leaveRequest = await this.prisma.leaveRequest.findUnique({
      where: { id },
    });
    if (!leaveRequest) {
      throw new NotFoundException(`Leave request with ID ${id} not found`);
    }
    return this.prisma.leaveRequest.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
