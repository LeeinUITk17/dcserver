import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCouponTargetDto } from './dto/create-coupon-target.dto';
import { UpdateCouponTargetDto } from './dto/update-coupon-target.dto';

@Injectable()
export class CouponTargetService {
  static findbyCoupnIdUserIds: any;
  constructor(private readonly prisma: PrismaService) {}

  async create(createCouponTargetDto: CreateCouponTargetDto) {
    return this.prisma.couponTarget.create({
      data: createCouponTargetDto,
    });
  }

  async findAll() {
    return this.prisma.couponTarget.findMany();
  }

  async findOne(id: string) {
    const couponTarget = await this.prisma.couponTarget.findUnique({
      where: { id },
    });
    if (!couponTarget) {
      throw new NotFoundException(`Coupon target with ID ${id} not found`);
    }
    return couponTarget;
  }

  async update(id: string, updateCouponTargetDto: UpdateCouponTargetDto) {
    const couponTarget = await this.prisma.couponTarget.findUnique({
      where: { id },
    });
    if (!couponTarget) {
      throw new NotFoundException(`Coupon target with ID ${id} not found`);
    }
    return this.prisma.couponTarget.update({
      where: { id },
      data: updateCouponTargetDto,
    });
  }

  async remove(id: string) {
    const couponTarget = await this.prisma.couponTarget.findUnique({
      where: { id },
    });
    if (!couponTarget) {
      throw new NotFoundException(`Coupon target with ID ${id} not found`);
    }
    return this.prisma.couponTarget.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
  async findbyCoupnIdUserIds(couponId: string, userId: string) {
    const couponTarget = await this.prisma.couponTarget.findFirst({
      where: { couponId, userId, isDeleted: false },
    });
    if (!couponTarget) {
      throw new NotFoundException(
        `Coupon target with couponId ${couponId} and userId ${userId} not found`,
      );
    }
    return couponTarget.id;
  }
}
