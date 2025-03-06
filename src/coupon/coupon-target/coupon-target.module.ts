import { Module } from '@nestjs/common';
import { CouponTargetService } from './coupon-target.service';
import { CouponTargetController } from './coupon-target.controller';

@Module({
  controllers: [CouponTargetController],
  providers: [CouponTargetService],
})
export class CouponTargetModule {}
