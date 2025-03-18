import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCouponUsageDto } from './dto/create-coupon-usage.dto';
import { UpdateCouponUsageDto } from './dto/update-coupon-usage.dto';

@Injectable()
export class CouponUsageService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCouponUsageDto: CreateCouponUsageDto) {
    return this.prisma.couponUsage.create({
      data: createCouponUsageDto,
    });
  }

  async findAll() {
    return this.prisma.couponUsage.findMany();
  }

  async findOne(id: string) {
    const couponUsage = await this.prisma.couponUsage.findUnique({
      where: { id },
    });
    if (!couponUsage) {
      throw new NotFoundException(`Coupon usage with ID ${id} not found`);
    }
    return couponUsage;
  }

  async update(id: string, updateCouponUsageDto: UpdateCouponUsageDto) {
    const couponUsage = await this.prisma.couponUsage.findUnique({
      where: { id },
    });
    if (!couponUsage) {
      throw new NotFoundException(`Coupon usage with ID ${id} not found`);
    }
    return this.prisma.couponUsage.update({
      where: { id },
      data: updateCouponUsageDto,
    });
  }

  async remove(id: string) {
    const couponUsage = await this.prisma.couponUsage.findUnique({
      where: { id },
    });
    if (!couponUsage) {
      throw new NotFoundException(`Coupon usage with ID ${id} not found`);
    }
    return this.prisma.couponUsage.delete({
      where: { id },
    });
  }
}
