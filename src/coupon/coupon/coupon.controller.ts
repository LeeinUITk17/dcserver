import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Prisma } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { StaffGuard } from './../../auth/staff.gaurd';
import { AdminGuard } from './../../auth/admin.gaurd';
@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponService.create(createCouponDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), StaffGuard)
  findAll() {
    return this.couponService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), StaffGuard)
  findOne(@Param('id') id: string) {
    return this.couponService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponService.update(id, updateCouponDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  remove(@Param('id') id: string) {
    return this.couponService.remove(id);
  }
  @Patch(':couponId/assign-pool/:poolId')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async assignCouponToPool(
    @Param('couponId') couponId: string,
    @Param('poolId') poolId: string,
  ) {
    return this.couponService.assignToPool(couponId, poolId);
  }
  @Post('bulk-create')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async bulkCreate(@Body() coupons: Prisma.CouponCreateManyInput[]) {
    return this.couponService.bulkCreate(coupons);
  }
}
