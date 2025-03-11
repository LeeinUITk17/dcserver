import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCouponPoolDto } from './dto/create-coupon-pool.dto';
import { UpdateCouponPoolDto } from './dto/update-coupon-pool.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CouponPoolService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCouponPoolDto: CreateCouponPoolDto) {
    return this.prisma.couponPool.create({
      data: createCouponPoolDto,
    });
  }
  async bulkCreate(pools: Prisma.CouponPoolCreateManyInput[]) {
    return this.prisma.couponPool.createMany({
      data: pools,
      skipDuplicates: true,
    });
  }
  async assignToCampaign(poolId: string, campaignId: string) {
    // Kiểm tra xem Campaign có tồn tại không
    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
    });

    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${campaignId} not found`);
    }

    // Kiểm tra xem Pool có tồn tại không
    const pool = await this.prisma.couponPool.findUnique({
      where: { id: poolId },
      include: { coupons: true }, // Lấy danh sách Coupon để cập nhật
    });

    if (!pool) {
      throw new NotFoundException(`Coupon Pool with ID ${poolId} not found`);
    }

    // Cập nhật campaignId cho Pool
    await this.prisma.couponPool.update({
      where: { id: poolId },
      data: { campaignId },
    });

    // Cập nhật tất cả Coupon trong Pool với campaignId mới
    if (pool.coupons.length > 0) {
      await this.prisma.coupon.updateMany({
        where: { poolId: poolId },
        data: { campaignId },
      });
    }

    return {
      message: `Coupon Pool ${poolId} assigned to Campaign ${campaignId}`,
    };
  }

  async findAll() {
    return this.prisma.couponPool.findMany();
  }

  async findOne(id: string) {
    return this.prisma.couponPool.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateCouponPoolDto: UpdateCouponPoolDto) {
    return this.prisma.couponPool.update({
      where: { id },
      data: updateCouponPoolDto,
    });
  }

  async remove(id: string) {
    return this.prisma.couponPool.delete({
      where: { id },
    });
  }

  async createWithCampaign(
    campaignId: string,
    data: Prisma.CouponPoolCreateInput,
  ) {
    return this.prisma.couponPool.create({
      data: {
        ...data,
        campaign: { connect: { id: campaignId } },
      },
    });
  }

  async findPoolsByCampaign(campaignId: string) {
    return this.prisma.couponPool.findMany({
      where: { campaignId },
      include: { coupons: true },
    });
  }

  async findCouponsByPool(poolId: string) {
    return this.prisma.coupon.findMany({
      where: { poolId },
    });
  }
}
