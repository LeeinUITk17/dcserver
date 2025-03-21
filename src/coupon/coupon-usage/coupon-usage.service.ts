import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCouponUsageDto } from './dto/create-coupon-usage.dto';
import { UpdateCouponUsageDto } from './dto/update-coupon-usage.dto';
import { CouponTargetService } from '../coupon-target/coupon-target.service';
@Injectable()
export class CouponUsageService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly couponTargetService: CouponTargetService,
  ) {}

  async create(createCouponUsageDto: CreateCouponUsageDto) {
    return await this.prisma
      .$transaction(async (prisma) => {
        const { couponId, userId } = createCouponUsageDto;

        if (!couponId || !userId) {
          throw new BadRequestException('Invalid couponId or userId');
        }

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
          throw new NotFoundException(`User with ID ${userId} not found`);
        }

        const coupon = await prisma.coupon.findUnique({
          where: { id: couponId },
        });
        if (!coupon) {
          throw new NotFoundException(`Coupon with ID ${couponId} not found`);
        }
        if (coupon.status !== 'ALLOCATED') {
          throw new BadRequestException(
            `Coupon with ID ${couponId} is not available for use`,
          );
        }

        let TargetId: string;
        try {
          TargetId = await this.couponTargetService.findbyCoupnIdUserIds(
            couponId,
            userId,
          );
        } catch (e) {
          throw new BadRequestException(
            `Coupon with ID ${couponId} is not available for user with ID ${userId}`,
          );
        }

        await prisma.couponUsage.create({ data: { couponId, userId } });
        await prisma.coupon.update({
          where: { id: couponId },
          data: { status: 'USED' },
        });
        await prisma.couponTarget.update({
          where: { id: TargetId },
          data: { isDeleted: true },
        });

        return coupon;
      })
      .catch((error) => {
        console.error('Transaction failed:', error);
        throw new InternalServerErrorException('Transaction failed');
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
