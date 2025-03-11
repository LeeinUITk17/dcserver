import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Prisma } from '@prisma/client';
@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponService.create(createCouponDto);
  }

  @Get()
  findAll() {
    return this.couponService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.couponService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponService.update(id, updateCouponDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couponService.remove(id);
  }
  @Patch(':couponId/assign-pool/:poolId')
  async assignCouponToPool(
    @Param('couponId') couponId: string,
    @Param('poolId') poolId: string,
  ) {
    return this.couponService.assignToPool(couponId, poolId);
  }
  @Post('bulk-create')
  async bulkCreate(@Body() coupons: Prisma.CouponCreateManyInput[]) {
    return this.couponService.bulkCreate(coupons);
  }
}
