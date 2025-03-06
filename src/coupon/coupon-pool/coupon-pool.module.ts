import { Module } from '@nestjs/common';
import { CouponPoolService } from './coupon-pool.service';
import { CouponPoolController } from './coupon-pool.controller';

@Module({
  controllers: [CouponPoolController],
  providers: [CouponPoolService],
})
export class CouponPoolModule {}
