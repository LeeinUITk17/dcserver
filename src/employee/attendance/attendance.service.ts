import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAttendanceDto: CreateAttendanceDto, userId: string) {
    const employee = await this.prisma.employee.findUnique({
      where: { userId: userId },
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${userId} not found`);
    }
    const data = {
      ...createAttendanceDto,
      employeeId: employee.id,
    };
    return this.prisma.attendance.create({ data });
  }

  async findAll() {
    return this.prisma.attendance.findMany();
  }

  async findOne(id: string) {
    const attendance = await this.prisma.attendance.findUnique({
      where: { id },
    });
    if (!attendance) {
      throw new NotFoundException(`Attendance record with ID ${id} not found`);
    }
    return attendance;
  }

  async update(id: string, updateAttendanceDto: UpdateAttendanceDto) {
    const attendance = await this.prisma.attendance.findUnique({
      where: { id },
    });
    if (!attendance) {
      throw new NotFoundException(`Attendance record with ID ${id} not found`);
    }
    return this.prisma.attendance.update({
      where: { id },
      data: updateAttendanceDto,
    });
  }

  async remove(id: string) {
    const attendance = await this.prisma.attendance.findUnique({
      where: { id },
    });
    if (!attendance) {
      throw new NotFoundException(`Attendance record with ID ${id} not found`);
    }
    return this.prisma.attendance.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
  async bulkCreateAttendanceRecords(
    employeeId: string,
    attendanceRecords: CreateAttendanceDto[],
  ) {
    return this.prisma.attendance.createMany({
      data: attendanceRecords.map((record) => ({
        ...record,
        employeeId,
      })),
    });
  }
}
