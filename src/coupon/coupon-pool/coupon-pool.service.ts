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
      data: {
        campaignId: campaignId,
        allocatedCount: pool.coupons.length,
      },
    });

    // Cập nhật tất cả Coupon trong Pool với campaignId mới
    if (pool.coupons.length > 0) {
      await this.prisma.coupon.updateMany({
        where: { poolId: poolId, isActive: true },
        data: {
          campaignId: campaignId,
          status: 'ALLOCATED',
          expiresAt: campaign.endDate,
        },
      });
    }

    // 🔹 Lấy danh sách user có userTier = campaign.userTier
    const eligibleUsers = await this.prisma.user.findMany({
      where: { userTier: campaign.userTier },
      select: { id: true }, // Chỉ lấy userId để tạo CouponTarget
    });

    if (eligibleUsers.length > 0) {
      const couponTargets = pool.coupons.flatMap((coupon) =>
        eligibleUsers.map((user) => ({
          couponId: coupon.id,
          userId: user.id,
          expiresAt: campaign.endDate,
          userTier: campaign.userTier,
          usageLimit: coupon.usageLimit,
        })),
      );

      // 🔹 Tạo nhiều CouponTarget cho user thuộc tier phù hợp
      await this.prisma.couponTarget.createMany({
        data: couponTargets,
      });
    }

    return {
      message: `Coupon Pool ${poolId} assigned to Campaign ${campaignId}, and CouponTargets created for eligible users.`,
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
    return this.prisma.couponPool.update({
      where: { id },
      data: { isDeleted: true },
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
