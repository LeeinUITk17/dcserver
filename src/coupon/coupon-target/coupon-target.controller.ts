import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CouponTargetService } from './coupon-target.service';
import { UpdateCouponTargetDto } from './dto/update-coupon-target.dto';
import { AuthGuard } from '@nestjs/passport';
import { StaffGuard } from './../../auth/staff.gaurd';
import { AdminGuard } from './../../auth/admin.gaurd';
@Controller('coupon-target')
export class CouponTargetController {
  constructor(private readonly couponTargetService: CouponTargetService) {}
  @Get()
  @UseGuards(AuthGuard('jwt'), StaffGuard)
  findAll() {
    return this.couponTargetService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), StaffGuard)
  findOne(@Param('id') id: string) {
    return this.couponTargetService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), StaffGuard)
  update(
    @Param('id') id: string,
    @Body() updateCouponTargetDto: UpdateCouponTargetDto,
  ) {
    return this.couponTargetService.update(id, updateCouponTargetDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  remove(@Param('id') id: string) {
    return this.couponTargetService.remove(id);
  }
}
