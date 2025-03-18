import { Module } from '@nestjs/common';
import { CouponUsageService } from './coupon-usage.service';
import { CouponUsageController } from './coupon-usage.controller';
import { PrismaModule } from '../../prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  controllers: [CouponUsageController],
  providers: [CouponUsageService],
  exports: [CouponUsageService],
})
export class CouponUsageModule {}
