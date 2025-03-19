import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserTier } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllUsers() {
    return await this.prisma.user.findMany({
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
  async updateUserTier(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    if (user.point < 1000) {
      throw new ForbiddenException(
        'User does not have enough points to upgrade tier',
      );
    }

    let newTier: UserTier | null = null;

    switch (true) {
      case user.point >= 1000 && user.point < 5000:
        newTier = UserTier.SILVER;
        break;
      case user.point >= 5000 && user.point < 10000:
        newTier = UserTier.GOLD;
        break;
    }

    if (newTier) {
      return await this.prisma.user.update({
        where: { id: userId },
        data: {
          userTier: newTier,
          updatedAt: new Date(),
        },
      });
    }

    return await this.prisma.user.update({
      where: { id: userId },
      data: { updatedAt: new Date() },
    });
  }
}
