import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Prisma } from '@prisma/client';
import { CouponStatus } from '@prisma/client';
@Injectable()
export class CouponService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCouponDto: CreateCouponDto) {
    return this.prisma.coupon.create({
      data: createCouponDto,
    });
  }
  async checkCoupon(couponId: string) {
    return await this.prisma.coupon.findFirst({
      where: {
        id: couponId,
        status: CouponStatus.ALLOCATED,
        isDeleted: false,
      },
    });
  }

  async findAll() {
    return this.prisma.coupon.findMany();
  }

  async findOne(id: string) {
    return this.prisma.coupon.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateCouponDto: UpdateCouponDto) {
    return this.prisma.coupon.update({
      where: { id },
      data: updateCouponDto,
    });
  }

  async remove(id: string) {
    return this.prisma.coupon.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
  async assignToPool(couponId: string, poolId: string) {
    const coupon = await this.prisma.coupon.findUnique({
      where: { id: couponId },
    });

    if (!coupon) {
      throw new NotFoundException(`Coupon with ID ${couponId} not found`);
    }
    const pool = await this.prisma.couponPool.findUnique({
      where: { id: poolId },
    });

    if (!pool) {
      throw new NotFoundException(`Coupon Pool with ID ${poolId} not found`);
    }
    return this.prisma.coupon.update({
      where: { id: couponId },
      data: {
        poolId: pool.id,
        campaignId: pool.campaignId,
      },
    });
  }
  async bulkCreate(coupons: Prisma.CouponCreateManyInput[]) {
    return await this.prisma.coupon.createMany({
      data: coupons,
      skipDuplicates: true,
    });
  }
}
