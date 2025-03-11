import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CouponPoolService } from './coupon-pool.service';
import { CreateCouponPoolDto } from './dto/create-coupon-pool.dto';
import { UpdateCouponPoolDto } from './dto/update-coupon-pool.dto';
import { Prisma } from '@prisma/client';
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
    return this.couponPoolService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCouponPoolDto: UpdateCouponPoolDto,
  ) {
    return this.couponPoolService.update(id, updateCouponPoolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couponPoolService.remove(id);
  }

  @Post('campaign/:campaignId')
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
  findPoolsByCampaign(@Param('campaignId') campaignId: string) {
    return this.couponPoolService.findPoolsByCampaign(campaignId);
  }

  @Get('pool/:poolId/coupons')
  findCouponsByPool(@Param('poolId') poolId: string) {
    return this.couponPoolService.findCouponsByPool(poolId);
  }
  @Post('bulk-create')
  async bulkCreate(@Body() pools: Prisma.CouponPoolCreateManyInput[]) {
    return this.couponPoolService.bulkCreate(pools);
  }
  @Patch(':poolId/assign-campaign/:campaignId')
  async assignPoolToCampaign(
    @Param('poolId') poolId: string,
    @Param('campaignId') campaignId: string,
  ) {
    return this.couponPoolService.assignToCampaign(poolId, campaignId);
  }
}
