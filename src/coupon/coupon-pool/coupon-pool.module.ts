import { Module } from '@nestjs/common';
import { CouponPoolService } from './coupon-pool.service';
import { CouponPoolController } from './coupon-pool.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  controllers: [CouponPoolController],
  providers: [CouponPoolService],
})
export class CouponPoolModule {}
