import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CouponUsageService } from './coupon-usage.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from './../../auth/admin.gaurd';
@Controller('coupon-usage')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class CouponUsageController {
  constructor(private readonly couponUsageService: CouponUsageService) {}
  @Get()
  findAll() {
    return this.couponUsageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.couponUsageService.findOne(id);
  }
}
