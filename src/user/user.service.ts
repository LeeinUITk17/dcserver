import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

  async rulePermission(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { isAdmin: true },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    if (!user.isAdmin) {
      throw new ForbiddenException(
        'You do not have permission for this action',
      );
    }

    return true;
  }
}
