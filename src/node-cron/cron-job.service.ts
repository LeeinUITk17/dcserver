import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PayrollService } from '../employee/payroll/payroll.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CronJobService {
  private readonly logger = new Logger(CronJobService.name);

  constructor(
    private readonly payrollService: PayrollService,
    private readonly prisma: PrismaService,
  ) {}

  @Cron('0 0 1 * *') // Chạy vào 0:00 ngày 1 mỗi tháng
  async handleCron() {
    this.logger.log('Running monthly payroll calculation...');

    const now = new Date();
    const month = now.getMonth(); // Tháng hiện tại (0-11)
    const year = now.getFullYear();

    const employees = await this.prisma.employee.findMany();
    for (const employee of employees) {
      await this.payrollService.calculatePayroll(employee.id, month, year);
    }

    this.logger.log(`Payroll processed for ${employees.length} employees.`);
  }
}
