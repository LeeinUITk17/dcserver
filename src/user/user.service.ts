import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserTier } from '@prisma/client';
import { CouponTargetService } from '../coupon/coupon-target/coupon-target.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly coupontarget: CouponTargetService,
  ) {}
  async getAllCustomers() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        point: true,
        createdAt: true,
        updatedAt: true,
        userTier: true,
      },
    });
  }
  async getUserById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
        userTier: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  async updateUserInfo(
    userId: string,
    updateData: Partial<{ name: string; phoneNumber: string; address: string }>,
    requestUser: any,
  ) {
    if (requestUser.id !== userId && !requestUser.isAdmin) {
      throw new ForbiddenException(
        'You do not have permission to update this user',
      );
    }

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
    });
  }
  async updateUserTier(userId: string, earnedPoint: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // 1️⃣ Cập nhật tổng điểm
    const totalPoint = Math.max(0, user.point + earnedPoint); // Đảm bảo điểm không âm

    // 2️⃣ Xác định cấp bậc mới
    let newTier: UserTier | null = null;
    if (totalPoint >= 1000 && totalPoint < 5000) {
      newTier = UserTier.SILVER;
    } else if (totalPoint >= 5000) {
      newTier = UserTier.GOLD;
    }

    // 3️⃣ Cập nhật điểm & cấp bậc (nếu có)
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        point: totalPoint,
        userTier: newTier ?? user.userTier, // Giữ nguyên nếu không đổi
        updatedAt: new Date(),
      },
    });
  }
  async getUserIdByPhoneNumber(phoneNumber: string) {
    const user = await this.prisma.user.findUnique({
      where: { phone: phoneNumber },
      select: { id: true },
    });
    return user.id;
  }
}
