import { Injectable, NestMiddleware } from '@nestjs/common';
import { PayrollService } from '../employee/payroll/payroll.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PayrollMiddleware implements NestMiddleware {
  constructor(
    private readonly payrollService: PayrollService,
    private readonly prisma: PrismaService,
  ) {}

  async use(req: any, res: any, next: () => void) {
    console.log('Payroll Middleware: Start processing payroll...');

    const now = new Date();
    const month = now.getMonth() + 1; // Lấy tháng hiện tại
    const year = now.getFullYear();

    const employees = await this.prisma.employee.findMany();
    for (const employee of employees) {
      await this.payrollService.calculatePayroll(employee.id, month, year);
    }

    console.log(`Payroll processed for ${employees.length} employees.`);
    next();
  }
}
