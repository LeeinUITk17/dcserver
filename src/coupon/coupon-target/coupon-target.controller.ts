import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CouponTargetService } from './coupon-target.service';
import { CreateCouponTargetDto } from './dto/create-coupon-target.dto';
import { UpdateCouponTargetDto } from './dto/update-coupon-target.dto';

@Controller('coupon-target')
export class CouponTargetController {
  constructor(private readonly couponTargetService: CouponTargetService) {}

  @Post()
  create(@Body() createCouponTargetDto: CreateCouponTargetDto) {
    return this.couponTargetService.create(createCouponTargetDto);
  }

  @Get()
  findAll() {
    return this.couponTargetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.couponTargetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCouponTargetDto: UpdateCouponTargetDto) {
    return this.couponTargetService.update(+id, updateCouponTargetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couponTargetService.remove(+id);
  }
}
