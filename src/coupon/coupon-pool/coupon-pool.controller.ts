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
import { CouponPoolService } from './coupon-pool.service';
import { CreateCouponPoolDto } from './dto/create-coupon-pool.dto';
import { UpdateCouponPoolDto } from './dto/update-coupon-pool.dto';
import { Prisma } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { StaffGuard } from './../../auth/staff.gaurd';
import { AdminGuard } from './../../auth/admin.gaurd';
@Controller('coupon-pool')
export class CouponPoolController {
  constructor(private readonly couponPoolService: CouponPoolService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  create(@Body() createCouponPoolDto: CreateCouponPoolDto) {
    return this.couponPoolService.create(createCouponPoolDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), StaffGuard)
  findAll() {
    return this.couponPoolService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), StaffGuard)
  findOne(@Param('id') id: string) {
    return this.couponPoolService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  update(
    @Param('id') id: string,
    @Body() updateCouponPoolDto: UpdateCouponPoolDto,
  ) {
    return this.couponPoolService.update(id, updateCouponPoolDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  remove(@Param('id') id: string) {
    return this.couponPoolService.remove(id);
  }

  @Post('campaign/:campaignId')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  createWithCampaign(
    @Param('campaignId') campaignId: string,
    @Body() createCouponPoolDto: CreateCouponPoolDto,
  ) {
    return this.couponPoolService.createWithCampaign(
      campaignId,
      createCouponPoolDto,
    );
  }

  @Get('campaign/:campaignId')
  @UseGuards(AuthGuard('jwt'), StaffGuard)
  findPoolsByCampaign(@Param('campaignId') campaignId: string) {
    return this.couponPoolService.findPoolsByCampaign(campaignId);
  }

  @Get('pool/:poolId/coupons')
  @UseGuards(AuthGuard('jwt'), StaffGuard)
  findCouponsByPool(@Param('poolId') poolId: string) {
    return this.couponPoolService.findCouponsByPool(poolId);
  }
  @Post('bulk-create')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async bulkCreate(@Body() pools: Prisma.CouponPoolCreateManyInput[]) {
    return this.couponPoolService.bulkCreate(pools);
  }
  @Patch(':poolId/assign-campaign/:campaignId')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async assignPoolToCampaign(
    @Param('poolId') poolId: string,
    @Param('campaignId') campaignId: string,
  ) {
    return this.couponPoolService.assignToCampaign(poolId, campaignId);
  }
}
