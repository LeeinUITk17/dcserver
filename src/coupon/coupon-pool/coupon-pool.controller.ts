import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CouponPoolService } from './coupon-pool.service';
import { CreateCouponPoolDto } from './dto/create-coupon-pool.dto';
import { UpdateCouponPoolDto } from './dto/update-coupon-pool.dto';

@Controller('coupon-pool')
export class CouponPoolController {
  constructor(private readonly couponPoolService: CouponPoolService) {}

  @Post()
  create(@Body() createCouponPoolDto: CreateCouponPoolDto) {
    return this.couponPoolService.create(createCouponPoolDto);
  }

  @Get()
  findAll() {
    return this.couponPoolService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.couponPoolService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCouponPoolDto: UpdateCouponPoolDto) {
    return this.couponPoolService.update(+id, updateCouponPoolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couponPoolService.remove(+id);
  }
}
