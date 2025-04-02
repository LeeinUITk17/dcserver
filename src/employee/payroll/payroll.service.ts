import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class PayrollService {
  constructor(private readonly prisma: PrismaService) {}

  async getAlLPayrolls() {
    return this.prisma.payroll.findMany();
  }

  async calculatePayroll(employeeId: string, month: number, year: number) {
    // Kiểm tra employee tồn tại
    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeId },
      include: { user: true },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    // Xác định ngày bắt đầu và kết thúc tháng (fix lỗi month = 12)
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    // Kiểm tra payroll đã tồn tại chưa
    const payroll = await this.prisma.payroll.findFirst({
      where: {
        employeeId,
        createdAt: { gte: startDate, lt: endDate },
      },
    });

    // Lấy dữ liệu chấm công, lịch làm việc, yêu cầu nghỉ phép, làm thêm giờ
    const [workSchedules, attendances, leaveRequests, overtimeRequests] =
      await Promise.all([
        this.prisma.workSchedule.findMany({
          where: { employeeId, shiftStart: { gte: startDate, lt: endDate } },
          include: { shiftTemplate: true },
        }),
        this.prisma.attendance.findMany({
          where: { employeeId, workDate: { gte: startDate, lt: endDate } },
        }),
        this.prisma.leaveRequest.findMany({
          where: {
            employeeId,
            status: 'APPROVED',
            startDate: { gte: startDate, lt: endDate },
          },
        }),
        this.prisma.overtimeRequest.findMany({
          where: {
            employeeId,
            status: 'APPROVED',
            date: { gte: startDate, lt: endDate },
          },
        }),
      ]);

    // Tính toán giờ làm, giờ OT, khoản khấu trừ
    let totalWorkedHours = new Decimal(0);
    let totalOvertimeMinutes = new Decimal(0);
    let totalDeductions = new Decimal(0);

    attendances.forEach((attendance) => {
      if (attendance.checkOut) {
        const workedHours = new Decimal(
          (attendance.checkOut.getTime() - attendance.checkIn.getTime()) /
            3600000,
        );
        totalWorkedHours = totalWorkedHours.plus(workedHours);
      }
      totalOvertimeMinutes = totalOvertimeMinutes.plus(
        attendance.overtimeMinutes || 0,
      );
      totalDeductions = totalDeductions.plus(
        ((attendance.lateMinutes || 0) +
          (attendance.earlyDepartureMinutes || 0)) *
          5,
      );
    });

    leaveRequests.forEach(() => {
      totalDeductions = totalDeductions.plus(50000);
    });

    overtimeRequests.forEach((overtime) => {
      totalOvertimeMinutes = totalOvertimeMinutes.plus(
        overtime.requestedMinutes,
      );
    });

    // Tính toán lương
    const hourlyRate = new Decimal(employee.hourlyRate || 0);
    const overtimePay = totalOvertimeMinutes.div(60).times(hourlyRate);
    const baseSalary = new Decimal(employee.salary || 0);
    const netSalary = baseSalary.plus(overtimePay).minus(totalDeductions);

    // Nếu payroll đã tồn tại, cập nhật bản ghi cũ
    if (payroll) {
      return this.prisma.payroll.update({
        where: { id: payroll.id },
        data: {
          workedHours: totalWorkedHours.toNumber(),
          standardHours: workSchedules.length * 8,
          overtimePay: overtimePay.toNumber(),
          deductions: totalDeductions.toNumber(),
          netSalary: netSalary.toNumber(),
        },
      });
    }

    // Nếu chưa có payroll, tạo mới
    return this.prisma.payroll.create({
      data: {
        employeeId,
        baseSalary,
        hourlyRate,
        workedHours: totalWorkedHours.toNumber(),
        standardHours: workSchedules.length * 8,
        overtimePay: overtimePay.toNumber(),
        deductions: totalDeductions.toNumber(),
        netSalary: netSalary.toNumber(),
      },
    });
  }
}
