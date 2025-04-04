import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';
import { CouponTargetService } from 'src/coupon/coupon-target/coupon-target.service';
@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, CouponTargetService],
  exports: [UserService],
})
export class UserModule {}
