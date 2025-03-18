import { Module } from '@nestjs/common';
import { CouponTargetService } from './coupon-target.service';
import { CouponTargetController } from './coupon-target.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  controllers: [CouponTargetController],
  providers: [CouponTargetService],
  exports: [CouponTargetService],
})
export class CouponTargetModule {}
