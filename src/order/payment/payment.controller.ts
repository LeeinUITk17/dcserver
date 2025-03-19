import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AuthGuard } from '@nestjs/passport';
import { StaffGuard } from './../../auth/staff.gaurd';
import { UpdatePaymentDto } from './dto/update-payment.dto';
@Controller('payment')
@UseGuards(AuthGuard('jwt'), StaffGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(id, updatePaymentDto);
  }
}
