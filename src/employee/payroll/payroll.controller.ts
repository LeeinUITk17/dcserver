import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from './../../auth/admin.gaurd';
@Controller('payroll')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  @Post('calculate')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async calculatePayroll(
    @Body() body: { employeeId: string; month: number; year: number },
  ) {
    const { employeeId, month, year } = body;
    return this.payrollService.calculatePayroll(employeeId, month, year);
  }
}
